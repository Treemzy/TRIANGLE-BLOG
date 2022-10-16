import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";
import ConfirmationModal from '../components/ConfirmationModal'

function UserListScreen() {
    const history = useNavigate();
    const dispatch = useDispatch();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [uid, setUid] = useState(null);

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    const showDeleteModal = (uid) => {
        setUid(uid);
        setMessage(`Are you sure you want to delete this USER '${users.find((x) => x._id === uid).username}' ? `);

        setDisplayConfirmationModal(true)
        };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
        
    }

    useEffect(() => {
            if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
            } else {
            history("/login");
            }
        }, [dispatch, history, successDelete]);

    const deleteHandler = (uid) => {
            dispatch(deleteUser(uid));
            setDisplayConfirmationModal(false);
        };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => showDeleteModal(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ConfirmationModal variantBtnDel={"danger"} ModalTitle={"Confirmation"} showModal={displayConfirmationModal} confirmModal={deleteHandler} hideModal={hideConfirmationModal}  uid={uid} message={message}  />
    </div>
  );
}

export default UserListScreen;
