const menuList = [
    {
        title: 'Home', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: 'Product',
        key: '/products',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: 'My Category',
                key: '/category',
                icon: 'bars'
            },
            {
                title: 'My Product',
                key: '/product',
                icon: 'tool'
            },
        ]
    },

    {
        title: 'User',
        key: '/user',
        icon: 'user'
    },
    {
        title: 'Role',
        key: '/role',
        icon: 'safety',
    },

    {
        title: 'Chart',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: 'Bar Chart',
                key: '/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: 'Line Chart',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: 'Pie Chart',
                key: '/charts/pie',
                icon: 'pie-chart'
            },
        ]
    },

    {
        title: 'Order',
        key: '/order',
        icon: 'windows',
    },
]

export default menuList //默認暴露(本質上可以寫任意名字，但最好不要)
