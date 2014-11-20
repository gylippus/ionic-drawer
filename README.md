Note: This is an Android Drawer 'Hack' based on a blank sidemenu seed project
Warning: I have only been using Angular for 14 weeks. I may be doing things wrong but this worked and Google approved it in a review to be featured
Disclaimer: I haven't added this repo as something I can update frequently, nor as a copy and paste solution. It exists as a starting point for somethig better to come of it from the Drifty team.

Documents that have been modified from the original seed project have been commented with `Drawer Change`

For my app, I kept the drawer functionality seperate for Android only. This is what you see in this repository. I would have started these instructions here:
1. Create 'merges/android' directory
2. Copy menu.html template into this directory
3. As if this wasn't already confusing enough, I also had a barebones ionic-contrib.js in my main js file. This is shown in merge/ios for this project


If you don't want to do the merges, start here:

1. Add ionic-drawer.js to www/js
2. Link to this in index.html
3. Require 'ionic.contrib.drawer' in app.js
4. Move navbar outside of ion-pane / side-menu-content
5. I personally removed the side header menu
6. Change 'menu-close' to 'menu-and-drawer-close' in both menu.html instances
7. Replace menu-toggle="" with menu-and-drawer-toggle in all template html docs (I have only allowed a left drawer in the ionic-drawer.js hacking)
8. Added css (Note: for my implementation I used .platform-android for many items. This is noted in style.css)


Final note: This is a butchering of a much cleaner start by Max @ https://github.com/driftyco/ionic-contrib-drawer

Codepen: http://codepen.io/anon/pen/KJCie

Live App: https://play.google.com/store/apps/details?id=sworkitapp.sworkit.com
