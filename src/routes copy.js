import React from 'react';

const Colors = React.lazy(() => import('./views/theme/colors/Colors'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Faq = React.lazy(() => import('./views/faq/FAQ'));
const Contact = React.lazy(() => import('./views/contact/ContactForm'));

const routesLoggedOFF = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/faq', exact: true, name: 'Faq', component: Faq },
  { path: '/contact', exact: true, name: 'Contact', component: Contact },
];

export default routesLoggedOFF;
