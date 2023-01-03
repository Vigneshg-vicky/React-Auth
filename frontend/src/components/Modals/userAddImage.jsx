import { width } from "@mui/system";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ChangeImage({picture}) {
  console.log("jai image");
  console.log(picture);
  const [Image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = ()=>{
    
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {picture ? "CHange Image" : "Upload Image"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="file" />
            <img
              src="https://images.alphacoders.com/597/597903.jpg"
              style={{ height: "150px", width: "150px" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
