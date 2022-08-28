const axios = require('axios');
const {Temperament} = require ('../db');

const dogTemperament = async(req, res) => {
  try {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const response = apiUrl.data.map(el => {
      return el.temperament
    }).flatMap(dog => dog?.split(', '))
    let setTemperaments = [...new Set(response)]
    setTemperaments.forEach(temperament => {
      if (temperament) {
        Temperament.findOrCreate({
          where: { name: temperament }
        })
      }
    })
    res.status(200).send(setTemperaments)
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  dogTemperament
}