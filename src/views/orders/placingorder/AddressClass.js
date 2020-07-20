export default class AddressClass{
    id="";
    street="";
    numberStreet = "";
    city="";
    province="";
    zipcode="";
    
    constructor(jsonAddress = {}) {
        Object.assign(this, jsonAddress);
    }

    toString(){

        return this.numberStreet + ", "+ this.street
                                    + ", "+this.city
                                    + ", "+this.province
                                    + ", "+this.zipcode
    }
    
    static from(json){
        return Object.assign(new AddressClass(), json);
    }
    
}

