/*
入口JS
 */

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

// 讀取local中保存的user，保存在內存中
const user = storageUtils.getUser();
memoryUtils.user = user;

// 將App組件標籤渲染到index頁面的div上
ReactDOM.render(<App/>, document.getElementById('root'))
