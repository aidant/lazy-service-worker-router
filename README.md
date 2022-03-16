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
  async 'GET /users/:userId'(request, context) {
    const { userId } = context.parameters

    if (userId === 'dfce5716-c722-4502-beb6-cfc52a6ef9f5') {
      return response({ id: userId, username: 'Example' })
    }

    return response({}, 404)
  },
})
```

## API

### `registerRouter`

The [`registerRouter`] function allows you to very easily create a small API in a service worker.

#### Parameters

- `origin` - **string** - .
- `handlers` - **object** - .

#### Example

```ts
import { registerRouter, response } from '@lazy/web-router'

registerRouter('https://api.example.com/api/v1/', {
  async 'GET /'() {
    return response({})
  },
})
```

Returns `void`

### `response`

The [`response`] function

#### Parameters

- `body` - **object** - .
- `status` - **number** - .
- `headers` - **object** - .

#### Example

```ts
import { response } from '@lazy/web-router'

const r404 = response({}, 404)
```

Returns `Response`

### `router`

The [`router`] function .

#### Parameters

- `origin` - **string** - .
- `handlers` - **object** - .
- `request` - **Request** - .

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
