export default [  
  {
    _tag: "CSidebarNavTitle",
    _children: ["Manage"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Bins",
    route: "/bins",
    icon: "cib-codesandbox",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add bin",
        to: "/bins/add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Bins List",
        to: "/bins/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Something",
        to: "/bins/something",
      },

    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Orders",
    route: "/orders",
    icon: "cib-cashapp",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add",
        to: "/orders/add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List",
        to: "/orders",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    route: "/users",
    icon: "cilPeople",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add",
        to: "/users/add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List",
        to: "/users",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Info"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Contact us",
    to: "/contact",
    icon: "cil-envelope-letter",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Privacy policy",
    to: "/privacy",
    icon: "cil-magnifying-glass",
  },
  {
    _tag: "CSidebarNavItem",
    name: "FAQ",
    to: "/faq",
    icon: "cil-chat-bubble",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];
