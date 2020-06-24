import React from 'react';

const Colors = React.lazy(() => import('./views/theme/colors/Colors'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const CBins = React.lazy(() => import('./views/bins/CBins'));

const Faq = React.lazy(() => import('./views/faq/FAQ'));
const Contact = React.lazy(() => import('./views/contact/ContactForm'));
const Something = React.lazy(() => import('./views/something/Something'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },  

  { path: '/bins', exact: true,  name: 'Bins' },
  //{ path: '/bins/add', exact: true,  name: 'Add Bin', component: CBinForm },
  { path: '/bins/list', exact: true,  name: 'List of Bins', component: CBins },
  { path: '/bins/something', exact: true,  name: 'test', component: Something },
    
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/add', exact: true, name: 'Add', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },  

  { path: '/faq', exact: true, name: 'Faq', component: Faq },
  { path: '/contact', exact: true, name: 'Contact', component: Contact },
];

export default routes;
