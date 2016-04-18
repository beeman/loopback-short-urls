'use strict'

var Promise = require('bluebird')
var crypto = require('crypto')

module.exports = function adminUsersFn (app) {
  const User = app.models.User
  const AccessToken = app.models.AccessToken

  var promises = []

  const adminUser = {
    id: 1,
    username: 'admin@example.com',
    email: 'admin@example.com',
    password: crypto.randomBytes(64).toString('hex')
  }

  const accessToken = {
    id: process.env.ACCESS_TOKEN,
    userId: adminUser.id
  }

  promises.push(User.create(adminUser))
  promises.push(AccessToken.create(accessToken))

  Promise
    .all(promises)
    .then((res) => {
      console.log('Created user and access token', res)
    })
    .catch(err => {
      console.error(err)
    })
}
