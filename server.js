var express = require('express');
var app = express();



// Heroku

app.set("port",(process.env.PORT || 8086));
app.use(express.static(__dirname + "/dist"));

app.listen(app.get("port"), function(){
  console.log("Servidor corriendo en ", app.get("port"));
});

