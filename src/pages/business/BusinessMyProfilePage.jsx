import { useState, useEffect } from "react";
import { businessAuthApi } from "../../api/businessAuthApi";
import BusinessProfileForm from "../../components/business/settings/BusinessProfileForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessMyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await businessAuthApi.getMyInfo();
      setProfile(data);
    } catch (err) {
      setError(err.message || "프로필 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await businessAuthApi.updateProfile(data);
      alert("프로필이 저장되었습니다.");
      fetchProfile();
    } catch (err) {
      alert("저장에 실패했습니다.");
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProfile} />;

  return (
    <div className="business-my-profile-page">
      <div className="page-header">
        <h1>내 프로필</h1>
      </div>

      <div className="card">
        <BusinessProfileForm profile={profile} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default BusinessMyProfilePage;
