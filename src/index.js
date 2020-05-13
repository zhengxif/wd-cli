// 命令行命名拿到后，控制主流程
import { betterRequire } from './utils/common'
import { resolve } from 'path'

let apply = (action, ...args) => {
    betterRequire(resolve(__dirname, `./${action}`))(...args);
}

export default apply;