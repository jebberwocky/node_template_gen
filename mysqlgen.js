var ejs = require('ejs');
var fs = require('fs');
var mysqlspec = require('mysqlspec');

var config = require('./config/mysql.json');

var typeMapping = {
    "integer":"number",
    "string":"input",
    "date":"date"
};

var labelMapping = require('./config/namemapping.json');

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

var name = 'application';
mysqlspec(config,'gse_base',name, function (err, schema) {
    if(!err){
        for(var k in schema.properties){
            var x = schema.properties[k];
            x.type = typeMapping[x.type];
            x.label = labelMapping[k];
        }
        //console.log(schema);
        gen({
            "name":name,
            "schema":schema},
            '/tmpl/schema/mysqlgen.ejs', 
            "./data/"+name+".json");
    }else{
        console.log(err);
    }
 });