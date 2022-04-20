var mailer = require('nodemailer');
var fs = require('fs');
var path = require('path');

exports.send = send = function(config, callback) {
	
	if (!config.environment.EMAIL_SENDER) return callback('environment variable EMAIL_SENDER is required.');
	
	var formData = config.formData;
	if (!formData) return callback('no form-data found');
	if (!formData.length) return callback('form data should be an array');
	var recipientEmail;
	for (var i=0;i<formData.length;i++) {
		if (formData[i].name == 'email') recipientEmail = formData[i].value; 
	}
	if (!recipientEmail) return callback('could not find a recipient email');
	
	var settingsFile = path.resolve(__dirname, '..', 'templates', 'settings.json');
	if (!path.existsSync(settingsFile)) return callback('Please place a settings file at ' + settingsFile);
	
	fs.readFile(settingsFile, 'utf8', function(err, data) {
		if (err) return callback(err);
		
		//get settings
		var settings;
		try {
			settings = JSON.parse(data);
		} catch(err) {
			return callback('Unable to parse settings file ' + settingsFile + ': ' + err);
		}		
		if (!settings.SMTP) return callback('Unable to find root SMTP element in settings file ' + settingsFile);
		mailer.SMTP = settings.SMTP;
		
		//get email template
		var emailFileName = config.options.template;
		if (emailFileName.match(/(\/)|(\.\.)|(\\)/)) return callback('template name was invalid');		//don't trust user input!
		
		var emailFile = path.resolve(__dirname, '..', 'templates', emailFileName);
		if (!path.existsSync(emailFile)) return callback('Please place an email template file at ' + emailFile);
		fs.readFile(emailFile, 'utf8', function(err, data) {
			if (err) return callback(err);
	
			var options = {};
			options.sender = config.environment.EMAIL_SENDER;
			options.to = recipientEmail;
			options.bcc = config.environment.EMAIL_SENDER;
			options.subject = config.options.subject;
			data = replaceMustaches(data, formData)
			if (data[0] == '<') {
				options.html = data;
			} else {
				options.body = data;
			}
			
			mailer.send_mail(options, function(err, success) {
				if (err) { console.error(err); return callback(err);}
				if (success !== true) return callback("unexpected error sending email: " + success);
				
				//really should not wait as this introduces a delay, but it is ok at low volumes
				callback(null, 'success');	
			});
			
		});

	});

}

function replaceMustaches(data, formData) {

	for (var i=0;i<formData.length;i++) {
		var key = formData[i].name;
		
		//asuumes keys don't have regex characters in them, i.e. no ^$()<[{\|>.*+?
		var re = new RegExp('\{\{' + key + '\}\}',"g");
		data = data.replace(re, formData[i].value);
	}
	
	return data;
}