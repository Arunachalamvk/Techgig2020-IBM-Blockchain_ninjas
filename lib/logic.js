/**
 * Trade a product to a new player
 * @param {org.hyperledger_composer.scms.MoveProduct} moveProduct - the trade product transaction
 * @transaction
 */
async function moveProduct(moveProduct) { // eslint-disable-line no-unused-vars
    moveProduct.patient.status = moveProduct.status;
    moveProduct.patient.remarks = moveProduct.remarks;
    moveProduct.patient.date = moveProduct.date;
    const assetRegistry = await getAssetRegistry('org.hyperledger_composer.scms.Patient');
    await assetRegistry.update(moveProduct.patient);
   }

/**
 * Trade a product to a new player
 * @param {org.hyperledger_composer.scms.InitiatePO} InitiatePO - the trade product transaction
 * @transaction
 */
function initiatePurchaseOrder(InitiatePO) {
    console.log('Start of InitiatePO Function');
    var factory = getFactory();
    var NS = 'org.hyperledger_composer.scms';
   
    
    var order = factory.newResource(NS, 'PO', InitiatePO.orderId);
    order.medicineid = InitiatePO.medicineid;
    order.orderStatus = 'INITIATED';
    order.orderer = InitiatePO.orderer;
    order.vendor = InitiatePO.vendor;
    
   return getAssetRegistry(order.getFullyQualifiedType()).then(function (assetRegistry) {
   
    return assetRegistry.add(order);
   
   });
    
  }


/**
   * Track the trade of a commidity from one trader to another
   * @param {org.hyperledger_composer.scms.TransferCommodity} trade - the InitiatePO is to be processed
   * @transaction
   */

   
  async function transferCommodity(trade) {
 
    if(trade.commodity.quantity > 0 && trade.newOwner.$type != "Hospital"){
    console.log('Start function transfer Medicine');
    var NS = 'org.hyperledger_composer.scms';
    var factory = getFactory();
    
    trade.commodity.issuer = trade.issuer;
    trade.commodity.owner = trade.newOwner;
    trade.commodity.quantity -= trade.quantity;
    
    var newTrace = factory.newConcept(NS, 'Trace');
    newTrace.timestamp = new Date();
    newTrace.company = trade.commodity.owner;
    trade.commodity.trace.push(newTrace);
    
  
    // Get all of the drivers in the driver participant registry.
 
 
     let ass = await getAssetRegistry('org.hyperledger_composer.scms.Medicine')
      ass.update(trade.commodity);
    
  

     
     
    }
    }

/**
   * Track the trade of a commidity from one trader to another
   * @param {org.hyperledger_composer.scms.TransferCommodityHospital} trade - the InitiatePO is to be processed
   * @transaction
   */

   
  async function transferCommodityHospital(trade) {
    if(trade.commodity.quantity > 0){
    console.log('Start function transfer Medicine');
    var NS = 'org.hyperledger_composer.scms';
    var factory = getFactory();
      
    trade.commodity.issuer = trade.issuer;
    trade.commodity.owner = trade.newOwner;
    trade.commodity.quantity -= trade.quantity;
      trade.hospital.quantity += trade.quantity; 
      console.log(trade.hospital.quantity);
    
    var newTrace = factory.newConcept(NS, 'Trace');
    newTrace.timestamp = new Date();
    newTrace.company = trade.commodity.owner;
    trade.commodity.trace.push(newTrace);
    
  
    // Get all of the drivers in the driver participant registry.
      let partis = await getParticipantRegistry('org.hyperledger_composer.scms.Hospital')
 	
     partis.update(trade.hospital);
    
 
     let ass = await getAssetRegistry('org.hyperledger_composer.scms.Medicine')
      ass.update(trade.commodity);
    
    }
    }
   
