import React from "react";
import "./Dashboard.css";
import Axios from "axios";

const client = Axios.create({
  baseURL: "https://itrack-backend.vercel.app/",
  validateStatus: () => true,
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [
        {
          img: <img src="/image/run3-1.png" className="dashboard-img" />,
          topic: "วิ่งราวสวนลุม",
          description: "Lorem Ipsum is simply dummy text of the ...",
          type: (
            <div className="dashboard-type">
              <img src="/image/index-pic/run.png" className="dashboard-icon" />
              Run
            </div>
          ),
          duration: "1hr 20m",
          date: "15 Feb 22",
          cal: 1000,
          tags: (
            <div className="dashboard-tag">
              <label className="dashboard-label">Girl</label>
              <label className="dashboard-label">สวนลุม</label>
            </div>
          ),
          "edit,share or delete": "",
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

  renderTableHeader() {
    let header = Object.keys(this.state.activities[0]);
    return header.map((key, index) => {
      if (key !== "_id")
        return (
          <th id={key} key={index}>
            {key.toUpperCase()}
          </th>
        );
    });
  }

  renderTableData() {
    return this.state.activities.map((activity, index) => {
      let manage = (
        <div className="manage-icon">
          <img src="/image/index-pic/share.png" className="dashboard-icon" />
          <button
            onClick={() => {
              this.remove(activity._id);
            }}
          >
            <img src="/image/index-pic/trash.png" className="dashboard-icon" />
          </button>
        </div>
      );
      const { img, topic, description, type, duration, date, cal, tags } =
        activity;
      return (
        <tr key={index}>
          <td id="table-img">{img}</td>
          <td id="table-topic">{topic}</td>
          <td id="table-desc">{description}</td>
          <td id="table-type">{type}</td>
          <td id="table-duration">{duration}</td>
          <td id="table-date">{date}</td>
          <td id="table-cal">{cal}</td>
          <td id="table-tags">{tags}</td>
          <td id="table-manage">{manage}</td>
        </tr>
      );
    });
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
        const imgSrc = `/image/index-pic/${record.type}.png`;
        const type = (
          <div className="dashboard-type">
            <img src={imgSrc} className="dashboard-icon" />
            {record.type}
          </div>
        );
        const tagInput = record.tags;
        const distributeArray = (inputArray) => {
          let i = 0;
          if (i < Array.length) {
            i++;
          }
          return <label className="dashboard-label">{inputArray}</label>;
        };
        const outputTag = (
          <div className="dashboard-tag">{tagInput.map(distributeArray)}</div>
        );
        const resizedImg = (
          <img id="resized" alt="No Image" src={`${record.img}`} />
        );
        return {
          img: resizedImg,
          topic: record.activityName,
          description: record.description,
          type: type,
          duration: record.duration,
          date: phaseTime,
          cal: record.calories,
          tags: outputTag,
          "share and delete": "",
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
      <div className="table">
        <h1 id="title">ACTIVITIES</h1>
        <table id="activities">
          <tbody id="acc-table">
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
