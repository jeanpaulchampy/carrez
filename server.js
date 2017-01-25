/*var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here
  //url="https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s";
url = 'http://www.imdb.com/title/tt1229340/';
  request(url, function(error, response, html){

       // First we'll check to make sure no errors occurred when making the request

       if(!error){
           // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

           var $ = cheerio.load(html);

           // Finally, we'll define the variables we're going to capture

           var title, release, rating;
           var json = { title : "", release : "", rating : ""};

           $('.header').filter(function(){

            // Let's store the data we filter into a variable so we can easily see what's going on.

                 var data = $(this);

            // In examining the DOM we notice that the title rests within the first child element of the header tag.
            // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                 title = data.children().first().text();

            // Once we have our title, we'll store it to the our json object.

                 json.title = title;
             })
       }
       fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

         console.log('File successfully written! - Check your project directory for the output.json file');

       })

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')



     })
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
*/
/*
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.header').filter(function(){
        var data = $(this);
        title = data.children().first().text();
        release = data.children().last().children().text();

        json.title = title;
        json.release = release;
    })

    $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
    })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function
/*
fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})*/

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//res.send('Check your console!')
/*
    }) ;
})
app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
*/
var request = require('request');
var cheerio = require('cheerio');
request('https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    //console.log(html);
    var $=cheerio.load(html);

        console.log("ok");
        console.log($('.value').first().text());
        var prix=$('.value').first().text();
        //a nettoyer
      prix=prix.replace(/[^0-9]+/ig,"");
      //prix nettoyé
      //  console.log(prix);
      //  console.log($('.value').eq(0).text());
      //  console.log($('.value').eq(1).text());
        var villeCP=$('.value').eq(1).text();
        console.log($('.value').eq(2).text());
        var typeDeBien=$('.value').eq(2).text();
        //console.log($('.value').eq(3).text());
        //var nombreDePieces=$('.value').eq(3).text();
        var surface=$('.value').eq(4).text();
        surface=surface.replace(/[^0-9]+/ig,"");
        surface=surface.slice(0,surface.length-1);
        //retiré le carre
        console.log(surface);
        //console.log($('.value').eq(5).text());
        //console.log($('.value').eq(6).text());

 ////////////////////////////// meilleursagents
      ville=villeCP.replace(/[0-9]/g,"").toLowerCase();
      ville=ville.replace(/\s/g,'');//remove space
      cp=villeCP.replace(/[^0-9]+/ig,"");
      urlMeilleursAgents="https://www.meilleursagents.com/prix-immobilier/"+ville+"-"+cp;
      console.log(urlMeilleursAgents);
      request(urlMeilleursAgents, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          console.log(html);
          var $=cheerio.load(html);

          console.log("ok");
          //console.log($('.t-right').text());
          $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
            var data=$(this).text();

            prixMoyenAppartement=data;
            prixMoyenAppartement=prixMoyenAppartement.replace(/[^0-9]+/ig,"");
            console.log(prixMoyenAppartement);
          })
        }
      })
  }
});
