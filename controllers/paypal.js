var braintree = require('braintree');
var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "",
	publicKey: "",
	privateKey: ""
});

var controller = {
	getClientToken: function (callback) {
		gateway.clientToken.generate({}, function (err, response) {
			if (err) {
				callback(err)
				console.log('error', { error: err });
			}
			if (response.clientToken) {
				callback(response.clientToken)
			} else {
				callback(console.log('error', { error: err }))
			}
		});

	},

	createPayment: function (nonce, callback) {
		  gateway.transaction.sale({
			paymentMethodNonce: nonce,
			amount: "10.00"
		}, function (err, result) {
			if (result.success) {
				console.log("payment ok");
				callback(result)
			} else {
				callback(undefined);
			}
		});
	}
}
module.exports = controller;
