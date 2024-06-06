module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Actions
     */
    
    /**
     * @swagger
     * /odata/v4/service/getSalesOrderAmountBySoldToParty():
     *   get:
     *     tags: [Actions]
     *     description: Sales order report!
     *     responses:
     *       200:
     *         description: All SoldToParty with your all sales.
     */
    app.get(`${process.env.serviceBasePath}/getSalesOrderAmountBySoldToParty()`)

  return app
}