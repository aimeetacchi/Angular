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

const axios = require('axios');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// BODY PARSER ===
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

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/



// ==================
// GET WORDPRESS JSON MENU DATA
// =================
app.get('/api/getmenu', (req, res) => {
	console.log('Getting menu data')

	axios.get('http://adam.lancey.bigmarketing.co.uk/aimee/wp-json/menus/v1/menus/top')
  .then(response => {
    
    let items = response.data.items;
    let newArray = [];
    items.foreach( (data)=>{
      newArray.push(
        {
          "title" : data.title,
          "customCat" : data.object,
          "pageId" : data.object_id,
          "parentId" : data.menu_item_parent
        }
      )
    });
    // var newMenuArray = items.map((item, index, array) => {
    //     return `${item.title} - ${item.object} - ${item.object_id} - ${item.menu_item_parent}`;
    //   });
  
  
   console.log(newArray)
	  // res.json(this.newMenuObject);
  })
  .catch(error => {
    console.log(error);
  });

})

// ==================
// GET WORDPRESS JSON DATA
// =================
app.get('/api/getdata', (req, res) => {
	console.log('getting wordpress data')

	axios.get('http://adam.lancey.bigmarketing.co.uk/aimee/wp-json/wp/v2/projects/')
  .then(response => {
    //console.log(response.data);
	res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });

})









// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
