import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import 'react-markdown-editor-lite/lib/index.css';
// register plugins if required
// MdEditor.use(YOUR_PlUGINS_HERE);


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown it options */);


// finish
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserRedux: []
        }
    }


    componentDidMount() {
        this.props.fetchUserRedux();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }


    handleDeleteUser = (user) => {
        // console.log('check user: ', user)
        this.props.deleteAUserRedux(user.id);
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.userRedux;
        console.log('check all users: ', this.props.listUsers)
        console.log('check state: ', this.state.userRedux)
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className="btn-delete"><i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};


export default connect(mapStateToProps, mapDispatchtoProps)(TableManageUser);
