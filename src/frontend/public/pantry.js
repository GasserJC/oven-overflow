/* 
TODO =>

pantry:

    Need to make API Call to get all pantry items
        - Add item
        - Remove item
        - Get all items

    Need to make a listing for each pantry item dynamically through javascript 
    
*/


function callPantry(func, creds, param){
    URL = "ip address or url of pantry kluster";
    /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myArr[0];
     }
    };
    xmlhttp.open("GET", "json_demo_array.txt", true);
    xmlhttp.send();
    */
    return "API RESPONSE";
}
function getCredentials(){
    let creds = ""
    try{
        creds = localStorage.getItem("creds");
    }
    catch{
        window.location.href = ("localhost:8081/login");
    }
    return creds;
}
function getPantry(){
    let pantry = JSON.parse(callPantry('GetAllItems', getCredentials()));
    //call api to get entire pantry,
    //foreach item add it to a list, each item needs a remove button.
}

window.addEventListener('load', function () {
    let Window_ = document.getElementById('window');
    getPantry();
})
