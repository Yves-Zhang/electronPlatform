import React from 'react'
import { Table, Divider, Radio, Icon, Tooltip } from 'antd'
import moment from 'moment'

import "./style.less"

class ThingsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    componentDidMount() {
        // console.log(moment)
    }

    onSelect = (text, record, index) => {
        this.props.onSelect(text, record, index)
    }

    sortData = (list) => {
        let list1 = _.filter(list, o => {
            return o.status == '01'
        })
        let list2 = _.filter(list, o => {
            return o.status == '02'
        })

        list2.sort((a, b) => {
            return moment(b.updataTime).valueOf() - moment(a.updataTime).valueOf()
        })

        return list1.concat(list2)
    }
    openEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }

    delet = (text, record, index) => {
        this.props.delet(record)
    }

    render() {
        const columns = [
            {
                title: '事件',
                dataIndex: 'message',
                width: 160,
                key: 'message',
                render: (text, record, index) => {
                    return (
                        <span className="message">
                            <span className={record.status === '02' ? 'finished' : null}>
                                {
                                    this.state.edit ? (
                                        <span>
                                            <Icon
                                                type="delete"
                                                style={{ color: '#CC0264', marginRight: '10px' }}
                                                onClick={() => { this.delet(text, record, index) }}
                                            />

                                            <Icon
                                                type="edit"
                                                style={{ color: '#CC0264', marginRight: '10px' }}
                                                onClick={() => { this.props.edit(text, record, index) }}
                                            />
                                        </span>
                                    ) : (null)
                                }
                                {text}
                            </span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: 90,
                key: 'op',
                render: (text, record, index) => {
                    return (
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'right' }}>
                            {/* <a href="javascript:;" onClick={() => { this.deletMessage(record) }}>删除</a>
                            <Divider type="vertical" />
                            <a href="javascript:;">完成</a> */}
                            {
                                record.tips
                                    ?
                                    (
                                        <Tooltip title={record.tips}>
                                            <Icon type="dashboard" style={{ marginRight: '20px' }} />
                                        </Tooltip>
                                    )
                                    :
                                    (null)
                            }
                            <Radio onClick={() => { this.onSelect(text, record, index) }} checked={record.status == '02'}></Radio>
                        </span>
                    )
                }

            }
        ];
        return (
            <div className="cards">
                <div
                    className="title"
                    style={{
                        backgroundColor: this.props.titleBackground || '#cc0264',
                        boxShadow: `0px 0px 3px ${this.props.titleBackground}`
                    }}
                >
                    {this.props.title || '标题'} <Icon type="edit" style={{ marginLeft: '6px' }} onClick={this.openEdit} />
                </div>
                <Table
                    rowKey={(r, i) => i}
                    dataSource={this.sortData(this.props.dataSource) || []}
                    columns={columns}
                    size="small"
                    pagination={false}
                    showHeader={false}
                    scroll={{ y: 300 }}
                />

                {
                    this.props.dataSource && this.props.dataSource.length > 10
                        ?
                        (
                            <div className="lookMore">查看更多……</div>
                        )
                        :
                        (
                            null
                        )
                }
            </div>
        )
    }
}

export default ThingsCard;