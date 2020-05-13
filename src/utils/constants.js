import { version } from '../../package.json'

export const  VERSION = version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
export const RC = `${HOME}/.wdclirc`;

// RC配置下载(模版)的地方 给github的api来用的
export const DEFAULTS = {
    registry: 'wd-cli',
    type: 'orgs'
}

// 下载模版的位置
export const DOWNLOAD = `${HOME}/.templaterc`;