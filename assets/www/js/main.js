var _base_url = "http://202.65.158.50:3000";

var client_id = "444933172252319";//appid

//489315811082220
var redir_url = "https://www.facebook.com/connect/login_success.html";//redirect url

//facebook login functionality implements here(profile.html)
function facebookLogin()
{
    var fb = FBConnect.install();
    fb.connect(client_id,redir_url,"touch");
    fb.onConnect = onFBConnected;
    
}
// Triggers when user logged in successfully with fb.
function onFBConnected()
{
   // $.mobile.showPageLoadingMsg();
    
    //create request for retrive logged in user details
    var req = window.plugins.fbConnect.getMe();
    req.onload = checkfacebookid1;
    
}

//checking fb email id is already exists or not
function checkfacebookid1(evt) {
    $.mobile.showPageLoadingMsg();
    var response = JSON.parse(evt.target.responseText);
    var User = {"user": {"email":response.email,"first_name":response.first_name,"last_name":response.last_name,"user_name":response.first_name, "login_type":"facebook"}}
    var Url = _base_url+"/users.json";
    $.ajax({
        type: "POST",
        url: Url,
        data:User,
        dataType: "json",
        success: function (data) {
            $.mobile.hidePageLoadingMsg();
            sessionStorage.setItem('user_id', data._id);
            $.mobile.changePage('menu.html', {
               transition: "slide" 
            });   
        },
        error: function (xhr, status, errorThrown) {
            $.mobile.hidePageLoadingMsg();
            alert("user not saved")
        }
    });
    //alert(evt.target.responseText);
}

//facebook logout functionality implements here(index.html)
function Logout(){ 
    var fb=FBConnect.install();
    fb.Logout();   
}

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};