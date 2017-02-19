var Alexa = require('alexa-sdk');
var FB = require('facebook-node');
var util = require('util');


var repeatWelcomeMessage = "Welcome to Summary Social, how can I help you?";

var welcomeMessage = "this is the alpha release, which only supports facebook";

var stopSkillMessage = "Bye homie!";

var helpText = "You can say things like read my posts";

var tryLaterText = "aye there was an issue, please try again later.";

var noAccessToken = "there is a problem with the acceess token, try again later";

var accessToken = "";

var Handler = {
	'NewSession': function() {
		accessToken = this.event.accessToken;



		if(accessToken) {
			FB.setAccessToken = (accessToken);
			this.emit(':ask', welcomeMessage, repeatWelcomeMessage);

		}
		else {
			this.emit(':tell', noAccessToken, tryLaterText)

		}

	}
},

'readPostsIntent': function() {
	var alexa = this;
	if(accessToken) {
		FB.api("me/feed", function(response) {
			if(response && !response.error) {
				if(response.data){
					var output = "";
					var max = 10;

					for(var i = 0; i < response.data.length; i++) {
						if(i < max) {
							output += response.data[i].message + '. ';

						}
					}
					alexa.emit(':ask', output, output);
				}
				else{
					//OOPS NO DATA
				}
			}
			else{
				//OTHER ERRORS
			}
		});
	}
	else{
		this.emit(:'tell', noAccessToken,tryLaterText);
	}
},
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', stopSkillMessage);
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', stopSkillMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', helpText, helpText);
    },
    'Unhandled': function () {
        this.emit(':ask', helpText, helpText);
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(Handler);
    alexa.execute();
};

