const mongoose=require('mongoose')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    course: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 0
    }
  });

  const User = mongoose.model('User', userSchema);

  function validate(x){
    const schema = Joi.object({
        course: Joi.string().min(3),
        author: Joi.string(),
        price: Joi.number()
      });
    
      const { error } = schema.validate(x);
    return error
}

module.exports.User=User
module.exports.validate=validate