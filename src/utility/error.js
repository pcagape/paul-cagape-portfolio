export default function(error, callback) {
	console.error("ERROR HANDLER MANGER::", error);
	let String_Error = "Error occured! Please try again.";

	if(typeof error.error === 'string')
		String_Error = error.error || error.status || "Error occured! Please try again.";

	if(error.xhr) {
		switch(error.xhr.status) {
			case 403:
				toastr.error("You are forbidden for this action. Please contact admin.");
	      break;
	    case 0:
			case 502:
	    default:
	      toastr.error("Something went wrong. Please contact admin.");
		}
	} else if(String_Error) {
		switch(String_Error) {
			case "Forbidden":
	      toastr.error("You are forbidden for this action. Please contact admin.");
	      break;
			default:
	     	toastr.error("Something went wrong. Please contact admin.");
		}
	}
		
	if(callback) callback(String_Error);
}