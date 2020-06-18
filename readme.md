
# Various commands.  See package.json
yarn install :  builds dependencies
yarn run dev-server    :   runs the dev server

# Git Commands



# setup instructions

The app uses firebase so you must install that first.  If you wish to bypass this I recommend setting the dashboard to be a
private route in src/routers/AppRouter.js.  If you go in this direction you will need to change other firebase vars.

0.  At the console enter "yarn install" to build dependencies
1.  Create a firebase project at console.firebase.google.com
2.  On the console homepage choose "Add Firebase to your web app".  Note the data on the next screen. 
2.  Create a Realtime Database.  Choose for it to be in "test mode" so that it is wide open.
3.  Go to "Authentication" and then "Sign-in Method" tab.  Enable "Google". 
4.  We are storing firebase auth info in two separate files that you will need to create in root.
    These files contain the auth information for dev and test db (prod details are stored directly into heroko account)
    a. .env.development
    b. .env.test
5.  Both files will have the same format. Note that you can have different dbs and files for each environment.
    Example (insert your own data):

    FIREBASE_API_KEY=AIzaSyDQ029y4TdX8rGRYh0gTzzzzzzzzzzzz
    FIREBASE_AUTH_DOMAIN=expensify-test-77f2.firebaseapp.com
    FIREBASE_DATABASE_URL=movie-reviews-83f22.firebaseapp.com
    FIREBASE_PROJECT_ID=https://movie-reviews-83f22.firebaseio.com
    FIREBASE_STORAGE_BUCKET=movie-reviews-83f22.appspot.com
    FIREBASE_MESSAGING_SENDER_ID=251434567
