import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Section/HomeHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "./Section/Banner";
import Specialty from "./Section/Specialty";
import Facility from "./Section/Facility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import AboutUs from "./Section/AboutUs";
import "./HomePage.scss";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };
    return (
      <div className="">
        <HomeHeader />
        <Banner />
        <Specialty settings={settings} />
        <Facility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <HandBook />
        <AboutUs />
        <div className="" style={{ height: "100px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
