import { useState, useEffect } from "react";

const BusinessHotelSettingsForm = ({ hotel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    checkInTime: "",
    checkOutTime: "",
    policies: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        description: hotel.description || "",
        address: hotel.address || "",
        phone: hotel.phone || "",
        email: hotel.email || "",
        checkInTime: hotel.checkInTime || "15:00",
        checkOutTime: hotel.checkOutTime || "11:00",
        policies: hotel.policies || "",
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h4>호텔 정보</h4>

      <div className="form-group">
        <label>호텔명</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>호텔 소개</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>주소</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>연락처</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <h4>운영 정보</h4>

      <div className="form-group">
        <label>체크인 시간</label>
        <input
          type="time"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>체크아웃 시간</label>
        <input
          type="time"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>이용 정책</label>
        <textarea
          name="policies"
          value={formData.policies}
          onChange={handleChange}
          rows={4}
          placeholder="호텔 이용 정책을 입력하세요..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>
    </form>
  );
};

export default BusinessHotelSettingsForm;
