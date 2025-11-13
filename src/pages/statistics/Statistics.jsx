import { useState } from 'react'
import Card from '../../components/common/Card'
import './Statistics.scss'

const Statistics = () => {
  const [stats] = useState({
    today: {
      bookings: 12,
      revenue: 4560000,
      cancellations: 2,
    },
    thisMonth: {
      bookings: 234,
      revenue: 78920000,
      cancellations: 15,
    },
    thisYear: {
      bookings: 2456,
      revenue: 892340000,
      cancellations: 124,
    },
  })

  const [topHotels] = useState([
    { name: '그랜드 서울 호텔', bookings: 856, revenue: 342400000 },
    { name: '제주 리조트', bookings: 742, revenue: 296800000 },
    { name: '부산 비치 호텔', bookings: 658, revenue: 263200000 },
  ])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount)
  }

  return (
    <div className="statistics">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>매출 통계</h1>
            <p>호텔 예약 및 매출 통계를 확인합니다</p>
          </div>
        </div>

        <div className="stats-grid">
          <Card title="오늘">
            <div className="stat-item">
              <span className="stat-item__label">예약 수</span>
              <span className="stat-item__value">{stats.today.bookings}건</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">매출</span>
              <span className="stat-item__value">
                {formatCurrency(stats.today.revenue)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">취소</span>
              <span className="stat-item__value">{stats.today.cancellations}건</span>
            </div>
          </Card>

          <Card title="이번 달">
            <div className="stat-item">
              <span className="stat-item__label">예약 수</span>
              <span className="stat-item__value">{stats.thisMonth.bookings}건</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">매출</span>
              <span className="stat-item__value">
                {formatCurrency(stats.thisMonth.revenue)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">취소</span>
              <span className="stat-item__value">
                {stats.thisMonth.cancellations}건
              </span>
            </div>
          </Card>

          <Card title="올해">
            <div className="stat-item">
              <span className="stat-item__label">예약 수</span>
              <span className="stat-item__value">{stats.thisYear.bookings}건</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">매출</span>
              <span className="stat-item__value">
                {formatCurrency(stats.thisYear.revenue)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__label">취소</span>
              <span className="stat-item__value">
                {stats.thisYear.cancellations}건
              </span>
            </div>
          </Card>
        </div>

        <Card title="호텔별 매출 순위">
          <div className="ranking-table">
            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>호텔명</th>
                  <th>예약 수</th>
                  <th>총 매출</th>
                </tr>
              </thead>
              <tbody>
                {topHotels.map((hotel, index) => (
                  <tr key={index}>
                    <td className="rank">
                      <span className={`rank-badge rank-badge--${index + 1}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td>{hotel.name}</td>
                    <td>{hotel.bookings}건</td>
                    <td>{formatCurrency(hotel.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Statistics
