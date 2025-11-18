import { useState, useEffect } from "react";

const BusinessRoomForm = ({ room, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "standard",
    price: "",
    maxGuests: "",
    quantity: "",
    description: "",
    amenities: [],
    status: "available",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || "",
        type: room.type || "standard",
        price: room.price || "",
        maxGuests: room.maxGuests || "",
        quantity: room.quantity || "",
        description: room.description || "",
        amenities: room.amenities || [],
        status: room.status || "available",
      });
    }
  }, [room]);

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
      <div className="form-group">
        <label>객실명</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>타입</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="standard">스탠다드</option>
          <option value="deluxe">디럭스</option>
          <option value="suite">스위트</option>
        </select>
      </div>

      <div className="form-group">
        <label>가격 (1박)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>최대 인원</label>
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>객실 수량</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>상태</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">판매중</option>
          <option value="unavailable">판매중지</option>
          <option value="maintenance">정비중</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="btn btn-primary">
          {room ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default BusinessRoomForm;
