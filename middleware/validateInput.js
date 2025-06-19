const Joi = require('joi');

const visitSchema = Joi.object({
  url: Joi.string().uri().required(),
  referrer: Joi.string().allow('', null),
  sessionId: Joi.string().optional(),
  customTags: Joi.array().items(Joi.string()).optional()
});

module.exports = (req, res, next) => {
  const { error } = visitSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};