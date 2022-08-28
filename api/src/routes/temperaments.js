const Router = require ('express');
const {dogTemperament} = require ('../controllers/temperamentsC')

const router = Router();

router.get('', dogTemperament);

module.exports = router;

