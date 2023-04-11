import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';


class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctors: []
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
    // arrDoctors = arrDoctors.concat(arrDoctors)

    return (
      <div className="section-share section-outstanding-doctor">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section">
              <FormattedMessage id='homepage.outstanding-doctor' />
            </span>
            <button className="btn-section">
              <FormattedMessage id='homepage.more-infor' />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                    <div className='customize-border'>
                      <div className='outer-bg'>
                        <div className='bg-image section-outstading-doctor'
                          style={{ backgroundImage: `url(${imageBase64})` }}

                        />
                      </div>
                      <div className='position text-center'>
                        <div >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>Cơ Xương Khớp</div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 1</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 2</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 3</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 4</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 5</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư ,Tiến sĩ DoraKing</div>
                    <div>Cơ xương khớp 6</div>
                  </div>
                </div>
              </div> */}
            </Slider>
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
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors

  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
  };
};
// export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));

