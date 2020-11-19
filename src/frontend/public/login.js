/*

TODO =>
    API:
        -call api with credentials, make sure creds fit the needed characteristics
        -return with a token and place it into the web storage

    Page:
    (landing page) => username and password. =. Reroutes back to index after signed in
    (selectable page) => signup
*/
function validCred( cred, type ){
    if(cred.length >= 8 && cred.length < 20){
        if(type == 'UID'){
            if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>@\?]/g.test(cred)){
                return true;
            }
        }
        else{
            return true;
        }
    }
    return false;
}
var validUID = false;
var validPWD = false;
window.addEventListener('load', function () {
    let Window_ = document.getElementById('window');
    var login = document.createElement("p");
    login.innerHTML=
    `
    <div class="container">
      <div class="center">
        <h1>Log In</h1>
        <input id="UID" class="form-control mr-sm-2" type="search" placeholder="username" aria-label="username" style="width: 90%">
        <input id="PWD" class="form-control mr-sm-2" type="password" placeholder="password" aria-label="password" style="width: 90%">
        <br>
        <p>need an account?: <a href="/signup">click here</a></p>
        <input id="submit" class="btn btn-outline-primary" type="button" value="Need Credentials"></input>
      </div>
    </div>
    `;
    Window_.appendChild(login);
    document.getElementById("UID").addEventListener("blur", function(){
        let UID = document.getElementById("UID").value;
        if(!validCred(UID, "UID")) {
            validUID = false;
            alert("Invalid Username Format");
        }else{
            validUID = true;
        }
        if(validPWD && validUID){
            document.getElementById("submit").setAttribute("type", "submit");
            document.getElementById("submit").setAttribute("value", "Log In");
        }
        else{
            document.getElementById("submit").setAttribute("type", "button");
            document.getElementById("submit").setAttribute("value", "Need Credentials");
        }
    });
    document.getElementById("PWD").addEventListener("blur", function(){
        let PWD = document.getElementById("PWD").value;
        if(!validCred(PWD, "PWD")) {
            validPWD = false;
            alert("Invalid Password Format");
        }else{
            validPWD = true;
        }
        if(validPWD && validUID){
            document.getElementById("submit").setAttribute("type", "submit");
            document.getElementById("submit").setAttribute("value", "Log In");
        }
        else{
            document.getElementById("submit").setAttribute("type", "button");
            document.getElementById("submit").setAttribute("value", "Need Credentials");
        }
    });
    
    document.getElementById("submit").addEventListener("click", function(){
        let button = document.getElementById("submit");
        if(button.getAttribute('type') == submit){
            //make login API call;
            //see if returned token is ""
            //if not empty go to home
            //if empty display alert that the login was invalid
            //make session storage so if a user makes more than 6 attempts they cannot log in
        }
    });
})
