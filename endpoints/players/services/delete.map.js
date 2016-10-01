var mapper = {}

mapper.result = function (dbResult) {

  if (dbResult.deleted === 0) {
    return (
      { code: 404 // Not found
      , body: { message: 'No player matches that id.' }
      })
  }

  return (
    { code: 200 // OK
    , body: { message: 'Player deleted.' }
    })
}

module.exports = mapper
