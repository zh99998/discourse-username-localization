import UserCardContents from 'discourse/components/user-card-contents';
import User from 'discourse/models/user';
import DiscourseURL, { userPath } from 'discourse/lib/url';

export default {
  name: 'override-username-match',
  before: 'inject-discourse-objects',
  initialize() {

    UserCardContents.reopen({

      _show(username, $target) {
        // No user card for anon
        if (this.siteSettings.hide_user_profiles_from_public && !this.currentUser) {
          return false;
        }

        // XSS protection (should be encapsulated)
        username = username.toString().replace(/[^A-Za-z0-9_\u4E00-\u9FD5\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2CEAF}\uF900–\uFAFF\u{2F800}-\u{2FA1D}\uAC00–\uD7AF\u3040-\u30FF\u31F0–\u31FF\u{1B000}–\u{1B0FF}\u3005\.\-]/gu, "");

        // Don't show on mobile
        if (this.site.mobileView) {
          DiscourseURL.routeTo(userPath(username));
          return false;
        }

        const currentUsername = this.get('username');
        if (username === currentUsername && this.get('userLoading') === username) {
          return;
        }

        const postId = $target.parents('article').data('post-id');

        const wasVisible = this.get('visible');
        const previousTarget = this.get('cardTarget');
        const target = $target[0];
        if (wasVisible) {
          this._close();
          if (target === previousTarget) { return; }
        }

        const post = this.get('viewingTopic') && postId ? this.get('postStream').findLoadedPost(postId) : null;
        this.setProperties({ username, userLoading: username, cardTarget: target, post });

        const args = { stats: false };
        args.include_post_count_for = this.get('topic.id');

        User.findByUsername(username, args).then(user => {
          if (user.topic_post_count) {
            this.set('topicPostCount', user.topic_post_count[args.include_post_count_for]);
          }
          this.setProperties({ user, avatar: user, visible: true });

          this._positionCard($target);
        }).catch(() => this._close()).finally(() => this.set('userLoading', null));

        return false;
      }

    });
  }
};