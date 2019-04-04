import * as Koa from "koa"
import * as FindMyWay from "find-my-way"

declare function Router(options: Router.Options): Router.Instance

declare namespace Router {
  type HTTPMethod = FindMyWay.HTTPMethod

  interface Middleware extends Koa.Middleware { }

  interface Options extends FindMyWay.Config<FindMyWay.HTTPVersion> { }

  interface Context extends Koa.Context {
    /**
     * url params
     */
    params: { [key: string]: string | undefined }
  }

  interface FindResult extends FindMyWay.FindResult<FindMyWay.HTTPVersion> { }

  interface ShortHandRoute {
    (path: string, ...middlewares: Array<Middleware>): Instance
  }

  interface Instance {
    on(
      method: HTTPMethod | HTTPMethod[],
      path: string,
      ...middlewares: Array<Middleware>
    ): this

    off(method: HTTPMethod | HTTPMethod[], path: string): void

    find(
      method: HTTPMethod,
      path: string,
      version?: string
    ): FindResult | null

    routes(): void
    reset(): void
    prettyPrint(): string

    all: ShortHandRoute

    acl: ShortHandRoute
    bind: ShortHandRoute
    checkout: ShortHandRoute
    connect: ShortHandRoute
    copy: ShortHandRoute
    delete: ShortHandRoute
    get: ShortHandRoute
    head: ShortHandRoute
    link: ShortHandRoute
    lock: ShortHandRoute
    'm-search': ShortHandRoute
    merge: ShortHandRoute
    mkactivity: ShortHandRoute
    mkcalendar: ShortHandRoute
    mkcol: ShortHandRoute
    move: ShortHandRoute
    notify: ShortHandRoute
    options: ShortHandRoute
    patch: ShortHandRoute
    post: ShortHandRoute
    propfind: ShortHandRoute
    proppatch: ShortHandRoute
    purge: ShortHandRoute
    put: ShortHandRoute
    rebind: ShortHandRoute
    report: ShortHandRoute
    search: ShortHandRoute
    source: ShortHandRoute
    subscribe: ShortHandRoute
    trace: ShortHandRoute
    unbind: ShortHandRoute
    unlink: ShortHandRoute
    unlock: ShortHandRoute
    unsubscribe: ShortHandRoute
  }
}

export = Router