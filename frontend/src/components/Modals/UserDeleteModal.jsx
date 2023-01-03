import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAdminDeleteUserMutation } from "../../redux/Features/api/apiSlice";

export default function DeleteUserModal({ userId ,name}) {
    console.log(name)
    console.log(userId)
  const [show, setShow] = useState(false);
  const [DeleteUser] = useAdminDeleteUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = async () => {
    try{
    console.log(userId);
    res = await DeleteUser({userId}).unwrap();
    if (res.status === "success") {
      handleClose();
    }
  }catch(err){
    console.log(err)
  }
};

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this User?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={submitHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
