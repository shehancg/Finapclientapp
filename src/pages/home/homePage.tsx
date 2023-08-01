import React from "react";
import CustomNavbar from "../../components/navbar/navbar";
import CustomCard from "../../components/cards/card";
import HomePageLayout from "../../layouts/homePage/homePageLayout"; 

const HomePage: React.FC = () => {
  const listItems = [
    {
      title: "Student Registration",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page1", // Define the target URL for Card 1
    },
    {
      title: "Add Classroom",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page2", // Define the target URL for Card 2
    },
    {
      title: "Teacher Registration",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page1", // Define the target URL for Card 1
    },
    {
      title: "Add Subject",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page2", // Define the target URL for Card 2
    },
    {
      title: "Allocate Subject",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page1", // Define the target URL for Card 1
    },
    {
      title: "Allocate Classroom",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page2", // Define the target URL for Card 2
    },
    {
      title: "Student Report",
      imageSrc: "https://via.placeholder.com/150",
      linkTo: "/page2", // Define the target URL for Card 2
    },
    // Add more card data with target URLs here
  ];

  return (
    <HomePageLayout>
      <CustomNavbar />
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          {listItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <CustomCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
