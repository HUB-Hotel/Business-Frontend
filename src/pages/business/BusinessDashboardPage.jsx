import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BusinessAuthContext } from "../../context/BusinessAuthContext";
import { mockStatsApi } from "../../api/mockApi";

const BusinessDashboardPage = () => {
  const { businessInfo } = useContext(BusinessAuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await mockStatsApi.getDashboardStats();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  const getStatusText = (status) => {
    const statusMap = {
      confirmed: "예약 확정",
      pending: "확인 대기",
      cancelled: "취소됨",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  const { hotel, recentBookings } = dashboardData;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>{hotel.name}</h1>
        <p>안녕하세요, {businessInfo?.name || "사업자"}님</p>
      </div>

      <div className="dashboard__stats">
        <div className="card stat-card">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">총 객실</p>
            <h2 className="stat-card__value">{hotel.totalRooms}</h2>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">총 예약</p>
            <h2 className="stat-card__value">{hotel.totalBookings}</h2>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-card__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H10.5C10.1022 9 9.72064 9.15804 9.43934 9.43934C9.15804 9.72064 9 10.1022 9 10.5C9 10.8978 9.15804 11.2794 9.43934 11.5607C9.72064 11.842 10.1022 12 10.5 12H13.5C13.8978 12 14.2794 12.158 14.5607 12.4393C14.842 12.7206 15 13.1022 15 13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">총 매출</p>
            <h2 className="stat-card__value">{formatCurrency(hotel.totalRevenue)}</h2>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card__header">
          <h3>최근 예약</h3>
        </div>
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
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.roomType}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{formatCurrency(booking.amount)}</td>
                  <td>
                    <span className={`status-badge ${booking.status}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard__actions">
        <div className="card action-card">
          <h3>매출 통계</h3>
          <p>상세한 매출 분석 및 리포트</p>
          <Link to="/business/statistics" className="btn btn-outline">
            바로가기
          </Link>
        </div>

        <div className="card action-card">
          <h3>리뷰 관리</h3>
          <p>고객 리뷰 확인 및 관리</p>
          <Link to="/business/reviews" className="btn btn-outline">
            바로가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardPage;
