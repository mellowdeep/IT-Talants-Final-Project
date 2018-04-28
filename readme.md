# TODO

* список на функционалност
* список на save-dev инструменти
* архитектура
* список на библиотеки

# Функционалност

* site
  1.  adaptive website
  2.  added news automatically publish on facebook
  3.  have facebook bot in messanger.com for users who use facebook account. Bot send statistic inforamtion about user videos and comments
* user
  1.  (must) has name
  1.  has username
  1.  has password
  1.  has status admin / not admin
  1.  activated/deactivated status
  1.  can upload video
  1.  can create multiple playlist
  1.  can edit and delete own video , comment, playlist
  1.  can comment video
  1.  (may be) can stream video from web camera
  1.  can login using accounts from other servicies (google, github, facebook)
  1.  can write letter to support
  1.  can search video by name
  1.  can see all video of another user
  1.  can subscribe to the channel of another user. After has notifications from that user
* admin
  1.  can activate/deactivate profiles
  1.  can block users
  1.  can block user-ip
  1.  can manupulate videos/users/comments
  1.  can puplish news on site
  1.  can read letters to support and answer to user
* video
  1.  has name
  1.  has date
  1.  has owner
  1.  has status - public/private
  1.  has reference to address where video is stored
  1.  has watched counter
  1.  has comments
  1.  is stored to local folder
  1.  has tags for best searching

# База данни

**таблици:**

* **users**
  * fields:
  1.  name
  2.  email
  3.  login
* **videos**
  * fields:
  1.
* **user_videos**
  * fields:
  1.
* **comments** - comments to videos
  * fields:
  1.
* **likes** - likes to videos
  * fields:
  1.
* **playlists**
  * fields:
  1.
* **last_seen** - history of videos
  * fields:
  1.

# Библиотеки

# save-dev инструменти

## before commit

**eslint**

* airbnb config
* prettier config

## Параметри на редактор

```
"editor.tabSize": 2
```

## prettier

параметри:

```json
"prettier": {
    "trailingComma": "all",
    "singleQuote": true
  }
```
