import React, {Component} from "react";
import './index.less'
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import {reqWeather} from "../../api";
import {withRouter} from "react-router-dom";
import menuList from "../../config/menuConfig";
import {Modal} from 'antd';
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button";

/*
左側導航組件
 */
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),//當前時間字符串
        dayPictureUrl: '',//天氣的圖片
        // weather: '',
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime});
        }, 1000)
    }

    getWeather = async () => {
        //調用接口請求函數
        const {dayPictureUrl} = await reqWeather('上海')
        //更新狀態
        this.setState({dayPictureUrl});
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) { //如果當前item對象的key和path一樣，item的title就是需要顯示的title
                title = item.title;
            } else if (item.children) {
                //在所有的子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path);
                //如果有值才有匹配的
                if (cItem) {
                    //取出title
                    title = cItem.title;
                }
            }
        })
        return title;
    }

    //退出登陸
    logout = () => {
        Modal.confirm({
                content: 'Are you sure you want to leave this page?',
                onOk: () => {
                    //刪除保存的user數據
                    storageUtils.removeUser();
                    memoryUtils.user = {};
                    //跳轉到login界面
                    this.props.history.replace('/login');
                },
            }
        );
    }

    //在第一次render之後執行一次，一般再次執行異步操作：發送ajax請求/啟動Timer
    componentDidMount() {
        //獲取當前時間
        this.getTime();
        //獲取當前天氣
        this.getWeather();
    }

    //在當前組件卸載之前調用
    componentWillUnmount() {
        //清楚timer
        clearInterval(this.intervalId);
    }

    render() {
        const {currentTime, dayPictureUrl} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();

        return (
            <div className="header">
                <div className='header-top'>
                    <span>
                        Welcome! {username}
                    </span>
                    <LinkButton onClick={this.logout}>Log Out</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img
                            src={dayPictureUrl}
                            alt='weather'/>
                        {/*<span>{weather}</span>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
