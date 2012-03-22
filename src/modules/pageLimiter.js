exports.resolveLimit = function (proposedLimit) {	
	
	var numLimit = parseInt(proposedLimit);

	if (isNaN(numLimit)) {
		return 20;
	} else {
		return numLimit;
	}
}