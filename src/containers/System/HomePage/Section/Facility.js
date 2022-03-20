import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Facility.scss";
import { getAllClinicService } from "../../../../services/clinicService";
import { withRouter } from "react-router";

class section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicData: [],
    };
  }

  async componentDidMount() {
    let resClinic = await getAllClinicService();
    if (resClinic && resClinic.errCode === 0) {
      let clinicData = resClinic.data;
      this.setState({
        clinicData,
      });
    }
  }

  handleClickDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  render() {
    console.log("Check state clinic data", this.state);
    let { clinicData } = this.state;
    return (
      <div className="section-container section-container-facility">
        <div className="section-content">
          <div className="section-header">
            <h3 className="section-header-title">Cơ sở y tế nổi bật</h3>
            <button>Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {clinicData &&
                clinicData.length > 0 &&
                clinicData.map((item, index) => {
                  return (
                    <div
                      className="section-item"
                      key={index}
                      onClick={() => this.handleClickDetailClinic(item)}
                    >
                      <img className="section-img" src={item.image} alt="" />
                      <p className="section-title">{item.clinicName}</p>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(section)
);
