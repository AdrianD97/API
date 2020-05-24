exports.validate = (bodyReq) => {
	if (Object.keys(bodyReq).length === 0) {
		return false;
	}

	const hasProperties = bodyReq.hasOwnProperty("name") &&
						bodyReq.hasOwnProperty("age") &&
						bodyReq.hasOwnProperty("faculty") &&
						bodyReq.hasOwnProperty("email");
	
	return (hasProperties) ? true : false;
};
