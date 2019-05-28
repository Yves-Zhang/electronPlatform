import React from 'react';
import { Button, Input, Row, Col, Table, Divider, Form, Modal, TimePicker } from 'antd';
import moment from 'moment';
import "./style.less";

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeClock: null,
            month: null,
            date: null,
            year: null,
            visible: false,
            rowMessage: null
        }
        this.time = null;
    }

    componentDidMount() {
        this.time = setInterval(() => {
            let date = moment(new Date()).format('YYYY-MM-DD HH:mm');
            let month = `${date}`.split(' ')[0].split('-')[1];
            let dat = `${date}`.split(' ')[0].split('-')[2];
            let year = `${date}`.split(' ')[0].split('-')[0];
            this.setState({
                timeClock: `${date}`.split(' ')[1],
                month: month,
                date: dat,
                year: year,
            });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.time);
    }


    render() {

        return (
            <Row>
                <Col span={12}>
                    <span
                        style={{
                            width: '50px',
                            height: '50px',
                            display: 'inline-block',
                            float: 'left',
                            fontSize: '36px'
                        }}
                    >
                        {this.state.date}
                    </span>
                    <span style={{ width: '40px', height: '40px', display: 'inline-block' }}>
                        <span style={{
                            height: '20px',
                            display: 'block',
                            lineHeight: '27px',
                            color: '#999'
                        }}
                        >
                            {this.state.month} 月
                                    </span>
                        <span style={{
                            height: '20px',
                            display: 'block',
                            lineHeight: '27px',
                            color: '#999'
                        }}
                        >
                            {this.state.year}
                        </span>
                    </span>
                </Col>
                <Col span={12}>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '100%',
                            textAlign: 'right',
                            fontSize: '36px'
                        }}
                    >
                        {
                            `${this.state.timeClock || ''}`
                        }
                    </span>
                </Col>
            </Row>
        )
    }
}
export default Calender;