const setupCors = require("./setupCors")
const setupSwagger = require("./setupSwagger")

module.exports = async (app) => {
	setupSwagger(app)
    setupCors(app)
}