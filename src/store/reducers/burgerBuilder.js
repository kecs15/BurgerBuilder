import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    ingredients:null,
    totalPrice: 4,
    error: false,
    building: false
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

let updatedIngredient =  null;
let updatedIngredients = null;
let updatedState = null;

const addIngredient = (state, action) => {
    updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };

    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }

    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false
    });
}

const fetchIngredientsFalied = (state, action) => {
    return updateObject(state, {error: true});
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            
            return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS:
            
            return setIngredients(state, action);
            
        case actionTypes.FETCH_INGREDIENTS_FAILED:

            return fetchIngredientsFalied(state, action);            

        default:
            
            return state;
    }
}

export default reducer;