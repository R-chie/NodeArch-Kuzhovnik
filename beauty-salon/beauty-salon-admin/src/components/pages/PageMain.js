import React, {Fragment} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import ordersService from '../../services/ordersService';

class PageMain extends React.PureComponent  {
    state = {
        dailyOrders: [],
        customOrders: [],
        randomOrders: [],
        selectedOrders: [],
        newOrderVisible: false,
    };

    async componentDidMount() {
        this.fetchOrders()
    }

    componentWillUnmount() {
    }

    processDaily = (arr) => {
        return arr.map( el => ({...el, time: new Date(el.time * 1000).toLocaleTimeString(), type: 'daily'}))
    };

    newOrder = () => {
        this.setState({newOrderVisible: true})
    };
    cancelOrder = () => {
        this.setState({newOrderVisible: false})
    };
    addOrder = () => {

    };

    refreshOrders = async () => {
        this.fetchOrders()
    };

    fetchOrders = async () => {
        let orders = await ordersService.getOrders().catch(e => console.log(e));
        orders.daily = this.processDaily(orders.daily);
        this.setState({
            dailyOrders: orders.daily,
            customOrders: orders.custom,
            randomOrders: orders.random,
            selectedOrders: [],
        });
    };
    toFree = async () => {
        let arr = [...this.state.selectedOrders];
        let update = await ordersService.updateOrderStatus(arr, 'free').catch(e => console.log(e));
        if (update.success){
            this.fetchOrders()
        }
    };
    toBook = async () => {
        let arr = [...this.state.selectedOrders];
        let update = await ordersService.updateOrderStatus(arr, 'book').catch(e => console.log(e));
        if (update.success){
            this.fetchOrders()
        }
    };
    toClos = async () => {
        let arr = [...this.state.selectedOrders];
        let update = await ordersService.updateOrderStatus(arr, 'clos').catch(e => console.log(e));
        if (update.success){
            this.fetchOrders();
        }
    };

    render(){
        const footer = (
            <div>
                <Button label="Добавить" icon="pi pi-check" onClick={this.addOrder} />
                <Button label="Отмена" icon="pi pi-times" onClick={this.cancelOrder} />
            </div>
        );
        return (
            <Fragment>
                <Dialog header="Добавить новую запись"
                        footer={footer}
                        visible={this.state.newOrderVisible}
                        style={{width: '50vw', top: '200px'}}
                        modal={true} onHide={() => this.setState({newOrderVisible: false})}/>
                <div className={'p-grid p-col-12 p-lg-12 p-dir-col'}>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <Button label="Новая запись" icon="pi pi-plus" style={{marginRight:'.25em'}} onClick={this.newOrder} />
                            <Button label="Обновить записи" icon="pi pi-refresh" style={{marginRight:'.25em'}} onClick={this.refreshOrders} />
                            <i className="pi pi-bars p-toolbar-separator" style={{marginRight:'.25em'}} />
                            <span style={{verticalAlign: 'middle', marginRight:'.25em', fontSize: '18px'}}>Изменить состояние записи</span>
                            <Button disabled={this.state.selectedOrders.length === 0 }
                                    tooltipOptions={{position: 'top'}} tooltip={'Свободна'} icon="pi pi-check" style={{marginRight:'.25em'}}
                                    onClick={this.toFree}/>
                            <Button disabled={this.state.selectedOrders.length === 0 }
                                    tooltipOptions={{position: 'top'}} tooltip={'Запись'} icon="pi pi-check" style={{marginRight:'.25em'}}
                                    className="p-button-warning"
                                    onClick={this.toBook}
                            />
                            <Button disabled={this.state.selectedOrders.length === 0 }
                                    tooltipOptions={{position: 'top'}} tooltip={'Закрыто'} icon="pi pi-check" style={{marginRight:'.25em'}}
                                    className="p-button-success"
                                    onClick={this.toClos}
                            />
                        </div>
                        <div className="p-toolbar-group-right">
                            <Button icon="pi pi-search" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-calendar" className="p-button-success" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-times" className="p-button-danger" />
                        </div>
                    </Toolbar>
                    <div className={'container p-col-12 p-lg-12'}>
                            <div key={`orderTable-1`}>
                                <h3> { 'Ежедневные записи' }</h3>
                                <DataTable
                                    value={ this.state.dailyOrders }
                                    style={{margin: '5px'}}
                                    selection={this.state.selectedOrders}
                                    onSelectionChange={e => this.setState({selectedOrders: e.value})}
                                    scrollable={true} scrollHeight="420px"
                                >
                                    <Column selectionMode="multiple" style={{width:'45px'}}/>
                                    <Column field={"time"} header={'Время'}/>
                                    <Column field={"services"} header={'Услуга'}/>
                                    <Column field={"master"} header={'Мастер'}/>
                                    <Column field={"status"} header={'Статус'}/>
                                </DataTable>
                            </div>
                        <div key={`orderTable-2`}>
                            <h3> { 'Произвольные записи' }</h3>
                            <DataTable
                                value={ this.state.customOrders }
                                style={{margin: '5px'}}
                                selection={this.state.selectedOrders}
                                onSelectionChange={e => this.setState({selectedOrders: e.value})}
                                scrollable={true} scrollHeight="420px"
                            >
                                <Column selectionMode="multiple" style={{width:'45px'}}/>
                                <Column field={"time"} header={'Время'}/>
                                <Column field={"services"} header={'Услуга'}/>
                                <Column field={"master"} header={'Мастер'}/>
                                <Column field={"status"} header={'Статус'}/>
                            </DataTable>
                        </div>
                        <div key={`orderTable-3`}>
                            <h3> { 'Будущие записи' }</h3>
                            <DataTable
                                value={ this.state.randomOrders }
                                style={{margin: '5px'}}
                                selection={this.state.selectedOrders}
                                onSelectionChange={e => this.setState({selectedOrders: e.value})}
                                scrollable={true} scrollHeight="420px"
                            >
                                <Column selectionMode="multiple" style={{width:'45px'}}/>
                                <Column field={"time"} header={'Время'}/>
                                <Column field={"services"} header={'Услуга'}/>
                                <Column field={"master"} header={'Мастер'}/>
                                <Column field={"status"} header={'Статус'}/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PageMain;
