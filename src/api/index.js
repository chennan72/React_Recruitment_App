/*
包含應用中所有interface的request函數的模塊
根據接口文檔定義接口請求
 */

//登陸
import ajax from "./ajax";
import jsonp from 'jsonp';
import {message} from 'antd';


export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');
// 添加用戶
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');

//獲取分類列表
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId});
//添加分類
export const reqAddCategories = (categoryName, parentId) => ajax('/manage/category/add', {
    categoryName,
    parentId
}, 'POST');
//更新分類
export const reqUpdateCategories = ({categoryId, categoryName}) => ajax('/manage/category/update', {
    categoryId,
    categoryName
}, 'POST');

/*
jsonp接口請求函數
 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // 發送jsonp請求
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data)
            // 成功
            if (!err && data.status === 'success') {
                // 去除需要的數據
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                // 失敗
                message.error('获取天气信息失败!')
            }

        })
    })
}

