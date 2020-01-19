import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageMain from '../pages/PageMain';
import PageEditor from '../pages/PageEditor';
import PageOffice from "../pages/PageOffice";

const AdminRouter = () => {
    return (
        <Switch>
            <Route path="/admin/home" component={PageMain} />
            <Route path='/admin/office' component={PageOffice}/>
            <Route path="/admin/editor" component={PageEditor} />
        </Switch>
    )
};
export default AdminRouter