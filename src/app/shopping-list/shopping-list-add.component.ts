import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Ingradient } from "../shared/ingradient";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingradient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = { name: null, amount: null };
    } else {
      this.isAdd = false;
    }
  }
  onSubmit(ingradient: Ingradient) {
    const newIngradient = new Ingradient(ingradient.name, ingradient.amount);
    if (!this.isAdd) {
      this.sls.editItem(this.item, newIngradient);
      this.onClear();
    } else {
      this.item = newIngradient;
      this.sls.addItem(this.item);
    }
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }
}
