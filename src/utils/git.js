import request from 'request-promise';
import { getAll } from './rc';
import download from 'download-git-repo';
import { promisify } from 'util';
import { DOWNLOAD } from './constants'

const downloadGit = promisify(download);

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
export let downloadLoacal = async (project, version) => {
    let config = await getAll();
    let api = `${config.registry}/${project}`;
    let dest = DOWNLOAD + '/' + project;
    if (version) {
        api += `#${version}`;
    }
    await downloadGit(api, dest);
    return dest;
}