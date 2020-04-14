const express=require('express');
const app=express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/timestamp/:date_string?',
  (req, res, next) => {
    if (req.params.date_string !== undefined) {
      req.d = isNaN(req.params.date_string) ?
        new Date(req.params.date_string) :
        new Date(parseInt(req.params.date_string));
      if (req.d == 'Invalid Date') res.json({ error: 'Invalid Date' });
      next();
    }
    req.d = new Date(Date.now());
    next();
  },
  (req, res) => {
    res.json({ unix: req.d.getTime(), utc: req.d.toUTCString() });
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
