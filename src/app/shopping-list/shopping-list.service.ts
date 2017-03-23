import { Ingradient } from '../shared/ingradient';

export class ShoppingListService {
  private items: Ingradient[] = [];
  constructor() { }

  getItems() {
    return this.items;
  }

  addItems(items: Ingradient[]) {
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingradient) {
    this.items.push(item);
  }

  editItem(oldItem: Ingradient, newItem: Ingradient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingradient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
