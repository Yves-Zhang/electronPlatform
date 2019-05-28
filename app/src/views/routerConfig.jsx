import React from 'react';
import { BrowserRouter, HashRouter, Router, Switch, Route } from 'react-router-dom';
import AsyncComponent from '@commonComponents/asyncComponent'

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class RouterConfig extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={AsyncComponent(() => import('@views/home'))} />
                    </ Switch>
                </ BrowserRouter>
            </LocaleProvider>
        )
    }
}

export default RouterConfig;