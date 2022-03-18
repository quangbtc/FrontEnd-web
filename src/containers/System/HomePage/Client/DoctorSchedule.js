import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi"; //HỖ TRỢ CHUYỂN DATE SANG TIẾNG VIỆT
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { getDoctorScheduleService } from "../../../../services/userService";
import ModalBooking from "./Modal/ModalBooking";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDays: [], //NGÀY KHÁM
      scheduleDoctor: [], //MẢNG CHỨA LICH KHÁM BỆNH
      isOpenModalBooking: false,
      timeData: {}, //SEND DATA TIME TO MODALBOOKING
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    console.log("Date Vi", moment(new Date()).format("dddd-DD/MM"));
    console.log("Date en", moment(new Date()).locale("en").format("ddd-DD/MM"));
    let allDays = this.setAllDays(language);
    this.setState({
      arrDays: allDays,
    });
  }
  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.setAllDays(this.props.language);
      this.setState({
        arrDays: allDays,
      });
    }
    //KIỂM TRA PROPS TỪ COMPONENT CHA NẾU CÓ UPDATE THÌ UPDATE DỮ LIỆU LẠI
    if (this.props.detailDoctor !== prevProps.detailDoctor) {
      let allDays = this.setAllDays(this.props.language);
      let response = await getDoctorScheduleService(
        this.props.detailDoctor, //ID DOCTOR GỬI TỪ COMPONENT CHA
        allDays[0].value
      );
      this.setState({
        scheduleDoctor: response.data ? response.data : [],
      });
    }
  }
  //IN HOA CHỮ CÁI ĐẦU CỦA SELECT TEXT
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  //ĐẶT NGÀY KHÁM BỆNH
  setAllDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let Object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = this.capitalizeFirstLetter(
            //HIỂN THỊ NGÀY THÁNG THEO VI
            moment(new Date()).add(i, "days").format("DD/MM")
          );
          let labelVi = `Hôm nay-${ddMM}`;
          Object.label = labelVi;
        } else {
          let labelVi = this.capitalizeFirstLetter(
            //HIỂN THỊ NGÀY THÁNG THEO VI
            moment(new Date()).add(i, "days").format("dddd-DD/MM")
          );
          Object.label = labelVi;
        }
      } else {
        //NGÀY THÁNG THEO EN
        if (i === 0) {
          let ddMM = moment(new Date())
            .locale("en")
            .add(i, "days")
            .format("DD/MM");
          let labeEn = `Today-${ddMM}`;
          Object.label = labeEn;
        } else {
          Object.label = moment(new Date())
            .locale("en")
            .add(i, "days")
            .format("ddd-DD/MM");
        }
      }
      Object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(Object);
    }
    return allDays;
  };
  //SỰ KIỆN ONCHANGE SELECT
  handleOnSelect = async (event) => {
    if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
      let date = event.target.value;
      let doctorId = this.props.detailDoctor;
      let response = await getDoctorScheduleService(doctorId, date);
      if (response && response.data.length > 0) {
        let scheduleDoctor = response.data;
        this.setState({
          scheduleDoctor: response.data ? scheduleDoctor : [],
        });
      } else {
        this.setState({
          scheduleDoctor: [],
        });
      }
    }
  };
  //WEN CLICK ON BUTTON SCHEDULE TIME
  handleClickScheduleTime = (time) => {
    console.log("Check time data", time);
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTime: time,
    });
  };
  handleCloseModalBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { arrDays, scheduleDoctor, isOpenModalBooking, dataScheduleTime } =
      this.state;
    let { language } = this.props;
    return (
      <>
        <div className="select-schedule">
          <select
            className="select-schedule-form"
            onChange={(event) => this.handleOnSelect(event)}
          >
            {arrDays &&
              arrDays.length > 0 &&
              arrDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="schedule-table">
          <div className="schedule-calendar">
            <span>
              <i className="fas fa-calendar-alt"></i>
              <span className="text-calendar">
                <FormattedMessage id="patient.schedule-doctor.calendar" />
              </span>
            </span>
          </div>
          <div className="schedule-doctor-wrapper">
            {scheduleDoctor && scheduleDoctor.length > 0 ? (
              <>
                <div className="schedule-doctor">
                  {scheduleDoctor.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        className="btn"
                        key={index}
                        onClick={() => this.handleClickScheduleTime(item)}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <FormattedMessage id="patient.schedule-doctor.book" />
                  <i class="fas fa-hand-point-up"></i>
                  <FormattedMessage id="patient.schedule-doctor.book-free" />
                </div>
              </>
            ) : (
              <span className="text-notification">
                {" "}
                <FormattedMessage id="patient.schedule-doctor.no-schedule" />
              </span>
            )}
          </div>
        </div>
        <ModalBooking
          isOpenModal={isOpenModalBooking}
          toggle={this.handleCloseModalBooking}
          dataScheduleTime={dataScheduleTime}
        ></ModalBooking>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
