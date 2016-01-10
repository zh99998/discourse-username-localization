# name: username-localization
# about:  Localized username support, now only tested Chinese.
# version: 0.1
# authors: freemangl, zh99998 <zh99998@gmail.com>

gem "chinese_pinyin"

p USERNAME_ROUTE_FORMAT
USERNAME_ROUTE_FORMAT.replace /[A-Za-z0-9\_.\-\%\u4e00-\u9fa5]+/

class UsernameValidator
  def username_char_valid?
    return unless errors.empty?
    if username =~ /[^A-Za-z0-9_\.\-\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF]/
      self.errors << I18n.t(:'user.username.characters')
    end
  end

  def username_first_char_valid?
    return unless errors.empty?
    if username[0] =~ /[^A-Za-z0-9_\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF]/
      self.errors << I18n.t(:'user.username.must_begin_with_alphanumeric')
    end
  end

  def username_last_char_valid?
    return unless errors.empty?
    if username[-1] =~ /[^A-Za-z0-9_\u4E00-\u9FCC\u3400-\u4DB5\u20000-\u2A6D6\u2A700-\u2B734\u2B740-\u2B81D\u3005\u3040-\u30FF]/
      self.errors << I18n.t(:'user.username.must_end_with_alphanumeric')
    end
  end
end