import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../../context/HotelContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import './Hotels.scss'

const HotelList = () => {
  const { hotels, getHotels, deleteHotel, loading } = useHotel()

  useEffect(() => {
    getHotels()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 호텔을 삭제하시겠습니까?')) {
      await deleteHotel(id)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="hotels-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>호텔 관리</h1>
            <p>등록된 호텔 목록을 관리합니다</p>
          </div>
          <Link to="/hotels/create">
            <Button variant="primary">새 호텔 등록</Button>
          </Link>
        </div>

        {hotels.length === 0 ? (
          <Card>
            <div className="empty-state">
              <h3>등록된 호텔이 없습니다</h3>
              <p>첫 번째 호텔을 등록해보세요</p>
              <Link to="/hotels/create">
                <Button variant="primary">호텔 등록하기</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <Card key={hotel._id} className="hotel-card">
                <div className="hotel-card__image">
                  <img
                    src={hotel.images?.[0] || '/placeholder-hotel.jpg'}
                    alt={hotel.name}
                  />
                </div>
                <div className="hotel-card__content">
                  <h3>{hotel.name}</h3>
                  <p className="hotel-card__location">{hotel.location}</p>
                  <p className="hotel-card__description">
                    {hotel.description?.substring(0, 100)}
                    {hotel.description?.length > 100 ? '...' : ''}
                  </p>
                  <div className="hotel-card__stats">
                    <span>객실 {hotel.roomCount || 0}개</span>
                    <span>리뷰 {hotel.reviewCount || 0}개</span>
                  </div>
                </div>
                <div className="hotel-card__actions">
                  <Link to={`/hotels/edit/${hotel._id}`}>
                    <Button variant="secondary" size="small">
                      수정
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(hotel._id)}
                  >
                    삭제
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelList
