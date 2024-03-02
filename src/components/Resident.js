import React, { Component } from "react";
import axios from "axios";

class Resident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residents: [],
    };
  }

  componentDidMount() {
    this.getResidentData();
  }

  getResidentData() {
    const { residents } = this.props;
    const residentRequests = residents.map((residentURL) => axios.get(residentURL));
    axios
      .all(residentRequests)
      .then((responses) => {
        const residentData = responses.map((response) => response.data);
        this.setState({ residents: residentData });
      })
      .catch((error) => {
        console.error("Error fetching resident data:", error);
      });
  }

  render() {
    return (
        <div>
            <div className="p-1 mx-1">
                <h4>Planet Residents:</h4>
                <ul>
                {this.state.residents.map((resident, index) => (
                    <div key={`${resident.name}-${index}`}>
                        <li>Resident Name: {resident.name}</li>
                        <li>Resident Height: {resident.height}</li>
                        <li>Resident Mass: {resident.mass}</li>
                        <li>Resident Gender: {resident.gender}</li>
                    </div>
                ))}
                </ul>
            </div>
      </div>
    );
  }
}

export default Resident;
