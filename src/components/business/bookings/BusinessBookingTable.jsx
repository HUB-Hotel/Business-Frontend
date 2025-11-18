import { Link } from "react-router-dom";
import StatusBadge from "../../common/StatusBadge";

const BusinessBookingTable = ({ bookings, onStatusChange }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>객실</th>
            <th>투숙객</th>
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
              <td>{booking.id}</td>
              <td>{booking.roomType}</td>
              <td>{booking.guestName}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{formatCurrency(booking.amount)}</td>
              <td>
                <StatusBadge status={booking.status} type="booking" />
              </td>
              <td>
                <Link to={`/business/bookings/${booking.id}`} className="btn btn-sm btn-outline">
                  상세
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessBookingTable;
