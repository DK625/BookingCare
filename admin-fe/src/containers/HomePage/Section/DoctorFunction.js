import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DoctorFunction.scss"
import { withRouter } from "react-router";


class DoctorFunction extends Component {
    handleViewManageInfo = () => {
        if (this.props.history) {
            this.props.history.push(`/manage-info`);
        }
    }

    handleViewManageSchedule = () => {
        if (this.props.history) {
            this.props.history.push(`/manage-schedule`);
        }
    }

    handleViewManagePatient = () => {
        if (this.props.history) {
            this.props.history.push(`/manage-patient`);
        }
    }

    render() {
        return (
            <div className="function-btn">
                <button onClick={() => this.handleViewManageInfo()}>Quản lý thông tin</button>
                <button onClick={() => this.handleViewManageSchedule()}>Quản lý kế hoạch khám bệnh</button>
                <button onClick={() => this.handleViewManagePatient()}>Quản lý bệnh nhân khám bệnh</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorFunction));
