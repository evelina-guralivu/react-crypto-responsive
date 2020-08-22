export default function () {
  return [
    {
      title: "Public Blog",
      to: "/public",
      htmlBefore: '<i class="material-icons">language</i>',
      htmlAfter: ""
    },
    {
      title: "Member Content",
      htmlBefore: '<i class="material-icons">view_quilt</i>',
      to: "/blogs/premium/",
    },
    {
      title: "Alerts",
      htmlBefore: '<i class="material-icons">notification_important</i>',
      to: "/alerts",
    },
    {
      title: "Analysts",
      htmlBefore: '<i class="material-icons">people</i>',
      to: "/analysts",
    },
    {
      title: "Education",
      htmlBefore: '<i class="material-icons">book</i>',
      to: "/education",
    },
    {
      title: "CMS",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/cms",
    }
  ];
}