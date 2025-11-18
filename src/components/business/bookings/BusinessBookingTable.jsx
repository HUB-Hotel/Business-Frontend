import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const STATUS_OPTIONS = [
  { value: "confirmed", label: "확정" },
  { value: "pending", label: "대기" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

const BusinessBookingTable = ({ bookings, onStatusChange }) => {
  const formatCurrency = (amount) =>
    `${new Intl.NumberFormat("ko-KR").format(amount)}원`;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>호텔명</th>
            <th>고객명</th>
            <th>체크인</th>
            <th>체크아웃</th>
            <th>금액</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <Link to={`/business/bookings/${booking.id}`} className="link-primary">
                  {booking.id}
                </Link>
              </td>
              <td>{booking.hotelName || "-"}</td>
              <td>{booking.guestName}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{formatCurrency(booking.amount)}</td>
              <td>
                <StatusBadge status={booking.status} type="booking" />
              </td>
              <td>
                <div className="booking-actions">
                  <select
                    className="status-select"
                    value={booking.status}
                    onChange={(e) => onStatusChange(booking.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onStatusChange(booking.id, "cancelled")}
                  >
                    취소
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessBookingTable;
