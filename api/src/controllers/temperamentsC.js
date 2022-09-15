const axios = require('axios');
const {Temperament} = require ('../db');

const dogTemperament = async(req, res, next) => {
  try {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const response = apiUrl.data.map(el => {
      return el.temperament
    }).join().split(',')
   
    let temps = [];

    response.map((c) => {
        if (!temps.includes(c.trim()) && c) {
            temps.push(c.trim());
        }
    });
    temps.map(async (d) => {
        await Temperament.findOrCreate({
            where: {
                name: d
            },
        });
    });
    res.status(200).send(temps)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  dogTemperament
}