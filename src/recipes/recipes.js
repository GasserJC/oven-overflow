const express = require('express');
const { serialize } = require('v8');
const app = express();
const RECIPES = require('./recipes.json')

async function FindFoodByName(search){
    delete items;
    delete ObjectKey;
    items = [];
    search = search.toLowerCase()
    for (ObjectKey in RECIPES){
        if(RECIPES[ObjectKey]["title"] != undefined){
            if(RECIPES[ObjectKey]["title"].toLowerCase().includes(search)){
                delete RECIPES[ObjectKey]["picture_link"];
                items.push(RECIPES[ObjectKey]);
            }
            if(items.length > 25){
                break;
            }
        }
    }
    return items;
}

async function FindFoodByPantry(search){
    delete Items;
    delete ObjectKey;
    delete Break;
    delete i;
    delete j;
    delete amnt;
    delete ingredients;

    Items = new Array();
    for (ObjectKey in RECIPES){ //get recipe
        if(RECIPES[ObjectKey]['ingredients'] != undefined && RECIPES[ObjectKey]['ingredients'] != null){
            ingredients = RECIPES[ObjectKey]['ingredients'];
            amnt = ingredients.length;
            for (i = 0; i < search.length; i++){ //foreach ingredient in pantry
                Break = false;
                for( j = 0; j < ingredients.length; j++){
                    if( ingredients[j].toLowerCase().includes(search[i].toLowerCase())){
                        amnt--;
                        if(amnt == 0 && Items.length < 50){
                            delete RECIPES[ObjectKey]["picture_link"];
                            Items.push(RECIPES[ObjectKey])
                        }
                    } else {
                        Break = true;
                        break;
                    }
                }   
                if(Break){
                    break;
                }
            }
        }
    }
    return Items;
}

async function JSONIFY(foods){
    delete JSONItems
    JSONItems = "{ ";
    for( i = 0; i < foods.length; i++){
        JSONItems += `${JSON.stringify(foods[i])}`;
    }
    JSONItems= JSONItems.substring(0, JSONItems.length - 1);
    return JSONItems + " }";
}

module.exports = {
    JSONIFY: JSONIFY,
    FindFoodByPantry: FindFoodByPantry,
    FindFoodByName: FindFoodByName
}