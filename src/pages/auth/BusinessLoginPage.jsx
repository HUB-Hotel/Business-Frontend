import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BusinessAuthContext } from "../../context/BusinessAuthContext";

const BusinessLoginPage = () => {
  const { login } = useContext(BusinessAuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/business/dashboard");
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1>사업자 로그인</h1>
          <p>Hotelhub Business 계정으로 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="business@hotel.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="form-group">
              <div className="error">{error}</div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="auth-page__footer">
          <p>
            <Link to="/business/forgot-password">비밀번호를 잊으셨나요?</Link>
          </p>
          <p>
            계정이 없으신가요?{" "}
            <Link to="/business/signup">회원가입</Link>
          </p>
        </div>

        <div style={{ marginTop: "1rem", padding: "1rem", background: "#f0f0f0", borderRadius: "8px", fontSize: "0.875rem" }}>
          <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>테스트 계정:</p>
          <p>이메일: business@hotel.com</p>
          <p>비밀번호: business1234</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoginPage;
