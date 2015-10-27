angular.module('nodeadmin.system.logs', [])
.controller('LogsController', ['$scope', 'SocketFactory', '$state', function ($scope, SocketFactory, $state) {
  
  $scope.logfile = [];
  var socket = SocketFactory.connect('system');
  var checkConnection = function () {
    if(socket.connected === true) {
      console.log('Socket: ', socket);
    }  else {
      console.log('Connecting socket: ', socket);
      // setTimeout(checkConnection, 5000);
      
    }
  };

  socket.on('system', function (data) {
    console.log('received in system');
  });

  $scope.getLogs = function () {
    socket.emit('getlogs');
    socket.on('logs', function (log) {
      $scope.$apply($scope.logfile.unshift(log));
    });
  }
  $scope.getLogs();

  $scope.$on("$destroy", function () {
    console.log('stop sending shit');
    socket.emit('stoplogs');
  });

}]);