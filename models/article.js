const mongoose = require('mongoose'),
    slugify = require('slugify'),
    marked = require('marked');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    imgTemp: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    next();
})

module.exports = mongoose.model('Article', articleSchema);