import * as Koa from "koa"
import * as FindMyWay from "find-my-way"

declare function Router(options: FindMyWay.Config<FindMyWay.HTTPVersion>): Router.Instance

declare namespace Router {
  interface Context extends Koa.Context {
    /**
     * url params
     */
    params: { [key: string]: string | undefined }
  }

  interface ShortHandRoute {
    (path: string, ...middlewares: Koa.Middleware[]): Instance
  }

  interface Instance {
    on(
      method: FindMyWay.HTTPMethod | FindMyWay.HTTPMethod[],
      path: string,
      ...middlewares: Koa.Middleware[]
    ): this

    off(method: FindMyWay.HTTPMethod | FindMyWay.HTTPMethod[], path: string): void

    find(
      method: FindMyWay.HTTPMethod,
      path: string,
      version?: string
    ): FindMyWay.FindResult<FindMyWay.HTTPVersion> | null

    routes(): Koa.Middleware
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