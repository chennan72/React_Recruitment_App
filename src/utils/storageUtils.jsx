/*
進行local數據存儲管理的工具模塊
 */
import store from 'store';

const USER_KEY = 'user-key';

export default {
    /*
    保存user
     */
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },

    /*
    獲取user
     */
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {};
    },

    /*
    刪除user
     */
    removeUser() {
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}
