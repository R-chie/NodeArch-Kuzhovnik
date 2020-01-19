import React, {Fragment} from 'react';
import {Editor} from 'primereact/editor';
import {Button} from "primereact/button";

class PageEditor extends React.PureComponent  {
    state = {
    };

    async componentDidMount() {
    }

    componentWillUnmount() {
    }
    render(){
        return (
            <Fragment>
                <div>
                    <div className="content-section introduction">
                        <div className="feature-intro">
                            <h1>Editor</h1>
                            <p>Editor is rich text editor component based on Quill.</p>
                        </div>
                    </div>

                    <div className="content-section implementation">
                        <h3 className="first">Default</h3>
                        <Editor style={{height:'320px'}} value={this.state.text1} onTextChange={(e)=>this.setState({text1:e.htmlValue})}/>
                        <p>Value: {this.state.text1 ||'empty'}</p>
                        <Button label="Clear" icon="pi pi-times" onClick={()=> this.setState({text1:''})}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PageEditor;