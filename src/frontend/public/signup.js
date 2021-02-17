/*
TODO:
    API:
        -see if username is unique
        -see if email is unique
        -create new account

    Frontend:
        (landing page) => input information, verfiy it, then send to login page.
        -see if username meets standards
        -see if password meets standards
        -see if email meets standards (contains @, .com, .edu, .org, .net, .gov)
        =>after created account, reroute to login page.
*/
/*

TODO =>
    API:
        -call api with credentials, make sure creds fit the needed characteristics
        -return with a token and place it into the web storage

    Page:
    (landing page) => username and password. =. Reroutes back to index after signed in
    (selectable page) => signup
*/
function GoodToGo(){
    document.getElementById("submit").setAttribute("type", "submit");
    document.getElementById("submit").setAttribute("value", "Sign Up");
}
function NoGo(){
    document.getElementById("submit").setAttribute("type", "button");
    document.getElementById("submit").setAttribute("value", "Need Credentials");
}

function validCred( cred, type ){
    if(type == 'EML'){
        if(cred.includes("@") && (cred.includes(".com") || cred.includes(".net") || cred.includes(".edu") || cred.includes(".gov") || cred.includes(".org"))){
            //if (api call, has unique email)
                    //return true;
            return true;
        }
    }
    if(cred.length >= 6 && cred.length < 20){
        if(type == 'UID'){
            if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>@\?]/g.test(cred)){
                //if (api call, has unique username)
                    //return true;
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
var validEML = false;

window.addEventListener('load', function () {
    let Window_ = document.getElementById('window');
    var login = document.createElement("p");
    login.innerHTML=
    `
    <div class="container">
      <div class="center">
        <h1>Sign Up</h1>
        <p>please create a unique username, a secure password (8 characters or more with at least one symbol and one number) as well as your email.</p>
        <form action="/SignUpUser" method="get">
            <input style="background-color: #f2f2f2;" id="UID" name="usr" class="form-control mr-sm-2" type="search" placeholder="username" aria-label="username" style="width: 90%">
            <input style="background-color: #f2f2f2;" id="PWD" name="pwd" class="form-control mr-sm-2" type="password" placeholder="password" aria-label="password" style="width: 90%">
            <input style="background-color: #f2f2f2;" id="EML" name="eml" class="form-control mr-sm-2" type="search" placeholder="email" aria-label="email" style="width: 90%">
            <br>
            <p>Already have an account?: <a href="/login">click here</a></p>
            <input id="submit" class="btn btn-outline-primary" type="button" value="Log In"></input>
        </form>
      </div>
    </div>
    `;

    Window_.appendChild(login);

    //Event Handlers 

    document.getElementById("UID").addEventListener("blur", function(){
        let UID = document.getElementById("UID").value;
        if(!validCred(UID, "UID")) {
            validUID = false;
            alert("Invalid Username Format");
        }else{
            validUID = true;
        }
        if(validPWD && validUID && validEML){
           GoodToGo();
        }
        else{
           NoGo();
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
        if(validPWD && validUID && validEML){
            GoodToGo();
        }
        else{
            NoGo();
        }
    });

    document.getElementById("EML").addEventListener("blur", function(){
        let EML = document.getElementById("EML").value;
        if(!validCred(EML, "EML")) {
            validEML = false;
            alert("Invalid Email Format");
        }else{
            validEML = true;
        }
        if(validPWD && validUID && validEML){
            GoodToGo();
        }
        else{
            NoGo();
        }
    });
})
