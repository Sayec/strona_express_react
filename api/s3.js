require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const bucketName = 'my-astro-images';
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
console.log(process.env);
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

function deleteFile(fileKey) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.deleteObject(deleteParams, (err) => {
    if (err) console.log(err);
    else console.log('deleted');
  });
}
exports.deleteFile = deleteFile;
