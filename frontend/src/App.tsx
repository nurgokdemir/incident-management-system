// import { Routes, Route } from "react-router-dom";
// import IncidentDashboard from "./features/incidents/components/IncidentDashboard";
// import IncidentDetailPage from "./features/incidents/components/IncidentDetailPage";


// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<IncidentDashboard isDarkMode={false} setIsDarkMode={function (value: boolean): void {
//         throw new Error("Function not implemented.");
//       } } />} />
//       <Route path="/incidents/:id" element={<IncidentDetailPage />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import IncidentDashboard from "./features/incidents/components/IncidentDashboard";
import IncidentDetailPage from "./features/incidents/components/IncidentDetailPage";
import AppLayout from "./features/incidents/components/layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<IncidentDashboard isDarkMode={false} setIsDarkMode={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/incidents/:id" element={<IncidentDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;