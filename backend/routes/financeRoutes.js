const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/burn-rate", async (req,res)=>{

  try{

    const { expenses, cash } = req.body;

    const response = await axios.post(
      "http://localhost:5001/predict-burn",
      { expenses, cash }
    );

    res.json(response.data);

  }catch(err){
    res.status(500).json({error:err.message});
  }

});

module.exports = router;