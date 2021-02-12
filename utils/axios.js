const api = require("axios").default;

const client = api.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  reponseType: "json"
  // timeout: 1000000
});
module.exports = client
