
const countriesApi = require("../services/countries");

countriesApi.getByAlphaCode("br")
  .then((response) => console.log(response))
  .catch((e) => console.log(e));

