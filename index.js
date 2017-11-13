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
}

var strs = ["user","product"];

strs.forEach(function(s){
    var data = require('./data/'+s+'.json');
    gen(data,'/tmpl/form.ejs', "./output/"+s+"/form");
    gen(data,'/tmpl/table.ejs',"./output/"+s+"/table");
    gen(data,'/tmpl/view/detail-js.ejs', "./output/"+s+"/form-js", {delimiter: '?'});
    gen(data,'/tmpl/view/list-js.ejs', "./output/"+s+"/list-js", {delimiter: '?'});
});

var routers = ["product"];
routers.forEach(function(s){
    var data = require('./data/'+s+'-router.json');
    gen(data,'/tmpl/router.ejs', "./output/route/"+s);
});