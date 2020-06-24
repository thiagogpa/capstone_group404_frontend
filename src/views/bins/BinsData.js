const binJson=require('./json/bins.json');
const { notDeepEqual } = require('assert');
//console.log(binJson);

class BinClass{
   
    constructor(id,waste_type, size_long, size_height,size_wide,daily_cost,picture_url, availability,description) {
        this.id = id;
        this.waste_type = waste_type;
        this.size_long =  size_long;
        this.size_height = size_height;
        this.size_wide = size_wide;
        this.daily_cost = daily_cost;
        this.picture = picture_url;
        this.availability = availability;
        this.description = description
      }

      static from(json){
        return Object.assign(new BinClass(), json);
      }

      getCapacity(){
          return Math.floor((this.size_long*this.size_height*this.size_wide)/27);
      }

      getPicturePath(path){
        //check if the path has slash at the end and chack for path validity overall
              return path+this.picture;

        //if pass is not valid return null
      
      }

      getCapacityString(){
          return `${this.getCapacity()} yards \n ${this.size_long}ft. X ${this.size_height}ft. X ${this.size_wide}ft.`;
      }
      getMeasurementString(){
        return `${this.size_long}ft. X ${this.size_height}ft. X ${this.size_wide}ft.`;
      }

    }

//bin1 = new  BinClass(1,"Constraction", 10, 2,6,60.9,"some url", 3,"Hello");

// console.log(bin1);

// console.log(bin1.getCapacity());
// console.log(bin1.getCapacityString());

    //  "id" : 1,
    //  "waste_type": "Constraction",
    //  "size_long" : 10,
    //         "size_height" : 10,
    //         "size_wide" : 10,
    //         "daily_cost" : 60.5,
    //         "picture_url": "./assets/bin_l10_h2_w6.png",
    //         "availability" : 3,
    //         "description": "blblbl"  





const binsRawData = JSON.parse(JSON.stringify(binJson));

const binsData = binsRawData.map((item)=>{
    let bin = BinClass.from(item);
    return (
        { 
            id : bin.id,
            waste_type : bin.waste_type,
            capacity : bin.getCapacity(),
            measurement: bin.getMeasurementString(),
            daily_cost : bin.daily_cost,
            picture : bin.getPicturePath(process.env.PUBLIC_URL+'/bins/'),
            availability : bin.availability,
            description : bin.description  
        }
    );
 });

 console.log(binsData);

module.exports = binsData;