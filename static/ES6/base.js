// axios请求
axios.defaults.baseURL = 'http://localhost:8080/api/';
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
            axios.request(url, {
                method: method,
                data: method.toLowerCase()!="get"?JSON.stringify(formData):null,
                params: method.toLowerCase()=="get"?formData:null,
            }).then((r) => {
                let res = r.data;
                if(res.code==0){
                    resolve(res.data);
                }else if(res.code==1){
                    t.$toast(res.msg);
                }
                
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

var vueExtends={
    formateDateTime(time){
        var dateTime=new Date(time*1000)
        var year=dateTime.getFullYear();
        var month=dateTime.getMonth()+1;
        var day=dateTime.getDate();
        return `${year}-${month}-${day}`;
    },
    $toast(msg,duration=1500){
        var toast=document.createElement('div');
        toast.innerText=msg;
        toast.className="toast";
        document.body.append(toast);
        let timer=300,everyTimer=5,stepOpacity=1/timer*everyTimer;
        var opacity=0;
        let showInterval=setInterval(() => {
            opacity+=stepOpacity;
            if(opacity<=1){
                toast.style.opacity=opacity
            }else{
                clearInterval(showInterval);
            }
        }, everyTimer);
        setTimeout(() => {
            let hideInterval=setInterval(() => {
                opacity-=stepOpacity;
                if(opacity>=0){
                    toast.style.opacity=opacity
                }else{
                    clearInterval(hideInterval);
                    document.body.removeChild(toast);
                }
            }, everyTimer);
        }, duration);
    }
}
Object.assign(Vue.prototype,vueExtends);