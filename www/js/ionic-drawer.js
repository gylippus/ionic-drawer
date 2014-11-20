//Drawer Changes
(function() {

'use strict';

angular.module('ionic.contrib.drawer', ['ionic'])

.controller('drawerCtrl', ['$rootScope', '$scope', '$element', '$attrs', '$ionicGesture', '$ionicBody', '$document', function($rootScope, $scope, $element, $attr, $ionicGesture, $ionicBody, $document) {
  var el = document.querySelectorAll("drawer")[0];
  var mainContent = angular.element(document.querySelectorAll("ion-pane")[0]);
  var dragging = false;
  var startX, lastX, offsetX, newX, startY, lastY, offsetY, newY;
  var side;
  var isOpen = false;
  var primaryScrollAxis = null;

  mainContent.addClass('drawer-content');

  // How far to drag before triggering
  var thresholdX = 10;
  // How far from edge before triggering
  var edgeX = 40;
  // Width of drawer set in css
  var drawerWidth = 270;

  var LEFT = 0;
  var RIGHT = 1;

  var isTargetDrag = false;

  var isContentDrag = false;

  var width = $element[0].clientWidth;
  var height = $element[0].clientHeight;

  var enableAnimation = function() {
    angular.element(el).addClass('animate');
  };
  var disableAnimation = function() {
    angular.element(el).removeClass('animate');
  };

  // Check if this is on target or not
  var isTarget = function(el) {
    while(el) {
      if(el === $element[0]) {
        return true;
      }
      el = el.parentNode;
    }
  };

  var startDrag = function(e) {
    disableAnimation();

    dragging = true;
    offsetX = lastX - startX;
    offsetY = lastY - startY;
    $ionicBody.addClass('drawer-open');
  };

  var startTargetDrag = function(e) {
    disableAnimation();

    dragging = true;
    isTargetDrag = true;
    offsetX = lastX - startX;
    offsetY = lastY - startY;
  };

  var doEndDrag = function(e) {
    startX = null;
    lastX = null;
    offsetX = null;
    startY = null;
    lastY = null;
    offsetY = null;
    isTargetDrag = false;

    if(!dragging) {
      return;
    }

    dragging = false;

    enableAnimation();
    if(isOpen && newX < (-width / 3)) {
      el.style.transform = el.style.webkitTransform = 'translate3d(' + (-width - 5) + 'px, 0, 0)';
      $ionicBody.removeClass('drawer-open');
      isOpen = false;
    } else if(newX < (-width / 1.5)) {
      el.style.transform = el.style.webkitTransform = 'translate3d(' + (-width - 5) + 'px, 0, 0)';
      $ionicBody.removeClass('drawer-open');
      isOpen = false;
    } else {
      el.style.transform = el.style.webkitTransform = 'translate3d(0px, 0, 0)';
      $ionicBody.addClass('drawer-open');
      isOpen = true;
    }
  };

  var doEndContentDrag = function(e) {
    if (startX > lastX){
      startX = null;
      lastX = null;
      offsetX = null;
      startY = null;
      lastY = null;
      offsetY = null;
      isTargetDrag = false;
      isContentDrag = false;

      if(!dragging) {
        return;
      }

      dragging = false;

      enableAnimation();
      el.style.transform = el.style.webkitTransform = 'translate3d(-101%, 0, 0)';
      $ionicBody.removeClass('drawer-open');
      isOpen = false;
    }
    else {
      el.style.transform = el.style.webkitTransform = 'translate3d(0 0, 0)';
    }

  };

  var doDrag = function(e) {
    if(e.defaultPrevented) {
      return;
    }

    if(!lastX) {
      startX = e.gesture.touches[0].pageX;
    }
    if(!lastY) {
      startY = e.gesture.touches[0].pageY;
    }

    lastX = e.gesture.touches[0].pageX;
    lastY = e.gesture.touches[0].pageY;

    if(!dragging) {

      // Dragged 15 pixels and finger is by edge
      if(Math.abs(lastX - startX) > thresholdX) {
        if(isTarget(e.target)) {
          startTargetDrag(e);
        } else if(startX < edgeX) {
          startDrag(e);
        } 
      }
      // Closing from outside of drawer
      else if (isOpen && startX > width){
        disableAnimation();
        dragging = true;
        isContentDrag = true;
      }
    } else {
      newX = Math.min(0, (-width + (lastX - offsetX)));
      newY = Math.min(0, (-height + (lastY - offsetY)));
      var absX = Math.abs(lastX - startX);
      var absY = Math.abs(lastY - startY);
      if (isContentDrag && lastX < startX) {
        var drawerOffsetX = lastX - drawerWidth;
        el.style.transform = el.style.webkitTransform = 'translate3d(' + -absX + 'px, 0, 0)';
      } 
      else if (isTargetDrag && absX > absY + 5){
        el.style.transform = el.style.webkitTransform = 'translate3d(' + newX + 'px, 0, 0)';
      } else {
        el.style.transform = el.style.webkitTransform = 'translate3d(' + newX + 'px, 0, 0)';
      }
    }

    if(dragging) {
      e.gesture.srcEvent.preventDefault();
    }
  };

  side = $attr.side == 'left' ? LEFT : RIGHT;

  var dragFunction = function(e) {
    if (el.attributes.candrag.value){
       doDrag(e);
    } 
  }

  var dragEndFunction = function(e) {
    if (el.attributes.candrag.value){
       doEndDrag(e);
    }
  }

  var onContentDrag = function(e) {
    if (isOpen){
      doDrag(e);
    }
  }

  var onContentTap = function(e) {
    if (isOpen){
      closeDrawer();
      e.gesture.srcEvent.preventDefault();
    }
  }

  var contentDragEndFunction = function(e) {
    if (isOpen){
       doEndContentDrag(e);
       e.gesture.srcEvent.preventDefault();
    }
  }

  var openDrawer = function(){
    enableAnimation();
    el.style.transform = el.style.webkitTransform = 'translate3d(0%, 0, 0)';
    $ionicBody.addClass('drawer-open');
    isOpen = true;
  }

  var closeDrawer = function(){
    enableAnimation();
    el.style.transform = el.style.webkitTransform = 'translate3d(-101%, 0, 0)';
    $ionicBody.removeClass('drawer-open');
    isOpen = false;
  }

  var toggleDrawer = function(){
    if (isOpen){
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  this.close = function() {
    closeDrawer();
  };

  $rootScope.toggleDrawerRoot = function() {
    toggleDrawer();
  }

  this.open = function() {
    openDrawer();
  };

  this.toggle = function() {
    toggleDrawer();
  }

  var dragGesture = $ionicGesture.on('drag', dragFunction, $document);
  var dragEndGesture = $ionicGesture.on('dragend', dragEndFunction, $document);
  var contentTapGesture = $ionicGesture.on('tap', onContentTap, mainContent);
  var contentDragGesture = $ionicGesture.on('drag', onContentDrag, mainContent);
  var contentDragEndGesture = $ionicGesture.on('dragend', contentDragEndFunction, mainContent);

  $scope.$on('$destroy', function() {
    $ionicGesture.off(dragGesture, 'drag', dragFunction);
    $ionicGesture.off(dragEndGesture, 'dragend', dragEndFunction);
    $ionicGesture.off(contentTapGesture, 'tap', onContentTap);
    $ionicGesture.off(contentDragGesture, 'drag', onContentDrag);
    $ionicGesture.off(contentDragEndGesture, 'dragend', contentDragEndFunction);
  });

}])

.directive('drawer', ['$rootScope', '$ionicGesture', function($rootScope, $ionicGesture) {
  return {
    restrict: 'E',
    controller: 'drawerCtrl',
    link: function($scope, $element, $attr, ctrl) {
      $element.addClass($attr.side);
      $scope.openDrawer = function() {
        ctrl.open();
      };
      $scope.closeDrawer = function() {
        ctrl.close();
      };
      $scope.toggleDrawer = function() {
        ctrl.toggle();
      };
    }
  }
}])

.directive('menuAndDrawerToggle', ['$rootScope', '$ionicGesture', function($rootScope, $ionicGesture) {
  return {
    controller: '',
    link: function($scope, $element, $attr) {
      $element.bind('click', function(){
          $rootScope.toggleDrawerRoot();
      });
    }
  };
}])

.directive('menuAndDrawerClose', ['$ionicViewService', function($ionicViewService) {
  return {
    restrict: 'AC',
    require: '^drawer',
    link: function($scope, $element, $attr, ctrl) {
      $element.bind('click', function(){
        ctrl.close();
      });
    }
  };
}]);

})()