const got = require('got');
const Koa = require('koa');
const koaRouter = require('..');

it('router with koa', async () => {
  const app = new Koa();
  const router = koaRouter({
    async defaultRoute(ctx) {
      ctx.status = 404;
    },
  });
  router
    .delete('/delete/:p', async (ctx, next) => {
      const { p } = ctx.params;
      ctx.body = {
        p,
      };
      await next();
    })
    .all('/all/:p', async (ctx, next) => next(), async (ctx, next) => {
      const { p } = ctx.params;
      ctx.body = {
        p,
      };
      await next();
    });
  app.use(router.routes());
  app.listen(34567);

  expect(got('http://localhost:34567/404')).rejects.toThrow();

  expect((await got.delete('http://localhost:34567/delete/abc', { json: true })).body).toEqual({
    p: 'abc',
  });

  expect((await got('http://localhost:34567/all/def', { json: true })).body).toEqual({
    p: 'def',
  });
});
