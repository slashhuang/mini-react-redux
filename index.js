/**
 * Created by slashhuang on 16/5/9.
 * mini react-redux
 */
import { createStore } from 'redux';
import React,{Component,PropTypes} from "react";
import {Provider,connect} from "react-redux";
import {render} from "react-dom";
let test={a:{
    b:1,
    c:2
}};
let {c,b}=test.a;
console.log(c,b)
var reducer=function(state,action){
    return Object.assign({},state,action);
};
var action=function(){
    return {
        'type':'dispatching',
        'data':['mini','react','redux','worked']
    }
};
let store = createStore(reducer,{"hello":"world"});
class Container extends Component{
    constructor(props){
        super(props);
        this.state={
            a:0
        }
    }
      
    clickDom(){
        this.props.action1();
    }
    render(){
        console.log('render', this.state.a)
        return(
            <div>
                this is myCustomized Props { this.props.my }
                <div onClick={()=>this.clickDom()}>测试react1管理的事件</div>
                <ul>{this.props.data.length?'结果':''}
                    {this.props.data.map((ele)=>{
                   return <li key={ele}>{ele}</li>
                })}</ul>
                {this.state.a}
            </div>
        )
    }
};
debugger;
let IndexContainer= connect((state, props)=>{
    return {
        data:state.data||[],
        hint:state.type,
        hello: props.hello
    };
},(dispatch, props)=>{
     return {
            action1:() => dispatch(action())
    }
},(stateProps, dispatchProps, parentProps) => {
   return  Object.assign({},stateProps, dispatchProps, parentProps, {my: "myProps"})
})(Container);
class ModuleContainer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<Provider store={store}>
                    <IndexContainer hello={'world'}/>
                </Provider>)
    }
}
render(<ModuleContainer/>,document.getElementById('root'));



