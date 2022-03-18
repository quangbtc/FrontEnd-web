import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableUser.scss";
import { emitter } from "../../../utils/emitter";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    //   when compent mounted or mounting component wil render
    //get all user
    this.props.getAllUserRedux();
  }
  componentDidUpdate(prevProps, preState) {
    if (this.props.listUsers !== prevProps.listUsers) {
      let userArr = this.props.listUsers;
      this.setState({
        userRedux: userArr,
      });
    }
  }
  handleDeleteUser = (item) => {
    this.props.deleteUser(item.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFormParent(user);
    emitter.emit("SCROLL_TO_TOP");
  };

  //======================RENDER====================
  render() {
    let userArr = this.state.userRedux;
    let i = 1;
    return (
      <div className="user-container">
        <div className="title">LIST USER </div>
        <div className="user-table mt-3 mx-2">
          <table id="customers">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {userArr &&
                userArr.length > 0 &&
                userArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{i++}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.address}</td>
                      <td style={{ width: "180px" }}>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.userArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
