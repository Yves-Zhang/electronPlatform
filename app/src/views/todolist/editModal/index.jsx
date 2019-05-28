import React from 'react';
import { Button, Input, Row, Col, Table, Divider, Form, Modal, TimePicker } from 'antd';
import moment from 'moment'

import "./style.less";

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <Modal
                visible={this.props.visible}
                onOk={() => {this.props.onOk(this.props.form, this.props.info)}}
                onCancel={this.props.onCancel}
                title={this.props.title}
                forceRender={true}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="事件">
                        {getFieldDecorator('message', {
                            rules: [
                                {
                                    required: true,
                                    message: '记录事项不能为空!',
                                },
                            ],
                            initialValue: this.props.info && this.props.info.message ? this.props.info.message : null
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="截止时间">
                        {getFieldDecorator('tips', {
                            rules: [
                                {
                                    required: false,
                                    message: '',
                                },
                            ],
                            initialValue: this.props.info && this.props.info.tips ? moment(this.props.info.tips) : null
                        })(<TimePicker />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
EditModal = Form.create()(EditModal);
export default EditModal;