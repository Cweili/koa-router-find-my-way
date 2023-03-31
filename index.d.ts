import * as Koa from "koa"
import * as FindMyWay from "find-my-way"

/**
 * Router middleware for koa. Based on find-my-way, a crazy fast http radix based router.
 *
 * @param options All options are passed directly to `find-my-way`.
 */
declare function Router(options?: FindMyWay.Config<FindMyWay.HTTPVersion>): Router.Instance

declare namespace Router {
  interface Context extends Koa.Context {
    /**
     * url params
     */
    params: { [key: string]: string | undefined }
  }

  interface ShortHandRoute {
    /**
     * Register a new route.
     *
     * @param path Route path
     * @param middlewares Koa.js middleware
     */
    (path: string, ...middlewares: Koa.Middleware[]): Instance
  }

  interface Instance {
    /**
     * Register a new route.
     *
     * @param method HTTP method
     * @param path Route path
     * @param middlewares Koa.js middleware
     */
    on(
      method: FindMyWay.HTTPMethod | FindMyWay.HTTPMethod[],
      path: string,
      ...middlewares: (Koa.Middleware | object)[]
    ): this

    /**
     * Deregister a route.
     *
     * @param method HTTP method
     * @param path Route path
     */
    off(method: FindMyWay.HTTPMethod | FindMyWay.HTTPMethod[], path: string): void

    /**
     * Return (if present) the route registered in `method:path`.
     *
     * @param method HTTP method
     * @param path The path must be sanitized, all the parameters and wildcards are decoded automatically.
     * @param version
     */
    find(
      method: FindMyWay.HTTPMethod,
      path: string,
      version?: string
    ): FindMyWay.FindResult<FindMyWay.HTTPVersion> | null

    /**
     * Returns router middleware which dispatches a route matching the request.
     */
    routes(): Koa.Middleware

    /**
     * Empty router.
     */
    reset(): void

    /**
     * Prints the representation of the internal radix tree, useful for debugging.
     */
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