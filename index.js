'use strict';

//Enter the user information 
var ClientID = '';
var Secretkey = '';

//Handle the OTP
var Yubikey = require('yubikey');
var prompt = require('prompt');
var yubikey = new Yubikey(ClientID, Secretkey); //API service to valid if this OTP is valid or not.
var debug = require('debug');

var debugok = debug('ok');
var debugerror = debug('error');

prompt.start();

prompt.get('YubikeyOTP', function(err, result) {

	if (err) {
		debugerror('prompt failed to YubikeyOTP, with error: ' + err);
		throw err;
	}
	debugok('prompt was successfully executed for YubikeyOTP, with result :' + JSON.stringify(result));
	console.log('Obtained OTP from the key', result.YubikeyOTP);
	yubikey.verify(result.YubikeyOTP, function(err) {
		if (err) {
			debugerror('yubikey failed to verify the key : ' + result.YubikeyOTP + ', with error: ' + err);
			console.log('Not a valid OTP!');
			debugerror('Exiting the process with code : 1');
			process.exit(1);
		} else {
			var YubikeyOTP_Keyid = result.YubikeyOTP.substring(0, 12); //Same for a key always.
			debugok('yubikey successfully verified the key : ' + result.YubikeyOTP + ', with keyid: ' + YubikeyOTP_Keyid);
			console.log('You are a valid user!');
			console.log('Your KeyId is : ' + YubikeyOTP_Keyid);
			debugok('Exiting the process with code : 0');
			process.exit(0);
		}
	})
});