import angular from 'angular';

import App from 'src/app';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular
  .element( document )
  .ready( function() {
    angular
      .module( 'app-bootstrap', [ App.name ] )
      .run(()=>{
        console.log('Running the PMTool application');
      });

    let body = document.getElementsByTagName("body")[0];
    angular.bootstrap( body, [ 'app-bootstrap' ]);
  });
