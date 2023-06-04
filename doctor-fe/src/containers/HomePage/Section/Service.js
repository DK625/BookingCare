import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './Service.scss'


class Service extends Component {
    render() {
        return (
            <div className="service">
                <div className="service-title">
                    Service
                </div>
                <div class="grid-container">
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-regular fa-hospital"></i>
                        </div>
                        <div className="item-title">Chăm sóc cấp cứu</div>
                        <div className="item-content">Cấp cứu hoạt động 24/7</div>
                    </div>
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-regular fa-hospital"></i>
                        </div>
                        <div className="item-title">Chăm sóc nội trú</div>
                        <div className="item-content">nhập viện để quan sát, chẩn đoán và điều trị</div>
                    </div>
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-regular fa-hospital"></i>
                        </div>
                        <div className="item-title">Chăm sóc ngoại trú</div>
                        <div className="item-content">Chăm sóc y tế mà không phải nhập viện</div>
                    </div>
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-sharp fa-regular fa-heart"></i>
                        </div>
                        <div className="item-title">Dịch vụ chẩn đoán</div>
                        <div className="item-content">cơ sở chẩn đoán tiên tiến</div>
                    </div>
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-sharp fa-regular fa-heart"></i>
                        </div>
                        <div className="item-title">Phẫu thuật</div>
                        <div className="item-content">phẫu thuật thông thường chuyên khoa</div>
                    </div>
                    <div class="grid-item">
                        <div className="layout-icon">
                            <i class="fa-sharp fa-regular fa-heart"></i>
                        </div>
                        <div className="item-title">Chăm sóc sản phụ</div>
                        <div className="item-content">Chăm sóc thai sản và sinh nở</div>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Service);
