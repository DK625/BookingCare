import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './Contact.scss'


class Contact extends Component {
    render() {
        return (
            <div className="contact">
                <div className="contact-title">Contact</div>
                <div className="contact-content">
                    <div className="info">
                        <div>
                            <b>Address</b>: Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội 100000, Việt Nam
                        </div>
                        <div>
                            <b>Phone</b>: 092134123
                        </div>
                        <div>
                            <b>Email</b>: asdfg@gmail.com
                        </div>
                        <div>
                            <b>Miêu tả</b>: Bệnh viện là một cơ sở y tế cung cấp dịch vụ chăm sóc sức khỏe và điều trị cho các bệnh nhân. Nó là một tổ chức hoạt động chuyên nghiệp với mục tiêu cung cấp dịch vụ y tế chất lượng cao, chẩn đoán bệnh và điều trị các bệnh tật.
                        </div>
                        
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14901.762855495768!2d105.81342445994972!3d20.974963840572514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acf9fcf4f71f%3A0x1bd8606c62292187!2zxJDhuqFpIEtpbSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1684296828134!5m2!1svi!2s" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
