import { Store } from "vuex";

let Vue;

class Store{
    //持有state，使其响应化
    //实现commit和dispatch
    constructor(options){
        //this.state 是vue的实例
     this.state = new Vue({data:options.state})
    this.mutations= options.mutations;
    this.dispatch=this.dispatch.bind(this)
    this.commit=this.commit.bind(this)
    }
    commit(type,...arg){
        this.mutations[type](this.state,...arg);
    }
    dispatch(type,arg){
        const store = this;
     return    this.actions[type](store,arg)
    }
}
//声明插件
//_Vue是形参 Vue的构造函数use会把vue传进来
function install(_Vue){
    Vue = _Vue
    Vue.minxin({
        befaorCreate(){
           if(this.$options.store){
                Vue.prototype.$store = this.$options.store
           }
        }
    })
}
//vuex
export default {Store,install}