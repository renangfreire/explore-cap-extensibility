const swaggerUi = require("swagger-ui-express");
const docs = require("../docs");

module.exports = async (app) => {
	const swaggerSpec = await docs(app)
    
    let options = {
        explorer: true
    }

    app.get('/documentation.json', function (req, res) {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})

	app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options))
}