const express = require("express"),
  app = express(),
  storiesRouter = require("./routes/routerStories"),
  articleRouter = require("./routes/router"),
  routerGallery = require("./routes/routerGallery"),
  PORT = 5000,
  os = require('os');

  const nets = os.networkInterfaces();
  const results = {}; // Or just '{}', an empty object
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  let IP = results.Ethernet[0];

  console.log('Conectar de forma local a:');
  console.log(`http://${IP}:${PORT}/`);

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.set("view engine", "ejs");

/*---------------------------------------------
ROUTERS
---------------------------------------------*/
app.use(articleRouter);
app.use(storiesRouter);
app.use(routerGallery);

/*---------------------------------------------
EXTRAS
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

// app.listen(5000);
app.listen(PORT)
