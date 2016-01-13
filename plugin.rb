# name: username-localization
# about:  Localized username support, now only tested Chinese.
# version: 0.1
# authors: freemangl, zh99998 <zh99998@gmail.com>

gem "chinese_pinyin", "1.0.0"

after_initialize do
  User.class_eval do
    def self.system_avatar_template(username)
      # TODO it may be worth caching this in a distributed cache, should be benched
      if SiteSetting.external_system_avatars_enabled
        url = SiteSetting.external_system_avatars_url.dup
        url.gsub! "{color}", letter_avatar_color(username.downcase)
        url.gsub! "{username}", username
        if username[0] =~ /[^\w]/
          url.gsub! "{first_letter}", (Pinyin.t(username).strip.to_s[0] || '_').downcase
        else
          url.gsub! "{first_letter}", username[0].downcase
        end
        url
      else
        "#{Discourse.base_uri}/letter_avatar/#{username.downcase}/{size}/#{LetterAvatar.version}.png"
      end
    end
  end

  UsernameValidator.class_eval do
    def username_char_valid?
      return unless errors.empty?
      if username =~ /[^\w\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF.-]/
        self.errors << I18n.t(:'user.username.characters')
      end
    end

    def username_first_char_valid?
      return unless errors.empty?
      if username[0] =~ /[^\w\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF]/
        self.errors << I18n.t(:'user.username.must_begin_with_alphanumeric')
      end
    end

    def username_last_char_valid?
      return unless errors.empty?
      if username[-1] =~ /[^\w\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF]/
        self.errors << I18n.t(:'user.username.must_end_with_alphanumeric')
      end
    end
  end

  LetterAvatar::Identity.class_eval do
    def self.from_username(username)
      identity = new
      identity.color = LetterAvatar::COLORS[
        Digest::MD5.hexdigest(username)[0...15].to_i(16) % LetterAvatar::COLORS.length
      ]
      if username[0] =~ /[^\w]/
        identity.letter = (Pinyin.t(username).strip.to_s[0] || '_').upcase
      else
        identity.letter = username[0].upcase
      end
      identity
    end
  end
end

