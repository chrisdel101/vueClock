require('dotenv').config()
const https = require('http')
const fs = require('fs')
const path = require('path')
const Twitter = require('twitter')
const streamTransform = require('stream').Transform
const Stream = require('stream')




const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
// console.log(client)
// var params = {
// 	screen_name: 'The_Separator'
// };
//
// client.get(' https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672', params, function(error, tweets, response) {
// 	if (!error) {
// 		console.log(tweets);
// 	} else {
// 		console.log('ERROR', error)
// 	}
// });
https.createServer(function(req, res) {

	console.log(`${req.method} request for ${req.url}`)

	//if req is homepage-
	// serve index file with fs.readFile(path)
	if (req.url === "/") {


		//-----------HOME PAGE ---------------
		// after file is read, then the callbacj fires and response is sent
		fs.readFile("./index.html", "UTF-8", function(err, html) {

			// this is reponse
			res.writeHead(200, {
				"Content-Type": "text/html"
			})
			res.end(html);
		});

	} else if (req.url === "/twitter") {
		// let body = [];
		new Promise((resolve, reject) => {
				var data = new streamTransform()

				req.on('error', (err) => {
					if (err) {
						console.error(err);
						reject(error)
					}
				}).on('data', (chunk) => {
					// console.log(chunk)
					data.push(chunk)
				}).on('end', () => {
					data = data.read()
					var bufferStream = new Stream.PassThrough()

					// Write your buffer
					bufferStream.end(new Buffer(data))
					// if (body === typeof 'string') {
					// body = Buffer.concat(body).toString();
					// }
					// console.log('body', body)
					// console.log('body', body)
					resolve(bufferStream)
				})
			})
			.then(base64Data => {
				console.log('base64', base64Data)
				// base64Data.pipe(process.stdout)
				// base64Data = base64Data.replace(/^data:image\/png;base64,/, "")
				// base64Data += base64Data.replace('+', ' ')
				// let binaryData = new Buffer(base64Data, 'base64').toString('binary')

				// console.log(base64Data.substring(0, 40))
				// new Promise((resolve, reject) => {
				// fs.writeFile("clock", binaryData, 'binary', (err) => {
				// 	if (err) {
				// 		throw err
				// 		// reject(err)
				// 		// } else {
				// 		// 	resolve(base64Data)
				// 		// }
				// 	}
				// 	console.log('The file has been saved!');
				//
				// })
				// .then(data => {
				// 	data = data.replace(/^data:image\/png;base64,/, "");
				// 	console.log('base64', data.substring(0, 20))
				//
				// })
				// .catch(err => console.error(err))
				// fs.unlink('out.png', function(err) {
				// 	if (err) {
				// 		error('Unlink error', err)
				// 	}
				// 	console.log('unlinked')
				// })
				// 	// image = new Buffer(image).toString('base64')
				// 	// console.log(image)
				// 	// var params = {
				// 	// 	screen_name: 'nodejs'
				// 	// };
				// 	// // client.get('statuses/user_timeline', params, function(error, tweets, response) {
				// 	// // 	if (!error) {
				// 	// // 		console.log(tweets);
				// 	// // 	}
				// 	// // });
				// 	let imageFile = fs.readFileSync('/Users/chrisdielschnieder/desktop/screenshot.png')
				// 	// console.log('image', image)
				// 	client.post('/media/upload', {
				// 		media: imageFile
				// 	}, function(error, media, response) {
				// 		if (error) {
				// 			console.log(error);
				// 			throw new Error
				// 		}
				//
				// 		console.log(media); // Tweet body.
				// 		console.log(response); // Raw response object.
				// 		// });
				// 		// client.post('media/upload', {
				// 		// 	media: '/desktop/screenshot'
				// 		// }, function(error, media, response) {
				// 		// 	console.log(image)
				// 		// 	if (!error) {
				// 		//
				// 		// 		// If successful, a media object will be returned.
				// 		// 		console.log(media);
				// 		//
				// 		// Lets tweet it
				// 		var status = {
				// 			status: 'I am a tweet',
				// 			media_ids: media.media_id_string // Pass the media id string
				// 		}
				// 		//
				// 		client.post('statuses/update', status, function(error, tweet, response) {
				// 			if (!error) {
				// 				console.log(tweet);
				// 			}
				// 		});
				// 		//
				// 		// 	} else {
				// 		// 		console.error('Error', error)
				// 		// 	}
				// 	});
				// 	// const options = {
				// 	// 	hostname: 'upload.twitter.com',
				// 	// 	path: '/1.1/media/upload.json',
				// 	// 	method: 'POST',
				// 	// 	headers: {
				// 	// 		'Content-Type': 'application/x-www-form-urlencoded'
				// 	// 	}
				// 	// }
				// 	// console.log('options', options)
				// 	// const req = https.request(options, (res) => {
				// 	// 	console.log('request made')
				// 	// 	// console.log(`STATUS: ${res.statusCode}`);
				// 	// 	// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
				// 	// 	// res.setEncoding('utf8');
				// 	// 	// res.on('data', (chunk) => {
				// 	// 	// 	console.log(chunk)
				// 	// 	// 	console.log(`BODY: ${chunk}`);
				// 	// 	// });
				// 	// 	// res.on('end', () => {
				// 	// 	// 	console.log('No more data in response.');
				// 	// 	//
				// 	// 	// });
				// 	// });
				// 	//
				// 	// req.on('error', (e) => {
				// 	// 	console.error(`problem with request: ${e.message}`);
				// 	// });
				// 	// req.write(image)
				// }).catch((e) => {
				//
				// 	console.error('error', e)
			})





		// -------------404-----------------------
		// if not homepage, return headers that respond with 404
	} else {
		res.writeHead(404, {
			"Content-Type": "text/plain"
		});
		res.end("404 file not found")

	}

}).listen(3000); //server req


console.log("File Server is running on port 3000")