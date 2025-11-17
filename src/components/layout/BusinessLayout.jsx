import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { BusinessAuthContext } from "../../context/BusinessAuthContext";
import BusinessHeader from "./BusinessHeader";
import BusinessFooter from "./BusinessFooter";
import "../../styles/index.scss";

const BusinessLayout = () => {
  const { businessInfo, loading } = useContext(BusinessAuthContext);

  if (loading) {
    return (
      <div className="business-layout">
        <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
          로딩 중...
        </div>
      </div>
    );
  }

  if (!businessInfo) {
    return <Navigate to="/business/login" replace />;
  }

  return (
    <div className="business-layout">
      <BusinessHeader />
      <main className="business-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <BusinessFooter />
    </div>
  );
};

export default BusinessLayout;
