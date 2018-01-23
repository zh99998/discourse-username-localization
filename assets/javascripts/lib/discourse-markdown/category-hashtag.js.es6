function addHashtag(buffer, matches, state) {
  const options = state.md.options.discourse;
  const slug = matches[1];
  const categoryHashtagLookup = options.categoryHashtagLookup;
  const result = categoryHashtagLookup && categoryHashtagLookup(slug);

  let token;

  if (result) {
    token = new state.Token('link_open', 'a', 1);
    token.attrs = [['class', 'hashtag'], ['href', result[0]]];
    token.block = false;
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = '#';
    buffer.push(token);

    token = new state.Token('span_open', 'span', 1);
    token.block = false;
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = result[1];
    buffer.push(token);

    buffer.push(new state.Token('span_close', 'span', -1));

    buffer.push(new state.Token('link_close', 'a', -1));
  } else {

    token = new state.Token('span_open', 'span', 1);
    token.attrs = [['class', 'hashtag']];
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = matches[0];
    buffer.push(token);

    token = new state.Token('span_close', 'span', -1);
    buffer.push(token);
  }
}

export function setup(helper) {
  helper.registerPlugin(md=>{

    const rule = {
      matcher: /#((?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D])(?:[\-\.0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]){0,59})(?!(?:[0-9A-Z_a-z\u017F\u212A\u3005\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FD5\uAC00-\uD7AF\uF900-\uFAFF]|\uD82C[\uDC00-\uDCFF]|[\uD840-\uD868\uD86A-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD873[\uDC00-\uDEAF]|\uD87E[\uDC00-\uDE1D]))/,
      onMatch: addHashtag
    };

    md.core.textPostProcess.ruler.push('category-hashtag', rule);
  });
}
