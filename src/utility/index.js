import config from "./config";
import Request from "./request";
import credentials from "./credentials";
import ErrorHandler from "./error";
import keywords from "./keywords";
import Cloak from "./cloak";
import Cloudinary from "./cloudinary";
import SocketIO from "./socket";
import Rules from "./rules";

// Prevent Cache
$.ajaxSetup({ cache: false });

export default new class UTILITIES {
  constructor(){
    this.socket = SocketIO;
    this.config = config;
    this.keywords = keywords;
    this.error = ErrorHandler;
    this.credentials = credentials;
    this.request = Request;
    this.cloudinary = Cloudinary;
    this.cloak = Cloak;
    this.rules = Rules;
  }
};