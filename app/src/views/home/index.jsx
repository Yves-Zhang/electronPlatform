import React from 'react';
import { BrowserRouter, HashRouter, Router, Switch, Route, Link } from 'react-router-dom';
import {
    Menu,
    Dropdown,
    Icon
} from 'antd';

import AsyncComponent from '@commonComponents/asyncComponent'

import "./index.less";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'ToDoList'
        }
    }

    jump = (str) => {
        this.setState({
            title: str
        });
    }



    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/" replace onClick={() => { this.jump('ToDoList') }}>
                        ToDoList
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/editor" replace onClick={() => { this.jump('表单设计器') }}>
                        表单设计器
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="homeContent">
                <div className="headerContent">
                    {this.state.title}
                    <span style={{ float: 'right' }}>
                        <Dropdown overlay={menu}>
                            <Icon type="appstore" />
                        </Dropdown>
                    </span>
                </div>
                <div className="homeBody">
                    <Route exact path="/" component={AsyncComponent(() => import('@views/todolist'))} />
                    <Route path="/editor" component={AsyncComponent(() => import('@views/editor'))} />
                </div>
            </div>
        )
    }
}

export default Home;