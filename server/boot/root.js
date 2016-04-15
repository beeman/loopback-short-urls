module.exports = function bootRootFn (server) {
  var router = server.loopback.Router()
  router.get('/status', server.loopback.status())

  server.get('/not-found/', function notFoundFn (req, res) {
    res.send('URL not found')
  })

  server.get('/not-found/:keyword', function keywordNotFoundFn (req, res) {
    res.send('URL not found: ' + req.params.keyword)
  })

  server.get('/:keyword', function keywordFn (req, res) {
    server.models.Url.redirect(req, res)
      .then((result) => {
        res.redirect(result.url)
      })
      .catch(() => {
        res.redirect(`/not-found/${req.params.keyword}`)
      })
  })

  server.get('/', function rootFn (req, res) {
    res.redirect('/not-found')
  })

  server.use(router)
}
