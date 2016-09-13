// Chai setup
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

// Root URL
// Todo: I think it would be nicer to require the app instead of running
// against the magic string of the localhost & port combo?
const serverUrl = 'http://localhost:8888/v1'


describe('GET /players', () => {

	it('should return a status code 200', () => {

		return chai
			.request(serverUrl)
			.get('/players')
			.then(response => {
				expect(response).to.have.status(200)
			})
	})
})
