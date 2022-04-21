import React, { useEffect, useState } from "react";
import "./Add-activity.css";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";

const client = Axios.create({
  baseURL: "https://itrack-backend.vercel.app/",
  validateStatus: () => true,
});

const AddActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [activityDate, setActivityDate] = useState("dd-mm-yyyy");
  const [activityType, setActivityType] = useState(
    "select the type of activity"
  );
  const [activityTime, setActivityTime] = useState();
  const [activityTags, setActivityTags] = useState([]);
  const [activityImage, setActivityImage] = useState({ img: "" });

  function handleSubmit(e) {
    e.preventDefault();
    let records = {
      img: activityImage,
      activityName: activityName,
      timestamp: activityDate,
      duration: activityTime,
      type: activityType,
      calories: (calculateCalories(activityType) * (activityTime / 60)).toFixed(
        2
      ),
      description: activityDesc,
      tags: activityTags,
    };
    const postPromise = new Promise((resolve, reject) => {
      resolve(
        Axios.post(
          `https://itrack-backend.vercel.app/users/me/records/`,
          records
        )
      );
    });
    postPromise.then(() => {
      window.location.href = "https://itrack.vercel.app/activity-list";
    });
  }

  const isNameOk = activityName.length >= 3;
  const isTypeOk = activityType !== "select the type of activity";
  const isDateOk = activityDate !== "dd-mm-yyyy";
  const isTimeOk = activityTime >= 10;

  const onChangeActivityName = (e) => {
    setActivityName(e.target.value);
  };

  const onChangeActivityDesc = (e) => {
    setActivityDesc(e.target.value);
  };
  const onChangeActivityType = (e) => {
    setActivityType(e.target.value);
  };

  const calculateCalories = (activityType) => {
    if (
      activityType === "Walking" ||
      activityType === "Exercise - Yoga" ||
      activityType === "Fitness" ||
      activityType === "Others"
    ) {
      return 500;
    } else {
      return 800;
    }
  };

  const onChangeActivityDate = (e) => {
    setActivityDate(e.target.value);
  };

  const onChangeActivityTime = (e) => {
    setActivityTime(e.target.value);
  };

  const onChangeActivityTags = (e) => {
    const userInputTags = e.target.value;
    const arrayOfTags = userInputTags.split(",");
    setActivityTags(arrayOfTags);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangeActivityImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setActivityImage(base64);
  };

  return (
    <form>
      <Navbar />
      <section className="boxed">
        <h1 className="add-activity-title">ADD ACTIVITY</h1>
        <div className="form">
          <div className="content-box">
            <div className="container-fluid label-input">
              <label>
                Activity Name
                <div
                  className="warning"
                  style={{ display: isNameOk ? "none" : "block" }}
                >
                  The activity name must contain at least 3 letters.
                </div>
              </label>
              <input
                id="acc-name"
                className="add-activity-input"
                type="text"
                placeholder="(Ex.walking)"
                Value={activityName}
                onChange={onChangeActivityName}
                required
              />
            </div>
            <div className="container-fluid label-input">
              <label>Description </label>
              <input
                id="add-description"
                className="add-activity-input"
                name="description"
                type="text"
                placeholder="(Ex.walking to the moon)"
                defaultValue={activityDesc}
                onChange={onChangeActivityDesc}
              />
            </div>
            <div className="container-fluid label-select">
              <label id="select-type-label">
                Types of Activity
                <div
                  className="warning"
                  style={{ display: isTypeOk ? "none" : "block" }}
                >
                  Please select the type of activity.
                </div>
              </label>
              <select
                name="Types"
                className="add-activity-input"
                defaultValue={activityType}
                onChange={onChangeActivityType}
                required
              >
                <option> select the type of activity </option>
                <option> Running </option>
                <option> Walking </option>
                <option> Swimming </option>
                <option> Biking </option>
                <option> Hiking </option>
                <option> Sports </option>
                <option> Fitness </option>
                <option> Exercise - Yoga </option>
                <option> Other </option>
              </select>
            </div>
            <div className="container-fluid label-input">
              <label>
                Date
                <div
                  className="warning"
                  style={{ display: isDateOk ? "none" : "block" }}
                >
                  Please enter the date of the activity.
                </div>
              </label>
              <input
                id="date"
                className="add-activity-input"
                name="date"
                type="datetime-local"
                defaultValue={activityDate}
                onChange={onChangeActivityDate}
                required
              />
            </div>
            <div className="container-fluid label-input">
              <label>
                Duration
                <div
                  className="warning"
                  style={{ display: isTimeOk ? "none" : "block" }}
                >
                  The activity duration must be at least 10 minutes.
                </div>
              </label>
              <input
                id="time"
                className="add-activity-input"
                type="number"
                name="duration"
                min={10}
                placeholder="Minute(s)"
                defaultValue={activityTime}
                onChange={onChangeActivityTime}
                required
              />
            </div>
            <div className="container-fluid label-input">
              <label>Tag </label>
              <input
                id="tag"
                className="add-activity-input"
                name="tag"
                type="text"
                placeholder="(Ex.cool , yoga)"
                value={activityTags}
                onChange={onChangeActivityTags}
              />
            </div>
            <div className="container-fluid label-input">
              <label for="img">
                Upload Image:
                <br />
                Size must not above 50KB.
              </label>
              <input
                type="file"
                className="add-image-input"
                id="upload-img"
                name="img"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => onChangeActivityImage(e)}
              />
            </div>
          </div>
        </div>
        <div className="end-button">
          <button className="next-button custom-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </section>
    </form>
  );
};

export default AddActivity;
