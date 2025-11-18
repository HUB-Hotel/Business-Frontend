const BusinessStatsCards = ({ stats }) => {
  if (!stats) return null;

  const { hotel } = stats;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-icon gradient-blue"></div>
        <p className="stat-label">총 객실</p>
        <p className="stat-value">{hotel.totalRooms}</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon gradient-pink"></div>
        <p className="stat-label">총 예약</p>
        <p className="stat-value">{hotel.totalBookings}</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon gradient-mint"></div>
        <p className="stat-label">이번 달 예약</p>
        <p className="stat-value">{hotel.monthlyBookings || 45}</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon gradient-green"></div>
        <p className="stat-label">총 매출</p>
        <p className="stat-value">₩{formatCurrency(hotel.totalRevenue)}</p>
      </div>
    </div>
  );
};

export default BusinessStatsCards;
