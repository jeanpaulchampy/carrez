/*var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();*/
console.log("truc");
var url="https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s";
/*$(document).ready(function(){
    $("button").click(function(){
        $.get("https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s", function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});*/
//var res;

/*$(document).ready(function(){
    $("button").click(
    });
  });*/
  function httpGetAsync(url, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, true); // true for asynchronous
      
      //xmlHttp.withCredentials=true;
      //xmlHttp.onreadystatechange=handler;

      xmlHttp.send(null);

      return xmlHttp;
  }
  httpGetAsync(url,function(data){
      console.log(data);
  })


    //var url="https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s";*/
//console.log(url);
/*var url="https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s";
    function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}
else {

    xhr.onload = function() {
    var text = xhr.responseText;
    console.log(text);
  }

}
*/
