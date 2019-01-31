# koa-router-find-my-way

[![npm][npm-version]][npm]
[![npm][npm-size]][npm]
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
app.use(router.router);
app.listen(34567);
```

## API

### koaRouter([options])

all `options` are passed to [find-my-way][find-my-way].

[npm]: https://www.npmjs.com/package/koa-router-find-my-way
[npm-version]: https://img.shields.io/npm/v/koa-router-find-my-way.svg
[npm-size]: https://img.shields.io/bundlephobia/minzip/koa-router-find-my-way.svg
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
