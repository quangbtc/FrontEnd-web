import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../Section/HomeHeader";
import "./DetailDoctor.scss";
import { getDoctorDetailById } from "../../../../services/userService";
import { divide } from "lodash";
import { LANGUAGES } from "../../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorInfo from "./DoctorInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    let doctorId = this.props.match.params.id;
    if (this.props.match && this.props.match.params && doctorId) {
      let res = await getDoctorDetailById(doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate() {}
  render() {
    let detailDoctor = this.state.detailDoctor;
    let titleVi = "",
      titleEn = "";
    if (detailDoctor.positionData) {
      let lastName = detailDoctor.lastName;
      let firstName = detailDoctor.firstName;
      titleVi = `${detailDoctor.positionData.valueVi} || ${lastName} ${firstName}`;
      titleEn = `${detailDoctor.positionData.valueEn} || ${firstName} ${lastName}`;
    }
    console.log("Detail doctor", detailDoctor);
    return (
      <>
        <HomeHeader />
        <div className="container">
          <div className="row my-4">
            <div className="col-12">
              <div className="doctor-breakcum">
                <span className="breakcum-home-icon">
                  {" "}
                  <i class="fas fa-home"></i>
                </span>
                <span>/</span>
                <span className="breakcum-level">Khám chuyên khoa</span>
                <span>/</span>
                <span className="breakcum-level">Sức khoẻ thâm thần</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-center">
              <div
                className="image-detail"
                style={{
                  backgroundImage: `url(${detailDoctor.image})`,
                }}
              ></div>
            </div>
            <div className="col-10">
              <h3 className="doctor-title">
                {this.props.language === LANGUAGES.VI ? titleVi : titleEn}
              </h3>
              <div className="doctor-descripton">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
              <div className="social-icon mt-2 mb-2">
                <button className="btn btn-primary btn-sm px-2 ">
                  <i class="fas fa-thumbs-up"></i>
                  <span className="mx-2">Thích</span>
                  <span className="">10</span>
                </button>
                <button className="btn btn-primary btn-sm px-2 mx-2">
                  chia sẻ
                </button>
              </div>
            </div>
          </div>
          {/* SCHEDULE COMPONENT */}
          <div className="row">
            <div className="col-6">
              <DoctorSchedule
                detailDoctor={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="col-6">
              <DoctorInfo
                detailDoctor={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="doctor-info-detail">
                <h3 className="doctor-title">
                  {this.props.language === LANGUAGES.VI ? titleVi : titleEn}
                </h3>
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.contentHtml && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailDoctor.Markdown.contentHtml,
                      }}
                    ></div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
