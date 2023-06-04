import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

import HomeFooter from "./HomeFooter";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Welcome from './Section/Welcome';
import Service from './Section/Service';
import Achievement from './Section/Achievement';
import Contact from './Section/Contact';

class HomePage extends Component {
    
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };
      
        return (
            <div>
                <HomeHeader isShowBanner = {true} />
                <Welcome/>
                <Service/>
                <Achievement/>
                <Contact/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
