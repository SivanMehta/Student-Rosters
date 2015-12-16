# Student Rosters

One problem that many professors have is learning their students names in a quick way. While some may resort to flashcards, or if they're truly desparate, actually having conversations with them.

**Well There's Good News**

I have taken the human interaction out of learning peoples names with this website! Simply have your students register with their Facebook Accounts, and you will have access to their name and most recent profile picture! After that, you are free to spend hours, no, minutes on the riveting training game!

## Node Dependencies

```JSON
"dependencies" : {
    "express" : "~4.0.0",           
    "ejs" : "~0.8.5",               
    "mongoose" : "~3.8.1",          
    "passport" : "~0.1.17",         
    "passport-local" : "~0.1.6",    
    "passport-facebook" : "~1.0.2", 
    "connect-flash" : "~0.1.1",     
    "bcrypt-nodejs" : "latest",
    "morgan": "~1.0.0",
    "body-parser": "~1.0.0",
    "cookie-parser": "~1.0.0",
    "method-override": "~1.0.0",
    "express-session": "~1.0.0",
    "mongodb": "^2.0.48"
  }
```

You will also need to setup `config/auth.js` accordingly

```JS
module.exports = {
    'facebook' : {
        clientID      : '123456789', // your App ID
        clientSecret  : 'This is a super secret', // your App Secret
        callbackURL   : '/auth/facebook/callback' // set on developers.facebook.com
    }
}
```
