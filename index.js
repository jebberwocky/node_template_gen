var ejs = require('ejs');
var fs = require('fs');

function gen(data, templateFile, outputFile){
    var htmlContent = fs.readFileSync(__dirname + templateFile, 'utf8');
    var output = ejs.render(htmlContent, data);
    fs.writeFile(outputFile, output, function(err) {
        console.log('Generating: ', templateFile, ",", outputFile);
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

var data = require('./data/data.json');
gen(data,'/tmpl/form.ejs', "./output/form");
gen(data,'/tmpl/table.ejs',"./output/table" );

var user = require('./data/user.json');
gen(user,'/tmpl/form.ejs', "./output/user/form");
gen(user,'/tmpl/table.ejs',"./output/user/table" )