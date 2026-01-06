const cloudinary = require("../config/cloudinary.js");

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (error, result) => {
        console.log("Error ", error, "Resule ", result);
        if (error) reject(error);
        else resolve(result);
      })
      .end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
