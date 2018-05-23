# node_template_gen
Very simple text generator with EJS


## Usage
```javascript
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

var routers = ["store"];
routers.forEach(function(s){
    var data = require('./data/'+s+'-router.json');
    gen(data,'/tmpl/router.ejs', "./output/route/"+s);
});
```
### data
```javascript
{
    "model":"user",
    "row_prefix":"user.",
    "fields":
        [
            {"type":"input", "label":"产品编号", 
                "name":"serial","required":"true"},
            {"type":"input", "label":"产品名称", 
                "name":"name","required":""},
            {"type":"input","label":"产品简介","name":"desc"}
        ]
}
```
### data-router
```javascript
{
    "listTemplate":"manage/application/application-list.ejs",
    "listApi":"/applications?",
    "detailTemplate":"manage/application/application-detail.ejs",
    "detailApi":"/application/",
    "detailPostApi":"/application/"
}
```
### /config/mysql.x.json
```javascript
{
    "user": "x",
    "password": "x",
    "host": "x",
    "port": "x",
    "database": "x"
}
```

