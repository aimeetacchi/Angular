<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png" alt="Universal Angular" height="320"/>
</p>



==== MORE INFO =====

==== Create component =====

ng g c components/componentname --module=app.module.ts

=== Create service =====

ng g s services/servicename --module=app.module.ts

--- Set up a Routing file --- create Routing directory in app.

file - routing.module.ts Add your routes here.

====== INSTALL AND SETUP ======

Angular Materials - https://material.angular.io/guide/getting-started Uncomment out code in the BROWSER POLYFILLS Section - polyfills.ts

Download Bootstrap4 Files from source files and take all Scss Files and put them in a Scss folder in assets - https://getbootstrap.com/docs/4.1/getting-started/download/

then add link in index head pointing to the css file it compiles.

// ---- NPM Update -----

npm update // if you need to update project from installed packages.

// ----- Running Server ---

Build -- npm run build:ssr && npm run serve:ssr

// If already built, you can run

npm run webpack:server
npm run serve:ssr

// without having to rebuild.