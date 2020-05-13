import request from 'request-promise';
import { getAll } from './rc';
import downloadGit from 'download-git-repo';
import { DOWNLOAD } from './constants'
let fetch = async (uri) => {
    let config = {
        uri,
        methods: 'get',
        headers: {
            'user-agent': 'xxxx',
        },
    }
   
    try {
        let res = await request(config);
        return JSON.parse(res);
    } catch (error) {
        console.log(error);
    }
}
// 获取版本号列表
export let tagList = async (repo) => {
    let config = await getAll();
    let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
    return await fetch(api);
}
// 获取仓库列表
export let repoList = async () => {
    let config = await getAll();
    let api = `https://api.github.com/${config.type}/${config.registry}/repos`;
    return await fetch(api);
}

// 下载模版
export let download = async (src, dest) => { // 仓库地址  存放地址
    return new Promise((resolve, reject) => {
        downloadGit(src, dest, (err) => {
            if (err) {
                reject(err);
            }
            resolve()
        })
    })
}
export let downloadLoacal = async (project, version) => {
    let config = await getAll();
    let api = `${config.registry}/${project}`;
    if (version) {
        api += `#${version}`;
    }
    return await download(api, DOWNLOAD + '/' + project);
}