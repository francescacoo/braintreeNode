var express = require('express');
var router = express.Router();
var Paypal = require('../controllers/paypal');

/* GET home page. */
router.get('/', function (req, res, next) {
	var response = {};
	Paypal.getClientToken(function (token) {
		if (token) {
			response.token = token;

			res.render('index', {
				page: 'home',
				data: response
				});

		}
	});
});

/* POST Value for sale */
router.post('/paid', function (req, res) {
	var nonce = req.body.payment_method_nonce;
	console.log('error', nonce);

	if (nonce) {
		Paypal.createPayment(nonce, function (paid) {
			if (paid) {
				res.render('index', {
					page: 'paid',
					data: JSON.stringify(paid, null, 3)
				});
			} else {
				// TODO: Something went wrong report back to user
				res.status(404).send('Service is not avialble at this time');
			}
		});
	} else {
		res.status(401).send('Unauthorized!');
	}
});

module.exports = router;
