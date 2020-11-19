/*
TODO:
    Grocery API:
        -get List
        -add item to list
        -remove item from list
        -create list
        -check amount of lists
        -get list titles
        -got groceries
    
    1st Page:
        (grocery landing page) => Show all current lists
        (selectable page) => Show items in selected list
        (selectable page) => Create list
*/
function getListTables(){
    //call API to get the titles of the user's lists
    //create html for the lists, add a view, completed, and delete button 
    //cannot delete generated list.
}

function viewList(){
    //call api for get list
    //show all the items in the list by changing them to html
}

function completeList(){
    //call api for got groceries
    //call deleteList function
}

function deleteList(){
    //call delete list
    //refresh the page
}

function AddItemToList(){
    //call api to add item
    //add object to list via js
}

function RemoveItemToList(){
    //call api to remove item
    //remove object to list via js
}

function AddList(){
    //see if list count < 5
    //if not then add list
    //refresh the page
}

window.addEventListener('load', function () {
    getListTables();
});
