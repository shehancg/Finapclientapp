// Router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//page imports
import HomePage from "../pages/home/homePage";
import CommonPage from "../pages/common/common";

//component imports
import StudentRegistration from "../components/student/studentRegistration";
import Classrooms from "../components/classroom/addClass";

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
                <CommonPage>
                  <StudentRegistration/>
                </CommonPage>
              </HomePageLayout>
            }
          />
          <Route
            path="/page2"
            element={
              <HomePageLayout>
                <CommonPage>
                  <Classrooms/>
                </CommonPage>
              </HomePageLayout>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </Router>
    );
  };

export default AppRouter;
