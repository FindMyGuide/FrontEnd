import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container">
      {pageNumbers.map((pageNumber) => (
        <button className="pageButton"
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
