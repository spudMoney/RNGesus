const http = require('http');
const port = 61821;

function roll(numDice, dieAmt) {
	return numDice * Math.floor(Math.random() * dieAmt + 1);
}

function parseRoll(rollText) {
	var reggie = /^(\d+)D(\d+)$/i;
	if (reggie.test(rollText)) {
		var matches = reggie.exec(rollText);
		return roll(matches[1], matches[2]);
	}
	else return "bruh I can't read that";
}

function rollHandler(req, res) {
	if (req.method == 'POST') {
          var body = '';
          req.on('data', function (data) {
              body += data;
          });
          req.on('end', function () {
              console.log("Received roll request: " + body);
		  	  var rollBody = parseRoll(body);
		  	  var rollHead = "";
		  	  switch(rollBody){
				  case 420:
					rollHead = "You rolled MAD BLUNTZ SON ";
					  break;
				  case 404:
					rollHead = "404: roll not found";
					rollBody = "";
					  break;
				  default:
					rollHead = "You rolled ";
					  break;
			  }
			  var rollResponse = rollHead + rollBody;
			  res.writeHead(200, {'Content-Type': 'text/html'});
	          res.end(rollResponse);
          });
      }
      else
      {
          res.writeHead(403, {'Content-Type': 'text/html'});
          res.end("QUIT THAT");
      }
}

const server = http.createServer(rollHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Unable to start server:', err);
  }

  console.log(`Listening on ${port}`);
})
