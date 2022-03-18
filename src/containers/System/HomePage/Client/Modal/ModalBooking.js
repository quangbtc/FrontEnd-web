import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalBooking.scss";
import { Modal } from "reactstrap";
import { LANGUAGES } from "../../../../../utils";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import * as actions from "../../../../../store/actions";
import { createBookingPatientService } from "../../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class ModalBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: "",
      doctorId: "",
      listGenders: "",
      timeType: "",
      date: "",
    };
  }
  componentDidMount() {
    this.props.getGenders();
    // this.setState({
    //   doctorId: this.props.dataScheduleTime.doctorId,
    // });
  }
  componentDidUpdate(prevProps) {
    if (this.props.genderRedux !== prevProps.genderRedux) {
      let dataSelect = this.buildDataSelectInput(this.props.genderRedux);
      this.setState({
        listGenders: dataSelect,
      });
    }
    if (this.props.language !== prevProps.language) {
      let dataSelect = this.buildDataSelectInput(this.props.genderRedux);
      this.setState({
        listGenders: dataSelect,
      });
    }
    if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
      if (
        this.props.dataScheduleTime &&
        !_.isEmpty(this.props.dataScheduleTime)
      ) {
        let doctorId = this.props.dataScheduleTime.doctorId;
        let timeType = this.props.dataScheduleTime.timeType;
        let date = this.props.dataScheduleTime.date;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
          date: date,
        });
      }
    }
  }
  handleToggle = () => {
    this.props.toggle();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  buildDataSelectInput = (dataInput) => {
    let result = [];
    let { language } = this.props;
    if (dataInput && dataInput.length > 0) {
      dataInput.map((item) => {
        let Object = {};
        let labelVi = item.valueVi;
        let labelEn = item.valueEn;
        Object.value = item.keyMap;
        Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        result.push(Object);
      });
    }
    return result;
  };
  handleOnchangeSelect = (optionSelect) => {
    this.setState({
      genders: optionSelect,
    });
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
      return `${time} - ${date}`;
    } else {
      return "";
    }
  };
  handleConfirm = async () => {
    console.log("Check state", this.state);
    let { language } = this.props;
    let timeString = this.showTimeBooking(this.props.dataScheduleTime);
    let lastName = this.props.dataScheduleTime.doctorData.lastName;
    let firstName = this.props.dataScheduleTime.doctorData.firstName;
    let doctorName =
      language === LANGUAGES.VI
        ? `${lastName} ${firstName}`
        : `${firstName} ${lastName}`;
    let message = await createBookingPatientService({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: this.state.birthday,
      genders: this.state.genders.value,
      doctorId: this.state.doctorId,
      date: this.state.date,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (message && message.errCode === 0) {
      toast.success("Booking success!");
      this.handleToggle();
    } else {
      toast.warn("Booking failed ! Pls try again !");
    }
  };

  render() {
    console.log("Check props", this.props);
    let { dataScheduleTime } = this.props;
    let doctorId =
      dataScheduleTime && !_.isEmpty(dataScheduleTime)
        ? dataScheduleTime.doctorId
        : "";

    return (
      <>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={() => this.handleToggle()}
          size={"lg"}
          centered
          backdrop={true}
        >
          <div className="modal-container">
            <div className="modal-header">
              <span className="header-title">Đặt lịch khám bệnh</span>
              <span
                className="header-closeIcon"
                onClick={() => this.handleToggle()}
              >
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="modal-body">
              <div className="profile-contain">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTime={dataScheduleTime}
                />
              </div>

              <div className="info-patient-input">
                <div className="row">
                  <div className="col-6 form-group">
                    <label className="mt-2">Tên bệnh nhân:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label className="mt-2">Số điện thoại:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label className="mt-2">Địa chỉ Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label className="mt-2">Địa chỉ liên hệ:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "address")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 form-group">
                    <label className="mt-2">Lý do khám:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "reason")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label className="mt-2">Năm sinh:</label>
                    <DatePicker
                      selected={this.state.birthday}
                      onChange={(date) =>
                        this.setState({ birthday: date.getTime() })
                      }
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      // showTimeSelect
                      // timeClassName={() => this.handleColor}
                      // minDate={new Date()}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label className="mt-2">Giới tính:</label>
                    <Select
                      value={this.state.genders}
                      onChange={this.handleOnchangeSelect}
                      options={this.state.listGenders}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-confirm"
                onClick={() => this.handleConfirm()}
              >
                Xác nhận
              </button>
              <button
                className="btn-cancel"
                onClick={() => this.handleToggle()}
              >
                Huỷ
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
