import config from "./config";

var console = config.console;

//
// Request REQUESTS
//
class Request {
  // GET Type Request
  get(model, data, cb, xHeader) {
    _request("GET", model, data, cb, xHeader);
  }

  // POST Type Request
  post(model, data, cb, xHeader) {
    _request("POST", model, data, cb, xHeader);
  }

  // PUT Type Request
  put(model, data, cb, xHeader) {
    _request("PUT", model, data, cb, xHeader);
  }

  // DELETE Type Request
  delete(model, data, cb, xHeader) {
    _request("DELETE", model, data, cb, xHeader);
  }
}

//
// JQuery.ajax() request to Configuration target Server
// With `Authorization` header for server authentication
//
function _request(type, model, data, cb, xHeaders) {
  if ($.isFunction(data)) {
    cb = data;
    data = null;
  } else if (!$.isFunction(cb)) {
    cb = function(){};
  }

  // REQUEST PARAMETERS
  const params = {
    // HEADERS
    headers : {},

    // DATA
    data : data
  };

  // Extention Headers
  if(xHeaders && typeof xHeaders === 'object')
    params.headers = Object.assign({}, xHeaders, params.headers);

  // JQuery ajax request
  $.ajax({ 
    type : type,
    url: [config['apiUrl'], model].join("/"),
    contentType: "application/json",
    headers : params.headers,

    data : type === "GET" ? null : JSON.stringify(params.data),
    success: (data, status, xhr) => { cb(false, data, xhr, status); },
    error: (xhr, status, error) => { cb({error, xhr, status}); }
  });
}

export default new Request