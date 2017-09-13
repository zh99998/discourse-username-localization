function addMention(buffer, matches, state) {
  let username = matches[1] || matches[2];
  let mentionLookup = state.md.options.discourse.mentionLookup;
  let getURL = state.md.options.discourse.getURL;

  let type = mentionLookup && mentionLookup(username);

  let tag = 'a';
  let className = 'mention';
  let href = null;

  if (type === 'user') {
    href = getURL('/u/') + username.toLowerCase();
  } else if (type === 'group') {
    href = getURL('/groups/') + username;
    className = 'mention-group';
  } else {
    tag = 'span';
  }

  let token = new state.Token('mention_open', tag, 1);
  token.attrs = [['class', className]];
  if (href) {
    token.attrs.push(['href', href]);
  }

  buffer.push(token);

  token = new state.Token('text', '', 0);
  token.content = '@' + username;

  buffer.push(token);

  token = new state.Token('mention_close', tag, -1);
  buffer.push(token);
}

export function setup(helper) {
  helper.registerPlugin(md => {

    const rule = {
      matcher: /@((?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D])(?:[\-\.0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]){0,59})(?!(?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]))/,
      onMatch: addMention
    };

    md.core.textPostProcess.ruler.push('mentions', rule);
  });
}
