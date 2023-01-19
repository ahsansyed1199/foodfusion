import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Loaded Fries', 
  //       'Loaded Fries with Cheese and Meat of your own choice', 
  //       'https://tornadoughalli.com/wp-content/uploads/2020/05/LOADED-FRIES-5.jpg', 
  //       [
  //           new Ingredient('Meat', 1),
  //           new Ingredient('French Fries', 20)
  //       ]),
  //       new Recipe('Fried Chicken Burger',
  //        'Juicy, fat, finger-lickin good burger',
  //         'https://www.chilitochoc.com/wp-content/uploads/2020/05/crispy-chicken-burger-e1615289026561.jpg',
  //          [
  //           new Ingredient('Buns', 2),
  //           new Ingredient('Fried Chicken Breast Patty', 1),
  //           new Ingredient('Lettuce', 1),
  //           new Ingredient('Tomato', 1),
  //           new Ingredient('Sauce', 1)
  //          ])
  //     ];

  private recipes: Recipe[] = [];
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
