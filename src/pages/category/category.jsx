import React, {Component} from "react";
import {Card, Table, Button, Icon, message} from "antd";
import LinkButton from "../../components/link-button";
import {reqCategories} from "../../api";

/*
左側導航組件
 */
export default class Category extends Component {

    state = {
        loading: false, //是否正在獲取數據中
        categories: [] //一級分類列表
    }

    /*
    初始化table所有列的數組
     */
    initColumns = () => {
        this.columns = [
            {
                title: 'Category Name',
                dataIndex: 'name', //顯示數據對應的field_name
            },
            {
                title: 'Operations',
                width: 400,
                render: () => (
                    <span>
                        <LinkButton>Change Category</LinkButton>
                        <LinkButton>Check Sub-Category</LinkButton>
                    </span>
                )
            }
        ];
    }

    /*
    展示一級分類列表顯示
     */
    getCategories = async () => {
        //發送請求前，顯示loading
        this.setState({loading: true});
        //發送異步ajax請求，獲取數據
        const result = await reqCategories('0');
        //請求完成後，隱藏loading
        this.setState({loading: false});
        if (result.status === 0) {
            const categories = result.data;
            this.setState({categories});
        } else {
            message.error('Failed to get your category list!');
        }
    }

    /*
    為第一次render做準備
     */
    componentWillMount() {
        this.initColumns();
    }

    //異步ajax請求
    componentDidMount() {
        this.getCategories();
    }


    render() {

        //讀取數據狀態
        const {categories, loading} = this.state;

        //card的左側標題
        const title = 'Top Category';
        //card的右側
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                Add
            </Button>
        );
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey='_id'
                    loading={loading}
                    dataSource={categories}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
            </Card>
        )
    }
}
