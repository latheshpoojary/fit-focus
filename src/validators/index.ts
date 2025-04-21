import Joi, { SchemaMap } from 'joi';

export const userValidation :SchemaMap = {
    body:{
        name:Joi.string().required(),
        email:Joi.string().email().required() 
    }
}