import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BusinessAuthContext } from "../../context/BusinessAuthContext";
import { businessStatsApi } from "../../api/businessStatsApi";
import BusinessStatsCards from "../../components/business/dashboard/BusinessStatsCards";
import BusinessRecentTable from "../../components/business/dashboard/BusinessRecentTable";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessDashboardPage = () => {
  const { businessInfo } = useContext(BusinessAuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await businessStatsApi.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardStats} />;

  return (
    <div className="business-dashboard-page">
      <div className="page-header">
        <h1>대시보드</h1>
        <p>안녕하세요, {businessInfo?.name || "사업자"}님</p>
      </div>

      <BusinessStatsCards stats={stats} />
      <BusinessRecentTable bookings={stats?.recentBookings || []} />

      <div className="quick-actions">
        <div className="action-card">
          <h3>호텔 관리</h3>
          <p>호텔 정보 수정 및 객실 관리</p>
          <Link to="/business/settings" className="btn-outline">
            바로가기
          </Link>
        </div>

        <div className="action-card">
          <h3>매출 통계</h3>
          <p>상세한 매출 분석 및 리포트</p>
          <Link to="/business/statistics" className="btn-outline">
            바로가기
          </Link>
        </div>

        <div className="action-card">
          <h3>리뷰 관리</h3>
          <p>고객 리뷰 확인 및 관리</p>
          <Link to="/business/reviews" className="btn-outline">
            바로가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardPage;
