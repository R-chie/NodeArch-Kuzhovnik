import React, {Fragment} from 'react';
import {Editor} from 'primereact/editor';
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import PagesService from "../../services/pagesService";
import C from '../../constants';

class PageEditor extends React.PureComponent  {
    state = {
        text: '',
        selectedPage: [],
        isNewPage: '',
        newPageVisible: false,
        pages: [],
    };

    async componentDidMount() {
        this.fetchPages();
    }

    componentWillUnmount() {
    }

    newServicePage = () => {
        //this.setState({newPageVisible: true})
        this.setState({selectedPage: [{page_name: '', page_title: '', page_md: '', page_html: '', id: 999}]})
    };

    cancel = () => {
        this.setState({newPageVisible: false})
    };

    save = async () => {
        // fetch
        let editedPage = this.state.selectedPage[0];
        console.log(editedPage);
        editedPage = {...editedPage, last_modified: new Date()};
        if (editedPage.id !== 999){
            console.log('update...');
            await PagesService.updatePage(editedPage).catch(e => console.log(e));
        } else {
            // create new
            console.log('create...');
            await PagesService.createPage(editedPage).catch(e => console.log(e));
        }

        this.fetchPages();
        //this.setState({selectedPage: []});
    };

    delete = async () => {
        let id = this.state.selectedPage[0].id;
        await PagesService.deletePage(id).catch(e => console.log(e));
        this.fetchPages();
    };

    fetchPages = async () => {
        let pages = await PagesService.getPages().catch(e => console.log(e));
        //let newPages = pages.filter( p => p.page_name !== '/main');
        this.setState({pages: pages})
    };

    restoreName = () => {
        let def = this.state.pages.find( p => p.id === this.state.selectedPage[0].id);

        this.setState({selectedPage:[{...this.state.selectedPage[0], page_name: def.page_name}]})
    };
    restoreTitle = () => {
        let def = this.state.pages.find( p => p.id === this.state.selectedPage[0].id);

        this.setState({selectedPage:[{...this.state.selectedPage[0], page_title: def.page_title}]})
    };
    restoreMd = () => {
        let def = this.state.pages.find( p => p.id === this.state.selectedPage[0].id);

        this.setState({selectedPage:[{...this.state.selectedPage[0], page_md: def.page_md}]})
    };

    onUploadFileCancel = () => {};
    onUploadFileSelect = () => {};
    onUploadFileClear = () => {};
    onUploadFileSuccess = () => {};
    onUploadFileError = () => {};
    onUploadFileProgress = () => {};
    onUploadFilesetHeaders = (e) => {
        try {
            let token = localStorage.getItem(C.TOKEN_NAME);
            e.xhr.setRequestHeader('Authorization', token);
        } catch (e) {

        }
    };

    render(){
        const footer = (
            <div>
                <Button label="Добавить" icon="pi pi-check" onClick={this.addPage} />
                <Button label="Отмена" icon="pi pi-times" onClick={this.cancel} />
            </div>
        );
        return (
            <Fragment>
                <Dialog header="Добавить страницу услуги"
                        footer={footer}
                        visible={this.state.newPageVisible}
                        style={{width: '50vw', top: '200px'}}
                        modal={true} onHide={() => this.setState({newPageVisible: false})}/>
                <div className={'p-grid p-col-12 p-lg-12 p-dir-col'}>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <Button label="Добавить страницу услуги" icon="pi pi-plus" style={{marginRight:'.25em'}} onClick={this.newServicePage} />
                            <div style={{ height: 0}}>
                                <FileUpload
                                    style={{borderLeft: '1px solid rgba(0, 0, 0, 0.15)', borderRight: '1px solid rgba(0, 0, 0, 0.15)'}}
                                    multiple={true}
                                    name="beauty_salon_bg"
                                    chooseLabel='Добавить фон сайта .png'
                                    uploadLabel='Загрузить'
                                    cancelLabel={'Отменить'}
                                    url={C.HOST_URL + '/v1/uploadBg'}
                                    mode="basic"
                                    onFileCancel={this.onUploadFileCancel}
                                    onSelect={this.onUploadFileSelect}
                                    onClear={this.onUploadFileClear}
                                    onUpload={this.onUploadFileSuccess}
                                    onError={this.onUploadFileError}
                                    onProgress={this.onUploadFileProgress}
                                    onBeforeSend={this.onUploadFilesetHeaders}
                                />
                            </div>
                        </div>
                        <div className="p-toolbar-group-right">
                            <Button icon="pi pi-search" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-calendar" className="p-button-success" style={{marginRight:'.25em'}} />
                            <Button icon="pi pi-times" className="p-button-danger" />
                        </div>
                    </Toolbar>
                </div>
                <ul>
                    {this.state.pages.map( (p, index) => {
                        return (
                            <li key={`page-link-${index}`}
                                onClick={(e) => this.setState({selectedPage: [p]})}
                                style={{
                                    cursor: 'pointer',
                                    padding: '5px'
                                }}
                            >
                                <span>{p.page_title}</span>
                                <a > {p.page_name} </a>
                            </li>
                        )
                    })}
                </ul>
                {this.state.selectedPage.length !== 0 &&
                    <Fragment>
                        <div className={'p-grid p-col-12'}>
                            <div className={'p-col-6'}>
                                <div className="content-section introduction">
                                    <div className="feature-intro">
                                        <h1>Редактор содержимого страницы {this.state.selectedPage[0].page_name}</h1>
                                    </div>
                                </div>

                                <div className="content-section implementation">
                                    <Editor style={{height:'320px'}} value={this.state.selectedPage[0].page_html} onTextChange={(e)=>this.setState(
                                        {
                                            selectedPage:[{...this.state.selectedPage[0], page_html: e.htmlValue}]
                                        }
                                    )}/>
                                    <p>Value: {this.state.selectedPage[0].page_html ||'empty'}</p>
                                    <Button label="Очистить" icon="pi pi-times" onClick={()=> this.setState({
                                        selectedPage:[{...this.state.selectedPage[0], page_html: ''}]
                                    })}/>
                                    <Button style={{marginLeft:'.25em'}}  label="Сохранить" icon="pi pi-save" onClick={this.save}/>
                                    <Button style={{marginLeft:'.25em'}}  label="Удалить" icon="pi pi-trash" onClick={this.delete}/>
                                </div>
                            </div>
                            <div className={'p-col-6'}>
                                <div className="p-col-6">
                                    <div className="p-inputgroup">
                                        <div>
                                            <span className={'addon'}> URL страницы </span>
                                        </div>
                                        <div>
                                            <Button icon="pi pi-check" className="p-button-success" onClick={this.save}/>
                                            <InputText value={this.state.selectedPage[0].page_name} onChange={(e) => this.setState({
                                                selectedPage:[{...this.state.selectedPage[0], page_name: e.target.value}]
                                            })}/>
                                            <Button icon="pi pi-times" className="p-button-danger" onClick={this.restoreName}/>
                                        </div>
                                    </div>
                                    <div className="p-inputgroup">
                                        <div>
                                            <span className={'addon'}> Заголовок страницы </span>
                                        </div>
                                        <div>
                                            <Button icon="pi pi-check" className="p-button-success" onClick={this.save}/>
                                            <InputText value={this.state.selectedPage[0].page_title} onChange={(e) => this.setState({
                                                selectedPage:[{...this.state.selectedPage[0], page_title: e.target.value}]
                                            })}/>
                                            <Button icon="pi pi-times" className="p-button-danger" onClick={this.restoreTitle}/>
                                        </div>
                                    </div>
                                    <div className="p-inputgroup">
                                        <div>
                                            <span className={'addon'}> MD content </span>
                                        </div>
                                        <div>
                                            <Button icon="pi pi-check" className="p-button-success" onClick={this.save}/>
                                            <InputText value={this.state.selectedPage[0].page_md} onChange={(e) => this.setState({
                                                selectedPage:[{...this.state.selectedPage[0], page_md: e.target.value}]
                                            })}/>
                                            <Button icon="pi pi-times" className="p-button-danger" onClick={this.restoreMd}/>
                                        </div>
                                    </div>

                                    <div className="p-inputgroup">
                                        <div>
                                            <span className={'addon'}> MK content </span>
                                        </div>
                                        <div>
                                            <Button icon="pi pi-check" className="p-button-success" onClick={this.save}/>
                                            <InputText value={this.state.selectedPage[0].page_mk} onChange={(e) => this.setState({
                                                selectedPage:[{...this.state.selectedPage[0], page_mk: e.target.value}]
                                            })}/>
                                            <Button icon="pi pi-times" className="p-button-danger" onClick={this.restoreMd}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>}
            </Fragment>
        )
    }
}

export default PageEditor;
