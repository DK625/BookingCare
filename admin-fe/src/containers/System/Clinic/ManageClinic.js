import React, { Component, component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils'
import { creatNewClinic } from '../../../services/userService'
import { toast } from "react-toastify";


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }


    async componentDidMount() {


    }
    async componentDidMountUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }


    handleSaveNewClinic = async () => {
        let res = await creatNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Something wrong...')
            console.log('check res', res)
            console.log('check sate', this.state)
        }
    }
    render() {
        return (
            <div className="manage-specialty-container">
                <div className='box'>

                    <div className="ms-title">Quản lý phòng khám</div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label> Tên phòng khám</label>
                            <input className="form-control" type="text" value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />

                        </div>

                        <div className="col-6 form-group">
                            <label>Ảnh phòng khám</label>
                            <input className="form-control-file" type="file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" type="text" value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>

                        <div className="col-12">
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn-save-specialty"
                                onClick={() => this.handleSaveNewClinic()}

                            >Save</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};


const mapDispatchToProps = dispatch => {
    return {


    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);