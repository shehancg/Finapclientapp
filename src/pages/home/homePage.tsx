import React from "react";
import CustomNavbar from "../../components/navbar/navbar";
import CustomCard from "../../components/cards/card";
import HomePageLayout from "../../layouts/homePage/homePageLayout"; 

const HomePage: React.FC = () => {
    return (
      <HomePageLayout> {/* Wrap the contents with HomePageLayout */}
        <CustomNavbar />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <CustomCard
                title="Card 1"
                imageSrc="https://via.placeholder.com/150"
              />
              <CustomCard
                title="Card 1"
                imageSrc="https://via.placeholder.com/150"
              />
              <CustomCard
                title="Card 1"
                imageSrc="https://via.placeholder.com/150"
              />
            </div>
            {/* Add more cards here */}
          </div>
        </div>
      </HomePageLayout>
    );
  };

export default HomePage;
