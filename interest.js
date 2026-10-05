const express = require('express');
const router = express.Router();
router.use(express.json());
router.get('/interest/simple',(req,res)=>{
    const p = parseInt(req.query.p);
    const r = parseInt(req.query.a);
    const t = parseInt(req.query.t);
    const si = (p*r*t)/100;
    res.json({
        si : si
    })
})