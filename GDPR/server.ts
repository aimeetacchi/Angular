import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'client-sessions';

import {join} from 'path';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// SESSION ====
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create middleware to use throughout app
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


// Use Cors to enable cross browser data send
import * as cors from 'cors';
app.use(cors());

//create middleware to use throughout app
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

 // API KEY, URL and LISTID ----
 const api_key = '6ca897ca45da308a76d0f023940d88806ca81a040e28d1d48bfd2aa3940de017';
 const url = 'http://skymail.digital-sky.co.uk/api/jsonrpcserver?version=3.0';
 const listId = '449169';

// MAIL GUN VARS
const mailgun_key = 'key-99756fae07a5b8c2bf63d425282456d0';
const mailgun_url = 'minportal.co.uk';

// === Fetch customer data, return all the data from the database using the customer id.
app.post('/fetch-customer-data', cors(), function(req, res){
  const customerNumber = req.body.customerNumber;
 
  // ==== Carry out api request to Digital Sky and check whether the user exists.
  // ==== Request to find user, if it's not found will return Fail else it's success.
  axios.post(url, {
    
    // ==== Configure the request   
    "id": 1,
    "method": "searchContacts",
    "params": [
      api_key,
      listId,
      [
        [
          'id',
          'exactly',
          customerNumber
        ]
      ]
    ]
    
  })
    .then(response => {
     
        if(response.data.result < 1){
          console.log('Something Went Wrong!');
        res.json({
          'status' : 'fail',
          'type': 'noUser',
          'message': 'User does not exist'
        });
      } else {

        res.json({
          'status' : 'pass',
          'type': 'customerData',
          'message': 'getting customer data.',
          'customerData' : response.data.result}
          );

    } 
  })
    .catch(error => {
      console.log('error')
    })
    
 });

// CONNECT TO ROLLING STAR API ----
app.post('/add-prefs', cors(), function(req, res, next){
  
  let data = req.body;
  let reminders = data.servicingandmots.toString();
  let marketing = data.marketing.toString();
  let manufacturer = data.manufacturer.toString();

    //=========
  //Carry out api request to Digital Sky and update the customers PREFERENCES.
  // Start the request if a user is found needs to update the preferences information.
    axios.post(url, {
      //Set the params for the Api
      "id": 1,
      "method": "editContacts",
      "params": [
           api_key,
           listId,
           [
             {
              "id": data.customerNumber,
              "reminders": reminders,
              "Marketing": marketing,
              "Manufacturer_Updates": manufacturer
             }
           ],
         ]
        })
        .then(response => {
          if (response.data) {

            // set session with the updated data.
            req.session.userUpdateData = data;
            //call next function ===
            next();
          }
        })
        .catch(error => {
          let response = { 'error' : true, 'message' : 'no rows added'}
          console.log(response)
          res.json(response);
          })
    },
  // next function ====
  function(req,res){
    //==== Set session

    const userUpdatedData = req.session.userUpdateData;

    console.log(userUpdatedData);

    // =================================
    // Send the Email Via MAILGUN ---
    // =================================
    const mailgun = require('mailgun-js')({apiKey: mailgun_key, domain: mailgun_url});
    const mailcomposer = require ('nodemailer/lib/mail-composer');
    const htmlEmail = emailBuilder(userUpdatedData); // Call the emailbuilder function.
    
    let mailOptions = {
      from: 'noreply@bigmarketing.co.uk',
      to: 'aimee.tacchi@bigmarketing.co.uk',
      subject: 'Customer has updated their preferences',
      text: 'You need a html viewer to read this email',
      html: htmlEmail
  };

  let mail = new mailcomposer(mailOptions);
    mail.compile().build((err, message) => {

        let dataToSend = {
            to: 'aimee.tacchi@bigmarketing.co.uk',
            message: message.toString('ascii')
        };

        mailgun.messages().sendMime(dataToSend, (sendError, body) => {
            if (sendError) {
                console.log(sendError);
            }else{
                console.log('email sent', body);
                res.json({'error' : false,'message' : 'pass, customer data has been updated and email has been sent.'});
            }
        });
    });
    
  });




//==========
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});


// Build the mailgun email to send out ===
function emailBuilder(userUpdateData){

  let salutation = userUpdateData.customerSalutation;
  let surname = userUpdateData.customerSurname;

  let servicingandmots = userUpdateData.servicingandmots;
  let marketing = userUpdateData.marketing
  let manufacturer = userUpdateData.manufacturer


  let html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CROWN HONDA</title>
    <style type="text/css" rel="stylesheet">
    body {
    margin: 0px;
    padding: 0px;
    line-height: 1.4;
    color: #000
    }
    .container {
      padding: 20px;
      font-size: 16px;
    }
    </style>
    </head>
    <body>
      <div class="container"> 
        <p><strong> Customer: </strong> ${salutation} ${surname} has updated their preferences to:</p>
        <p><strong> Servicing and MOT: </strong> ${servicingandmots}</p>
        <p><strong>Marketing:</strong> ${marketing}</p>
        <p><strong>Manufacturer:</strong> ${manufacturer}</p>
      </div>
    </body>
    </html>`;
  return html;
}
