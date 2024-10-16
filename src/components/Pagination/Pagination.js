import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from './Pagination.module.css';

export default function Pagination({ page, onPageChange, totalRecipes, recipesPerPage }) {
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className={styles.paginationButton}
        aria-label="Go to first page"
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={styles.paginationButton}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={20} />
      </button>
      {startPage > 1 && <span className={styles.ellipsis}>...</span>}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pageNumber} ${
            page === number ? styles.activePageNumber : styles.inactivePageNumber
          }`}
          aria-label={`Go to page ${number}`}
          aria-current={page === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}
      {endPage < totalPages && <span className={styles.ellipsis}>...</span>}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={styles.paginationButton}
        aria-label="Go to next page"
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        className={styles.paginationButton}
        aria-label="Go to last page"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
}