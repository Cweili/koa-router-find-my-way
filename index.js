const { METHODS } = require('http');
const findMyWay = require('find-my-way');
const compose = require('koa-compose');

module.exports = function router(options) {
  const fmw = findMyWay(options);
  const r = {};

  function on(method, path, ...middlewares) {
    // optional store argument
    let store;
    if (middlewares.length > 1 && typeof middlewares[middlewares.length - 1] === 'object') {
      store = middlewares.pop();
    }
    fmw.on(method, path, compose(middlewares), store);
    return r;
  }

  r.on = on;
  r.all = (path, ...middlewares) => on(METHODS, path, ...middlewares);

  METHODS.forEach((m) => {
    r[m.toLowerCase()] = (path, ...middlewares) => on(m, path, ...middlewares);
  });

  [
    'off',
    'reset',
    'prettyPrint',
    'find',
  ].forEach((m) => {
    r[m] = fmw[m].bind(fmw);
  });

  r.routes = () => (ctx, next) => {
    const handle = fmw.find(ctx.method, ctx.path);
    if (!handle) {
      return fmw.defaultRoute && fmw.defaultRoute(ctx, next);
    }
    ctx.params = handle.params;
    ctx.store = handle.store;
    return handle.handler(ctx, next);
  };

  return r;
};
