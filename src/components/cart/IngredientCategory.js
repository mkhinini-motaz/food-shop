import React from 'react';
import { Typography } from "@material-ui/core";

import Ingredient from "./Ingredient";
import TranslateField from "../common/TranslateField";
import { COMPONENT_SHOW_DELAY } from "../../constants";

export default function IngredientCategory(props) {
    const ingredients = [];
    let showDelay = props.showDelay;
    for (let ingredient of props.ingredientCategory.ingredients) {
        ingredients.push(<Ingredient
            onChange={(isSelected) => props.onChange(ingredient, isSelected)}
            onQuantityChange={(quantity) => props.onQuantityChange(ingredient, quantity)}
            showDelay={showDelay}
            ingredient={ingredient}
            isSelected={!! props.defaultChoices.filter(element => element.id === ingredient.id).length}
            isQuantifiable={!! props.ingredientCategory.pivot.ingredients_are_quantifiable}
            key={'ingredient_' + ingredient.id}
        />);
        showDelay += COMPONENT_SHOW_DELAY;
    }

    return (
        <div className="p-2 my-2" style={{ backgroundColor: '#f5f6f6', borderRadius: '15px', }}>
            <div className="w-100 text-center">
                <Typography variant="h6" component="h4" color="primary">
                    <TranslateField value={props.ingredientCategory} field="name" />
                </Typography>
            </div>
            <div>
                {ingredients}
            </div>
        </div>
        );
}
