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


app.get('/solucoes', function(req, res){

  var doc = new GoogleSpreadsheet('1fn-l3VrxWTMx_sDIJAyYYoprQA2tQzVSyJU8637yYw8');
  
    res.setHeader('Content-Type', 'application/json');

    var outPut = '';
  
    doc.getInfo(function(err, info) {
      //heros
      sheet = info.worksheets[7];
    
      sheet.getRows({
        offset: 1
      }, function( err, rows ){
        
        var heros = new Array();
        var block = '';
        var sector = 1;
  
        for(i in rows){
          var c1 = (rows[i].essential != '') ? '' : 'off';
          var c2 = (rows[i].smart != '') ? '' : 'off';
          var c3 = (rows[i].expert != '') ? '' : 'off';
          var c4 = (rows[i].interface != '') ? '' : 'off';

          if(rows[i].pai != ''){
            console.log(rows[i].pai);
            if(sector > 1){ 
              block += '</div><!-- END DATA BLOCK -->'; 
              outPut = outPut + block;
            }
            block = `
              <div class="data_block" ng-class="{'open' : sectorSelected['${sector}'] == true}">
                <div class="row row--title" ng-click="toggleSector('${sector}');">
                    <div class="column c1">
                        <div class="sprite icon_arrow_toggle"></div> ${rows[i].pai}
                    </div>
                    <div class="column c2"></div>
                    <div class="column c3"><div class="mark ${c2}"></div></div>
                    <div class="column c4"><div class="mark ${c3}"></div></div>
                    <div class="column c5"><div class="mark ${c4}"></div></div>
                </div><!-- /end row -->
            `;
            sector ++;
          }//end sector parse

          if(rows[i].sub != ''){
            block += `
            <div class="row row--sub_title">
                <div class="column c1">${rows[i].sub}</div>
                <div class="column c2"></div>
                <div class="column c3"><div class="mark ${c2}"></div></div>
                <div class="column c4"><div class="mark ${c3}"></div></div>
                <div class="column c5"><div class="mark ${c4}"></div></div>
            </div><!-- /end row -->
            `;
          }//end sub sector

          if(rows[i].subsub != ''){
            block += `
            <div class="row row--content">
              <div class="column c1">${rows[i].subsub}</div>
              <div class="column c2"></div>
              <div class="column c3"><div class="mark ${c2}"></div></div>
              <div class="column c4"><div class="mark ${c3}"></div></div>
              <div class="column c5"><div class="mark ${c4}"></div></div>
          </div><!-- /end row -->
            `;
          }//end item

          /*
          heros.push({
            pai : rows[i].pai,
            sub : rows[i].sub,
            subsub : rows[i].subsub,
            Essential : rows[i].essential,
            Smart : rows[i].smart,
            Expert : rows[i].expert,
            Interface : rows[i].interface
          });
          */
        }
        //console.log(heros);

        //é preciso fazer isto no fim porque senão ficamos sem o ultimo bloco
        block += '</div><!-- END DATA BLOCK -->'; 
        outPut = outPut + block;
  
        res.send(outPut);
  
      });//end get rows
    
    });//end get info

});

app.listen(port, function(){
	console.log('Listen on '+port);
});