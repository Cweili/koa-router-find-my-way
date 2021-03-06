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

  router
    .get('/store/one', async (ctx, next) => {
      const { s } = ctx.store;
      ctx.body = {
        s,
      };
      await next();
    }, { s: 'test-one' })
    .get('/store/two', async (ctx, next) => next(), async (ctx, next) => {
      const { s } = ctx.store;
      ctx.body = {
        s,
      };
      await next();
    }, { s: 'test-two' });

  app.use(router.routes());
  app.listen(34567);

  // eslint-disable-next-line jest/valid-expect
  expect(got('http://localhost:34567/404')).rejects.toThrow();

  expect(await got.delete('http://localhost:34567/delete/abc').json()).toEqual({
    p: 'abc',
  });

  expect(await got('http://localhost:34567/all/def').json()).toEqual({
    p: 'def',
  });

  expect(await got('http://localhost:34567/store/one').json()).toEqual({
    s: 'test-one',
  });

  expect(await got('http://localhost:34567/store/two').json()).toEqual({
    s: 'test-two',
  });
});
