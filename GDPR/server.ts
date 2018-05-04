import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import { request } from 'http';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Cors to enable cross browser data send
const cors = require('cors');
app.use(cors());

// API KEY, URL and LISTID ----

const api_key = 'APIKEY';
const url = 'urlhere';
const listId = '449169';

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

// Fetch customer data, return all the data from the database using the customer id.
app.post('/fetch-customer-data', cors(), function(req, res){

  console.log(req.body.uniqueId);
  //Carry out api request to Digital Sky and check whether the user exists.
   // Set the headers
   var headers = {
    'Content-Type':     'application/json',
  };
  // //Set the body for the Api
  var apiBody = {
    "id": 1,
    "method": "searchContacts",
    "params": [
      api_key,
      listId,
      [
        [
          'customerId',
          'exactly',
          res.body.uniqueId
        ]
      ]
    ]
  };
  // Configure the request
  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: apiBody
  };
  
     // Request to find user, if it's not found will return Fail else it's success.
  request(options, function(error:any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      if(body.result < 1){
        console.log('failed');
        res.json({
          'status' : 'fail',
          'type': 'noUser',
          'message': 'User does not exist'
        });
      }else {
        console.log(body.result);
        res.json({
          'status' : 'pass',
          'type': 'customerData',
          'message': 'getting customer data.',
          'customerData' : body['result'][0]}
          );
      }

    } else {
      // Return false something has gone wrong
      console.log(error);
    }
  });
})






// CONNECT TO ROLLING STAR API ----
// app.post('/add-prefs', cors(), function(req, res){
//   console.log(req.body);

//   let data = req.body;
  
//  var customerNumber = data.customerNumber;
//   // Store data in vars ====
//  var updateData = {
//   'id': customerNumber,
//   'serviceandmot' : data.servicingandmots,
//   'marketing' : data.marketing,
//   'manufacturer' : data.manufacturer
//   }
//   //=========
//   //Carry out api request to Digital Sky and update the customers PREFERENCES.
//       // Set the headers
//      var headers = {
//       'Content-Type': 'application/json',
//     };
//     //Set the body for the Api
//     var apiBody = {
//        "id": 1,
//    "method": "editContacts",
//    "params": [
//         api_key,
//         listId,
//         [
//           updateData
//         ]
//       ]
//     };
//     // Configure the request
//     var options = {
//       url: url,
//       method: 'POST',
//       headers: headers,
//       json: apiBody
//     };
//     // Start the request if a user is found needs to update the preferences information.
//     request(options, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         if(body.result < 1){
//           res.json({
//             'status' : 'fail',
//             'type': 'noUpdate',
//             'message': 'Could not update'
//           });
//         }else {
//           console.log(body.result);
//           res.json({
//             'status': 'pass',
//             'type': 'preferencesUpdated',
//             'message': 'your preferences is updated.'
//           });
//         }
  
//       }else{
//         // Return false something has gone wrong
//         console.log(error);
//       }
//     });

//     //======
// });





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
