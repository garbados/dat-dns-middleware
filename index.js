'use strict'

const Dat = require('dat-node')

/**
 * [exports description]
 * @param  {[type]} dir [description]
 * @param  {Number} ttl [description]
 * @return {[type]}     [description]
 */
module.exports = function (dir, ttl = 3600) {
  // retrieve the files as an archive
  // and cache it for retrieval
  var dat
  function getDat () {
    if (dat) return Promise.resolve(dat)
    return new Promise((resolve, reject) => {
      Dat(dir, (err, _dat) => {
        if (err) return reject(err)
        dat = _dat
        dat.joinNetwork()
        return resolve(dat)
      })
    })
  }
  function middleware (req, res, next) {
    if (req.url.match('/.well-known/dat')) {
      getDat().then(function (dat) {
        // bind to the middleware so the user can close the archive
        middleware.dat = dat
        const key = dat.key.toString('hex')
        res.end(`${key}\nTTL=${ttl}`)
      }).catch(function (err) {
        res.end(err)
      })
    } else {
      next()
    }
  }
  return middleware
}
