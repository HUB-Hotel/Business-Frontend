const BusinessBookingFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>상태</label>
        <select
          value={filters.status || ""}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">전체</option>
          <option value="pending">대기</option>
          <option value="confirmed">확정</option>
          <option value="cancelled">취소</option>
          <option value="completed">완료</option>
        </select>
      </div>

      <div className="filter-group">
        <label>기간</label>
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => onFilterChange("startDate", e.target.value)}
        />
        <span>~</span>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => onFilterChange("endDate", e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="투숙객명 검색"
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BusinessBookingFilter;
