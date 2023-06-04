import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './Welcome.scss'


class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="welcome-img"></div>
        <div className="welcome-content">
            <div className="title">
                <h1>Bác sĩ, những thiên thần áo trắng</h1>
            </div>
            <p>Bác sĩ là một người chuyên môn trong lĩnh vực y tế, với sứ mệnh chăm sóc sức khỏe và điều trị bệnh tật cho các bệnh nhân. Họ là những người nghiên cứu và áp dụng các phương pháp điều trị, giúp người bệnh hồi phục và duy trì sức khỏe tốt.</p>
            <p>Bác sĩ thường có một vẻ ngoài chuyên nghiệp và tự tin, với kiến thức sâu rộng trong lĩnh vực y học. Họ là những người cẩn trọng và tận tâm, luôn lắng nghe và thấu hiểu nhu cầu của bệnh nhân.</p>
            <p>Bác sĩ có khả năng tư vấn và đưa ra quyết định đúng đắn về việc chẩn đoán và điều trị bệnh tật. Họ phải có khả năng quản lý thời gian và tài nguyên, vì công việc của họ đòi hỏi sự tập trung và chính xác cao.</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
