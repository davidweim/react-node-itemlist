import { Request, Response } from "express";
import { ItemService } from "../app";
import { nextId } from "../models/entity";
import { Item, validate, validateReOrder } from "../models/item";

/**
 * GET /api/items
 * Get all items.
 */
export function getItems(req: Request, res: Response) {
  const listId = req.params.listId;
  const items = ItemService.load(listId);
  res.json(items);
}

/**
 * Delete Items
 */
export function deleteItems(req: Request, res: Response) {
  const listId = req.params.listId;
  if (listId === undefined) {
    res.status(400).send("Given ID is not a number");
    return;
  }

  ItemService.save(listId, []);

  res.json({});
}

/**
 * GET /api/list/:listId/items/:itemId
 * Get item with itemId.
 */
export function getItem(req: Request, res: Response) {
  const listId = req.params.listId;
  const itemId = req.params.itemId;

  const items = ItemService.load(listId);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    res.status(404).send("No item exist with given ID");
    return;
  }

  res.json(item);
}

/**
 * Create a new Item
 */
export function postItem(req: Request, res: Response) {
  const listId = req.params.listId;
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const items = ItemService.load(listId);
  const now = Date.now();
  const item: Item = {
    creationDate: now,
    id: nextId(items),
    lastUpdated: now,
    text: req.body.text,
  };
  items.push(item);

  ItemService.save(listId, items);
  res.json(item);
}

/**
 * Update an existing Item
 */
export function putItem(req: Request, res: Response) {
  const listId = req.params.listId;
  const itemId = req.params.itemId;

  const items = ItemService.load(listId);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    res.status(404).send("No item exist with given ID");
    return;
  }

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  item.lastUpdated = Date.now();
  item.text = req.body.text;
  console.log(item);

  ItemService.save(listId, items);

  res.json(item);
}

/**
 * Delete a Item
 */
export function deleteItem(req: Request, res: Response) {
  const listId = req.params.listId;
  const itemId = req.params.itemId;

  const items = ItemService.load(listId);
  const newItems = items.filter(item => item.id !== itemId);
  ItemService.save(listId, newItems);

  res.json({});
}

/*
 * ReOrder the item list
 */
export function reOrderItems(req: Request, res: Response) {
  const listId = req.params.listId;

  const { error } = validateReOrder(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const startIndex = req.body.startIndex;
  const endIndex = req.body.endIndex;

  const items = ItemService.load(listId);
  const [removed] = items.splice(startIndex, 1);
  items.splice(endIndex, 0, removed);

  ItemService.save(listId, items);
  res.json(items);
}
