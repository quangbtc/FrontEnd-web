export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

        // ],
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.schedule-doctor",
        link: "/system/doctor/schedule",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
    ],
  },
  {
    //Quản lý phòng khám
    name: "menu.admin.clinics",
    menus: [
      {
        name: "menu.admin.manage-clinics",
        link: "/system/manage-clinics",
      },
    ],
  },
  {
    //Quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //Quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const doctorMenu=[
  {
    //MANAGE DOCTOR
    name: "menu.doctor.user-doctor",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/system/doctor/schedule",
      },
     
    ],
  },
]
