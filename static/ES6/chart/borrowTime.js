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
            // 折线图带有区块填充色
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