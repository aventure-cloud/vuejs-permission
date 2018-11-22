# Vuejs Permission
Application permission management for vuejs.


- **Author:** Valerio Barbera - [support@gistmetrics.com](mailto:support@gistmetrics.com)
- **Author Website:** [www.gistmetrics.com](target="_blank":https://www.gistmetrics.com) 


## Install
`npm install vuejs-permission --save`


## Integrate
Import the plugin and register it on VueJS, it is necessary 
to send as a parameter the vue router-router and the default 
system permissions list:
```javascript
import router from './routes';
import acl from 'vuejs-permission';
let permissions = [
    'create-employee', 
    'update-employee'
];
Vue.use( acl, { router: router, init: permissions, fail: '/' } );
```


## Use
Add metadata in their routes saying which permission, 
or group of permissions is required to access the route, 
use pipe (|) to do an OR check for more than one permission, 
use (&) to do an AND check for multiple permissions 
(these can be used in combination for more complex situations). 
Use the `fail` metadata to indicate which this route to redirect on error:
```javascript
[
  {
    path: '/',
    component: require('./components/Public.vue'),
    meta: {
      permission: 'public',
      fail: '/error-public'
    }
  },
  
  ...
];
```

Use the global method $can() to verify that the system gives access 
to permission passed by parameter:
```html
<router-link to="/employees" v-if="$can('create-employee|update-employee')">
    Add employee
</router-link>
```
This method receives a parameter with the permissions to check, 
separated by a pipe (|) or ampersand (&), and returns a bool saying 
if permission has been granted.
