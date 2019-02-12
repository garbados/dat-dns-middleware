/* global after before describe it */
'use strict'

const assert = require('assert')
const connect = require('connect')
const http = require('http')
const datDnsMiddleware = require('.')

// wrapper around http.get
// that resembles the `request` lib
function httpGet (options) {
  return new Promise(function (resolve, reject) {
    const req = http.get(options, function (res) {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', function (chunk) { body += chunk })
      res.on('end', function () {
        resolve([req, res, body])
      })
    })
    req.on('error', reject)
  })
}

describe('dat-dns-middleware', function () {
  before(function () {
    this.app = connect()
    this.middleware = datDnsMiddleware('test-fixtures')
    this.app.use(this.middleware)
    this.server = this.app.listen(3000)
  })

  after(function (done) {
    this.server.close(() => {
      if (this.middleware.dat) {
        this.middleware.dat.close(done)
      } else {
        done()
      }
    })
  })

  // TODO test that forces a dat error

  it('should catch http /.well-known/dat', function () {
    const url = 'http://127.0.0.1:3000/.well-known/dat'
    const bodyRegex = /(\w{64})\nTTL=(\d+)/
    function testHandler () {
      return httpGet(url).then(function ([req, res, body]) {
        const [ key, ttl ] = body.match(bodyRegex).slice(1, 3)
        assert(key) // just wanna make sure it exists? i guess??
        assert.strictEqual(ttl, '3600')
      })
    }
    return [testHandler, testHandler].reduce(function (a, b) {
      return a.then(b)
    }, Promise.resolve())
  })

  it('should not catch other requests', function () {
    const url = 'http://127.0.0.1:3000'
    const expected = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /</pre>\n</body>\n</html>\n'
    return httpGet(url).then(function ([req, res, body]) {
      assert.strictEqual(body, expected)
    })
  })
})
