/*
登陆的路由组件
 */

import React, {Component} from 'react'
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'

// const ListItem = List.Item

class Login extends Component {
    state = {
        username: '',  // 用户名
        password: '',  // 密码
    }

    login = () => {
        this.props.login(this.state)
    }

    // 处理输入数据的改变: 更新对应的状态
    handleChange = (name, val) => {
        // 更新状态
        this.setState({
            [name]: val  // 属性名不是name, 而是name变量的值
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {

        const {msg, redirectTo} = this.props.user
        // 如果redirectTo有值, 就需要重定向到指定的路由
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>myNortheastern JOBS</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='username' onChange={val => {
                            this.handleChange('username', val)
                        }}>Username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='password' type="password" onChange={val => {
                            this.handleChange('password', val)
                        }}>Password:</InputItem>
                        <WhiteSpace/>

                        <Button type='primary' onClick={this.login}>Log In</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>No account?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)
