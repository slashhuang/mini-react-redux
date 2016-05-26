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
var actions=function(){
    return {
        'type':'dispatching',
        'action':'it\'s dispatching'
    }
};
let store = createStore(reducer,{"hello":"world"});
class Container extends Component{
    static contextTypes={
        store:PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired
        })};
    constructor(props,context){
        super(props);
    }
    componentDidMount(){
       setTimeout(()=>this.props.actions(),2000);
    }
    render(){
        return(
            <div>
                <div>{JSON.stringify(this.context.store.getState())}</div>
                <div>{this.props.hello}</div>
                <div>{this.props.action}</div>
            </div>
        )
    }
};
let IndexContainer= connect((state)=>{
    return {
        hello:state.hello,
        action:state.action||'rendering'
    };
},{actions})(Container);
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



