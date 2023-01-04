import React from "react";
import "./userProfileCard.css";
import ChangeImage from "../Modals/userAddImage";

function UserProfileCard({ name, email, picture, id }) {
  return (
    <div className="card">
      <div className="card_background_img"></div>
      <div
        className="card_profile_img"
        style={{ backgroundImage: `url(${picture})` }}
      ></div>
      <div className="user_details">
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
      <div className="card_count">
        <div className="count">
          <div className="fans"></div>
          <div className="following">
              <ChangeImage id={id} picture = {picture} />
          </div>
          <div className="post"></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
