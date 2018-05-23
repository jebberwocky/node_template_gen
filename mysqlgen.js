var ejs = require('ejs');
var fs = require('fs');
var mysqlspec = require('mysqlspec');

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

function rungen(prama){
    if(!prama){
        console.log("no config info");
        return;
    }
    var name = prama.table;
    let config = require('./config/mysql.'+prama.schema+'.json');
    mysqlspec(config,prama.schema,name, function (err, schema) {
        
        if(!err){
            for(var k in schema.properties){
                var x = schema.properties[k];
                x.type = typeMapping[x.type];
                x.label = labelMapping[k];
            }
            console.log('---schema---');
            console.log(schema);
            let required = (schema.required)?schema.required:[];
            gen({
                "name":name,
                "schema":schema,
                "required":required
            },
                '/tmpl/schema/mysqlgen.ejs', 
                "./data/"+name+".json");
        }else{
            console.log(err);
        }
    });
}


let tables = ['course','lesson','subject','grade'], schema="ese_instance";

for(t in tables){
    rungen({
        "schema":schema,
        "table":tables[t]
    });
}


