var fs = require('fs');

module.exports = {
	getMpd: function(req,res) {
		res.setHeader( "Content-type", "text/xml" );
		fs.readFile('./assets/sample.mpd', function(err, data) {
			if(err) {
				return res.badRequest(err);
			}
			return res.send(data);
		});
	},
	berlad: function(req,res) {
		res.setHeader( "Content-type", "text/xml" );
		fs.readFile('./assets/berlad.mpd', function(err, data) {
			if(err) {
				return res.badRequest(err);
			}
			return res.send(data);
		});
	}
}
