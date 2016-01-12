#!/bin/bash

sed -i 's/^USERNAME_ROUTE_FORMAT =.*$/USERNAME_ROUTE_FORMAT = \/[A-Za-z0-9\\_.\\-\\%\\u4E00-\\u9FCC\\u3400-\\u4DB5\\u20000-\\u2A6D6\\u2A700-\\u2B734\\u2B740-\\u2B81D\\u3005\\u3040-\\u30FF]+\/ unless defined? USERNAME_ROUTE_FORMAT/' ../config/routes.rb
sed -i 's/^\s*matcher:.*$/  matcher: \/^@([\\w\\u4E00-\\u9FCC\\u3400-\\u4DB5\\u20000-\\u2A6D6\\u2A700-\\u2B734\\u2B740-\\u2B81D\\u3005\\u3040-\\u30FF][\\w\\u4E00-\\u9FCC\\u3400-\\u4DB5\\u20000-\\u2A6D6\\u2A700-\\u2B734\\u2B740-\\u2B81D\\u3005\\u3040-\\u30FF.-]{0,59})[\\w\\u4E00-\\u9FCC\\u3400-\\u4DB5\\u20000-\\u2A6D6\\u2A700-\\u2B734\\u2B740-\\u2B81D\\u3005\\u3040-\\u30FF]\/i,/' ../app/assets/javascripts/discourse/dialects/mention_dialect.js
