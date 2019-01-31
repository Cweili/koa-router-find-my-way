const got = require('got');
const Koa = require('koa');
const koaRouter = require('..');

it('basic router with koa', async () => {
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

  expect(got('http://localhost:34567/test')).rejects.toThrow();

  expect((await got('http://localhost:34567/test/abc', { json: true })).body).toEqual({
    p: 'abc',
  });
});
