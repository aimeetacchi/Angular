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
 const api_key = 'APIKEYHERE';
 const url = 'URLHERE';
 const listId = '449169';

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
  console.log(reminders);
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
            console.log(response.data);
            next();
          }
        })
        .catch(error => {
          console.log('error')
          })
    },
  function(req,res){
    
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
