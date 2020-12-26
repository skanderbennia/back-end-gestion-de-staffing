//used so we can filter with gte,gt,lt,lte..
const advancedQuery = (queryObj)=>{
    let queryString = JSON.stringify(queryObj)
        //we will replace gte ,lte,lt,gt and add the $ sign
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`)
        return JSON.parse(queryString)
}
module.exports = advancedQuery