import config from "./config"
import credentials from "./credentials"
import ErrorHandler from "./error"
import Keywords from "./keywords"

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

export default new class Socket {
  constructor(){
    this._IO_ = null;
    this.socket = null;
  }

  connect(onConnected) {
    if(!this._IO_) {
      this._IO_ = sailsIOClient(socketIOClient);
      this._IO_.sails.autoConnect = false;
      this._IO_.sails.headers = {
        "Authorization" : 'Bearer ' + credentials.getAccessToken(),
        "x-appname" : config['xAppName'],
        "x-apikey" : config['xApiKey']
      };
    } else {
      try{ this.socket.disconnect(); }catch(err){}
    }
    
    this.socket = this._IO_.sails.connect(config['apiUrl'], {
      query: "" +
        "Authorization=Bearer " + credentials.getAccessToken() +
        "&x-appname=" + config['xAppName'] +
        "&x-apikey=" + config['xApiKey']
    });

    this.socket.socketId = "WebBooking_" + randomID();
    this.socket.on('connect', ()=>{
      console.info("Socket Connected!");
      onConnected ? onConnected(null, this.socket) : "";
    });

    this.socket.on('disconnect', function(){
      console.error("Socket Disconnected!");
    });

    this.socket.on('error', function(error){
      console.info("Socket Error:", error);

      onConnected ? onConnected("error") : "";
    });
  }
}

function randomID() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 10; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}