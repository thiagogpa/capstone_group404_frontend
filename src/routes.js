import React from 'react';

const Orders = React.lazy(() => import('./views/orders/Orders'));
const Order = React.lazy(() => import('./views/orders/OrderDetails'));

const AddStaff = React.lazy(() => import('./views/users/AddStaff'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const CBins = React.lazy(() => import('./views/bins/CBins'));

const Faq = React.lazy(() => import('./views/faq/FAQ'));
const Contact = React.lazy(() => import('./views/contact/ContactForm'));

const OrderStepper = React.lazy(() => import('./views/orders/placingorder/COrderStepper'));

const Something = React.lazy(() => import('./views/something/Something'));

const Profile = React.lazy(() => import('./views/profile/Profile'));

const Privacy = React.lazy(() => import('./views/privacy/Privacy'));

const routesLoggedIN = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/profile', exact: true,  name: 'Profile', component: Profile },

  { path: '/bins', exact: true,  name: 'Bins' },
  //{ path: '/bins/add', exact: true,  name: 'Add Bin', component: CBinForm },
  { path: '/bins/list', exact: true,  name: 'List of Bins', component: CBins },
  { path: '/bins/something', exact: true,  name: 'test', component: Something },
    
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/add', exact: true, name: 'Add', component: AddStaff },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },  

  { path: '/orders', exact: true,  name: 'Orders', component: Orders },
  { path: '/orders/add', exact: true, name: 'Add', component: OrderStepper },
  
  { path: '/orders/list', exact: true, name: 'List of Orders', component: Orders },  
  { path: '/orders/:id', exact: true, name: 'Order Details', component: Order },  

  { path: '/faq', exact: true, name: 'Faq', component: Faq },
  { path: '/privacy', exact: true, name: 'Privacy', component: Privacy },
  { path: '/contact', exact: true, name: 'Contact', component: Contact },

];

export default routesLoggedIN;
