export interface SiderBar {
    name: string,
    label: string,
    path: string
}

export const siderBarList: SiderBar[] = [
    {
        name: 'index',
        label: '业务通知',
        path: '/index'
    },
    {
        name: 'template',
        label: '模版操作',
        path: '/template'
    }
];