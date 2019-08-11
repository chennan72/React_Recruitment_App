import React from 'react';
import './index.less';

/*
具有鏈接功能的按鈕
 */

/*
以後有需要a標籤鏈接功能但不是真正的a標籤的組件，做link-button
 */
export default function LinkButton(props) {
    return <button {...props} className='link-button'></button>
}
