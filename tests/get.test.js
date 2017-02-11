import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'

function returnRequestHeaders() {
  return this.req.headers
}

test('has default content-type header and has no Authorization header', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const fetch = farfetch.api(URL_TEST)
  const request = await fetch.get(API_TEST)

  expect(request['content-type'][0]).toBe('application/json; charset=UTF-8')
  expect(request.authorization).toBeFalsy()
})

test('has custom content-type header', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const fetch = farfetch.api(URL_TEST)
  const request = await fetch.get(API_TEST, {
    headers: {
      'Content-type': 'text/html',
    },
  })
  expect(request['content-type'][0]).toBe('text/html')
})

test('has overrided Authorization headers (ignores `key`)', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const fetch = farfetch.api(URL_TEST)
  const request = await fetch.get(API_TEST, {
    key: 'ABCDEFG',
    headers: {
      Authorization: 'Token ABCDEFGH',
    },
  })

  expect(request.authorization[0]).toBe('Token ABCDEFGH')
})

test('has Authorization header generated by `key` option', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const fetch = farfetch.api(URL_TEST)
  const request = await fetch.get(API_TEST, { key: 'banana' })

  expect(request.authorization[0]).toBe('Token banana')
})
