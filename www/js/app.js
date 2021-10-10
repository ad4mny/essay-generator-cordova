var webURL = "http://localhost/essay-generator/";
var token = JSON.parse(localStorage.getItem('token'));

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};