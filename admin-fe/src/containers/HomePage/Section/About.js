import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";


class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông</div>
        <div className="section-about-content">
          <div className="content-left">
            {/* <iframe
              width="100%"
              height="400px"
            //   src="https://www.youtube.com/embed/VvvXhNbFWKY?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              src="https://youtu.be/L2IBPnN8YYk"
              title="#N6 Phân Tích Các Kiến Thức Nhận Được Khóa Học Fullstack | Khóa Học Node.JS và React Cho Beginners"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe> */}
            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/L2IBPnN8YYk" title="220515 이다혜 치어리더 공연 &quot;ElEVEN(IVE)&quot; @기아타이거즈 _직캠 fancam /4K60p" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div className="content-right">
            <p>
              Sigmund Freud is one of the most famous figures of the twentieth
              century. His often controversial ideas had a major impact on the
              growing field of psychology, and his influence continues to be
              felt today. In addition to his grand theories of human psychology,
              he was also a prolific writer, publishing more than 320 different
              books, articles, and essays.
            </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(About);
