# Lazy Service Worker Router

<p align='center'>
  A simple Service Worker router for the lazy developer.
  <br>
  <a href='https://www.npmjs.com/package/@lazy/service-worker-router'>
    <img src="https://img.shields.io/npm/v/@lazy/service-worker-router?style=flat-square">
  </a>
  <a href='https://bundlephobia.com/package/@lazy/service-worker-router'>
    <img src="https://img.shields.io/bundlephobia/minzip/@lazy/service-worker-router?label=minified%20%26%20gzipped&style=flat-square">
  </a>
  <a href='https://github.com/aidant/lazy-service-worker-router/actions/workflows/publish.yml'>
    <img src="https://img.shields.io/github/workflow/status/aidant/lazy-service-worker-router/Publish?style=flat-square">
  </a>
</p>

---

## Table of Contents

- [Example](#example)
- [API](#api)
  - [`addRouter`]
  - [`response`]
  - [`router`]

## Example

```ts
import { addRouter, response } from '@lazy/service-worker-router'

addRouter('https://api.example.com/api/v1/', {
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

### `addRouter`

Register the router to handle requests in a Service Worker.

#### Parameters

- `origin` - **string** - The origin of the requests to intercept.
- `handlers` - **object** - An object of function to handle each request.

#### Example

```ts
import { addRouter, response } from '@lazy/service-worker-router'

const removeRouter = addRouter('https://api.example.com/api/v1/', {
  async 'GET /'() {
    return response({})
  },
})

removeRouter()
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
import { response } from '@lazy/service-worker-router'

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
import { router, response } from '@lazy/service-worker-router'

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

[`addrouter`]: #addrouter
[`response`]: #response
[`router`]: #router
