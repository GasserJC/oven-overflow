const express = require('express');
const RECIPES = require('./recipes.json')

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%^&*()_+@!';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

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
            }
            if(items.length > 2){
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
                        if(amnt == 0 && Items.length < 2){
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