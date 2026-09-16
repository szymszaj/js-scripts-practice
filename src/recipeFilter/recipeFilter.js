import { recipes } from "./data.js";

const filterRecipes = (arr, filters = {}) => {
  return arr.filter((r) => {
    if (filters.maxCookTime !== undefined && r.cookTime > filters.maxCookTime)
      return false;
    if (filters.minCookTime !== undefined && r.cookTime < filters.minCookTime)
      return false;
    if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
    if (filters.difficulty && r.difficulty !== filters.difficulty) return false;

    if (filters.ingredients && filters.ingredients.length > 0) {
      const hasAllIngredients = filters.ingredients.every((ingredient) =>
        r.ingredients.includes(ingredient),
      );
      if (!hasAllIngredients) return false;
    }

    if (filters.tags && filters.tags.length > 0) {
      const hasAnyTag = filters.tags.some((tag) => r.tags.includes(tag));
      if (!hasAnyTag) return false;
    }

    return true;
  });
};

console.log(filterRecipes(recipes, { maxCookTime: 30 }));

console.log(filterRecipes(recipes, { cuisine: "Indian" }));

console.log(filterRecipes(recipes, { ingredients: ["tomato"] }));

console.log(
  filterRecipes(recipes, {
    minCookTime: 15,
    maxCookTime: 60,
    difficulty: "easy",
    tags: ["vegetarian"],
  }),
);
