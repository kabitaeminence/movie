# What is this?

This is a Node.js service that can be used to process contact and signup forms from a website.

# Why?

It is a lot cheaper to run a "static" website (e.g. on Amazon s3 or cloudfront) than it is a dynamic (e.g. PHP, JSP, ASP.NET, Express.js) one.  However, this is restrictive because it is common to have some way for a user to submit feedback, signup, or otherwise contact the website author.  This API allows for some JavaScript on the static site that sends the "signup" data to a backend hosted on a separate server.  

This may seem like it just moves the cost to another server, but in reality there are a lot of free and very cheap ways to host Node services, so the cost is smaller.

# How to use?

    $ [sudo] npm install -g signup
	$ export EMAIL_SENDER=yoursender@yourdomain.com
	$ signup server -p 3000
	
(runs as service on port 3000).  In Windows, use `SET` instead of `export`.  You can install as a service/daemon using:

    $ signup install -p 3000
	
For other commands, try:

    $ signup --help

## Configuring SMTP and email templates

The API has a `templates` folder with various predefined JSON and TXT files.  When installed globally, this is usually `/usr/local/lib/node_modules/signup/templates` or on Windows `%APPDATA%\npm\node_modules\signup\templates`.

The JSON files are configs for SMTP and the TXT files are email templates.  You should copy or rename *one* of the SMTP files into `settings.json`.  Edit the file to input your own SMTP settings.   You can also create one or more email templates, or just edit the default `email.txt` template.

Email templates support mustache-style replacement, i.e. you can put a token in the form `{{name}}`, and if there is a form field with that id, then the token will be substituted with the value of that form field.

To specify a non-default template, simply pass the template name as an option (see example above, which uses `email.txt`).

## Sending email from a web page
On your web page with some sort of form, you need to have a link to jQuery, and also a link to the PerfectAPI client.  It is also helpful to have some sort of client-side validation, such as [jQuery.validate](http://bassistance.de/jquery-plugins/jquery-plugin-validation/):

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src='http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js' ></script>
<script type="text/javascript" src="http://localhost:3000/signup/jquery.perfectapi.js" ></script>
```

This is an example of HTML and client-side javascript for a signup form, using jQuery.validate for the client-side validation.  Email address of the person filling out the form **must** be in a field with id of `email`.

```
<form id="signupForm" class="signupform">
	<h5>Info</h5>
	<div class="formError hide"></div>
	<div class="formSuccess hide">Thanks, you should get an email soon.</div>
	<ul>
		<li>
			<label for="name">Your Name:</label>
			<input maxlength="50" id="name" name="name" type="text" class="required" />
			<em>*</em>
		</li>
		
		<li>
			<label for="company">Company Name:</label>
			<input class="company" maxlength="100" id="company" name="company" type="text" />
		</li>
		
		<li>
			<label for="email">Email Address:</label>
			<input maxlength="50" id="email" name="email" type="text" class="required email" />
			<em>*</em>
		</li>
		<li>
			<button>Submit</button>
		</li>				
	</ul>
</form>
```

...and the client-side javascript for the form:

```
$('form').submit(function() {
	console.log('form submitting');
	var validated = $('form').validate().form();
	
	$('.formError').hide();    //some place you display errors
	$('.formSuccess').hide();  //some place you display success
	
	if (!validated) return false;
	
	var config = {
		formData: $('form').serializeArray(),
		options: {subject: "This is a test email", template: "email.txt"}
	};
	console.log(config);
	
	signup.callApi('send', config, function(err, results) {
		if (err || results.err) {
			$('.formError').text(err || results.err);
			$('.formError').show();
			return;
		}
	 
		console.log('form submitted successfully');
		$('.formSuccess').show();
	});
		
	return false;
});
```

