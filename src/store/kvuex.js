let  vue;

class Store{
    //持有state 实现响应化
    //实现commit和dispatch两个方法
    constructor(options){
     this.state= new vue({data:options.state})
     this.mutations = options.mutations
     this.actions = options.actions
     this.mutations=this.mutations.bind(this)
     this.dispatch=this.dispatch.bind(this)
    }
    //commit 修改state数据
    commit(type,arg){
        this.mutations[type](this.state,arg)
    }

    dispatch(type,arg){
        const store = this;
        return  this.actions[type](store,arg)

    }

}
// ——Vue是形参 Vue构造函数，use会把它传进来
function install(_Vue){
    vue=_Vue;

    vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                vue.prototype.$store = this.$options.store
            }
        },
    })
}
//导出vuex
export default {Store,install}