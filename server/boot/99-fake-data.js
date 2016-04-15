'use strict'

var Promise = require('bluebird')

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return
  }

  var promises = []

  var urls = [ {
    id: 'google',
    url: 'https://google.com/'
  }, {
    id: 'github',
    url: 'https://github.com/'
  }, {
    id: 'fullcube',
    url: 'http://fullcu.be/'
  } ]

  if (app.dataSources.db.connected) {
    createFakeData()
  } else {
    app.dataSources.db.once('connected', createFakeData)
  }

  function createFakeData () {
    urls.forEach(url => {
      promises.push(app.models.Url.upsert(url))
    })
  }

  console.log('Creating fake data!')

  Promise.all(promises).then(function() {
    console.log('Creating fake data done!')
  }).catch()

}
