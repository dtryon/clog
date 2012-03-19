exports.recordVisit = function (arr, ip) {
	if (arr) {
		var add = true;
		for(i=0;i<arr.length;i++) {
			if (arr[i] == ip) {
				add = false;
			}
		}

		if (add) {
			arr.push(ip);
		}
		return arr;

	} else if (ip && ip.length > 0) {
		
		return [ip];
	}
	return [];
}