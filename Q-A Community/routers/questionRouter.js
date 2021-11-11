const express = require('express');
const qController = require('../controllers/questionController');
const { requireAuth, checkUser } = require('../middleWares/authMiddleWare');


const qRouter = express.Router();

qRouter.all("*", checkUser);
qRouter.all("/askQuestion", requireAuth, qController.addQuestion);
qRouter.get("/showQuestion/:id", qController.showOneQuestion);
qRouter.all("/updateQuestion/:id", qController.editQuestion);
qRouter.get("/deleteQuestion/:id", qController.delQuestion);

module.exports = qRouter;