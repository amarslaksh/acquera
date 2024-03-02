import React, { Component } from "react";
import axios from "axios";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 10,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/planets/?page=${this.state.currentPage}&format=json`);
      const { results, count } = response.data;
      const totalPages = Math.ceil(count / 10); // Assuming 10 items per page
      this.setState({ data: results, totalPages: totalPages });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  goToNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
        this.setState({ currentPage: currentPage + 1 }, () => {
            this.props.onPageChange(this.state.currentPage);
        });
    }
};

goToPreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
        this.setState({ currentPage: currentPage - 1 }, () => {
            this.props.onPageChange(this.state.currentPage);
        });
    }
};

  render() {
    const { data, currentPage, totalPages } = this.state;
    return (
      <div>
        <button onClick={this.goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={this.goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
