delete login inforamation on login page

```js
fetch('/create/playlist', {
  method: 'POST',
  body: '{"name":"test1"}',
  headers: new Headers({ 'Content-Type': 'application/json' }),
}).then(res => console.log(res));

fetch('/login', {
  method: 'POST',
  body: `{
	"username":"test@test.com",
	"password":"1234"
}`,
  headers: new Headers({ 'Content-Type': 'application/json' }),
})
  .then(res => res.json())
  .then(res => console.log(res));

fetch('/logout')
  .then(res => res.json())
  .then(res => console.log(res));

fetch('/login')
  .then(res => res.text())
  .then(res => console.log(res));

fetch('/main')
  .then(res => res.text())
  .then(res => console.log(res));
```

```html
 <img ng-src="{{ $ctrl.user.image ? $ctrl.user.image : 'images/user-admin-ava.png' }}"
                alt="avatar" style="width:50px" />
```

/user/:userid
добави:
image
subscribe_count
ако user кой пита за данни е логнат, има ли subscribe

трябва api за subscribe и unsubscribe

трябва api за notification from subscribe

трябва api за recently watched

трябва get за subscribe

/user/:userId;
трябва поле
image
isSubscribed

channel controller
change state without reload
