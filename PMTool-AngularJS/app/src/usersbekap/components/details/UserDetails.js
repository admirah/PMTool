import UserDetailsController from './UserDetailsController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/usersbekap/components/details/UserDetails.html',
    controller       : [ 'UserService', '$mdBottomSheet', '$log', UserDetailsController ]
  }
};