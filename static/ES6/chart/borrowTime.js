let app=new Vue({
    el:"#app",
    data(){
        return {
            info:null,
        }
    },
    methods:{
        getInfo(){
            getData(`/admin/chart/borrow_time`,this,).then(r=>{
                this.info=r;
                this.paintChart();
            })
        },
        paintChart(){
            let series=[];
            let xAxis=[];
            this.info.a_axis.map(item=>{
                xAxis.push(vueExtends.formateDateTime(item))
            })
            this.info.series.map(item=>{
                item.name=item.name.length>5?item.name.substring(0,5)+"···":item.name;
                console.log(item);
                let ser={type:'area',...item}
                series.push(ser);
            })
            var chartOptionArea = {
                title: "最受欢迎的图书近7天借阅情况",
                xAxis: {
                    data: xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series,
            };
            // 柱状图
            new barChart("chart", chartOptionArea);
        }
    },
    created(){
        // this.getInfo()
    },mounted(){
        this.getInfo()
        // this.paintChart()
    }
})