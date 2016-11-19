var mapper = {}

mapper.result = function (dbResult) {

  if (dbResult.deleted === 0) {
    return (
      { code: 404 // Not found
      , body: { message: 'No match matches that id.' }
      })
  }

  return (
    { code: 200 // OK
    , body: { message: 'Match deleted.' }
    })
}

module.exports = mapper
