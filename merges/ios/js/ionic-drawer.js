(function() {

'use strict';

angular.module('ionic.contrib.drawer', ['ionic'])

.directive('menuAndDrawerToggle', ['$ionicViewService', function($ionicViewService) {
  return {
    restrict: 'AC',
    require: '^ionSideMenus',
    link: function($scope, $element, $attr, sideMenuCtrl) {
      var side = $attr.menuToggle || 'left';
      $element.bind('click', function(){
        if(side === 'left') {
          sideMenuCtrl.toggleLeft();
        } else if(side === 'right') {
          sideMenuCtrl.toggleRight();
        }
      });
    }
  };
}]);


})()