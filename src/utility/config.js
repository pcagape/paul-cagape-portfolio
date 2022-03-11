/* Configuration */
/*****************************************
    INTIALIZE Commons
*****************************************/
import _ from "underscore";
import jQuery from "jquery";

_.mixin(require('safe-obj'));

window._ = _;
global.jQuery = global.$ = window.jQuery = window.$ = jQuery;

// Include Bootstrap
require("bootstrap");

// Include HighCharts
require("highcharts");

// Include HighCharts
var TableExport = require("tableexport");
global.TableExport = window.TableExport = TableExport;

// Include Toastr
global.toastr = window.toastr = require("toastr");


// Version in packege.json
let _VERSION_ = require('../../../package.json').version,
    _VERSION_MAJOR_ = _VERSION_.split('.')[0],
    _VERSION_MINOR_ = _VERSION_.split('.')[1],
    _VERSION_PATCH_ = _VERSION_.split('.')[2],
    _VERSION_RC_ = require('../../../package.json')['version-rc'];

let urlParts = location.href.split('/');
let _PROTOCOL_ = urlParts[0];
let _HOST_ = urlParts[2].toLowerCase();

let _DEBUG_ = false;
// DEVELOPMENT
if(_HOST_.indexOf('localhost') > -1 ||
   _HOST_.indexOf('test') > -1 ||
   _HOST_.indexOf('staging') > -1)
    _DEBUG_ = true;
// PRODUCTION
else
  _DEBUG_ = false;

// Added Release Candidate
//if(_DEBUG_)
_VERSION_ += _VERSION_RC_ ? " rc" + _VERSION_RC_ : "";

// Add version on title
document.title = document.title + " v" + _VERSION_;

// log Version
console.log("Version:", _VERSION_);

// log URL
console.log("BaseUrl:", _HOST_);

// Disable console.log and info for PRODUCTION
// if(!_DEBUG_) {
//   global.console.log = ()=>{};
//   global.console.info = ()=>{};
// }

//
// START OF CONFIGURATION
//
let CONFIGURATION = {
  version: _VERSION_,
  debugMode: _DEBUG_,
  baseUrl: _HOST_,

	//
	//	App Settings
	//
	xAppName: "co.micab.web",
  xApiKey:(function(){
    // DEVELOPMENT LOCALHOST
    if(_HOST_.indexOf('localhost') > -1 || _HOST_.indexOf('test') > -1)
      // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOnsibmFtZSI6ImNvLm1pY2FiLndlYiIsImRlc2NyaXB0aW9uIjoiTWljYWIgV2ViIEFwcGxpY2F0aW9uIiwidmVyc2lvbk5hbWUiOiIxLjAuMCIsInZlcnNpb25Db2RlIjowLCJhbGxvd1Byb21vcyI6dHJ1ZSwibWF4U2VhcmNoVGltZSI6NjAwMDAsIm1heFJhZGl1cyI6MjAwMCwic3RhbGVSZXF1ZXN0QWdlIjozNjAwMDAwLCJkZXZpY2UiOiJ3ZWIiLCJjcmVhdGVkQXQiOiIyMDE2LTA4LTI0VDE3OjIwOjE2LjMxMFoiLCJ1cGRhdGVkQXQiOiIyMDE2LTA4LTI0VDE3OjIwOjE2LjMxMFoiLCJpZCI6IjU3YmRkNzUwZTYzMjdkOGQxM2I0YzZjMSJ9LCJjcmVhdGVkQXQiOiIyMDE2LTA4LTI0VDE3OjIwOjE2LjM2MloiLCJtYXJrZXIiOiJlODgwMTVmMTU4YmQ2NDUzMGFlNzJlZWVjYzYwOWI3YjU4OTJkODYzZTBhZTJkYjE5MTgwN2RlMjVmYWQ5ZjhlIiwiaWF0IjoxNDcyMDU5MjE2LCJleHAiOjE2Mjk3MzkyMTYsImF1ZCI6ImNvLm1pY2FiLndlYiIsImlzcyI6ImNvLm1pY2FiIn0.nkIyexB8BPxjKpvIzua0k-VJby-YsPjpNHG5uwipvWY';
      return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY28ubWljYWIud2ViIiwiZGVzY3JpcHRpb24iOiJNaWNhYiBXZWIgQXBwbGljYXRpb24iLCJkZXZpY2UiOiJ3ZWIiLCJ2ZXJzaW9uTmFtZSI6IjAuMC4wIiwidmVyc2lvbkNvZGUiOiIwIiwiYWxsb3dQcm9tb3MiOnRydWUsIm1heFNlYXJjaFRpbWUiOjYwMDAwLCJtYXhSYWRpdXMiOjIwMDAsInN0YWxlUmVxdWVzdEFnZSI6MzYwMDAwLCJjcmVhdGVkQXQiOiIyMDE2LTA4LTA4VDAxOjI2OjA1LjY1NFoiLCJ1cGRhdGVkQXQiOiIyMDE2LTA2LTI3VDAxOjA1OjIyLjY2NloiLCJpZCI6IjU3NzA3YmQyMWUyOTEyMDEwMDIxODQzMSIsIm1hcmtlciI6IjE2MGVlYjBiYzAxODMyNDUxYzQxNjU4ZjVhYzJiNjY3NjY1YzBmZjY4YmY4YjAwYWQ1NGFkODExNjNjMGQxZTgiLCJpYXQiOjE0NzA2MTk1NjUsImV4cCI6MTYyODI5OTU2NSwiYXVkIjoiY28ubWljYWIud2ViIiwiaXNzIjoiY28ubWljYWIifQ.r0anGsX2qUsr3_OIg2FbwV9TMzDHayKWWEolzPhCDKk'; // Test
    // STAGING
    else if(_HOST_.indexOf('staging') > -1)
      return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY28ubWljYWIud2ViIiwiZGVzY3JpcHRpb24iOiJNaWNhYiBXZWIgQXBwbGljYXRpb24iLCJ2ZXJzaW9uTmFtZSI6IjEuMC4wIiwidmVyc2lvbkNvZGUiOjAsImFsbG93UHJvbW9zIjp0cnVlLCJtYXhTZWFyY2hUaW1lIjo2MDAwMCwibWF4UmFkaXVzIjoyMDAwLCJzdGFsZVJlcXVlc3RBZ2UiOjM2MDAwMDAsImRldmljZSI6IndlYiIsImNyZWF0ZWRBdCI6IjIwMTYtMDgtMDhUMDE6Mjk6NDQuMjE5WiIsInVwZGF0ZWRBdCI6IjIwMTYtMDctMDhUMDk6MTM6NDguNzU4WiIsImlkIjoiNTc3ZjZlY2M5YWU0YTEwMTAwMjU3MDk1IiwibWFya2VyIjoiZDNkYjRmZTI0OWIxMDMyODVlZDg3ZTNlNWZmMjVhOTMzNjc1NzFlYTJjNWJjMDM0OTFmZGNkYzJhYmIzN2Q3ZSIsImlhdCI6MTQ3MDYxOTc4NCwiZXhwIjoxNjI4Mjk5Nzg0LCJhdWQiOiJjby5taWNhYi53ZWIiLCJpc3MiOiJjby5taWNhYiJ9.R4BPll8yrTy6yz2TLrJmnznz4rtlnckvTsOS_eh__eM';
    // DEPLOY
    else
      return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiY28ubWljYWIud2ViIiwiZGVzY3JpcHRpb24iOiJNaWNhYiBXZWIgQXBwbGljYXRpb24iLCJkZXZpY2UiOiJ3ZWIiLCJ2ZXJzaW9uTmFtZSI6IjEuMC4wIiwidmVyc2lvbkNvZGUiOiIwIiwiYWxsb3dQcm9tb3MiOnRydWUsIm1heFNlYXJjaFRpbWUiOjYwMDAwLCJtYXhSYWRpdXMiOjIwMDAsInN0YWxlUmVxdWVzdEFnZSI6MzYwMDAwMCwiY3JlYXRlZEF0IjoiMjAxNi0wOC0wOFQwMTozMDoyMy4xOTVaIiwidXBkYXRlZEF0IjoiMjAxNi0wNi0yN1QwMTowNToyMi42NjZaIiwiaWQiOiI1NzcwN2JkMjFlMjkxMjAxMDAyMTg0MzEiLCJtYXJrZXIiOiJiZGU5N2I5MGFiZGFiYzY5MTk4OGJkYmE2YjNkNzE2ZTViYTA0OWJmMzdmMGM3Yzk2ZDY0YTY5MWYzODkzMDViIiwiaWF0IjoxNDcwNjE5ODIzLCJleHAiOjE2MjgyOTk4MjMsImF1ZCI6ImNvLm1pY2FiLndlYiIsImlzcyI6ImNvLm1pY2FiIn0.yey5MhjktYjszvubzpXk9QeIC7LGMloFexMRUM0u5Nc'; // DEPLOY
  })(),

	//
	// API
	//
	apiUrl: (function(){
    if(_HOST_.indexOf('localhost') > -1 || _HOST_.indexOf("test-console.micab.co") > -1) {
      return '//test-api.micab.co';
    } else if (_HOST_.indexOf("staging-console.micab.co") > -1) {
      return "//staging-api.micab.co";
    } else if (_HOST_.indexOf("console.micab.co") > -1) {
      return "//api.micab.co";
    }

    console.error("Error. Invalid host url.");
  })(),

  //
  // FACEBOOK
  //
  fbAppId: (function(){
    if(_HOST_.indexOf('localhost') > -1)
      return '1218499588194289'; // DEVELOPMENT LOCALHOST
    if(_HOST_.indexOf('test') > -1)
      return '1732633616976785'; // TEST
    if(_HOST_.indexOf('staging') > -1)
      return '1732634756976671'; // STAGING
    else
      return '1409743772599106'; // DEPLOY
  })(),
  fbAppSecret: (function(){
    if(_HOST_.indexOf('localhost') > -1)
      return '38da7626153a6c6e2b3fb5d204506075'; // DEVELOPMENT LOCALHOST
    if(_HOST_.indexOf('test') > -1)
      return '21ff0fc898d831c5995f15e4a7aaa34e'; // TEST
    if(_HOST_.indexOf('staging') > -1)
      return 'abc6df2f6e1ef0dc1f4b422eb2ac0a6f'; // STAGING
    else
      return 'cf1c6693156e9b0624a0cf2495dca3fc'; // DEPLOY
  })(),

  //
  // Cloudinary Settings
  //
  cloudinaryUrl: "https://api.cloudinary.com/v1_1/micabv1",

  //
  // Formats
  //
  dateFormat: "YYYY-MM-DD", // Eg. 2001-01-01
  timeFormat: "h:mm:ss A", // Eg. 12:01:01 AM
  dateTimeFormat: "YYYY-MM-DD h:mm:ss A", // Eg. 2001-01-01 12:01:01 AM

  //
  // Sockets
  //
  socketReconnectRetry: 5, // Times
  socketEmitRetry: 5, // Seconds
  socketEmitTimeout: 20, // Seconds

  //
  // Google Map
  //
  defaultZoom: 13,
  maxZoom: 18,
  minZoom: 13,

  //
  // Default user image
  //
  defaultUserImg: "images/cd-avatar.png",
  defaultSpotImg: "images/spot-icon.png",

  //
  // Google Map
  //
  //googleMapAPIKey: "AIzaSyAEwvfs3F0IdPhZg2BnmN95G66d7jQlu40",
  googleMapAPIKey: "AIzaSyCk0NmXMzBVsPnKvqeQlY9W2GXVwqtGWf8",

  //
  // Driver App Devices Setting
  // (Sails query)
  devicesessionsFilters: {
    // appVersion: {"startsWith": "1."} // AppVersion 1.0+
  },

  //
  // Fleet
  //
  fleetGetTaxisInterval: 4, // Seconds
  fleetTaxiDistance: 4.0, // Kilometers
  fleetTaxiLastUpdate: 5, // Minutes

  //
  // Booking
  //
  bookingDisplayLatest: 30, // Latest # Bookings
  bookingGetTaxisInterval: 10, // Seconds
  bookingTaxiDistance: 2.0, // Kilometers
  bookingNotes: "",
  bookingGetTaxiTimeout: 3, // Minutes
  bookingTaxiLastUpdate: 5, // Minutes
  bookingTaxiPingNoReplyBeforeCancelRequest: 360, // Times or ET:1hr
  bookingTaxiCooldownBeforeNextBooking: 10, // Seconds

  //
  // Analytics
  //
  analyticsDaysLimit: 60, // days

  // Others
  passKey: "6d69636162",

  //
  // DEBUGGING CONSOLE
  //
  console: {
    log: function() {
      if(!_DEBUG_) return;

      var message = ["[D: "+require('dateformat')(new Date(), "HH:MM:ss.L")+"] "];
      //var message = ["[D: "+require('dateformat')(new Date(), "mm/dd/yy HH:MM:ss.L")+"] "];
      for(var idx in arguments)
        message.push(arguments[idx]);
      console.log.apply(console, message);
    },
    info: function() {
      if(!_DEBUG_) return;

      var message = ["[I: "+require('dateformat')(new Date(), "HH:MM:ss.L")+"] "];
      //var message = ["[I: "+require('dateformat')(new Date(), "mm/dd/yy HH:MM:ss.L")+"] "];
      for(var idx in arguments)
        message.push(arguments[idx]);
      console.info.apply(console, message);
    },
    error: function() {
      if(!_DEBUG_) return;

      var message = ["[E: "+require('dateformat')(new Date(), "HH:MM:ss.L")+"] "];
      //var message = ["[E: "+require('dateformat')(new Date(), "mm/dd/yy HH:MM:ss.L")+"] "];
      for(var idx in arguments)
        message.push(arguments[idx]);
      console.error.apply(console, message);
    },
  }
}

export default CONFIGURATION;
