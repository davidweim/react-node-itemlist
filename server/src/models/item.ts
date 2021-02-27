import Joi from 'joi';
import { Entity } from './entity';

const schema = {
  id: Joi.string(),
  text: Joi.string().required().min(1),
  creationDate: Joi.number(),
  lastUpdated: Joi.number(),
};

const schemaReOrder = {
    startIndex: Joi.number(),
    endIndex: Joi.number(),
  };

export interface Item extends Entity {
  creationDate: number;
  lastUpdated: number;
  text: string;
}

export function validate(item: Item) {
  return Joi.validate(item, schema);
}

export interface ReOrder {
    startIndex: number;
    endIndex: number;
}

export function validateReOrder(body: ReOrder) {
    return Joi.validate(body, schemaReOrder);
}
