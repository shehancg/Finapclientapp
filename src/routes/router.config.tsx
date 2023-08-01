// Router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/homePage";
import StudentRegPage from "../pages/student/studentReg";
import HomePageLayout from "../layouts/homePage/homePageLayout";

const AppRouter: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePageLayout>
                <HomePage />
              </HomePageLayout>
            }
          />
          <Route
            path="/page1"
            element={
              <HomePageLayout>
                <StudentRegPage />
              </HomePageLayout>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </Router>
    );
  };

export default AppRouter;
