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
    if(cred.length >= 6 && cred.length < 20){
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
validUID = false;
validPWD = false;
window.addEventListener('load', function () {
    Window_ = document.getElementById('window');
    login = document.createElement("p");
    login.innerHTML=
    `
    <div class="container">
      <div class="center">
        <h1>Log In</h1>
        <form action="/LoginUsername" method="get">
            <input id="UID" class="form-control mr-sm-2" type="search" name="username" placeholder="username" aria-label="username" style="width: 90%">
            <input id="PWD" class="form-control mr-sm-2" type="password" name="password"  placeholder="password" aria-label="password" style="width: 90%">
            <br>
            <p>need an account?: <a href="/signup">click here</a></p>
            <input id="submit" class="btn btn-outline-primary" type="button" value="Need Credentials"></input>
        </form>
      </div>
    </div>
    `;
    Window_.appendChild(login);
    document.getElementById("UID").addEventListener("blur", function(){
        UID = document.getElementById("UID").value;
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
        PWD = document.getElementById("PWD").value;
        if(!validCred(PWD, "PWD")) {
            validPWD = false;
            alert("Invalid Password Format");
        }else{
            validPWD = true;
        }
        if(validPWD && validUID){
            document.getElementById("submit").setAttribute("type", "submit");
            document.getElementById("submit").setAttribute("value", "Log In");
            PWD.setAttribute("value", PWD.value);
            UID.setAttribute("value", UID.value);
        }
        else{
            document.getElementById("submit").setAttribute("type", "button");
            document.getElementById("submit").setAttribute("value", "Need Credentials");
        }
    });
})
