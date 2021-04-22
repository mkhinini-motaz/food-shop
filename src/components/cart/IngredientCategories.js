import React, { useState } from 'react';

import IngredientCategory from './IngredientCategory';
import { COMPONENT_SHOW_DELAY, INGREDIENT } from "../../constants";

export default function IngredientCategories(props) {
    const [ ingredients, setIngredients ] = useState([]);
    const ingredientsComponents = [];
    let showDelay = 0;

    for (let ingredientCategory of props.ingredientCategories || []) {
        ingredientsComponents.push(<IngredientCategory
            ingredientCategory={ingredientCategory}
            showDelay={showDelay}
            onQuantityChange={(ingredient, quantity) => {
                let newIngredients = ingredients;
                newIngredients.forEach(element => {
                    if (element.id === ingredient.id) {
                        element.quantity = quantity;
                    }
                });
                setIngredients(newIngredients);
            }}
            onChange={(ingredient, isSelected) => {
                if (! isSelected) {
                    const newIngredients = ingredients.filter(element => element.id !== ingredient.id);
                    setIngredients(newIngredients);
                    props.onChange(newIngredients);
                    return;
                }

                let newIngredients = ingredients;
//                if (ingredientCategory.max_ingredients) { // TODO: uncomment after updating db
                if (ingredientCategory.pivot.max_ingredients) {
                    let existingIngredientCount = 0;
                    newIngredients = ingredients.filter(element => {
//                        if (element.pivot.ingredient_category_id !== ingredientCategory.id) { // TODO: uncomment after updating db
                        if (element.ingredient_category_id !== ingredientCategory.id) {
                            return true;
                        }

                        existingIngredientCount++;
//                        return existingIngredientCount < ingredientCategory.max_ingredients // TODO: uncomment after updating db;
                        return existingIngredientCount < ingredientCategory.pivot.max_ingredients;
                    });
                }

//                if (ingredientCategory.ingredients_are_quantifiable) { // TODO: uncomment after updating db
                if (ingredientCategory.pivot.ingredients_are_quantifiable) {
                    ingredient.quantity = INGREDIENT.DEFAULT_QUANTITY;
                }
// TODO: sort ingredients by ingredientCategory order
                newIngredients.push(ingredient);
                setIngredients(newIngredients);
                props.onChange(newIngredients);
            }}
            defaultChoices={props.defaultChoices}
            key={'ingredient_category_' + ingredientCategory.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return <div>
        {ingredientsComponents}
    </div>
}
