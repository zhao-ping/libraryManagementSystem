// axios请求
// axios.defaults.baseURL = 'https:/zp.zituo.net/v1/api/';
// axios.defaults.headers.common['token'] = localStorage["token"];
axios.defaults.timeout = 5000;

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
/*
list ：返回数据追加到列表上 list为字符串 配套使用listPage,listAllLoaded,listLoading
resData:返回数据赋值给resData,resDara为赋值数据的名字 类型 str
pushList：当返回的数据不是单纯的array，需要另行push列表 pushList传参数false，默认true,自动push列表 用于填志愿中的添加学校和添加专业
*/
function getData(url, t, {
    method = "get",
    formData = {},
    list,
    resData
} = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios.request(`${location.origin}/v1/api/${url}`, {
                method: method,
                data: method.toLowerCase()!="get"?JSON.stringify(formData):null,
                params: method.toLowerCase()=="get"?formData:null,
            }).then((r) => {
                let res = r.data;
                resolve(res);
            }).catch(error=>{
                if(error.message.indexOf("timeout")!=-1){
                    t.$toast("请求超时，请重复此操作或者刷新页面！");
                }
            })
        } catch (error) {
            t.$toast("网络请求出错");
            reject();
        }
    })
}
