const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
module.exports.s3 = new AWS.S3();
module.exports.ses = new AWS.SES({ apiVersion: "2010-12-01" });
