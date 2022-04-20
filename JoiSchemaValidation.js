const baseJoi = require("joi");
const sanitizeHTML = require('sanitize-html')

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML":"{{#label} must no include HTML!}"
  },
  rules: {
    escapeHTML: {
      validate(value,helpers) {
        const clean = sanitizeHTML (value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if(clean !== value) return helpers.error("String.escapeHTML", {value});
        return clean; 
      }
    }
  }
});

const Joi = baseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    reviewTitle: Joi.string().escapeHTML(),
    rating: Joi.number().min(1).max(5),
    body: Joi.string().required().escapeHTML(),
  }).required(),
});
