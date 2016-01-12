# discourse-username-localization
Localized username support.

## install
in app.yml

```yaml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/zh99998/discourse-username-localization.git
          - bash discourse-username-localization/install.sh
```          
