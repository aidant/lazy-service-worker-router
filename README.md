# Lazy Web Router

<p align='center'>
  A simple web router for the lazy developer.
  <br>
  <a href='https://www.npmjs.com/package/@lazy/web-router'>
    <img src="https://img.shields.io/npm/v/@lazy/web-router?style=flat-square">
  </a>
  <a href='https://bundlephobia.com/package/@lazy/web-router'>
    <img src="https://img.shields.io/bundlephobia/minzip/@lazy/web-router?label=minified%20%26%20gzipped&style=flat-square">
  </a>
  <a href='https://github.com/aidant/implicit-grant/actions/workflows/publish.yml'>
    <img src="https://img.shields.io/github/workflow/status/aidant/implicit-grant/Publish?style=flat-square">
  </a>
</p>

---

## Table of Contents

- [Example](#example)
- [API](#api)
  - [`registerRouter`]
  - [`response`]
  - [`router`]

## Example

```ts
import { registerRouter, response } from '@lazy/web-router'

registerRouter('https://api.example.com/api/v1/', {
  async 'GET /users'() {
    return response({ users: ['dfce5716-c722-4502-beb6-cfc52a6ef9f5'] })
  },
  async 'GET /users/:userId'(request, { userId }) {
    if (userId === 'dfce5716-c722-4502-beb6-cfc52a6ef9f5') {
      return response({ id: userId, username: 'Example' })
    }

    return response({}, 404)
  },
})
```

## API

### `registerRouter`

Register the router to handle requests in a Service Worker.

#### Parameters

- `origin` - **string** - The origin of the requests to intercept.
- `handlers` - **object** - An object of function to handle each request.

#### Example

```ts
import { registerRouter, response } from '@lazy/web-router'

const deregister = registerRouter('https://api.example.com/api/v1/', {
  async 'GET /'() {
    return response({})
  },
})

deregister()
```

Returns `() => void`

### `response`

Create a `Response` object with some sensible defaults.

#### Parameters

- `body` - **object** - An object to respond with.
- `status` - **number** - The status code for the response.
- `headers` - **object** - The headers for the response.

#### Example

```ts
import { response } from '@lazy/web-router'

const r404 = response({}, 404)
```

Returns `Response`

### `router`

Route an indivudual request to the respecitve handler.

#### Parameters

- `origin` - **string** - The origin of the requests to intercept.
- `handlers` - **object** - An object of function to handle each request.
- `request` - **Request** - The request to route.

#### Example

```ts
import { router, response } from '@lazy/web-router'

const res = router(
  'https://api.example.com/api/v1/',
  {
    async 'GET /'() {
      return response({})
    },
  },
  new Request('https://api.example.com/api/v1/')
)
```

Returns `Promise<Response>`

[`registerrouter`]: #registerrouter
[`response`]: #response
[`router`]: #router
