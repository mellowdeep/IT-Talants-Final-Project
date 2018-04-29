# TODO

* Waiting for Ivan accept
* архитектура
* список на save-dev инструменти
* список на библиотеки

# Функционалност

* site
  1.  (**must**) adaptive/reponsive website
  2.  (**must**) can see last seen videos without login (store in local storage)
  3.  (**may be**) publish popular videos on facebook (API facebook)
  4.  (**may be**) have facebook bot in messanger.com for users who use facebook account. Bot send statistic information about user videos and comments (API Facebook)
* user
  1.  (**must**) has name
  1.  (**must**) has username/email
  1.  (**may be**) can login using accounts from other servicies (google, github, facebook)
  1.  (**must**) has password
  1.  (**must**) has status admin / not admin
  1.  (**must**) activated/deactivated status
  1.  (**must**) can upload video (puplic / privat)
  1.  (**must**) can create multiple playlist (puplic / privat)
  1.  (**must**) can edit and delete own video
  1.  (**must**) can edit and delete own comment
  1.  (**must**) can edit and delete own playlist
  1.  (**must**) can comment video
  1.  (**may be**) can stream video from web camera
  1.  (**must**) can send ticket to support
  1.  (**must**) can search video by name / playlist-name
  1.  (**must**) can see all video of another user
  1.  (**must**) can subscribe to the channel of another user. After has notifications from that user
  1.  (**must**) has playlist(cannot change) for last seen videos (infinity scroll with AJAX request +10)
* admin
  1.  (**Ivan question**) admin has own interface for site oк same interface with extra
  1.  (**must**) can activate/deactivate profiles
  1.  (**must**) can block users
  1.  (**Ivan question**) can block user-ip
  1.  (**must**) can manupulate videos/users/comments
  1.  (**must**) can read tickets from users. Can close ticket. User have notification. Оr can send messange to user email.
* video
  1.  (**must**) has name
  1.  (**must**) has date
  1.  (**must**) has owner
  1.  (**must**) has status - public/private
  1.  (**must**) has reference to address where video is stored (local system folder)
  1.  (**must**) has watched counter.
  1.  (**must**) has comments

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
