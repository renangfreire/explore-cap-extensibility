using { API_SALES_ORDER_SRV as apiSales} from './external/API_SALES_ORDER_SRV';

service Sap {
    @readonly
    entity A_SalesOrder as projection on apiSales.A_SalesOrder;

    function getSalesOrderAmountBySoldToParty() returns String;

}