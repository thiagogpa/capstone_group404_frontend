export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Manage"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Bins",
    to: "/bins/list",
    icon: "cib-codesandbox",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Orders",
    to: "/orders",
    icon: "cib-cashapp",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    route: "/users",
    icon: "cilPeople",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Staff Member",
        to: "/users/add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List",
        to: "/users",
      },
    ],
  },
];
