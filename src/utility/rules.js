/* Configuration */
import credentials from "./credentials";
import request from "./request";
import config from "./config";
import async from "async";

let console = config.console;

var _Resources = [];

const _Accessables = [
	{clearance:'unclassified', access:[
		'/requests',
		'/booking'
	]},
	{clearance:'confidential', access:[
		'/devicesessions',
		'/units',
		'/drivers',
		'/users',
		'/employees'
	]},
	{clearance:'secret', access:[
		'/cities',
		'/ads',
		'/spots',
		'/analytics',
		'/dispatchers'
	]},
	{clearance:'topsecret', access:[
		'/organizations',
		'/apps',
		'/apikeys'
	]},
]

// rules
export default new class Rules {
  constructor(){
  	this.accessables = {};
  }

  checkResources(accessToken, cb) {
  	// Temporary
  	return cb(_Resources);

  	//
  	// Fetch ResourceJson
  	//

  // 	request.get("abacs/myresources", {}, (errorMsg, data, xhr)=>{
		// 	if(data) this.setResources(data);
		// 	cb(data);
		// },{
	 //    'Authorization': 'Bearer ' + accessToken,
	 //    'X-AppName': config['xAppName'],
	 //    'X-ApiKey': config['xApiKey']
	 //  });
  }

  setResources(resources) {
  	console.info("Rules Resources Updated: ", {resources: resources});
  	_Resources = resources;
  }

  hasAccess(routeName, ext = {}) {
  	// Get Environments
		let currentUser = {},
				device = "web";

  	try{
  		currentUser = {
	      user: ext.user || credentials.getAttribute("UserData"),
	      employee: ext.employee || credentials.getAttribute("User_EmployeeData"),
	      organization: ext.organization || credentials.getAttribute("User_OrganizationData")
	    }

	    //
			// Special Exceptions
			//
			if(routeName.indexOf("profile") != -1) throw true;

			const employeeRole = currentUser.employee.role ? currentUser.employee.role.toLowerCase().trim() : "";

			// Clearance must be `secret` or higher
			if(_accessLevel(currentUser.employee.clearance) > 1) {
				var isSpecial = _specialPermissions(routeName, employeeRole);
				if(isSpecial != null) return isSpecial;
			}
			//
			// End of Special Exceptions
			//
			
	    // Check access from Resources
	    if(_checkFromResources(routeName, currentUser.employee.clearance))
	    	throw true;	    
  	}catch(err){
  		if(err === true) {
  			// console.info("Access to " + routeName + " is Granted!");
  			return true;
  		} else console.error(err);
  	}

  	// console.error("Access to " + routeName + " is Deny!");
  	return false;
  }
}

function _checkFromResources(routeName, clearance) {
	const resourceJson = _Resources.slice();
	
	// Super has access to all
	if(clearance === "topsecret") return true;

	// Check on Resources json
	// for(var idx in resourceJson)
	// 	if(resourceJson[idx].name.indexOf(routeName) != -1 &&
	// 		_onAccessLevel(routeName, clearance))
	// 		return _accessLevel(clearance);

	// TEMPORARY
	if(_onAccessLevel(routeName, clearance))
		return _accessLevel(clearance);

	return false;
}

function _specialPermissions(routeName, employeeRole) {
	switch(employeeRole) {
		case "dispatch":
			if(routeName.indexOf("requests") != -1 ||
				 routeName.indexOf("booking") != -1)
				return true;
			else return false;
		case "supervisor":
		case "manager":
			if(routeName.indexOf("fleet") != -1 ||
				 routeName.indexOf("gspot") != -1 ||
				 routeName.indexOf("requests") != -1 ||
				 routeName.indexOf("units") != -1 ||
				 routeName.indexOf("drivers") != -1 ||
				 routeName.indexOf("booking") != -1 ||
				 routeName.indexOf("employees") != -1 ||
				 routeName.indexOf("dispatchers") != -1)
				return true;
			else return false;
	}

	return null;
}

function _accessLevel(clearance) {
	switch(clearance) {
		case "unclassified": 	return 1;
		case "confidential": 	return 2;
		case "secret": 				return 3;
		case "topsecret": 		return 4;
		default: 							return -1;
	}
}

function _onAccessLevel(routeName, clearance) {
	// Super has access to all
	if(clearance === "topsecret") return true;

	for(var idx1 in _Accessables)
		if(_Accessables[idx1].clearance === clearance)
			for(var idx2=idx1; idx2 >= 0; idx2--)
				if(_Accessables[idx2].access.indexOf(routeName) > -1) 
					return true;

	return false;
}