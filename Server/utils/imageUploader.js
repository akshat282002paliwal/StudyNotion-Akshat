const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async(file, folder, height, quality) => {
    try {
    const options = { 
        folder,
        resource_type : "auto",
    };
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    return response;
} catch (error) {

    console.log("CLOUDINARY ERROR:", error);

  }

};