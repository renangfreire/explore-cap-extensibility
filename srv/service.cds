using { API_SALES_ORDER_SRV as apiSales} from './external/API_SALES_ORDER_SRV';

@(impl: './services/service.js')
service Sap @(path: 'service'){
    @readonly
    entity A_SalesOrder as projection on apiSales.A_SalesOrder;

    function getSalesOrderAmountBySoldToParty() returns String;

}