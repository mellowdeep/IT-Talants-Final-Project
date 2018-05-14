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
```
