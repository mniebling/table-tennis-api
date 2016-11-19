const expect = require('chai').expect
const map = require('../get.map')


describe('singles/get.map.result', () => {


  describe('match not found', () => {

    var dbResult = null

    it('should return 404', () => {

      var code = map.result(dbResult).code

      expect(code).to.equal(404)
    })

    it('should return an error message', () => {

      var body = map.result(dbResult).body

      expect(body).to.be.an('object')
      expect(body).to.have.property('message', 'No match matches that id.')
    })
  })


  describe('match found', () => {

    var dbResult = { id: '1' }

    it('should return 200', () => {

      var code = map.result(dbResult).code

      expect(code).to.equal(200)
    })

    it('should return the match object', () => {

      var body = map.result(dbResult).body

      expect(body).to.equal(dbResult)
    })
  })
})
