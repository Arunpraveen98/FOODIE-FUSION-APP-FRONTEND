import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { deleteUser, getAllUsers } from "../../actions/User_Actions";
// -----------------------
export default function Userslist() {
  // -----------------------
  const dispatch = useDispatch();
  // -----------------------
  const usersstate = useSelector((state) => state.getAllUsersReducer);
  const { users, error, loading } = usersstate;
  // -----------------------
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  // -----------------------
  return (
    <div className="row">
      <div className="All-list-title">Users list</div>

      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <div className="flex-container">
        <table className="col-md-10 table table-striped table-bordered table-responsive-sm">
          <thead className="table-head">
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>
                      <span className="user-id">{user._id}</span>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <i
                        className="fa fa-trash"
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                        }}
                      ></i>
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
