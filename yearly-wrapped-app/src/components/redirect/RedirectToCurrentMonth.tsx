import { Navigate } from "react-router-dom";

const RedirectToCurrentMonth = () => {
  const currentDate: Date = new Date();

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1

  return <Navigate to={`/year/${year}/month/${month}`} replace />;
}

export default RedirectToCurrentMonth;