import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingradient } from '../shared';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Summer Salad', 'Very tasty', 'http://images.media-allrecipes.com/images/59094.jpg', [
      new Ingradient('Watermelon', 2),
      new Ingradient('Onions', 1)
    ]),
    // tslint:disable-next-line:max-line-length
    new Recipe('Potato Salad', 'Very healthy ', 'http://img.taste.com.au/6nuDbNht/taste/2016/11/mixed-herb-and-roast-potato-salad-87636-1.jpeg', []),
    new Recipe('Triple-Berry Summer Salad', 'Very healthy ', 'http://cdn.iowagirleats.com/wp-content/uploads/2013/05/Triple-Berry-Summer-Salad-03_mini.jpg', []),
    new Recipe('Summer Salad - Cook Diary', 'Very tasty', 'http://cookdiary.net/wp-content/uploads/images/Summer-Salad_17786.jpg', [])
  ];

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'content-type': 'application/json'
    });
    return this.http.put('https://recipebook-e33d8.firebaseio.com/recipes.json', body, { headers: headers });

  }

  fetchData() {
    return this.http.get('https://recipebook-e33d8.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      }
      );
  }
}
