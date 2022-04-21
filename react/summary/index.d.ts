
////<reference path="./node_modules/ts-type-demo/index.d.ts" />
///<reference types="ts-type-demo" />

// declare module '@yt/YTUI' {
//     let showToast: any;
//     let EmptyHolder: any;
//     let Calendar: any;
//     let Popup: any;
//     let Button: any;
//     let Select: any;
//     let ScrollView: any;
//     let confirm: any;
//     let SearchBar: any;
//     let Tabs: any;
//     let Tab: any;
//     let Dropdown: any;
//     export { showToast, EmptyHolder, Calendar, Popup, Button, Select, ScrollView, confirm, SearchBar, Tabs, Tab, Dropdown };
// }

interface HttpReqest<P, R> {
    (params: P): Promise<HttpResponseProps<R>>
}

interface HttpResponseProps<R> {
    result: boolean;
    msg?: string;
    kind?: string;
    data: R;
}

type CustomTyping = 'type1' | 'type2';