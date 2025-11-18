import { useState, useEffect } from "react";
import { businessHotelApi } from "../../api/businessHotelApi";
import BusinessHotelSettingsForm from "../../components/business/settings/BusinessHotelSettingsForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessSettingsPage = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      setLoading(true);
      const data = await businessHotelApi.getMyHotel();
      setHotel(data);
    } catch (err) {
      setError(err.message || "호텔 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await businessHotelApi.updateHotel(data);
      alert("호텔 정보가 저장되었습니다.");
      fetchHotel();
    } catch (err) {
      alert("저장에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchHotel} />;

  return (
    <div className="business-settings-page">
      <div className="page-header">
        <h1>호텔 설정</h1>
      </div>

      <div className="card">
        <BusinessHotelSettingsForm hotel={hotel} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default BusinessSettingsPage;
