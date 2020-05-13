// 专门管理.wdclirc文件 （当前用户的目录下）

import { get, set, getAll, remove } from './utils/rc'

let config = async (action, k ,v) => {
    switch (action) {
        case 'get':
            if (k) {
                let key = await get(k);
                console.log(key);
            } else {
                let obj = await getAll();
                Object.keys(obj).forEach(key => {
                    console.log(`${key}=${obj[key]}`);
                })
            }
            break;
        case 'set':
            await set(k, v);
            break;
        case 'remove':
            await remove(k)
            break;
    }
}
export default config;