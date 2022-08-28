const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getApiInfo = async () => {
  const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
  const apiInfo = await apiUrl.data.map(el => {
    return {
      id: el.id,
      name: el.name,
      image: el.img,
      height: el.height,
      weight: el.weight,
      life_span: el.life_span,
      temperament: el.temperament
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] },
    }
  });
};

const getAllDogs = async () => {
  const api = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = ([...api, ...dbInfo]);
  return infoTotal;
};

const getDogs = async (req, res, next) => {
  const name = req.query.name
  try {
    const allDogs = await getAllDogs();
    if (name) {
      const dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      dogName.length ?
        res.status(200).json(dogName) :
        res.status(404).send('Perro no encontrado');
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
};

const dogById = async (req, res, next) => {
  const id = req.params.id
  try {
    const allDogs = await getAllDogs();
    if (id) {
      const dogId = await allDogs.filter(el => el.id == id)
      dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('Perro no encontrado')
    }
  } catch (error) {
    next(error);
  }
};

const createDog = async (req, res, next) => {
  try {
    let {
      name,
      image,
      height,
      weight,
      life_span,
      createdInDb,
      temperament
    } = req.body;
    let process = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
      createdInDb
    });
    let temperamentDb = await Temperament.findAll({
      where: { name: temperament }
    });
    process.addTemperament(temperamentDb);
    res.send('Perro creado exitosamente');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDogs,
  dogById,
  createDog
}