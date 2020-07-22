export default [

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
