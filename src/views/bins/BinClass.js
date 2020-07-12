import * as Yup from 'yup';

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

      updateBin(object){
        for (let key in object) {
          this[key] = object[key];
        }
      }

      static getValidationSchema(){
      return Yup.object().shape({
        wasteType: Yup.mixed().oneOf(["CONSTRUCTION","MIXED VALUE","CLEAN FILL"]),
        
        sizeLong: Yup.number()
                      .required("Size is required")
                      .positive()
                      .integer()
                      .max(20)
                      .min(1),
        sizeHeight: Yup.number()
                      .required("Size is required")
                                    .positive()
                                    .integer()
                                    .max(20)
                                    .min(1),
        sizeWide: Yup.number()
                  .positive()
                  .integer()
                  .max(20)
                  .min(1),
        dailyCost: Yup.number().required("Daily cost is required").positive(),
        amount: Yup.number().required().positive().integer(),
        available: Yup.number().positive().integer().min(0).max(Yup.ref("amount")),
        picture: Yup.string().optional()
                    .matches("\.(gif|jpe?g|tiff?|png|webp|bmp)$",
                              "Must be one of following: gif, jpeg, tiff, png, webp, bmp",
                              { excludeEmptyString: true })
      
      
      });
    }


    }
export default BinClass;