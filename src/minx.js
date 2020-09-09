import Vue from "vue"
Vue.mixin({
    props:{
        prop: {
            type: Object,
            // required: true
        }
    },
    methods:{
        curData(data) {
            const that = this.$store.state.home
            // this.currentData = data;
            that.isSelect = true;
            that.$store.commit("deleteSelCom")
            that.$store.commit("setSelectCom", data)
        },
        curDrag(data) {
            const centerData = this.$store.state.centerData
        },
        curSelect(id){
            // console.log('选中组件----组件点击id',id, this.currentData)
            // const centerData = this.$store.state.centerData
            // this.isSelect = true;
            // this.selectId = id;
            // this.selectIndex = this.getRealIndex(id);
            // this.selectHeight = parseInt(centerData[this.selectIndex].props.style.height);
            // this.$nextTick(()=>{
            //     let curBox = this.$refs.centerItem[this.selectIndex];
            //     let offsetTop = curBox.$el.offsetTop;
            //     this.selectTop = offsetTop + this.selectHeight + 15;
            //     console.log('组件选中了,点击时现实的----id',curBox, this.selectTop)
            //     this.getCurSet(centerData[this.selectIndex].props);
            // })
            const that = this.$store.state.home
            const centerData = this.$store.state.centerData
            that.isSelect = true;
            that.selectId = id;
            that.selectIndex = that.getRealIndex(id);
            that.selectHeight = parseInt(centerData[that.selectIndex].props.style.height);
            that.$nextTick(()=>{
                let curBox = that.$refs.centerItem[that.selectIndex];
                let offsetTop = curBox.$el.offsetTop;
                that.selectTop = offsetTop + that.selectHeight + 15;
                that.getCurSet(centerData[that.selectIndex].props);
            })
        },
    }
})