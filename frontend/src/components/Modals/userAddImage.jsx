import { width } from "@mui/system";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSetProfilePictureMutation } from "../../redux/Features/api/apiSlice";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const schema = yup.object().shape({
  profilePic: yup
    .mixed()
    .typeError("Please select a valid image")
    .test("fileType", "Selected file is not an image", (value) =>
      Object.entries(value).every((img) =>
        SUPPORTED_FORMATS.includes(img[1].type)
      )
    ),
});

export default function ChangeImage({ id, picture }) {
  const [Image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [changePicture] = useSetProfilePictureMutation();

  const submitHandler = async (data) => {
    console.log(id + "this is id");
    try {
      const { profilePic } = data;
      console.log(profilePic);
      console.log("this is profile pic");
      const formData = new FormData();
      formData.append("profilePic", profilePic[0]);
      console.log(id + "idddddddd");
      const res = await changePicture({ formData, id }).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {picture ? "CHange Image" : "Upload Image"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image Upload</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={handleSubmit(submitHandler)}
          encType="multipart/form-data"
        >
          <Modal.Body>
            <input type="file" id="myFile" {...register("profilePic")} />
            <Button type="submit">Change photo</Button>
            <p style={{ color: "red" }}>{errors.profilePic?.message}</p>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
