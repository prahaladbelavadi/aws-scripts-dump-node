require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working
const fs = require("fs");
const AWS = require('aws-sdk');



const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
  

const fileData = fs.readFileSync('./js-sdk-dv-v2.pdf');

const params = {
	Bucket: process.env.BUCKET_NAME, 
	Key: './js-sdk-dv-v2.pdf', 
	Body: fileData,
    ContentType: 'application/pdf',
    CacheControl: "max-age=172800",
	// ACL: "public-read", 
};

s3.upload(params, function(error, data) {
	if (error) {
		throw error;
	}
	console.log(`File was Uploaded Successfully. ${data.Location}`);
});