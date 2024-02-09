const mongoose = require('mongoose'),
    slugify = require('slugify'),
    { marked } = require('marked'),
    createDomPurifier = require('dompurify'),
    { JSDOM } = require('jsdom'),
    dompurify = createDomPurifier(new JSDOM().window);

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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    if (this.article) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.article));
    }

    next();
})

module.exports = mongoose.model('Article', articleSchema);