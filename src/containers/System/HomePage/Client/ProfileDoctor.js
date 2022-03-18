import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorService } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi"; //HỖ TRỢ CHUYỂN DATE SANG TIẾNG VIỆT
import NumberFormat from "react-number-format";
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  async componentDidUpdate(prevProps) {
    if (this.props.doctorId !== prevProps.doctorId) {
      //   this.getInfoDoctor(this.props.doctorId)
    }
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  showTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let { language } = this.props;
      let date =
        language === LANGUAGES.VI
          ? moment(+dataTime.date).format("dddd-DD/MM/YYYY")
          : moment(+dataTime.date)
              .locale("en")
              .format("ddd-DD/MM/YYYY");
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div className="">
            {time} - {date}
          </div>
          <div className="">Miễn phí đặt lịch</div>
        </>
      );
    } else {
      return <></>;
    }
  };

  render() {
    let { dataProfile } = this.state;
    let { isShowDescriptionDoctor, dataTime,isShowPrice ,isShowLink,doctorId} = this.props;

    let titleVi = "",
      titleEn = "";
    if (dataProfile.positionData) {
      let lastName = dataProfile.lastName;
      let firstName = dataProfile.firstName;
      titleVi = `${dataProfile.positionData.valueVi} || ${lastName} ${firstName}`;
      titleEn = `${dataProfile.positionData.valueEn} || ${firstName} ${lastName}`;
    }
    let price = "";
    if (dataProfile.Doctor_info) {
      let { language } = this.props;
      price =
        language === LANGUAGES.VI
          ? dataProfile.Doctor_info.priceTypeData.valueVi
          : dataProfile.Doctor_info.priceTypeData.valueEn;
    }
    return (
      <>
        <div className="profile-doctor-container">
          <div
            className="avatar-container"
            style={{
              backgroundImage: `url(${dataProfile.image})`,
            }}
          ></div>
          <div className="info-container">
            <h3 className="doctor-title">
              {this.props.language === LANGUAGES.VI ? titleVi : titleEn}
            </h3>
            <div className="doctor-description">
              {isShowDescriptionDoctor === true ? (
                dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )
              ) : (
                <>{this.showTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLink===true && <div className="show-link">
          <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>}
        {isShowPrice===true &&
         <div className="price">
         Giá khám :
         <NumberFormat
           value={price ? price : ""}
           className="foo"
           displayType={"text"}
           thousandSeparator={true}
           suffix={this.props.language === LANGUAGES.VI ? "đ " : "$"}
           // renderText={(value, props) => <div {...props}>{value}</div>}
         />{" "}
       </div>
        }
       
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
