// pages/HomePage.tsx

import React from "react";
import CustomNavbar from "../../components/navbar/navbar";
import StudentRegistration from "../../components/student/studentRegistration";
import HomePageLayout from "../../layouts/homePage/homePageLayout"; 

const StudentRegPage: React.FC = () => {
  return (
    <HomePageLayout>
      <CustomNavbar />
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          {/* Other content */}
          <StudentRegistration />
        </div>
      </div>
    </HomePageLayout>
  );
};

export default StudentRegPage;
