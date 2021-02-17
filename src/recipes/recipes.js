const express = require('express');
const RECIPES = require('./recipes.json')

async function FindFoodByName(search){
    delete items;
    delete ObjectKey;
    items = [];
    search = search.toLowerCase()
    for (ObjectKey in RECIPES){
        if(RECIPES[ObjectKey]["title"] != undefined){
            if(RECIPES[ObjectKey]["title"].toLowerCase().includes(search)){
                delete RECIPES[ObjectKey]["picture_link"]
                items.push(RECIPES[ObjectKey]);
            }
            if(items.length > 25){
                break;
            }
        }
    }
    return items;
}

async function FindExactFoodByName(search){
    delete items;
    delete ObjectKey;
    items = [];
    search = search.toLowerCase()
    for (ObjectKey in RECIPES){
        if(RECIPES[ObjectKey]["title"] != undefined){
            if(RECIPES[ObjectKey]["title"].toLowerCase() == (search)){
                delete RECIPES[ObjectKey]["picture_link"];
                items.push(RECIPES[ObjectKey]);
                return items;
            }
        }
    }
    return items;
}

function hasIngredient(ingredient, pantry){
    for(i = pantry.length; i >= 0; i--){
        if(ingredient.includes(pantry[i])){
            return true
        }
    }
    return false;
}

function FindFoodByPantry(pantry){
    Items = []
    remove = false;
    for (ObjectKey in RECIPES){ //for each recipe
        if(RECIPES[ObjectKey]['ingredients'] != undefined && RECIPES[ObjectKey]['ingredients'] != null){
            ingrs = RECIPES[ObjectKey]['ingredients'];
            count = 0;
            for(ingr in ingrs){
                if(!hasIngredient(ingrs[ingr], pantry)){
                    break;
                } else if (count == ingrs.length - 1){
                    console.log(RECIPES[ObjectKey]['title'])
                    Items.push(RECIPES[ObjectKey]['title'])
                }
            }
            if(Items.length > 15) { 
                return Items
            }
        }
    }
    console.log(Items) 
    return Items;
}

async function JSONIFY(foods){
    delete JSONItems
    if(foods != ""){
        JSONItems = '{ "results": [';
        for( i = 0; i < foods.length; i++){
            if(i == 0){
                JSONItems += `${JSON.stringify(foods[i])}`;
            } else {
                JSONItems += `, ${JSON.stringify(foods[i])}`;
            }
        }
        JSONItems= JSONItems.substring(0, JSONItems.length - 1);
        (JSONItems += "}]}")
    } else {
        JSONItems = "{}"
    }
    return JSONItems
}

module.exports = {
    JSONIFY: JSONIFY,
    FindFoodByPantry: FindFoodByPantry,
    FindFoodByName: FindFoodByName,
    FindExactFoodByName: FindExactFoodByName
}