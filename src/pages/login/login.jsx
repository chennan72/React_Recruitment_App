import React, {Component} from 'react'
import './login.less'
import logo from '../../assets/images/logo.jpeg'
import {Button, Form, Icon, Input, message} from 'antd'
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from 'react-router-dom';

/*
登陸的路由組件
 */
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        // 對所有的表單字段進行驗證
        this.props.form.validateFields(async (err, values) => {
            // 校驗成功
            if (!err) {
                // console.log('Submitting your login Ajax request', values);
                const {username, password} = values
                const result = await reqLogin(username, password);
                // console.log('請求成功', response.data);
                if (result.status === 0) {
                    //提示登陸成功
                    message.success('Log in successfully!');
                    const user = result.data;
                    memoryUtils.user = user; //保存在內存中
                    storageUtils.saveUser(user); // 保存在本地
                    // 頁面跳轉到admin界面 && 不需要再退回 => 用replace
                    this.props.history.replace('/home');
                } else {
                    //提示錯誤訊息
                    message.error('Incorrect username or password！');
                }
            } //校驗失敗
            else {
                console.log('Fail to validate your inputs', values);
            }
        });
    };

    validatedPwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value);
        if (!value) {
            callback('Please input your password!');
        } else if (value.length < 4) {
            callback('Password should be at least 4 characters!');
        } else if (value.length > 12) {
            callback('Password should be at most 12 characters!');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('Password must consist of English, numbers or underscores!');
        } else {
            callback() // 驗證通過
        }
    };

    render() {
        // 如果用戶已經登陸，自動跳轉到管理介面
        const user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to='/home'/>
        }
        //具有強大功能的表單form對象
        const form = this.props.form
        const {getFieldDecorator} = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React Full-Stack Project</h1>
                </header>
                <section className="login-content">
                    <h2>Welcome!</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username',
                                    {
                                        // 聲明式驗證：直接使用別人已經定義好的驗證規則去校驗
                                        rules: [
                                            {required: true, whiteSpace: true, message: 'Please input your username!'},
                                            {min: 4, message: 'Username should be at least 4 characters!'},
                                            {max: 12, message: 'Username should be at most 12 characters!'},
                                            {
                                                pattern: /^[a-zA-Z0-9_]+$/,
                                                message: 'Username must consist of English, numbers or underscores!'
                                            }
                                        ]
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    // 自定義校驗方式：validator
                                    rules: [
                                        {
                                            validator: this.validatedPwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                <div id="footer">CopyRight @ Nan Chen 2019</div>
            </div>
        )
    }
}

/*
高階函數：包裝Form組件，形成一個新的組件
- 一類特別的函數()
    1 接收函數類型的參數
    2 返回一個函數
    *** 以上條件至少二選一
    ie: setTimeout/setInterval/ --定時器
    promise/then/ --promise
    forEach/map/filter/reduce --數組遍歷
    函數對象的bind()
    Form.create()/getFieldDecorator()()
高階組件：新組件向Form組件傳遞一個強大的對象屬性：form
- 本質=一個函數
    1 接收一個（被包裝）組件作為參數，返回一個新的組件 && 新組件內部向被包裝組件傳入特定屬性
    2 返回一個組件
    3 擴展組件的功能
    4 一個React組件包裹著另一個React組件
    *** 高階組件也是一個高階函數，因為和、組件也是函數
*/

const WrapLogin = Form.create()(Login)
export default WrapLogin

/*
async: - 簡化promise對象的使用 —— 不用再使用then()來制定成功/失敗的回調函數（消滅回調函數）
       - 以同步編碼方式（沒有回調函數）實現異步流程
       - 寫在await「最近的」所在函數的左側

await:
       - 寫在返回promise的表達式左側：
        不想要promise，想要promise異步執行的成功value數據
 */
