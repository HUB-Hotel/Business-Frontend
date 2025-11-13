import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useHotel } from '../../context/HotelContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import './Hotels.scss'

const HotelEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentHotel, getHotel, updateHotel } = useHotel()

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
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const loadHotel = async () => {
      const result = await getHotel(id)
      if (result.success) {
        setFormData({
          name: result.data.name || '',
          description: result.data.description || '',
          address: result.data.address || '',
          city: result.data.city || '',
          country: result.data.country || 'South Korea',
          phone: result.data.phone || '',
          email: result.data.email || '',
          website: result.data.website || '',
          checkInTime: result.data.checkInTime || '15:00',
          checkOutTime: result.data.checkOutTime || '11:00',
        })
      }
      setFetching(false)
    }

    loadHotel()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await updateHotel(id, formData)

    if (result.success) {
      alert('호텔 정보가 성공적으로 수정되었습니다')
      navigate('/hotels')
    } else {
      alert(result.error || '호텔 수정에 실패했습니다')
    }

    setLoading(false)
  }

  if (fetching) {
    return (
      <div className="container">
        <div className="loading">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="hotel-form-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>호텔 정보 수정</h1>
            <p>호텔 정보를 수정합니다</p>
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
                수정 완료
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default HotelEdit
