import React, {Component} from "react";
import './index.less'
import logo from '../../assets/images/logo.jpeg'
import {Link, withRouter} from "react-router-dom";
import {Icon, Menu} from 'antd';
import menuList from "../../config/menuConfig";

const SubMenu = Menu.SubMenu;

/*
左側導航組件
 */
class LeftNav extends Component {

    /*
  根據menu的數據數組生成對應的標籤數組
   */
    getMenuNodes = (menuList) => {
        // return menuList.map(item => {
        //     if (!item.children) {
        //         return (
        //             <Menu.Item key={item.key}>
        //                 <Link to={item.key}>
        //                     <Icon type={item.icon}/>
        //                     <span>{item.title}</span>
        //                 </Link>
        //             </Menu.Item>
        //         )
        //     } else {
        //         return (
        //             <SubMenu
        //                 key={item.key}
        //                 title={
        //                     <span>
        //                     <Icon type={item.icon}/>
        //                     <span>{item.title}</span>
        //                 </span>
        //                 }
        //             >
        //                 {this.getMenuNodes(item.children)}
        //             </SubMenu>
        //         )
        //     }
        // });

        //獲取當前路由路徑
        const path = this.props.location.pathname;

        /*
        reduce函數不斷向pre累加 + recursion
         */
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ));
            } else {

                //查找一個和當前請求匹配的子item
                const cItem = item.children.find(cItem => cItem.key === path);
                // 如果存在，說明當前item的子列表需要展開
                if (cItem) {
                    this.openKey = item.key;
                }

                //向pre添加submenu
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ));
            }
            return pre;
        }, []);
    }

    //在第一次render之前執行1次，為第一次render準備數據（必須同步）
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        //獲取當前路由路徑
        const path = this.props.location.pathname;
        // 得到需要打開菜單項的key
        const openKey = this.openKey;

        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

/*
withRouter高階組件：包裝非路由組件，返回一個新組件
新的組件包括history + location + match
 */
export default withRouter(LeftNav);
