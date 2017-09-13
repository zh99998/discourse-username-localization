#!/bin/bash

# converted from /^#([\w\u4E00-\u9FD5\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2CEAF}\uF900-\uFAFF\u{2F800}-\u{2FA1D}\uAC00-\uD7AF\u3040-\u30FF\u31F0-\u31FF\u{1B000}-\u{1B0FF}\u3005-]{1,50})/iu
mkdir -p $(dirname $0)/assets/javascripts/pretty-text/engines/discourse-markdown
sed -i 's/^\s*matcher:.*$/  matcher: \/^#((?:[\\-0-9A-Z_a-z\\u017F\\u212A\\u3005\\u3040-\\u30FF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\u9FD5\\uAC00-\\uD7AF\\uF900-\\uFAFF]|\\uD82C[\\uDC00-\\uDCFF]|[\\uD840-\\uD868\\uD86A-\\uD872][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD873[\\uDC00-\\uDEAF]|\\uD87E[\\uDC00-\\uDE1D]){1,50})\/i,/' ../app/assets/javascripts/pretty-text/engines/discourse-markdown/category-hashtag.js.es6 > $(dirname $0)/assets/javascripts/pretty-text/engines/discourse-markdown/category-hashtag.js.es6
