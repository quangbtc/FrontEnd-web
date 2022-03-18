// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Redirect, Route, Switch } from "react-router-dom";
// import Header from "../containers/Header/Header";
// import DoctorSchedule from "../containers/System/HomePage/Doctor/DoctorSchedule";

// class Doctor extends Component {
//   render() {
//     const { isLoggedIn,systemMenuPath } = this.props;
//     return (
//       <React.Fragment>
//         {isLoggedIn && <Header />}
//         <div className="system-container">
//           <div className="system-list">
//             <Switch>
//             <Route
//                 component={() => {
//                   return <Redirect to={systemMenuPath} />;
//                 }}
//               />
//               <Route path="/doctor/schedule" component={DoctorSchedule} />
//             </Switch>

//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     systemMenuPath: state.app.systemMenuPath,
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
