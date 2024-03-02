import React, { Component } from "react";
import axios from "../axiosinstance";

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

  //Fetch Data based on which page is clicked
  //Used axios to retrieve data based on the which page is clicked
  fetchData = async () => {
    try {
      const response = await axios.get(
        `?page=${this.state.currentPage}&format=json`
      );
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
      <div className="mt-3">
        <button
          onClick={this.goToPreviousPage}
          disabled={currentPage === 1}
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Previous{" "}
        </button>
        <button
          onClick={this.goToNextPage}
          disabled={currentPage === totalPages}
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Next{" "}
        </button>
      </div>
    );
  }
}

export default Pagination;
