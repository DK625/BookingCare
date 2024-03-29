import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'
import logo from '../../assets/logo.svg'
import { LANGUAGES } from '../../utils';
import { changeLanguageApp,processLogout } from '../../store/actions'
import { withRouter } from 'react-router';

class HomeHeader extends Component {
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

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    processLogout = () => {
        this.props.processLogoutRedux()
    }

    handleViewHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    render() {
        const {userInfo} = this.props

        let language = this.props.language
        console.log('check props: ', this.props)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div onClick={()=> this.handleViewHome()} className="left-content">
                            <i className="fas fa-bars"></i>
                            {/* <div className="header-logo"></div> */}
                            <img className="header-logo" src={logo} onClick={() => this.handleViewHome()} />
                        </div>
                        <div className="center-content">
                            <div onClick={()=> this.handleViewManageInfo()} className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div onClick={()=> this.handleViewManageSchedule()} className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div onClick={()=> this.handleViewManagePatient()} className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <span className="welcome">
                                <FormattedMessage id="homeheader.welcome" />
                                {userInfo && userInfo.user.firstName ? userInfo.user.firstName : ''} !
                            </span>
                            <div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id="homeheader.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                        {/* nut logout */}
                        <div className="btn btn-logout"  onClick={() => this.processLogout()} title="Log out">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>

                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />

                            </div>
                        </div>

                        <div className="content-down">
                            <div className="options">
                                <div className="options-child">
                                    <div className="icon-child">
                                        {/* <i class="fa-solid fa-hospital"></i> */}
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-flask"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutRedux: () => dispatch(processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};
        
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
