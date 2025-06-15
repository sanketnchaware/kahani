const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-black">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
