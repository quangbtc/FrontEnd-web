import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./HandBook.scss";
import pic1 from "../../../../assets/images/specialty/benh-vien.jpg";
import pic2 from "../../../../assets/images/specialty/phong-kham.jpg";

class section extends Component {
  render() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
      };
    return (
      <div className="section-container section-container-hand-book">
        <div className="section-content">
          <div className="section-header">
            <h3 className="section-header-title">Cẩm nang y tế</h3>
            <button>Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic1} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
              </div>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic2} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
              </div>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic1} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
              </div>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic2} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
              </div>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic2} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
              </div>
              <div className="section-item section-hand-book">
                <img className="section-img section-hand-book-img" src={pic1} alt="" />
                <p className="section-title section-hand-book-title">17 loại Kit Test nhanh Covid được Bộ Y tế cấp phép - Cách chọn loại Kit chất lượng tốt</p>
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
