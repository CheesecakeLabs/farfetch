import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'
const CONTENT_TYPE = { 'content-type': 'text/plain' }

const fetch = farfetch.api(URL_TEST)

test('delete', async () => {
  nock(URL_TEST).delete(API_TEST).reply(204, null, CONTENT_TYPE)

  const request = await fetch.delete(API_TEST)
  expect(request).toEqual('')
})
