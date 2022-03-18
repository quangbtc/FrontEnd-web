import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import "./Specialty.scss";
import { getAllSpecialtyService } from "../../../../services/specialtyService";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyData: [],
    };
  }
  async componentDidMount() {
    let response = await getAllSpecialtyService();

    if (response && response.errCode === 0) {
      this.setState({
        specialtyData: response.data,
      });
    }
  }
  handleClickDetailSpecialty = (item) => {
    console.log("check item",item)
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  render() {
    let { specialtyData } = this.state;
    return (
      <div className="section-container section-container-specialty">
        <div className="section-content">
          <div className="section-header">
            <h3 className="section-header-title">Chuyên khoa phổ biến</h3>
            <button>Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {specialtyData &&
                specialtyData.length > 0 &&
                specialtyData.map((item, index) => {
                  return (
                    <div className="section-item"
                    onClick={()=>this.handleClickDetailSpecialty(item)}
                    >
                      <img className="section-img" src={item.image} alt="" />
                      <p className="section-title">{item.specialtyName}</p>
                    </div>
                  );
                })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
