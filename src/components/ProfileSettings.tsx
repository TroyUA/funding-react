import React from 'react'

const ProfileSettings = () => {
  return (
    <dialog className="profile-dialog">
      <form method="dialog" className="profile-dialog__form">
        <h1>Profile settings</h1>
        <div className="profile-dialog__upload">
          <label className="profile-dialog__upload-label" htmlFor="upload-icon">
            Upload icon
          </label>
          <input
            className="profile-dialog__upload-icon"
            id="upload-icon"
            type="file"
            accept="image/*"
          />
        </div>
        <input
          className="profile-dialog__team input"
          type="text"
          name="teamName"
          placeholder="Team name"
        />

        <select data-custom className="profile-dialog__continent">
          <option value="" hidden disabled selected>
            ---State---
          </option>
        </select>

        <input
          className="profile-dialog__password input"
          type="password"
          placeholder="New password"
        />
        <input
          className="profile-dialog__confirm-password input"
          type="password"
          placeholder="Confirm new password"
        />
        <button type="submit" className="profile-dialog__submit-btn btn_black">
          <div className="btn__text">save</div>
        </button>
      </form>
    </dialog>
  )
}

export default ProfileSettings
