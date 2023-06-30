import React from "react";
import "./index.scss";

const Pagination = (props) => {
  const { changePage, page, hasNextPage } = props;

  return (
    <nav className="pagination container-fluid">
      {page > 1 ? (
        <button
          className="back btn btn-primary"
          name="back"
          onClick={changePage}
        >
          Back
        </button>
      ) : (
        ""
      )}
      {hasNextPage ? (
        <button
          className="next btn btn-primary"
          name="next"
          onClick={changePage}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Pagination;
