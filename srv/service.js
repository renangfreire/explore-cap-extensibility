const cds = require("@sap/cds")

module.exports = async (srv) => {
    const salesOrder = await cds.connect.to("API_SALES_ORDER_SRV")

    srv.on("READ", "A_SalesOrder", async (req, next) => {
       return await salesOrder.transaction(req).send({
        query: req.query,
        headers: {
            apikey: process.env.apikey
        }
       })
    })

    srv.on("getSalesOrderAmountBySoldToParty", async (req, next) => {
        const data = await salesOrder.transaction(req).send({
            query: SELECT.from(salesOrder.entities.A_SalesOrder).limit(1000),
            headers: {
                apikey: process.env.apikey
            }
        })

        const salesReport = data.reduce((acc, currData) => {
            if(acc[currData.SoldToParty]){
                const soldToParty = Number(acc[currData.SoldToParty]) 
                acc[currData.SoldToParty] = Number(soldToParty + currData.TotalNetAmount).toFixed(2);

                return acc
            }

            acc[currData.SoldToParty] = currData.TotalNetAmount.toFixed(2);

            return acc;
        }, {})

        return salesReport
    })
}