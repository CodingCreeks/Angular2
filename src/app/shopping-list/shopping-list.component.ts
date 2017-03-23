import { Component, OnInit } from "@angular/core";
import { Ingradient } from "../shared";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  items: Ingradient[] = [];
  selectedItem: Ingradient = null;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingradient) {
    this.selectedItem = item;
  }

  onCleared() {
    this.selectedItem = null;
  }
}
