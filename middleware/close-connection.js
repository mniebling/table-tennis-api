// This middleware attaches an event handler to the request which closes the
// database connection when the request is finished.
function closeConnection (request, response, next) {

  request.on('end', () => {
    request._dbConnection.close()
  })

  next()
}

module.exports = closeConnection
