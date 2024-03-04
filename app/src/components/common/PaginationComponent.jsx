import React from "react";
import { Button } from "react-bootstrap";

const PaginationComponent = ({
  currentPage,
  itemCount,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <Button
        variant={currentPage !== 0 ? "primary" : "secondary"}
        onClick={handlePrevious}
        disabled={currentPage === 0}
      >
        Previous
      </Button>
      <span className="mx-2 align-self-center">
        {" "}
        Chart {currentPage + 1} of {totalPages}{" "}
      </span>
      <Button
        variant={currentPage < totalPages - 1 ? "primary" : "secondary"}
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationComponent;
