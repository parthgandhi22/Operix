const express = require("express");
const AuditLog = require("../models/AuditLog");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/logs", verifyToken, checkRole("admin"), async (req, res) => {

    const logs = await AuditLog
      .find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);
  }
);

router.delete("/delete/:id", verifyToken, checkRole("admin"), async (req,res)=>{

  try{

    await AuditLog.findByIdAndDelete(req.params.id);

    res.json({msg:"Log deleted successfully"});

  }catch(err){
    res.status(500).json({error:err.message});
  }

});

module.exports = router;