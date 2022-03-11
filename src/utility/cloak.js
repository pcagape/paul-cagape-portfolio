// Decrypting Mechanism
import config from "./config"

var crypto = require("crypto");
var CryptoJS = require("crypto-js");

export default new class Cloak {
  constructor(){}

  encrypt(msg) {
    var cipher = crypto.createCipher('aes-128-ecb', config['passKey']);
    msg = cipher.update(msg, "utf8", "hex");
    msg += cipher.final("hex");
    
    return msg;
  }

  decrypt(msg) {
    var decipher = crypto.createDecipher('aes-128-ecb', config['passKey']);
    msg = decipher.update(msg, "hex", "utf8");
    msg += decipher.final("utf8");
    
    return msg;
  }
  
  encode64(value) {
    var wordArray = CryptoJS.enc.Utf8.parse(value);
    return CryptoJS.enc.Base64.stringify(wordArray);
  }

  decode64(value) {
    var parsedWordArray = CryptoJS.enc.Base64.parse(value.toString());
    return parsedWordArray.toString(CryptoJS.enc.Utf8);
  }

};