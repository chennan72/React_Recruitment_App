import React, {Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Category from "../category/category";
import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";

const {Footer, Sider, Content} = Layout;

/*
後台管理的路由組件
 */
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // 如果內存中沒有user => 當前尚未登陸
        if (!user || !user._id) {
            return <Redirect to='/login'/>;
        } else {
            return <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor: 'white'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect from='/' exact to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', background: '#333', color: '#fff'}}>
                        CopyRight @ Nan Chen 2019
                    </Footer>
                </Layout>
            </Layout>
        }
    }
}
