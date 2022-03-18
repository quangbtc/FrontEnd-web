import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './VerifyBooking.scss'
import {postVerifyBookingAppointment} from "../../../../services/userService"
import HomeHeader from "../Section/HomeHeader"
class VerifyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
        statusVerify:false,
        errCode:null
    };
  }
  async componentDidMount() {
      if(this.props.location && this.props.location.search){
        let query = new URLSearchParams(this.props.location.search);
        let token = query.get('token')
        let doctorId = query.get('doctorId')
        let response=await postVerifyBookingAppointment({
            token:token,
            doctorId:doctorId
        })
        if(response && response.errCode===0){
            this.setState({
                statusVerify:true,
                errCode:response.errCode
            })
        }else{
            this.setState({
                statusVerify:false,
                errCode:1
            })
        }
      }
   
           
           
           
  }
  componentDidUpdate() {}
  render() {
      let {VerifyBooking,errCode}=this.state
    return (
      <>
    <HomeHeader></HomeHeader>
    <div className="verify-booking-container">
    {VerifyBooking===false?
     <div className="is-loading">Loading...</div>
     :errCode===0?
     <div className="info-booking-success">Đặt lịch hẹn thành công !</div>
     :
     <div className="info-booking-failed">Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
     }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
