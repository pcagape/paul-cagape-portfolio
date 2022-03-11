import Request from "./request";
import config from "./config";
import credentials from "./credentials";
import async from "async";
import moment from "moment";
import superagent from "superagent";
import Cloudinary from "cloudinary";


function processFiles(file, callback) {
  const reader = new FileReader();

  reader.addEventListener("load", e => callback(null, e.target.result));
  reader.addEventListener("abort", e => callback("aborted"));
  reader.addEventListener("error", e => callback(e));
  reader.readAsDataURL(file);
}

function uploadVideo(file, progressCb, callback) {
  let user = null;

  try {
    user = credentials.getAttribute("UserData");
  } catch (e) {
    return callback("User info not found.");
  }
  var oldFile = file;
  file = dataURItoBlob(file);

  const data = {
    format : file.type.slice(6),
    tags : user.id + "-" + "video",
    timestamp : moment().unix(),
    type : "upload"
  };

  async.waterfall([
    function (waterfallCb) {
      processFiles(file, function (err, fileData) {
        if (err) {
          return waterfallCb(err);
        }

        waterfallCb(null, fileData);
      });
    },
    function (fileData, waterfallCb) {
      Request.post("cloudinary-key-v2?format=mp4&tags=micab×tamp=in+seconds",
        data,
        function (err, access) {
          if (err) {
            return  waterfallCb(err);
          }

          waterfallCb(null, fileData, access);
        }, {
          'Authorization': 'Bearer ' + credentials.getAccessToken(),
          'X-AppName': config['xAppName'],
          'X-ApiKey': config['xApiKey']
        });
    },
    function (fileData, access, waterfallCb) {
      const payload = {
        file : oldFile,
        ...data,
        api_key : access.apiKey,
        signature : access.signature
      };

      superagent
        .post(config.cloudinaryUrl + "/video/upload")
        .send(payload)
        .set("Accept", "application/json")
        .on("progress", (e) => progressCb(e.percent || 0))
        .end((err, res) => {
          if (err) {
            return waterfallCb(err);
          }

          waterfallCb(null, res.body);
        });
    }
  ], function (err, waterfallResult) {
    if (err) {
      return callback(err);
    }

    callback(null, waterfallResult);
  });
}

function uploadImage(file, progressCb, callback) {
  let user = null;

  try {
    user = credentials.getAttribute("UserData");
  } catch (e) {
    return callback("User info not found.");
  }
  var oldFile = file;
  file = dataURItoBlob(file);

  const data = {
    format : file.type.slice(6),
    tags : user.id + "-" + "photo",
    timestamp : moment().unix(),
    type : "upload"
  };

  async.waterfall([
    function (waterfallCb) {
      processFiles(file, function (err, fileData) {
        if (err) {
          return waterfallCb(err);
        }

        waterfallCb(null, fileData);
      });
    },
    function (fileData, waterfallCb) {
      Request.post("cloudinary-key-v2?format=png&tags=micab×tamp=in+seconds",
        data,
        function (err, access) {
          if (err) {
            return  waterfallCb(err);
          }

          waterfallCb(null, fileData, access);
        }, {
          'Authorization': 'Bearer ' + credentials.getAccessToken(),
          'X-AppName': config['xAppName'],
          'X-ApiKey': config['xApiKey']
        });
    },
    function (fileData, access, waterfallCb) {
      const payload = {
        file : oldFile,
        ...data,
        api_key : access.apiKey,
        signature : access.signature
      };

      superagent
        .post(config.cloudinaryUrl + '/image/upload')
        .send(payload)
        .set("Accept", "application/json")
        .on("progress", (e) => progressCb(e.percent || 0))
        .end((err, res) => {
          if (err) {
            return waterfallCb(err);
          }

          waterfallCb(null, res.body);
        });
    }
  ], function (err, waterfallResult) {
    if (err) {
      return callback(err);
    }

    callback(null, waterfallResult);
  });
}

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (!dataURI) {
    throw new Error("dataURI is undefined.");
  } else  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

function convertURIToImageData(URI) {
  return new Promise(function(resolve, reject) {
    if (URI == null) return reject();
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        image = new Image();
    image.addEventListener('load', function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
}

export default {
  uploadVideo,
  uploadImage,
  processFiles
};
