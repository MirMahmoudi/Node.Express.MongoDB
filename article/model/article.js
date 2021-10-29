const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please insert a title for this Article!'],
        minlength: [5, 'Title should has at least 5 Characters!']
    },
    article: {
        type: String,
        required: [true, 'Please insert any description for Article!'],
        minlength: [10, 'Description should has at least 10 Characters!']
    }
}, {timestamps: true});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
