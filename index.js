const findMyWay = require('find-my-way');

module.exports = function router(options) {
  const fmw = findMyWay(options);

  fmw.router = function middleware(ctx, next) {
    const handle = fmw.find(ctx.method, ctx.path);
    if (!handle) {
      return fmw.defaultRoute && fmw.defaultRoute(ctx, next);
    }
    ctx.params = handle.params;
    ctx.store = handle.store;
    return handle.handler(ctx, next);
  };

  return fmw;
};
