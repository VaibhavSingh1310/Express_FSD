const express = require('express');
const router = express.Router();
router.use(express.json());
router.get('/square/area',(req,res)=>{
    const side = req.query.side;
    const area = side*side;
    res.json({
        area:area,
    })
})
router.get('/square/perimeter',(req,res)=>{
    const side = req.query.side;
    const perimeter = 4*side;
    res.json({
        perimeter:perimeter
    })
})

router.get('/rectangle/area',(req,res)=>{
    const len = req.query.len;
    const breadth = req.query.breadth;
    const area = len*breadth;
    res.json({
        area:area
    })

})
router.get('/rectangle/perimeter',(req,res)=>{
    const len = req.query.len;
    const breadth = req.query.breadth;
    const perimeter = 2*(len+breadth);
    res.json({
        perimeter:perimeter
    })
})
module.exports = router;
