import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Facility.scss";
import pic1 from "../../../../assets/images/specialty/benh-vien.jpg";
import pic2 from "../../../../assets/images/specialty/phong-kham.jpg";

class section extends Component {
  render() {
    return (
      <div className="section-container section-container-facility">
        <div className="section-content">
          <div className="section-header">
            <h3 className="section-header-title">Cơ sở y tế nổi bật</h3>
            <button>Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <img className="section-img" src={pic1} alt="" />
                <p className="section-title">Bệnh viện chợ rẫy</p>
              </div>
              <div className="section-item">
                <img className="section-img" src={pic2} alt="" />
                <p className="section-title">Bênh viện Việt đức</p>
              </div>
              <div className="section-item">
                <img className="section-img" src={pic1} alt="" />
                <p className="section-title">Phòng khám trung ương</p>
              </div>
              <div className="section-item">
                <img className="section-img" src={pic2} alt="" />
                <p className="section-title">Phòng khám Y Đức</p>
              </div>
              <div className="section-item">
                <img className="section-img" src={pic2} alt="" />
                <p className="section-title">Phòng khám quân y</p>
              </div>
              <div className="section-item">
                <img className="section-img" src={pic1} alt="" />
                <p className="section-title">Trung tâm phòng bệnh</p>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(section);
