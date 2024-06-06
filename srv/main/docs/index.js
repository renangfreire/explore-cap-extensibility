module.exports = async (app) => {
    let swaggerJSDoc = require('swagger-jsdoc')

    var options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'SAP Explore CAP',
                version: '1.0.0',
                "x-odata-version": '4.0'
            },
            tags: [{
                name: "Team Task"
            }],
        },
        apis: [`${__dirname}/routes/*`]
    }

    var swaggerSpec = swaggerJSDoc(options)
    const odataOptions = {}

    const {
        parse,
        convert
    } = require('odata2openapi');
    const cds = require("@sap/cds")
    const csn = await cds.compile("file:srv/service.cds")
    let metadata = cds.compile.to.edmx(csn, {
        version: 'v4',
        service: "Sap"
    })

    let service = await parse(metadata)

    let swagger = convert(service.entitySets, odataOptions, service.version)
    const swaggerEntries = Object.entries(swagger.paths)

    swaggerEntries.forEach(function ([servicePath, methods]) {
        const methodsRemovedSummary = removeSwaggerSummary(methods)

        swaggerSpec.paths[`${process.env.serviceBasePath}${servicePath}`] = methodsRemovedSummary
    })

    swaggerSpec.definitions = swagger.definitions
    return swaggerSpec
}

function removeSwaggerSummary (swaggerMethods){
    const methodsEntries = Object.entries(swaggerMethods)
    
    const removedSummaryEntries = methodsEntries.map(([method, props]) => {
        const {summary, ...rest} = props

        return [method, rest]
    })

    return Object.fromEntries(removedSummaryEntries)
}