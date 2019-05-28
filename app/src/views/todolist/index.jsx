import React from 'react';
import { BrowserRouter, HashRouter, Router, Switch, Route } from 'react-router-dom';
import { Button, Input, Row, Col, Table, Divider, Form, Modal } from 'antd';

import AsyncComponent from '@commonComponents/asyncComponent'
import ThingsCard from '@commonComponents/thingsCard'
import EditModal from './editModal'
import Calender from './calender'
import moment from 'moment';
import dbServer from '@/db/dbServer';

import "./style";

const Item = Form.Item;

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            visible: false,
            rowMessage: null
        }
    }

    componentDidMount() {
        this.getMsgList();
    }

    deletMessage = (record) => {
        dbServer.deletMessage(record.id);
        this.getMsgList();
    }

    addMessage = () => {
        let { validateFields, resetFields } = this.props.form;
        validateFields((err, values) => {
            // console.log('Received values of form: ', values);
            if (!err) {
                let params = {
                    userId: '0001',
                    message: values.message,
                    status: '01'
                };
                dbServer.addMessage(params);
                this.getMsgList();
                resetFields();
            }
        });
    }

    getMsgList = () => {
        let dataSource = dbServer.getMessageList({
            userId: '0001'
        });
        this.setState({
            dataSource: dataSource.reverse()
        });
    }

    finished = (text, record, index) => {
        dbServer.changeStatus({ id: record.id });
        this.getMsgList();
    }

    edit = (text, record, index) => {
        this.setState({
            visible: true,
            rowMessage: record
        });
    }

    handleOk = (subform, info) => {
        let { validateFields, resetFields } = subform;
        validateFields((err, values) => {
            // console.log('Received values of form: ', values);
            if (!err) {
                let params = {
                    id: info.id,
                    message: values.message,
                    tips: values.tips ? values.tips.format('YYYY-MM-DD HH:mm:ss') : null
                };
                dbServer.updataMssage(params)
                this.getMsgList();
                resetFields();
            }
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Content">
                <Calender />
                <Form>
                    <Row gutter={16} style={{ margin: '10px 0' }}>
                        <Col span={16} offset={2}>
                            <Item>
                                {getFieldDecorator('message', {
                                    rules: [{ required: true, message: '请记录要做的事情！' }],
                                })(
                                    <Input
                                        placeholder="记录重要的事情"
                                    />,
                                )}
                            </Item>
                        </Col>
                        <Col span={4}>
                            <Item>
                                <Button type="primary" icon="plus-circle" onClick={this.addMessage}>新增记录</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>

                <ThingsCard
                    dataSource={this.state.dataSource || []}
                    titleBackground="#cc0264"
                    title="事件清单"
                    onSelect={this.finished}
                    delet={this.deletMessage}
                    edit={this.edit}
                />

                <EditModal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    info={this.state.rowMessage}
                    title="编辑"
                />
            </div>
        )
    }
}

TodoList = Form.create()(TodoList);
export default TodoList;
