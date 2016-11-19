var mapper = {}

mapper.result = function (dbResult) {

  return (
    { code: 200 // OK
    , body: dbResult
    }
  )
}

module.exports = mapper
