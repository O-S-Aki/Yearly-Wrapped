import { Navigate } from "react-router-dom";

const RedirectToCurrentYear = () => {
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();

  return <Navigate to={`/year/${year}`} replace />;
}

export default RedirectToCurrentYear;