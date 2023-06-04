import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './Achievement.scss'


class Achievement extends Component {
    render() {
        return (
            <div className="achievement">
                <div className="achievement-item">
                    <i class="fa-solid fa-check"></i>
                    <div className="achievement-number">2134</div>
                    <div className="achievement-object">Người được cứu</div>
                </div>
                <div className="achievement-item">
                    <i class="fa-solid fa-check"></i>
                    <div className="achievement-number">1234</div>
                    <div className="achievement-object">Thiết bị y tế hiện đại</div>
                </div>
                <div className="achievement-item">
                    <i class="fa-solid fa-check"></i>
                    <div className="achievement-number">343</div>
                    <div className="achievement-object">Giường bệnh</div>
                </div>
                <div className="achievement-item">
                    <i class="fa-solid fa-check"></i>
                    <div className="achievement-number">13</div>
                    <div className="achievement-object">Giải thưởng quốc tế</div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Achievement);
