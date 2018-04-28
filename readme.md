# TODO

* список на функционалност
* список на save-dev инструменти
* архитектура
* список на библиотеки

# Функционалност

* user
  -has name
  -has username
  -has password
  -isAdmin
  -activated/deactivated status
  -can upload video
  -can creat multiple playlist
  -can edit and delete own video , comment, playlist
  -can comment video
* admin
  - can activate/deactivate profiles
  - can block users
  - can block user-ip
  - can manupulate videos/users/comments
  
* video
  -has name
  -has date
  -has owner
  -has status - public/private
  -has reference to address where video is stored
  -has watched counter
  -has comments
  -is stored to local folder

# База данни

таблици:

* users
* videos
* user_videos
* comments - comments to videos
* likes - likes to videos
* playlists
* last_seen - history of videos

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
