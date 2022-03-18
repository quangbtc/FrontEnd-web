import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorInfo.scss";
import moment from "moment";
import localization from "moment/locale/vi"; //HỖ TRỢ CHUYỂN DATE SANG TIẾNG VIỆT
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { getDoctorDetailById } from "../../../../services/userService";
import NumberFormat from "react-number-format";

class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      nameClinic: "",
      addressClinic: "",
      note: "",
      price: "",
      payment: "",
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps) {
    if (this.props.detailDoctor !== prevProps.detailDoctor) {
      if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
        let response = await getDoctorDetailById(this.props.detailDoctor);

        if (
          response.data &&
          response.errCode === 0 &&
          response.data.Doctor_info
        ) {
          let priceVi = response.data.Doctor_info.priceTypeData.valueVi;
          let priceEn = response.data.Doctor_info.priceTypeData.valueEn;
          let paymentVi = response.data.Doctor_info.paymentTypeData.valueVi;
          let paymentEn = response.data.Doctor_info.paymentTypeData.valueEn;
          this.setState({
            nameClinic: response.data.Doctor_info.nameClinic,
            addressClinic: response.data.Doctor_info.addressClinic,
            note: response.data.Doctor_info.note,
            price: this.props.language === LANGUAGES.VI ? priceVi : priceEn,
            payment:
              this.props.language === LANGUAGES.VI ? paymentVi : paymentEn,
          });
        }
      }
    }
    if (this.props.language !== prevProps.language) {
      if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
        let response = await getDoctorDetailById(this.props.detailDoctor);

        if (
          response.data &&
          response.errCode === 0 &&
          response.data.Doctor_info
        ) {
          let priceVi = response.data.Doctor_info.priceTypeData.valueVi;
          let priceEn = response.data.Doctor_info.priceTypeData.valueEn;
          let paymentVi = response.data.Doctor_info.paymentTypeData.valueVi;
          let paymentEn = response.data.Doctor_info.paymentTypeData.valueEn;

          this.setState({
            nameClinic: response.data.Doctor_info.nameClinic,
            addressClinic: response.data.Doctor_info.addressClinic,
            note: response.data.Doctor_info.note,
            price: this.props.language === LANGUAGES.VI ? priceVi : priceEn,
            payment:
              this.props.language === LANGUAGES.VI ? paymentVi : paymentEn,
          });
        }
      }
    }
  }
  handleShowInfo = (item) => {
    this.setState({
      showDetail: item,
    });
  };

  render() {
    let { showDetail, nameClinic, addressClinic, note, price, payment } =
      this.state;
    console.log("Check state", this.state);
    return (
      <>
        <div className="container-right-info">
          <div className="container-info">
            <div className="container-info-title">ĐỊA CHỈ KHÁM</div>
            <div className="container-info-name">
              {nameClinic ? nameClinic : ""}
            </div>
            <div className="container-info-address">
              {addressClinic ? addressClinic : ""}
            </div>
          </div>
          <div className="container-info-price">
            <div className="info-price-title">
              <span className="info-price-title__text"> GIÁ KHÁM: </span>
              {showDetail || (
                <span className="checking-price">
                  {" "}
                  <NumberFormat
                    value={price ? price : ""}
                    className="foo"
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={this.props.language === LANGUAGES.VI ? "đ " : "$"}
                    // renderText={(value, props) => <div {...props}>{value}</div>}
                  />{" "}
                </span>
              )}
              <span
                className="view-detail"
                onClick={() => this.handleShowInfo(true)}
              >
                {showDetail ? "" : "Xem chi tiet"}
              </span>
            </div>
            {showDetail && (
              <>
                <div className="info-price-detail">
                  <div className="info-price-detail__title">
                    <span className="info-price-title__text">Giá khám</span>
                    <span className="checking-price">
                      {" "}
                      <NumberFormat
                        value={price ? price : ""}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={
                          this.props.language === LANGUAGES.VI ? "đ " : "$"
                        }
                        // renderText={(value, props) => <div {...props}>{value}</div>}
                      />{" "}
                    </span>
                  </div>
                  <div className="info-price-detail__content">
                    {note ? note : ""}
                  </div>
                </div>
                <div className="info-payment">
                  {`Người bệnh có thể thanh toán chi phí bằng hình thức: ${payment} `}
                </div>
              </>
            )}

            {showDetail && (
              <span
                className="btn-hidden-price"
                onClick={() => this.handleShowInfo(false)}
              >
                Ẩn bảng gía
              </span>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
