const express = require('express');
const aController = require('../controllers/answerController');
const { requireAuth, checkUser } = require('../middleWares/authMiddleWare');

const aRouter = express.Router();

aRouter.all("*", checkUser );
aRouter.post("/answerQuestion/:id", requireAuth, aController.addAnswer );
aRouter.all("/updateAnswer/:id", requireAuth, aController.editAnswer );
aRouter.get("/deleteAnswer/:id", requireAuth, aController.delAnswer );

module.exports = aRouter;