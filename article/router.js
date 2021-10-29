const express = require('express');
const controller = require('./controller/controller');

const router = express.Router();

router.get('/', controller.getHomepage);
router.get('/seeMore/:id', controller.showOneArticle);
router.all('/newArticle', controller.newArticle);
// router.get('/newArticle', controller.newArticle);
// router.post('/newArticle', controller.newArticle);
router.all('/update/:id', controller.editArticle);
router.get('/delete/:id', controller.delArticle);
router.all('/*', (req,res) => res.render('page404', {pageTitle: '404'}))

module.exports = router;