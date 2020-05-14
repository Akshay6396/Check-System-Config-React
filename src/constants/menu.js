const data = [{
  id: "dashboards",
  icon: "iconsminds-shop-4",
  label: "menu.dashboards",
  to: "/app/dashboards",
  subs: [{
    icon: "simple-icon-briefcase",
    label: "menu.operations",
    to: "/app/dashboards/operations"
  },
  ]
},
{
  id: "pages",
  icon: "iconsminds-students",
  label: "menu.students",
  to: "/app/pages",
  subs: [
    {
      id: "students",
      label: "menu.students",
      to: "/app/students",
      subs: [{
        icon: "simple-icon-people",
        label: "menu.student-list",
        to: "/app/students/list"
      }
      ]
    },
  ]
},
{
  id: "cases",
  icon: "simple-icon-briefcase",
  label: "cases.cases",
  to: "/app/cases",
  subs: [
    {
      id: "cases",
      label: "cases.pending_cases",
      to: "/app/cases",
      subs: [
        {
          icon: "iconsminds-management",
          label: "cases.no_kam",
          to: "/app/cases/no-kam"
        },
        {
          icon: "iconsminds-management",
          label: "cases.pending_intro_call",
          to: "/app/cases/pending-intro-call"
        },
        {
          icon: "iconsminds-management",
          label: "cases.pending_test",
          to: "/app/cases/pending-test"
        },

        {
          icon: "iconsminds-management",
          label: "cases.pending_analysis",
          to: "/app/cases/pending-analysis"
        },
        {
          icon: "iconsminds-management",
          label: "cases.pending_intro",
          to: "/app/cases/pending-intro"
        },
        {
          icon: "iconsminds-management",
          label: "cases.pending_shortlisting",
          to: "/app/cases/pending-shortlisting"
        },
        {
          icon: "iconsminds-management",
          label: "cases.pending_mentor_allocation",
          to: "/app/cases/pending-mentor-allocation"
        }
      ]
    },
  ]
},
  // {
  //   id: "applications",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.applications",
  //   to: "/app/applications",
  //   subs: [{
  //     icon: "simple-icon-check",
  //     label: "menu.todo",
  //     to: "/app/applications/todo"
  //   },
  //   {
  //     icon: "simple-icon-calculator",
  //     label: "menu.survey",
  //     to: "/app/applications/survey"
  //   },
  //   {
  //     icon: "simple-icon-bubbles",
  //     label: "menu.chat",
  //     to: "/app/applications/chat"
  //   }
  //   ]
  // },
  // {
  //   id: "ui",
  //   icon: "iconsminds-pantone",
  //   label: "menu.ui",
  //   to: "/app/ui",
  //   subs: [

  //     {
  //       id: "ui-forms",
  //       label: "menu.forms",
  //       to: "/app/ui/forms",
  //       subs: [{
  //         icon: "simple-icon-notebook",
  //         label: "menu.layouts",
  //         to: "/app/ui/forms/layouts"
  //       },
  //       {
  //         icon: "simple-icon-puzzle",
  //         label: "menu.components",
  //         to: "/app/ui/forms/components"
  //       },
  //       {
  //         icon: "simple-icon-check",
  //         label: "menu.validations",
  //         to: "/app/ui/forms/validations"
  //       },
  //       {
  //         icon: "simple-icon-magic-wand",
  //         label: "menu.wizard",
  //         to: "/app/ui/forms/wizard"
  //       }
  //       ]
  //     },
  //     {
  //       id: "ui-components",
  //       label: "menu.components",
  //       to: "/app/ui/components",
  //       subs: [{
  //         icon: "simple-icon-bell",
  //         label: "menu.alerts",
  //         to: "/app/ui/components/alerts"
  //       },
  //       {
  //         icon: "simple-icon-badge",
  //         label: "menu.badges",
  //         to: "/app/ui/components/badges"
  //       },
  //       {
  //         icon: "simple-icon-control-play",
  //         label: "menu.buttons",
  //         to: "/app/ui/components/buttons"
  //       },
  //       {
  //         icon: "simple-icon-layers",
  //         label: "menu.cards",
  //         to: "/app/ui/components/cards"
  //       },
  //       {
  //         icon: "simple-icon-picture",
  //         label: "menu.carousel",
  //         to: "/app/ui/components/carousel"
  //       },
  //       {
  //         icon: "simple-icon-chart",
  //         label: "menu.charts",
  //         to: "/app/ui/components/charts"
  //       },
  //       {
  //         icon: "simple-icon-arrow-up",
  //         label: "menu.collapse",
  //         to: "/app/ui/components/collapse"
  //       },
  //       {
  //         icon: "simple-icon-arrow-down",
  //         label: "menu.dropdowns",
  //         to: "/app/ui/components/dropdowns"
  //       },
  //       {
  //         icon: "simple-icon-book-open",
  //         label: "menu.editors",
  //         to: "/app/ui/components/editors"
  //       },

  //       {
  //         icon: "simple-icon-star",
  //         label: "menu.icons",
  //         to: "/app/ui/components/icons"
  //       },
  //       {
  //         icon: "simple-icon-note",
  //         label: "menu.input-groups",
  //         to: "/app/ui/components/input-groups"
  //       },
  //       {
  //         icon: "simple-icon-screen-desktop",
  //         label: "menu.jumbotron",
  //         to: "/app/ui/components/jumbotron"
  //       },
  //       {
  //         icon: "simple-icon-map",
  //         label: "menu.maps",
  //         to: "/app/ui/components/maps"
  //       },
  //       {
  //         icon: "simple-icon-docs",
  //         label: "menu.modal",
  //         to: "/app/ui/components/modal"
  //       },
  //       {
  //         icon: "simple-icon-cursor",
  //         label: "menu.navigation",
  //         to: "/app/ui/components/navigation"
  //       },
  //       {
  //         icon: "simple-icon-pin",
  //         label: "menu.popover-tooltip",
  //         to: "/app/ui/components/popover-tooltip"
  //       },
  //       {
  //         icon: "simple-icon-shuffle",
  //         label: "menu.sortable",
  //         to: "/app/ui/components/sortable"
  //       },
  //       {
  //         icon: "simple-icon-grid",
  //         label: "menu.tables",
  //         to: "/app/ui/components/tables"
  //       }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "menu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.menu",
  //   to: "/app/menu",
  //   subs: [{
  //     icon: "simple-icon-logout",
  //     label: "menu.types",
  //     to: "/app/menu/types"
  //   },
  //   {
  //     icon: "simple-icon-layers",
  //     label: "menu.levels",
  //     to: "/app/menu/levels",
  //     subs: [{
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-1",
  //       to: "/app/menu/levels/third-level-1"
  //     },
  //     {
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-2",
  //       to: "/app/menu/levels/third-level-2"
  //     },
  //     {
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-3",
  //       to: "/app/menu/levels/third-level-3"
  //     }
  //     ]
  //   }
  //   ]
  // },
  // {
  //   id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow: true
  // }
];
export default data;