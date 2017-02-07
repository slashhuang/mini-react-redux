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
    componentDidMount(){
       //setTimeout(()=>this.props.action(),2000);
        console.log('====didmount0=>1===')
            this.setState({
                a:1
            });
        console.log(this.state.a)
        setTimeout(()=>{this.setState({
            a:2})
            console.log('====timeout 1=>2===')
            console.log(this.state.a)
        }, 500 );

    }
    clickDom(){
        "use strict";
        console.log('====onClick 2=>3===');
        this.state.a=4;
        this.setState({a:3});
         console.log(this.state.a)
         this.state.a=5;
        console.log(this.state.a)
    }
    render(){
        console.log('render', this.state.a)
        return(
            <div>
                <div onClick={()=>this.clickDom()}>测试react1管理的事件</div>
                <ul>{this.props.data.length?'结果':''}
                    {this.props.data.map((ele)=>{
                   return <li>{ele}</li>
                })}</ul>
                {this.state.a}
            </div>
        )
    }
};
let IndexContainer= connect((state)=>{
    return {
        data:state.data||[],
        hint:state.type
    };
},{action})(Container);
class ModuleContainer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<Provider store={store}>
                    <IndexContainer/>
                </Provider>)
    }
}
render(<ModuleContainer/>,document.getElementById('root'));



