import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";

const client = Axios.create({
  baseURL: "https://itrack-backend.vercel.app/",
  validateStatus: () => true,
});
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [
        {
          img: <img src="/image/run3-1.png" className="dashboard-img" />,
          topic: "วิ่งราวสวนลุม",
          type: (
            <div className="dashboard-type">
              <img src="/image/index-pic/run.png" className="dashboard-icon" />
              Run
            </div>
          ),
          date: "15 Feb 22",
        },
      ],
    };
  }

  remove = (id) => {
    Axios.delete(
      `https://itrack-backend.vercel.app/users/me/records/${id}`
    ).then(() => {
      window.location.reload();
    });
  };

  renderTodayData() {
    return this.state.activities.map((activity, index) => {
      const { img, topic, date } = activity;
      let todayDate = new Date().toLocaleString("en-US", {
        hour12: false,
      });
      if (activity.date.slice(0, 10) === todayDate.slice(0, 10))
        return (
          <div className="task-box" key={index}>
            <p>{img}</p>
            <p>{topic}</p>
            <p>{date}</p>
          </div>
        );
    });
  }

  renderTodayCount() {
    return this.state.activities.map((activityDate, index) => {
      const { date } = activityDate;
      let count = [];
      let todayDate = new Date().toLocaleString("en-US", {
        hour12: false,
      });
      if (activityDate.date.slice(0, 10) === todayDate.slice(0, 10)) {
        count.push(index);
        index = index + 1;
      }
      return count;
    });
  }

  sum(inputs) {
    let output = [];
    let filtered = inputs.filter((e) => e.length);
    output = filtered.length;
    if (output === 1) {
      return <text>{output} activity </text>;
    } else if (output >= 2) {
      return <text>{output} activities </text>;
    } else {
      return <text>no activity </text>;
    }
  }

  async componentDidMount() {
    const response = await client.get("/users/me/records");
    if (response.status < 300) {
      const records = response.data;
      const activities = records.map((record) => {
        const myDate = record.timestamp;
        const phaseTime = new Date(myDate).toLocaleString("en-US", {
          hour12: false,
        });
        const resizedImg = (
          <img id="resized" alt="No Image" src={`${record.img}`} />
        );
        return {
          img: resizedImg,
          topic: record.activityName,
          date: phaseTime,
          _id: record._id,
        };
      });
      this.setState({
        activities,
      });
    } else {
      alert("Error");
    }
  }

  render() {
    return (
      <main>
        <Navbar />
        <div className="background-home">
          <div className="home-content">
            <div className="home-header">
              <div className="welcome">
                Welcome Back !!!
                <br />
                Let's do our best today together.
              </div>
              <div className="today-duty">
                Look like you have &nbsp;
                <text className="today-duty-box">
                  {this.sum(this.renderTodayCount())}
                </text>
                &nbsp;today.
              </div>
            </div>
            <div className="home-table">{this.renderTodayData()}</div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
