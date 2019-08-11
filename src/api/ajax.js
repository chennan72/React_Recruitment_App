/*
發送異步ajax請求的函數模塊
封裝axios庫
函數return一個promise對象
 */
import axios from 'axios'
import {message} from 'antd'

/*
1. 統一處理請求異常的方法：
在外層包一個promise對象
在請求出錯時，不reject(error)，而是顯示錯誤訊息
2. 異步得到的不是response，而是response的data
在請求成功後resolve時：resolve(response.data)
 */
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        // 執行ajax異步請求
        if (type === 'GET') {
            promise = axios.get(url, { //配置對象
                params: data
            });
        } else {
            promise = axios.post(url, data);
        }
        // if成功了，調用resolve
        promise.then(response => {
            resolve(response.data);
            // if失敗了，提示異常訊息（不調用reject）
        }).catch(error => {
            message.error('Request Error: ' + error.message)
        })
    });
}
