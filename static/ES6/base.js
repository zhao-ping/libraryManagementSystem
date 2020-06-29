function setCookie(name, value) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + 60 * 60 * 24 * 1000); 
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"; 
}
//读取cookies 
function getCookie(name) { 
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); 

    if (arr = document.cookie.match(reg)) 

        return unescape(arr[2]); 
    else 
        return null; 
}
//删除cookies 
function delCookie(name) {
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 60 * 60 * 24 * 1000); 
    var cval = getCookie(name); 
    if (cval != null) 
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"; 
}
function logout(){
    delCookie("admin");
    location.href="/login";
}
// axios请求
axios.defaults.baseURL = 'http://localhost:8080/api/';
let adminCookie=getCookie("admin")
if(adminCookie){
    console.log(adminCookie)
    axios.defaults.headers.common['token'] = adminCookie;
}
// axios.defaults.headers.common['token'] = localStorage["token"];
axios.defaults.timeout = 5000;

// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
                data:formData,
                params:formData
            }).then((r) => {
                let res = r.data;
                if(res.code==0){
                    // 成功
                    resolve(res.data);
                }else if(res.code==1){
                    // 提示错误信息
                    t.$toast(res.msg);
                }else if(res.code==2){
                    // 用户未登录
                    location.href="/login"
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
    },
    $confirm(msg,{title="提示",message="这里是提示！"}={}){
         return new Promise((resolve,reject)=>{
            if (typeof msg=="string"){
                message=msg;
            }
            let confirm=document.createElement("div");
            confirm.className="modal";
            confirm.innerHTML=`<div id="confirmBg" class="bg"></div>
            <div class="contianer confirm bg-white text-center br-5">
                <section class="p-30">
                    <div class="pb-20 text-20"><b>${title}</b></div>
                    <p class="line-h-28 text-16 color-grey">${message}</p>
                </section>
                <div class="p-10 ub ub-ac">
                    <div id="cancel" class="btn grey ub-f1 mr-15">取消</div>
                    <div id="confirm" class="btn ub-f1">确定</div>
                </div>
            </div>`;
            document.body.appendChild(confirm)
            document.getElementById("cancel").onclick=()=>{
                document.body.removeChild(confirm);
            }
            document.getElementById("confirmBg").onclick=()=>{
                document.body.removeChild(confirm);
            }
            document.getElementById("confirm").onclick=()=>{
                document.body.removeChild(confirm);
                resolve("confirm");
            }
        })
    }
}
Object.assign(Vue.prototype,vueExtends);