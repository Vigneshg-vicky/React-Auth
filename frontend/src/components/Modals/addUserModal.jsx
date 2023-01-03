import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAdminAddNewMutation } from "../../redux/Features/api/apiSlice";

const Pstyle = {
  color: "red",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(6)
    .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "enter a valid name"),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});


export default function AddUserModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onClick" });
  
  const [AddUser] = useAdminAddNewMutation()



  const [registerError, setRegisterError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (data) => {
    try {
      console.log("data");
      const res = await AddUser(data).unwrap();
      if(res.status === 'success'){
        handleClose();
      }
    } catch (err) {
      setRegisterError(err.data.message);
    }
  };

  return (
    <>
      <Button style={{ width: "10rem" }} variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                // error={!!errors.name}
                // helperText={errors.name ? errors.name.message : ""}
                {...register("name")}
                autoFocus
              />
              <p style={Pstyle} className="errors">
                {errors.name ? errors.name.message : ""}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email")}
                autoFocus
              />
              <p style={Pstyle}>{errors.email ? errors.email.message : ""}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password")}
                autoFocus
              />
              <p style={Pstyle}>
                {errors.password ? errors.password.message : ""}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                {...register("confirmPassword")}
                autoFocus
              />
              <p style={Pstyle}>
                {errors.confirmPassword ? errors.confirmPassword.message : ""}
              </p>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
