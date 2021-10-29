const Article = require('../model/article');

const handleErrors = (err) => {
    let errors = {};
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
    })
    return errors;
}

const getHomepage = (req, res) => {
    Article.find()
        .then(articles => {
            res.render('homepage', {pageTitle: 'Home Page', articles})
        })
        .catch(err => console.log(err))
}

const newArticle = (req, res) => {
    if(req.method === 'GET'){
        res.render('newArticle', {pageTitle: 'New Article', article: null, errors: null});
    };

    if(req.method === 'POST'){
        const article = new Article(req.body);
        article.save()
            .then( () => res.redirect('/'))
            .catch(err =>{
                const errors = handleErrors(err)
                res.render('newArticle', {pageTitle: 'New Article', article: null, errors});
            })
    };
}

const showOneArticle = (req, res) => {
    Article.findById(req.params.id)
        .then( article => {
            res.render('showOne', {pageTitle: 'Show The Article', article})
        })
        .catch(err => console.log(err))
}

const editArticle = (req, res) => {
    if(req.method === 'GET'){
        Article.findById(req.params.id)
            .then( article => {
                res.render('newArticle', {pageTitle: 'Update Article', article, errors: null})
            })
            .catch(err => console.log(err))
    };

    // with method findByIdAndUpdate() the model can not validate the items / or it should be added: {runValidators: true}
    // if(req.method === 'POST'){
    //     Article.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
    //         .then(() => res.redirect('/'))
    //         .catch(err => console.log(err))
    // };

    if(req.method === 'POST'){
        Article.findById(req.params.id)
            .then((article) => {
                article.title = req.body.title;
                article.article = req.body.article;
                article.save()
                    .then(() => res.redirect('/'))
                    .catch(err => {
                        const errors = handleErrors(err)
                        res.render('newArticle', {pageTitle: 'Update Article', article, errors})
                    })
            })
            .catch(err => console.log(err))
    };
}

const delArticle = (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then( () => res.redirect('/'))
        .catch(err => console.log(err))
}

module.exports = {
    getHomepage,
    newArticle,
    showOneArticle,
    editArticle,
    delArticle
}