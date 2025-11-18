import { useNavigate } from "react-router-dom";
import { businessRoomApi } from "../../api/businessRoomApi";
import BusinessRoomForm from "../../components/business/rooms/BusinessRoomForm";

const BusinessRoomCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await businessRoomApi.createRoom(data);
      alert("객실이 등록되었습니다.");
      navigate("/business/rooms");
    } catch (err) {
      alert("객실 등록에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/business/rooms");
  };

  return (
    <div className="business-room-create-page">
      <div className="page-header">
        <h1>객실 등록</h1>
      </div>

      <div className="card">
        <BusinessRoomForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default BusinessRoomCreatePage;
