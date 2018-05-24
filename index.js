var ejs = require('ejs');
var fs = require('fs');

function gen(data, templateFile, outputFile, option){
    var htmlContent = fs.readFileSync(__dirname + templateFile, 'utf8');
    var output = ejs.render(htmlContent, data, option);
    fs.writeFile(outputFile, output, function(err) {
        console.log('Generating: ', templateFile, ",", outputFile);
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
};

var concat = require('concat-files');
function concateGened(
    name,
    filename,
    content_file_path,
    js_file_path
 ){
    concat([
        __dirname+'/tmpl/flagment/front.ejs',
        __dirname+content_file_path,
        __dirname+'/tmpl/flagment/jsinclude.ejs',
        __dirname+js_file_path,
        __dirname+'/tmpl/flagment/back.ejs'
      ], 
      __dirname+'/output/'+name+"/"+filename
      , function(err) {
        if (err) throw err
        console.log('done');
      });
 };

 var mv = require('mv');
 function move(src, dest){
    mv(src, dest, function(err) {
        console.log(err);
      });
 };

//var strs = ["product","application"];
//var strs = ["config.wechat","config.mis"];
var strs = ["subject","grade","course"];

strs.forEach(function(s){
    var data = require('./data/'+s+'.json');
    gen(data,'/tmpl/form.ejs', "./output/"+s+"/form");
    gen(data,'/tmpl/table.ejs',"./output/"+s+"/table");
    gen(data,'/tmpl/view/detail-js.ejs', "./output/"+s+"/form-js", {delimiter: '?'});
    gen(data,'/tmpl/view/list-js.ejs', "./output/"+s+"/list-js", {delimiter: '?'});
    gen(data,'/tmpl/page/list-page.ejs', "./output/"+s+"/list-page", {delimiter: '?'});
    gen(data,'/tmpl/page/detail-page.ejs', "./output/"+s+"/detail-page");
    concateGened(s,s+"-list.ejs", 
    "/output/"+s+"/list-page", 
    "/output/"+s+"/list-js");
    concateGened(s,s+"-detail.ejs", 
    "/output/"+s+"/detail-page", 
    "/output/"+s+"/form-js");
});

var routers = ["subject"];
routers.forEach(function(s){
    var data = require('./data/'+s+'-router.json');
    gen(data,'/tmpl/router.ejs', "./output/route/"+s);
});