/**
 * Created by slashhuang on 16/5/9.
 * mini react-redux
 */
import { createStore } from 'redux';
import React,{Component,PropTypes} from "react";
import {Provider,connect} from "react-redux";
import {render} from "react-dom";
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
    }
    componentDidMount(){
       setTimeout(()=>this.props.action(),2000);
    }
    render(){
        return(
            <div>
                <div>执行动作:{JSON.stringify(this.props.hint)}</div>
                <ul>{this.props.data.length?'结果':''}
                    {this.props.data.map((ele)=>{
                   return <li>{ele}</li>
                })}</ul>
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



