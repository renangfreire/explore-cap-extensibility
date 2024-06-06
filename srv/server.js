"use strict";

const cds = require("@sap/cds");
const setupAll = require("./main/api/setupAll");

cds.on("bootstrap", app => {
    setupAll(app)
});

module.exports = cds.server;