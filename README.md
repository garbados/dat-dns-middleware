# dat-dns-middleware

[![Stability](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![npm version](https://img.shields.io/npm/v/dat-dns-middleware.svg?style=flat-square)](https://www.npmjs.com/package/dat-dns-middleware)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![Build Status](https://img.shields.io/travis/garbados/dat-dns-middleware/master.svg?style=flat-square)](https://travis-ci.org/garbados/dat-dns-middleware)
[![Coverage Status](https://img.shields.io/coveralls/github/garbados/dat-dns-middleware.svg?style=flat-square)](https://coveralls.io/github/garbados/dat-dns-middleware?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/garbados/dat-dns-middleware.svg)](https://greenkeeper.io/)

Middleware for Connect and Express to serve static files over the peer-to-peer [Dat](https://datproject.org/) network. Use it to serve your static files over Dat:

```javascript
const datDnsMiddleware = require('dat-dns-middleware')
const express = require('express')
const staticRoot = 'static'

const app = express()
app.use(express.static(staticRoot))
app.use(datDnsMiddleware(staticRoot))

...
```

The middleware catches requests to `/.well-known/dat` and responds in the [Dat-DNS](https://github.com/beakerbrowser/beaker/wiki/Authenticated-Dat-URLs-and-HTTPS-to-Dat-Discovery) format:

```
{datKey}
TTL={ttl}
```

This allows things like [Beaker Browser](https://github.com/beakerbrowser/beaker) and [dat-fox](https://github.com/sammacbeth/dat-fox) to retrieve your website's static assets from peers in the Dat network.

## Install

Use [npm](https://www.npmjs.com/package/dat-dns-middleware) to include dat-dns-middleware as a dependency:

```bash
npm i -S dat-dns-middleware
```

Now just `require` it in your application:

```javascript
const datDnsMiddleware = require('dat-dns-middleware')
const express = require('express')
const staticRoot = 'static'

const app = express()
app.use(express.static(staticRoot))
app.use(datDnsMiddleware(staticRoot))
```

## Usage

The library exports one function:

```
datDnsMiddleware(dir, ttl = 3600)
```

Example:

```javascript
const datDnsMiddleware = require('dat-dns-middleware')
const middleware = datDnsMiddleware('static')
```

Parameters:

- `dir`: Path to the directory to use as a Dat archive.
- `ttl`: Expiration time for the DNS listing in seconds. Defaults to one hour.

## Development

Download the source with [git]() and run the test suite with npm:

```
git clone https://github.com/garbados/dat-dns-middleware
cd dat-dns-middleware
npm install
npm test
```

Here's a one-liner for checking test coverage:

```bash
npx nyc npm test
```

## Contributing

To report bugs or request features, file an [issue](https://github.com/garbados/dat-dns-middleware/issues). If you want to merge code, file a [pull request](https://github.com/garbados/dat-dns-middleware/pulls). I reserve sole discretion for the moderation of this project.

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
