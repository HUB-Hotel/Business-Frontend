import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { businessBookingApi } from "../../api/businessBookingApi";
import BusinessBookingDetail from "../../components/business/bookings/BusinessBookingDetail";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessBookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const data = await businessBookingApi.getBookingById(id);
      setBooking(data);
    } catch (err) {
      setError(err.message || "예약 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      await businessBookingApi.updateBookingStatus(bookingId, status);
      fetchBooking();
    } catch (err) {
      alert("상태 변경에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBooking} />;

  return (
    <div className="business-booking-detail-page">
      <div className="page-header">
        <h1>예약 상세</h1>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </div>

      <div className="card">
        <BusinessBookingDetail booking={booking} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default BusinessBookingDetailPage;
