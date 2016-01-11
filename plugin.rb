# name: username-localization
# about:  Localized username support, now only tested Chinese.
# version: 0.1
# authors: freemangl, zh99998 <zh99998@gmail.com>

gem "chinese_pinyin", "1.0.0"

after_initialize do
  class UsernameValidator
  def username_char_valid?
    return unless errors.empty?
    if username =~ /[^A-Za-z0-9_\.\-\u4e00-\u9fa5]/
      self.errors << I18n.t(:'user.username.characters')
    end
  end

  def username_first_char_valid?
    return unless errors.empty?
    if username[0] =~ /[^A-Za-z0-9_\u4e00-\u9fa5]/
      self.errors << I18n.t(:'user.username.must_begin_with_alphanumeric')
    end
  end

  def username_last_char_valid?
    return unless errors.empty?
    if username[-1] =~ /[^A-Za-z0-9_\u4e00-\u9fa5]/
      self.errors << I18n.t(:'user.username.must_end_with_alphanumeric')
    end
  end
  end
end
