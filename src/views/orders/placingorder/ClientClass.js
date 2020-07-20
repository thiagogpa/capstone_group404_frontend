import AddressClass from './AddressClass'
export default class ClientClass{
    id="";
    firstName="";
    lastName = "";
    addresses=[];
  
    
    constructor(jsonClient = {}) {
        Object.assign(this, jsonClient);
        this.addressesToAddressClass();
    }

    toString(){
        return this.firstName + ", "+ this.lastName
    }
    
    static from(json){
   
        return Object.assign(new ClientClass(), json);
        
    }

    addressesToAddressClass(){
         if(this.addresses.length>0) {
        let addressClasses = this.addresses.map(item=>{
                if(typeof(item)== "AddressClass"){
                    return item;  
                }else if(item.constructor === Object) {
                   //expecting to have json Object
                   let address = AddressClass.from(item);
                   return address;
                }
         });
            this.addresses = addressClasses;
        }

    }
    
}