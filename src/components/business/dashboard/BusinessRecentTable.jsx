import StatusBadge from "../../common/StatusBadge";

const BusinessRecentTable = ({ bookings = [] }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <div className="recent-section">
      <h4>최근 예약</h4>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>객실 타입</th>
                <th>투숙객</th>
                <th>체크인</th>
                <th>체크아웃</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.roomType}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{formatCurrency(booking.amount)}</td>
                  <td>
                    <StatusBadge status={booking.status} type="booking" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessRecentTable;
