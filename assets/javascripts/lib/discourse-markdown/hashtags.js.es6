function addHashTag(buffer, matches, state) {
  let hashtag = matches[1] || matches[2];
  let getURL = state.md.options.discourse.getURL;

  let href = getURL('/c/') + hashtag.toLowerCase();

  let token = new state.Token('hashtag_open', 'a', 1);
  token.attrs = [['class', 'hashtag']];
  if (href) {
    token.attrs.push(['href', href]);
  }

  buffer.push(token);

  token = new state.Token('text', '', 0);
  token.content = '#'+hashtag;

  buffer.push(token);

  token = new state.Token('hashtag_close', 'a', -1);
  buffer.push(token);
}

export function setup(helper) {
  helper.registerPlugin(md => {

    const rule = {
      matcher: /#((?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D])(?:[\-\.0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]){0,59})(?!(?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]))/,
      onMatch: addHashTag
    };

    md.core.textPostProcess.ruler.push('hashtags', rule);
  });
}
