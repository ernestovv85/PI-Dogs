const axios = require('axios');
const {Temperament} = require ('../db');

const dogTemperament = async(req, res, next) => {
  try{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const response = apiUrl.data.map(el => {
      return{
        temperament: el.temperament
      }
    });
  console.log(response)
    let apiRes = response.data.map(el => {
      return el.temperament
    });
  console.log(apiRes)
    let comp = apiRes.flatMAp(el => {
      if(el)
      return el.split (', ')
    });
    
    let compSet = [...new Set(comp)]
    compSet.forEach(el => {
      Temperament.findOrCreate({
        where: {name: el}
      })
    });
    const allTemps = await Temperament.findAll()
    return res.status(200).json(allTemps);
  }catch(error){
    next(error);
  };
};

module.exports = {
  dogTemperament
}