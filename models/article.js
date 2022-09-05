const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now(),
    },
    slug: {
        type: String,
        requried: true,
        unique: true,
    },
    sanitizedHtml: {
        type: String,
        required: true,
    }
});

// validate slug every time CRUD method is applied to the database for articles
articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true});
    }

    // converts markdown to HTML and then sanitize it
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }

    next();
});

module.exports = mongoose.model('Article', articleSchema);
