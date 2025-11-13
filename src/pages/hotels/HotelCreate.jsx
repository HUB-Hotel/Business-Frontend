import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotel } from '../../context/HotelContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import './Hotels.scss'

const HotelCreate = () => {
  const navigate = useNavigate()
  const { createHotel } = useHotel()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    country: 'South Korea',
    phone: '',
    email: '',
    website: '',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    amenities: [],
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await createHotel(formData)

    if (result.success) {
      alert('호텔이 성공적으로 등록되었습니다')
      navigate('/hotels')
    } else {
      alert(result.error || '호텔 등록에 실패했습니다')
    }

    setLoading(false)
  }

  return (
    <div className="hotel-form-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>새 호텔 등록</h1>
            <p>호텔 정보를 입력하여 등록합니다</p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="hotel-form">
            <div className="form-section">
              <h3>기본 정보</h3>
              <div className="form-grid">
                <Input
                  label="호텔명"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="그랜드 서울 호텔"
                  required
                  fullWidth
                />

                <Input
                  label="전화번호"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="02-0000-0000"
                  required
                  fullWidth
                />

                <Input
                  label="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@hotel.com"
                  required
                  fullWidth
                />

                <Input
                  label="웹사이트"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://hotel.com"
                  fullWidth
                />
              </div>

              <div className="form-full">
                <label htmlFor="description" className="input__label">
                  호텔 설명 <span className="input__required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input"
                  rows="5"
                  placeholder="호텔에 대한 상세한 설명을 입력하세요"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>위치 정보</h3>
              <div className="form-grid">
                <Input
                  label="주소"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="서울시 강남구 테헤란로 123"
                  required
                  fullWidth
                />

                <Input
                  label="도시"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="서울"
                  required
                  fullWidth
                />

                <Input
                  label="국가"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
            </div>

            <div className="form-section">
              <h3>운영 정보</h3>
              <div className="form-grid">
                <Input
                  label="체크인 시간"
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleChange}
                  required
                  fullWidth
                />

                <Input
                  label="체크아웃 시간"
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/hotels')}
              >
                취소
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                호텔 등록
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default HotelCreate
