# koa-router-find-my-way

[![npm][npm-version]][npm]
[![npm][npm-downloads]][npm]
[![npm][npm-license]][npm]


[![github][github-issues]][github]
[![travis][travis-build]][travis]
[![codecov][codecov-svg]][codecov]


Router middleware for [koa][koa]. Based on [find-my-way][find-my-way], a crazy fast http radix based router.

## Installation

### NPM

```
npm install koa-router-find-my-way --save
```

> **Note:** koa-router-find-my-way@3 is based on [find-my-way@2][find-my-way]. To use find-my-way@1 with koa, please use koa-router-find-my-way@2.

## Basic Usage

```js
const koaRouter = require('koa-router-find-my-way');

const app = new Koa();
const router = koaRouter();

router.get('/test/:p', async (ctx, next) => {
  const { p } = ctx.params;
  ctx.body = {
    p,
  };
  await next();
});
app.use(router.routes());

app.listen(80);
```

## API

### koaRouter([options])

All `options` are passed directly to [find-my-way][find-my-way-api].

### router.on(method, path, ...middlewares)

Register a new route.

```js
router
  .on('GET', '/examples', async (ctx, next) => {
    // a koa middleware
    await next();
  }, async (ctx, next) => {
    // another koa middleware
    ctx.body = 'Hello World!';
  })
  .on('DELETE', '/examples', (ctx, next) => {
    // ...
  })
  .on(['POST', 'PUT'], '/examples', (ctx, next) => {
    // ...
  });
```

### router.get|put|post|delete|head|patch|options|all(path, ...middlewares)

If you want an even nicer api, you can also use the shorthand methods to declare your routes.

For each HTTP supported method, there's the shorthand method.

If you need a route that supports all methods you can use the `all` api.

```js
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .delete('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
```

### router.routes()

Returns router middleware which dispatches a route matching the request.

### router.off(method, path)

Deregister a route.

```js
router.off('GET', '/example');
```

### router.reset()

Empty router.

```js
router.reset();
```

### router.find(method, path)

Return (if present) the route registered in *method:path*.<br>

The path must be sanitized, all the parameters and wildcards are decoded automatically.<br/>

```js
router.find('GET', '/example')
// => { handler: Function, params: Object, store: Object}
// => null
```

### router.prettyPrint()

Prints the representation of the internal radix tree, useful for debugging.

```js
router
  .get('/test', () => {})
  .get('/test/hello', () => {})
  .get('/hello/world', () => {});

console.log(router.prettyPrint());
// └── /
//   ├── test (GET)
//   │   └── /hello (GET)
//   └── hello/world (GET)
```

[npm]: https://www.npmjs.com/package/koa-router-find-my-way
[npm-version]: https://img.shields.io/npm/v/koa-router-find-my-way.svg
[npm-downloads]: https://img.shields.io/npm/dt/koa-router-find-my-way.svg
[npm-license]: https://img.shields.io/npm/l/koa-router-find-my-way.svg

[github]: https://github.com/Cweili/koa-router-find-my-way
[github-issues]: https://img.shields.io/github/issues/Cweili/koa-router-find-my-way.svg

[travis]: https://travis-ci.org/Cweili/koa-router-find-my-way
[travis-build]: https://img.shields.io/travis/Cweili/koa-router-find-my-way.svg?branch=master

[codecov]: https://codecov.io/gh/Cweili/koa-router-find-my-way
[codecov-svg]: https://img.shields.io/codecov/c/github/Cweili/koa-router-find-my-way.svg

[koa]: https://github.com/koajs/koa
[find-my-way]: https://github.com/delvedor/find-my-way
[find-my-way-api]: https://github.com/delvedor/find-my-way#api
