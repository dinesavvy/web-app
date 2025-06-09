import React from "react";
import { Pagination } from "antd";

const CommonPagination = ({
  currentPage,
  pageSize,
  totalCount,
  currentCount,
  onPageChange,
  label = "Followers",
}) => {
  if (totalCount === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(start + currentCount - 1, totalCount);

  return (
    <div className="d-flex align-center justify-between flexPagination">
      <div className="fs-16">
        {`Showing ${start} to ${end} of ${totalCount} ${label}`}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalCount}
        onChange={onPageChange}
        showSizeChanger={true}
        pageSizeOptions={["12", "20", "50", "100"]}
      />
    </div>
  );
};

export default CommonPagination;
