var mapper = {}

mapper.result = function (dbResult) {

  if (!dbResult) {
    return (
      { code: 404 // Not found
      , body: { message: 'No match matches that id.' }
      })
  }

  return (
    { code: 200 // OK
    , body: dbResult
    })
}

module.exports = mapper
