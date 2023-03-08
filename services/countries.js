require("dotenv").config();
const axios = require("axios");

const countriesApi = axios.create({
  baseURL: process.env.COUNTRIES_API_BASE_URL,
  timeout: 1000,
});

const methods = {
  getByAlphaCode: async (code) => {
    try {
      const response = await countriesApi.get(`alpha/${code}`);
      
      if(response.status !== 200){
        return response.status(response.status).json({message:"Algo não deu certo. Tente novamente mais tarde!"})
      }

      return response.data;

    } catch (err) {

      return console.log(err);

    }
  },
};

module.exports = methods
