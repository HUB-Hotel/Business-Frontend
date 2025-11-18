import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { businessReviewApi } from "../../api/businessReviewApi";
import BusinessReviewDetail from "../../components/business/reviews/BusinessReviewDetail";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BusinessReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      setLoading(true);
      const data = await businessReviewApi.getReviewById(id);
      setReview(data);
    } catch (err) {
      setError(err.message || "리뷰 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (reviewId, reply) => {
    try {
      await businessReviewApi.replyToReview(reviewId, reply);
      alert("답변이 등록되었습니다.");
      fetchReview();
    } catch (err) {
      alert("답변 등록에 실패했습니다.");
    }
  };

  const handleReport = async (reviewId) => {
    if (window.confirm("이 리뷰를 신고하시겠습니까?")) {
      try {
        await businessReviewApi.reportReview(reviewId, "부적절한 내용");
        alert("리뷰가 신고되었습니다.");
        fetchReview();
      } catch (err) {
        alert("신고에 실패했습니다.");
      }
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchReview} />;

  return (
    <div className="business-review-detail-page">
      <div className="page-header">
        <h1>리뷰 상세</h1>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          목록으로
        </button>
      </div>

      <div className="card">
        <BusinessReviewDetail
          review={review}
          onReply={handleReply}
          onReport={handleReport}
        />
      </div>
    </div>
  );
};

export default BusinessReviewDetailPage;
