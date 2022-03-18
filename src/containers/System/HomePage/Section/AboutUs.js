import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./AboutUs.scss";
class section extends Component {
  render() {
    return (
      <div className="section-container section-container-about-us">
        <div className="section-content section-content-about-us">
          <div className="section-header">
            <h3 className="section-header-title">
              Truyền thông nói về chúng tôi
            </h3>
          </div>
          <div className="section-body section-body-about-us">
            <div className="section-about-us-video">
              <iframe
                width="560"
                height="100%"
                src="https://www.youtube.com/embed/4S6bwUHtzdA?start=6"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullscreen
              ></iframe>
            </div>
            <div className="section-about-us-social">
              <p className="section-about-us-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                eos, possimus ab doloribus quis voluptatum deserunt aperiam
                error quisquam soluta quo ipsam rem a necessitatibus, sit,
                magnam nam sequi perferendis. Aliquam distinctio placeat esse
                sequi eum numquam aliquid, blanditiis sapiente?
              </p>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(section);
