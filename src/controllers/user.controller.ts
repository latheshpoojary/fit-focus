import { RequestHandler } from "express";
import apiResponse from "../helpers/api.response";
import { _addUser } from "../services/user.service";
export const addUser: RequestHandler = async (req, res, next) => {
    try {
      
      _addUser(req.body)
        .then((data) =>
          res.json(
            apiResponse({
              data: data,
              message: 'User Added  successfully',
              status: 'OK',
            }),
          ),
        )
        .catch((err) => next(err));
    } catch (err) {
      return next(err);
    }
  };