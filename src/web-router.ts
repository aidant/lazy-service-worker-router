export type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'
export type Properties = Record<string, string>
export type Handler = (request: Request, properties: Properties) => Promise<Response>
export type Handlers = Record<`${Method} /${string}`, Handler>

export const router = <H extends Handlers>(
  origin: string,
  handlers: H,
  request: Request
): Promise<Response> | null => {
  for (const key in handlers) {
    const [method, pattern] = key.split(' ')

    if (request.method !== method) continue
    // @ts-expect-error URLPattern does not yet have types.
    const matched = new URLPattern('.' + pattern, origin).exec(request.url)
    if (!matched) continue

    const handler = handlers[key] as unknown as Handler
    const parameters = Object.freeze(
      Object.assign(
        Object.create(null),
        matched.protocol.groups,
        matched.username.groups,
        matched.password.groups,
        matched.hostname.groups,
        matched.port.groups,
        matched.pathname.groups,
        matched.search.groups,
        matched.hash.groups
      )
    )
    return handler(request, parameters)
  }

  return null
}

export const response = (
  body: object,
  status: number = 200,
  headers: Record<string, string> = {}
): Response => {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export const registerRouter = (origin: string, handlers: Handlers): (() => void) => {
  /*
    TypeScript for whatever reason does not seem to have a dedicated service 
    worker lib, so in order to have the correct typings (which is already in
    the typescript libs), we need to do this weird ass workaround.
  */
  const addEventListener: ServiceWorkerGlobalScope['addEventListener'] = self.addEventListener
  const removeEventListener: ServiceWorkerGlobalScope['removeEventListener'] =
    self.removeEventListener

  const listener = (event: FetchEvent) => {
    const response = router(origin, handlers, event.request)
    if (response) event.respondWith(response)
  }

  addEventListener('fetch', listener)
  return () => removeEventListener('fetch', listener)
}
