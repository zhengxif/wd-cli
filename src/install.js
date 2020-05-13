import { repoList, tagList, downloadLoacal } from './utils/git';
import ora from 'ora'; // 下载状态条
import inquirer from 'inquirer'; // 询问器


let install = async () => {
   
    let loading;
    try {
        // 选择下载模版
        // 获取模版信息（有哪些模版）
        loading = ora('下载模版列表中。。。');
        loading.start();
        let list = await repoList();
        loading.succeed('下载完成');
        list = list && list.map(({name})=> name);
        let answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'project',
                choices: list,
                message: '请选择一个模版',
            }
        ])
        // // 项目名
        let project = answer.project;
        
        // loading = ora('下载标签列表中。。。');
        // loading.start();
        // list = await tagList(project);
        // loading.succeed('下载完成');
        // list = list.map(({name})=> name);
        // answer = await inquirer.prompt([
        //     {
        //         type: 'list',
        //         name: 'tag',
        //         choices: list,
        //         message: '请选择一个版本',
        //     }
        // ])
        // let tag = answer.tag;

        loading = ora('下载模版中。。。');
        loading.start();
        await downloadLoacal(project);
        loading.succeed('下载完成');
    } catch (error) {
        console.log(error);
        loading.fail('下载失败');
    }

}
export default install;