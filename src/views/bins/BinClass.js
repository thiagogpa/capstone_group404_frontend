class BinClass{
   
    constructor(id,waste_type, size_long, size_height,size_wide,daily_cost,picture_url, available,description) {
        this.id = id;
        this.wasteType = waste_type;
        this.sizeLong =  size_long;
        this.sizeHeight = size_height;
        this.sizeWide = size_wide;
        this.dailyCost = daily_cost;
        this.picture = picture_url;
        this.available = available;
        this.description = description
      }

      static from(json){
        return Object.assign(new BinClass(), json);
      }

      getCapacity(){
          return Math.floor((this.sizeLong*this.sizeHeight*this.sizeWide)/27);
      }

      getPicturePath(path){
        //check if the path has slash at the end and chack for path validity overall
              return path+this.picture;

        //if pass is not valid return null
      
      }

      getCapacityString(){
          return `${this.getCapacity()} yards \n ${this.sizeLong}ft. X ${this.sizeHeight}ft. X ${this.sizeWide}ft.`;
      }
      getMeasurementString(){
        return `${this.sizeLong}ft. X ${this.sizeHeight}ft. X ${this.sizeWide}ft.`;
      }

    }
export default BinClass;