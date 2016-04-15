const utils = require('loopback-datasource-juggler/lib/utils')

module.exports = function(Url) {

  Url.redirect = function redirect(req, res, cb) {
    cb = cb || utils.createPromiseCallback()

    const keyword = req.params.keyword

    const conditions = {
      where: {
        id: keyword
      }
    }

    Url.findOne(conditions)
      .then((item) => {
        if (item) {
          item
            .logHit(req)
            .then(hit => {
              console.log('Registed hit', hit)
              cb(null, item)
            })
        } else {
          const err = new Error(`Keyword not found: ${keyword}`)

          cb(err)
        }
      })
      .catch(cb)

    return cb.promise
  }

  Url.prototype.logHit = function logHit(req, cb) {
    cb = cb || utils.createPromiseCallback()

    const hit = {
      urlId: this.id,
      userAgent: req.headers['User-Agent'],
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }

    this.updateAttribute('hits', this.hits + 1)
      .then(() => Url.app.models.Log.create(hit))
      .then((hit) => cb(null, hit))
      .catch(cb)

    return cb.promise
  }
}
