import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
class PropsCurrentUser extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            user: this.props.currentUser
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <><h1>user : {this.state.user}</h1></>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropsCurrentUser);



