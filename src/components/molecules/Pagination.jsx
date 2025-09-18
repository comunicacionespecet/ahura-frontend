import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    
    const delta = 2;

    // siempre mostrar primera página
    pages.push(1);

    // insertar "..." si estamos lejos del inicio
    if (page > delta + 2) {
      pages.push("...");
    }

    // páginas alrededor de la actual
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      pages.push(i);
    }

    // insertar "..." si estamos lejos del final
    if (page < totalPages - (delta + 1)) {
      pages.push("...");
    }

    // siempre mostrar última página si hay más de una
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };


  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ←
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border rounded ${p === page
                ? "bg-[#137598] text-white font-bold"
                : "hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
