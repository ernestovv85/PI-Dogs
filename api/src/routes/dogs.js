const Router = require ('express');
const { getDogs, dogById, createDog } = require('../controllers/dogsC.js');

const router = Router();

router.get('', getDogs);
router.get('/:id', dogById);
router.post('', createDog);

module.exports = router;
