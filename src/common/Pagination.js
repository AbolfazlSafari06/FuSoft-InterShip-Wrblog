import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ total, perPage, currentPage, onPageClick }) {
    const pages = Math.ceil(total / perPage);
    const renderPages = () => {
        return [...Array(pages)].map((item, index) => {
            return (
                <li className={`page-item ${currentPage == index + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => onPageClick(index + 1)}>
                        {index + 1}
                    </button>
                </li>
            );
        });
    };
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination flex-wrap">{renderPages()}</ul>
            </nav>
        </div>
    );
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired,
};

export default Pagination;

