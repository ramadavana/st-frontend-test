// components/Pagination.tsx
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  displayCount: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrev,
  hasNext,
  displayCount,
}) => {
  return (
    <div className="flex justify-between w-full items-center">
      <p>
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-4 items-center justify-center">
        {window.innerWidth >= 768 && <p>{displayCount}</p>}

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="px-4 py-2 bg-white border-2 border-white text-black hover:bg-gray-500 hover:text-white transition-all duration-150 rounded-lg disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black">
          <FaArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="px-4 py-2 bg-white border-2 border-white text-black hover:bg-gray-500 hover:text-white transition-all duration-150 rounded-lg disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black">
          <FaArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
