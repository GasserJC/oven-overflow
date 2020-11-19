/*
TODO =>
    recipes:

    API:
        -get recipesTitles by ingredients (up to 3)
        -get recipesTitles by title
        -get recipe
        -add recipe to list
        -get recipes from my list
        -finish recipe
        
    Page:
        (landing page) => search bar and filterables
        (selectable page) => recipe choices based on title, show top ten.
        (selectable page) => recipe choices based on ingredients, show top ten.
        (selectable page) => recipe page
        (selectable page) => look at recipes list (up to 10 recipes)
*/
function searchRecipes(method, param){
    if(method=="title"){
        fetch("http://localhost:50000/byName/" + param)
            .then(response =>{
                console.log(response.json())
            })

    }else if (method=="ingredient"){
        //call search by ingredients
        //call DOMBuilder
    }else{
        //call search all pantry recipes
        //call DOMBuilder
    }
}

function DOMBuilder(recipes){
    //parse JSON package and turn each json item into a <li> element with a link to that recipe.
}

window.addEventListener('load', function () {

    //Event listeners
    document.getElementById('srch').addEventListener('click', function() {
        let param = document.getElementById('prm').value;
        if(document.getElementById('recipe').checked){
            searchRecipes('title', param);
        }else{
            searchRecipes('ingredient', param);
        }
    });

    document.getElementById('srch').addEventListener('click', function() {
        let param = document.getElementById('prm').value;
        if(document.getElementById('recipe').checked){
            searchRecipes('title', param);
        }else{
            searchRecipes('ingredient', param);
        }
    });
});
