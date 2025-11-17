const BusinessFooter = () => {
  return (
    <footer className="business-footer">
      <div className="container">
        <div className="business-footer__inner">
          <div className="business-footer__section">
            <h4>Hotelhub Business</h4>
            <p>
              호텔 사업자를 위한 통합 관리 플랫폼입니다. 예약, 객실, 매출을
              한눈에 관리하세요.
            </p>
          </div>

          <div className="business-footer__section">
            <h4>빠른 링크</h4>
            <a href="/business/dashboard">대시보드</a>
            <a href="/business/rooms">객실 관리</a>
            <a href="/business/statistics">매출 통계</a>
            <a href="/business/reviews">리뷰 관리</a>
          </div>

          <div className="business-footer__section">
            <h4>고객 지원</h4>
            <a href="#">FAQ</a>
            <a href="#">이용 가이드</a>
            <a href="#">문의하기</a>
            <a href="#">기술 지원</a>
          </div>

          <div className="business-footer__section">
            <h4>연락처</h4>
            <p>이메일: support@hotelhub.com</p>
            <p>전화: 1588-0000</p>
            <p>운영시간: 평일 09:00 - 18:00</p>
          </div>
        </div>

        <div className="business-footer__bottom">
          <p>&copy; 2025 Hotelhub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default BusinessFooter;
