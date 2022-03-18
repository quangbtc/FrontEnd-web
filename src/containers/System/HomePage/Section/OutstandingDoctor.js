import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./OutstandingDoctor.scss";
import pic1 from "../../../../assets/images/specialty/benh-vien.jpg";
import defaultUserPic from "../../../../assets/images/specialty/userDefault.png";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsArr: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors(10);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.listUserDoctors !== prevProps.listUserDoctors) {
      this.setState({
        doctorsArr: this.props.listUserDoctors,
      });
    }
  }
  handleClickDetailDoctor = (doctor) => {
    
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let doctors = this.state.doctorsArr;
    let {language}=this.props
    return (
      <div className="section-container section-container-outstanding-doctor">
        <div className="section-content">
          <div className="section-header">
            <h3 className="section-header-title">
              <FormattedMessage id="homePage.outstanding-doctor" />
            </h3>
            <button>
              <FormattedMessage id="homePage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {doctors &&
                doctors.length > 0 &&
                doctors.map((item, index) => {
                  let firstName = item.firstName;
                  let lastName = item.lastName;
                  let titleVi = `${item.positionData.valueVi} ${lastName} ${firstName}`;
                  let titleEn = `${item.positionData.valueEn} ${firstName} ${lastName}`;
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-item text-center"
                      key={index}
                      onClick={() => this.handleClickDetailDoctor(item)}
                    >
                      <div
                        className="section-img outstanding-img d-inline-block"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <p className="section-title">
                        {language === LANGUAGES.VI
                          ? titleVi
                          : titleEn}
                      </p>
                      <p className="section-department">{language===LANGUAGES.VI?item.positionData.valueVi:item.positionData.valueEn}</p>
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
    language: state.app.language,
    listUserDoctors: state.admin.arrDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: (limitInput) =>
      dispatch(actions.getUserDoctors(limitInput)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(section)
);
