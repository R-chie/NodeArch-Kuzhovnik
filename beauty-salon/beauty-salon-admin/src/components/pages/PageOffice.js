import React, {Fragment} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import ordersService from "../../services/ordersService";
import {InputText} from "primereact/inputtext";

class PageOffice extends React.PureComponent  {
    state = {
        masters: [
        ],
        services: [
            {name: 'Маникюр', price: '35p', desc: 'Маникюр высший класс'},
            {name: 'Педюкюр', price: '35p', desc: 'Педюкюр высший класс'}
        ],
        selectedMasters: [],
        selectedServices: [],
        newMasterVisible: false,
        newServiceVisible: false,
        serviceName : '',
        serviceDesc: '',
        serviceMaster: '',
        serviceUrl: '',
        servicePrice: '',
    };

    async componentDidMount() {
        this.fetchServices();
    }

    componentWillUnmount() {
    }

    masterTable = {
        name: "Имя",
        services: "Услуги",
        count: 'Выполнено заказов',
    };

    serviceTable = {
        name: "Название",
        desc: 'Описание',
        price: 'Стоимость',
    };

    newMaster = () => {
        this.setState({newMasterVisible: true})
    };
    newService = () => {
        this.setState({newServiceVisible: true})
    };
    cancel = () => {
        this.setState({newServiceVisible: false, newMasterVisible: false})
    };
    fetchServices = async () => {
        let services = await ordersService.getServices().catch(e => console.log(e));
        this.setState({
            services
        });
    };
    addService = async () => {
        let newService = {
            code: this.state.serviceName.slice(1),
            desc: this.state.serviceDesc,
            master: this.state.serviceMaster,
            name: this.state.serviceName,
            page_name: this.state.serviceUrl,
            price: this.state.servicePrice,
        };
        let qr = await ordersService.addService(newService).catch(e => console.log(e));
        if (qr.success){
            this.setState({newServiceVisible: false}, this.fetchServices)
        }
    };

    render(){
        const footerMaster = (
            <div>
                <Button label="Добавить" icon="pi pi-check" onClick={this.addMaster} />
                <Button label="Отмена" icon="pi pi-times" onClick={this.cancel} />
            </div>
        );
        const footerService = (
            <div>
                <Button label="Добавить" icon="pi pi-check" onClick={this.addService} />
                <Button label="Отмена" icon="pi pi-times" onClick={this.cancel} />
            </div>
        );
        return (
            <Fragment>
                <Dialog header="Добавить нового мастера"
                        footer={footerMaster}
                        visible={this.state.newMasterVisible}
                        style={{width: '50vw', top: '200px'}}
                        modal={true} onHide={() => this.setState({newMasterVisible: false})}>
                </Dialog>
                <Dialog header="Добавить новую услугу"
                        footer={footerService}
                        visible={this.state.newServiceVisible}
                        style={{width: '50vw', top: '300px'}}
                        modal={true} onHide={() => this.setState({newServiceVisible: false})}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label htmlFor={'name'} style={{margin : '5px'}}>Название услуги</label>
                        <InputText
                            id='name'
                            onChange={(e) => this.setState({serviceName: e.target.value})}/>

                        <label htmlFor={'name'} style={{margin : '5px'}}>Описание</label>
                        <InputText
                            id='desc'
                            onChange={(e) => this.setState({serviceDesc: e.target.value})}/>

                        <label htmlFor={'name'} style={{margin : '5px'}}>Мастер</label>
                        <InputText
                            id='master'
                            onChange={(e) => this.setState({serviceMaster: e.target.value})}/>

                        <label htmlFor={'name'} style={{margin : '5px'}}>Url страницы</label>
                        <InputText
                            id='urlpage'
                            onChange={(e) => this.setState({serviceUrl: e.target.value})}/>

                        <label htmlFor={'name'} style={{margin : '5px'}}>Стоимость</label>
                        <InputText
                            id='price'
                            onChange={(e) => this.setState({servicePrice: e.target.value})}/>
                    </div>
                </Dialog>
                <div className={'p-grid p-col-12 p-lg-12 p-dir-col'}>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <Button label="Новый мастер" icon="pi pi-plus" style={{marginRight:'.25em'}} onClick={this.newMaster} />
                            <Button label="Редактировать мастера" icon="pi pi-user-edit" style={{marginRight:'.25em'}} onClick={this.editMaster} />
                            <i className="pi pi-bars p-toolbar-separator" style={{marginRight:'.25em'}} />
                            <Button label="Новая услуга" icon="pi pi-plus" style={{marginLeft:'.25em'}} onClick={this.newService} />
                            <Button label="Редактировать услугу" icon="pi pi-pencil" style={{marginLeft:'.25em'}} onClick={this.editService} />
                        </div>
                        <div className="p-toolbar-group-right">
                            <Button icon="pi pi-search" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-calendar" className="p-button-success" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-times" className="p-button-danger" />
                        </div>
                    </Toolbar>
                    <div className={'container p-col-12 p-lg-12'}>
                        <div key={`mastertable-`}>
                            <h3> Мастера </h3>
                            <DataTable
                                value={ this.state.masters }
                                style={{margin: '5px'}}
                                selection={this.state.selectedMasters}
                                onSelectionChange={(e) => this.setState({selectedMasters: e.value})}
                                scrollable={true} scrollHeight="420px"
                            >
                                <Column selectionMode="multiple" style={{width:'45px'}}/>
                                <Column field={"name"} header={this.masterTable.name}/>
                                <Column field={"services"} header={this.masterTable.services}/>
                                <Column field={"count"} header={this.masterTable.count}/>
                            </DataTable>
                        </div>
                        <div key={`serviceTable`}>
                            <h3> Услуги </h3>
                            <DataTable
                                value={ this.state.services }
                                style={{margin: '5px'}}
                                selection={this.state.selectedServices}
                                onSelectionChange={(e) => this.setState({selectedServices: e.value})}
                                scrollable={true} scrollHeight="420px"
                            >
                                <Column selectionMode="multiple" style={{width:'45px'}}/>
                                <Column field={"name"} header={this.serviceTable.name}/>
                                <Column field={"price"} header={this.serviceTable.price}/>
                                <Column field={"desc"} header={this.serviceTable.desc}/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PageOffice;
