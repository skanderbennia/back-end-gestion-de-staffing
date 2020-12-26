const advancedQuery = require("../utils/advancedQuery")
class APIFeatures {
    constructor(query,queryString)
   { 
       this.query = query;
       this.queryString = queryString
   }
   filter(){
       //this object will contrain every key value pairs
        //filtering
        let queryObj = {...this.queryString}
        const excludedFields = ['page','sort','limit','fields']
        excludedFields.forEach(el=>{
            delete queryObj[el]
        }) 
        //advanced filtering:
        queryObj = advancedQuery(queryObj)
        
        this.query = this.query.find(queryObj)
        return this
        //build the query 
        //let query = User.find(queryObj)
   }
   sort(){
       // sorting:
       if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ')
        this.query = this.query.sort(sortBy)
    }
     return this  
   }
   limitFields(){
    //field limiting
    if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
        //we call this projecting
        this.query = this.query.select(fields)
        
    }else{
        //in here im excluding the __v that mongos use but not eliminate it
        this.query = this.query.select('-__v')
    }
    return this
   }
   pagination(){
       //pagination:
       const page = this.queryString.page *1||1
       const limit = this.queryString.limit *1 ||100
       const skip = (page-1)*limit;

       this.query = this.query.skip(skip).limit(limit)
       return this
   }
}
module.exports = APIFeatures