var http = require("http");
var fs = require("fs");
http.createServer(function (request,response) {
	response.writeHead(200,{'Content-Type': 'video/mp4'});
	var rs = fs.createReadStream("sample.mp4");
	rs.pipe(response);
}).listen(3000);