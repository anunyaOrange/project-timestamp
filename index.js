// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  const d = req.params.date;
  console.log(`req.params.date: '${d}'`);

  const dInt = Number(req.params.date);
  console.log(`Numbering date: '${dInt}'`);

  let date;
  if (dInt) {
    // If d is a number, treat it as a timestamp
    date = new Date(dInt);
  } else {
    // Otherwise, treat it as a date string
    date = new Date(d);
  }

  console.log('date', date);
  let result = {}
  if (d === undefined || d === '') {
    const now = new Date();
    result.unix = now.getTime();
    result.utc = now.toUTCString();
  } else if (!isNaN(date) && date.toString() !== 'Invalid Date') {
    result.unix = date.getTime();
    result.utc = date.toUTCString();
  } else {
    result.error = "Invalid Date";
  }
  console.log('result', result);
  res.json(result);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
