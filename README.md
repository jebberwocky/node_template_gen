# node_template_gen
Very simple text generator with EJS


## Usage
```javascript
var user = require('./data/user.json');
gen(user,'/tmpl/form.ejs', "./output/user/form");
gen(user,'/tmpl/table.ejs',"./output/user/table" )
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

