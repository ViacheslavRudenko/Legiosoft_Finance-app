import React from "react";
import "./index.scss";

export default function Paginator({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  pageSize,
  rows,
  state,
  nextPage,
  previousPage,
  gotoPage,
  pageCount,
  setPageSize,
}) {
  const getVisiblePages = (page, total) => {
    switch (true) {
      case total < 2:
        return [1];
      case page === total - 2:
        return [1, 2, "...", 8, 9, total];
      case page === total:
        return [1, "...", total];
      case page + 3 > total:
        return [1, 2, "...", page, total];
      case page === 1:
        return [1, 2, 3, "...", total];
      case page === 2:
        return [1, 2, 3, 4, "...", total];
      case page === total - 3:
        return [1, 2, "...", 7, 8, 9, total];
      case page > 2 && page + 3 <= total:
        return [1, "...", page, page + 1, page + 2, "...", total];
      default:
        return [1, 2, "...", total];
    }
  };

  const pageNumberArr = getVisiblePages(pageIndex, pageSize);

  return (
    <>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        {pageNumberArr.map((pageNumber) => (
          <button
            key={Math.random()}
            disabled={pageNumber === "..." && true}
            onClick={(e) => {
              gotoPage(Number(pageNumber) - 1);
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
}
