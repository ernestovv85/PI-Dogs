const axios = require ('axios');
const { Dog, Temperament } = require ('../db');

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogInfo = await apiUrl.data.map((d) => {
      const weightMM = [];
      d.weight.metric.split('-')?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }
      return {
        id: d.id,
        name: d.name,
        weight: weightMM,
        image: d.image.url,
        temperament: d.temperament,
      };
    });
    return dogInfo;
  } catch (error) {
    console.log(error);
  };
};

const getDBinfo = async () => {
  try {
    const dogInDB = await Dog.findAll({
      include: {
        model: Temperament,
      },
    });

    const dogInfo = dogInDB.map((d) => {
      const weightMM = [];
      d.weight.split('-')?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      return {
        id: d.id,
        name: d.name,
        weight: weightMM,
        image: d.image,
        temperament: d.Temperament?.reduce((acm, cur) => {
          acm += cur.name + ','
          return acm
        }, ''),
        createdInDb: d.createdInDb,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDBinfo();
  const allInfo = [...apiInfo, ...dbInfo];

  return allInfo;
};

const getDetailsApiInfo = async () => {
  try {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds');

    const dogInfo = api.data.map((d) => {
      const heightMM = [];
      d.height.metric.split('-')?.forEach((element) => {
        heightMM.push(parseInt(element.trim()));
      });
      if (!heightMM[1]) {
        heightMM.push(heightMM[0]);
      }

      const weightMM = [];
      d.weight.metric.split('-')?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      const life_SpanAA = [];
      d.life_span.split('-')?.forEach((element) => {
        life_SpanAA.push(parseInt(element.trim()));
      });
      if (!life_SpanAA[1]) {
        life_SpanAA.push(life_SpanAA[0]);
      }

      return {
        id: d.id,
        name: d.name,
        height: heightMM,
        weight: weightMM,
        lifeSpan: life_SpanAA,
        image: d.image.url,
        temperament: d.temperament,
        origin: d.origin,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDetailsDBinfo = async () => {
  try {
    const dogInDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    const dogInfo = await dogInDB.map((d) => {
      const heightMM = [];
      d.height.split('-')?.forEach((element) => {
        heightMM.push(parseInt(element.trim()));
      });
      if (!heightMM[1]) {
        heightMM.push(heightMM[0]);
      }

      const weightMM = [];
      d.weight.split('-')?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      const life_SpanAA = [];
      d.life_span.split('-')?.forEach((element) => {
        life_SpanAA.push(parseInt(element.trim()));
      });

      return {
        id: d.id,
        name: d.name,
        height: heightMM,
        weight: weightMM,
        lifeSpan: life_SpanAA,
        image: d.image,
        temperament: d.Temperaments?.reduce((acm, cur) => {
          acm += cur.name + ','
          return acm
        }, ''),
        createdInDb: d.createdInDb,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDetailsDogs = async () => {
  try {
    const apiInfo = await getDetailsApiInfo();
    const dbInfo = await getDetailsDBinfo();
    const allInfo = [...apiInfo, ...dbInfo];
    return allInfo;
  } catch (error) {
    console.log(error);
  }
}

const getDogs = async (req, res, next) => {
  const name = req.query.name
  try {
    const allDogs = await getAllDogs();
    if (name) {
      const dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      dogName.length ?
        res.status(200).json(dogName) :
        res.status(404).send('Lomito no encontrado');
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
    const allDogs = await getDetailsDogs();
    if (id) {
      const dogId = await allDogs.filter(el => el.id == id)
      dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('Lomito no encontrado')
    }
  } catch (error) {
    next(error);
  }
};

const createDog = async (req, res, next) => {
  try {
    let {
      name,
      minimHeight,
      maximHeight,
      minimWeight,
      maximWeight,
      minLifeSpan,
      maxLifeSpan,
      image,
      temperament,
  } = req.body;

  let height = minimHeight + ' - ' + maximHeight
  let weight = minimWeight + ' - ' + maximWeight
  let life_span = minLifeSpan + ' - ' + maxLifeSpan
  let process = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image: image ? image : 'https://i.pinimg.com/564x/1c/77/72/1c7772ea29c8778cbfd2af041a8fc948.jpg',
      
  });
    let temperamentDb = await Temperament.findAll({
      where: { name: temperament }
    });
    process.addTemperament(temperamentDb);
    res.send('Lomito registrado exitosamente');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDogs,
  dogById,
  createDog
}