# discourse-username-localization

Localized username support.

## Install

### Docker

Add following code into `app.yml`:

```yaml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/zh99998/discourse-username-localization.git
```          

### Vagrant

```
vagrant ssh

cd /vagrant

bundle exec rake plugin:install repo=http://github.com/openSUSE-zh/discourse-username-localization

bundle exec rake assets:clean

bundle exec rails s -b 0.0.0.0
```

## Update

### Vagrant

```
vagrant ssh

cd /vagrant

bundle exec rake plugin:update plugin=discourse-username-localization

bundle exec rake assets:clean

bundle exec rails s -b 0.0.0.0
```
