import { Ingradient } from '../shared';

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string, public ingredients: Ingradient[]) {}
}
