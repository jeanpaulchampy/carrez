

var express=require('express');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require("body-parser");
let app=require('express')()

var server= express();

var result;
server.set('view engine','ejs')
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/scrape', function(requete, response1) {

  var urlpost = requete.body.url;
  console.log("urlpost=" + urlpost);



var url=urlpost;

request(url, function (error, response, html) {

  if (!error && response.statusCode == 200) {

    var $=cheerio.load(html);

        console.log("ok");
        console.log($('.value').first().text());
        var prix=$('.value').first().text();

      prix=prix.replace(/[^0-9]+/ig,"");

        var villeCP=$('.value').eq(1).text();
        console.log($('.value').eq(2).text());
        var typeDeBien=$('.value').eq(2).text();

        var surface=$('.value').eq(4).text();
        surface=surface.replace(/[^0-9]+/ig,"");
        surface=surface.slice(0,surface.length-1);

        console.log(surface);


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

          $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
            var data=$(this).text();

            prixMoyenAppartement=data;
            prixMoyenAppartement=prixMoyenAppartement.replace(/[^0-9]+/ig,"");
            console.log(prixMoyenAppartement);
          })
        $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').filter(function(){
          var data=$(this).text();

          prixMoyenMaison=data;
          prixMoyenMaison=prixMoyenMaison.replace(/[^0-9]+/ig,"");
          console.log(prixMoyenMaison);
        })

        if(typeDeBien==="Appartement")
        {
            console.log(typeDeBien);
            console.log(prix/surface);
            if(prix/surface>prixMoyenAppartement)
            {
              console.log("Mauvais deal");

              result="Mauvais Deal";

            }
            else
            {
              console.log("Bon deal");
              result="Bon Deal";
            }

        }
        if(typeDeBien==="Maison")
        {
            console.log(typeDeBien);
            console.log(prix/surface);
            if(prix/surface>prixMoyenMaison)
            {
              console.log("Mauvais deal");
              result="Mauvais Deal";
            }
            else
            {
                console.log("Bon deal");
                result="Bon Deal";
            }
        }
        response1.render('pages/index',{deal:result})

    }
  });
}
});


});



server.listen(80);
