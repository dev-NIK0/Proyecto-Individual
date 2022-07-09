const { Router } = require('express');
const router = Router();

const { getPlatforms} = require('./Logica');

router.get('/platforms' , async (req,res,next) =>{
    const plataforms = await getPlatforms()
    res.status(202).json(plataforms)
})
 
module.exports = router