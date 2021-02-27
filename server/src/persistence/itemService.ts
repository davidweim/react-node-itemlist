import { Item } from '../models/item';

export default interface ItemService {
    load(listId: string): Item[];
    save(listId: string, items: Item[]): void;
}
