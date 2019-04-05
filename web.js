var express = require('express');
var md5 = require('md5');
var port = process.env.PORT || 8080;
var app = express();

var querystring = require('querystring');
var https = require('https');



var GoogleSpreadsheet = require('google-spreadsheet');

function parseRowData(holder, row){
  holder.push({
    name: row.name,
    image: row.image,
    value: row.value,
    effect: row.effect
  });
}

function getSheetDataByIndex(sheetIndex, res){
  // spreadsheet key is the long id in the sheets URL
  var doc = new GoogleSpreadsheet('1fn-l3VrxWTMx_sDIJAyYYoprQA2tQzVSyJU8637yYw8');
  var sheet;

  doc.getInfo(function(err, info) {
    
    var data = new Array();
    var sheet = info.worksheets[sheetIndex];
        sheet.getRows({
          offset: 1
        }, function( err, rows ){
          
          for(i in rows){
            parseRowData(data, rows[i]);
          }

          res.send(data);
        });//end get rows
  
  });//end get info
}

function getSheetDataByTitle(sheetTitle, res){
  // spreadsheet key is the long id in the sheets URL
  var doc = new GoogleSpreadsheet('1fn-l3VrxWTMx_sDIJAyYYoprQA2tQzVSyJU8637yYw8');
  var sheet;

  doc.getInfo(function(err, info) {
    
    var data = new Array();

    for(var i in info.worksheets){
      //console.log(info.worksheets[i].title)
      if(info.worksheets[i].title == sheetTitle){ sheet = info.worksheets[i];}
    }

    var data = new Array();

    sheet.getRows({
      offset: 1
    }, function( err, rows ){
      
      for(i in rows){
        parseRowData(data, rows[i]);
      }

      res.send(data);
    });//end get rows

  
  });//end get info
}

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

app.use(express.static('public'));


app.get('/json/heros', function(req, res){
  var doc = new GoogleSpreadsheet('1fn-l3VrxWTMx_sDIJAyYYoprQA2tQzVSyJU8637yYw8');

  res.setHeader('Content-Type', 'application/json');

  doc.getInfo(function(err, info) {
    //heros
    sheet = info.worksheets[0];
  
    sheet.getRows({
      offset: 1
    }, function( err, rows ){
      
      var heros = new Array();

      for(i in rows){
        heros.push({
          class : rows[i].class,
          atk : rows[i].atk,
          def : rows[i].def,
          abilities : rows[i].abilities,
          startLife : rows[i].startlife,
          equipment : rows[i].equipment,
          gold : rows[i].gold
        });
      }
      //console.log(heros);

      res.send(heros);

    });//end get rows
  
  });//end get info

});

app.get('/json/items', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  //getSheetDataByIndex(2, res);
  getSheetDataByTitle('Data - items', res);
});

app.get('/json/spells', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  //getSheetDataByIndex(5, res);
  getSheetDataByTitle('Data - Spels', res);
});

app.get('/json/weapons', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  //getSheetDataByIndex(3, res);
  getSheetDataByTitle('Data - Weapons', res);
});

app.get('/json/armor', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  //getSheetDataByIndex(4, res);
  getSheetDataByTitle('Data - Armor', res);
});

app.get('/json/expert_skills', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  //getSheetDataByIndex(1, res);
  getSheetDataByTitle('Data - Expert Skills', res);
});

//testing git webhooks
app.get('/gitpushevent', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  console.log(res.body);

  res.send(["ok"]);
});


app.listen(port, function(){
	console.log('Listen on '+port);
});