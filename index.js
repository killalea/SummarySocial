var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');

var SummarySocial = function () {
    AlexaSkill.call(this, APP_ID);
};
SummarySocial.prototype = Object.create(AlexaSkill.prototype);
SummarySocial.prototype.constructor = SummarySocial;

SummarySocial.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SummarySocial onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SummarySocial.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SummarySocial onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the SummarySocial Kit, you can ask for a summary";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

SummarySocial.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SummarySocial onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

var sayThis = "A Facebook Summary!";

SummarySocial.prototype.intentHandlers = {
    // register custom intent handlers
    "SummarySocialIntent": function (intent, session, response) {
        response.tellWithCard(sayThis, sayThis, sayThis);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SummarySocial skill.
    var summarySocial = new SummarySocial();
    summarySocial.execute(event, context);
};
