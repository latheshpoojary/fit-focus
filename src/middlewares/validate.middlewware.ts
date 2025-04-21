import { Handler, Request, Response } from "express";
import Joi, { SchemaMap } from "joi";

interface ExpressJoiValidate {
  (schemaOptions: Options): Handler;
}

type SuppertedKeys = "params" | "body" | "query";

interface Options {
  params?: SchemaMap;
  body?: SchemaMap;
  query?: SchemaMap;
}

/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param {Object} schema { params, body, query }
 */
export const validate: ExpressJoiValidate = (schema) => (req, res, next) => {
  if (!schema) {
    return next();
  }

  const obj: Options = {};

  ["params", "body", "query"].forEach((key) => {
    const k: SuppertedKeys = key as SuppertedKeys;

    if (schema[k]) {
      obj[k] = req[k];
    }
  });

  const joiSchema = Joi.object(schema);
  const { error } = joiSchema.validate(obj);

  if (error) {
    const field = error.details[0].path.join(".");
    const message = error.details[0].message.replace(/"/g, "'");

    return res.status(400).json({ message, field }).end();
  }

  return next();
};

module.exports = validate;

export default validate;
