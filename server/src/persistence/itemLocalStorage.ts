import { LocalStorage } from 'node-localstorage';
import { Item } from '../models/item';
import ItemService from './itemService';

export default class ItemLocalStorage implements ItemService {

    private readonly localStorage: LocalStorage;
    constructor() {
        this.localStorage = new LocalStorage('./localStorage-Items');
    }
    public save(listId: string, items: Item[]) {
        const itemsAsString = JSON.stringify(items);

        this.localStorage.setItem(listId, itemsAsString);
    }

    public load(listId: string): Item[] {
        const itemsAsString = this.localStorage.getItem(listId);

        if (itemsAsString) {
            const items = JSON.parse(itemsAsString);
            return items;
        } else {
            return [];
        }
    }

}
