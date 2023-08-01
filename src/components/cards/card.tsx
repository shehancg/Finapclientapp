// components/Card.js

import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import "./card.sass"
import { Link } from "react-router-dom";

interface CustomCardProps {
  title: string;
  imageSrc: string;
  linkTo: string; // Add a new prop to store the target URL
}

const CustomCard: React.FC<CustomCardProps> = ({ title, imageSrc, linkTo }) => {
  return (
    <Card className="custom-card">
      <Link to={linkTo}>
        <div className="d-flex">
          <CardImg className="custom-card-image" src={imageSrc} alt="Card image cap" />
          <CardBody className="flex-grow-1">
            <CardTitle>{title}</CardTitle>
          </CardBody>
        </div>
      </Link>
    </Card>
  );
};

export default CustomCard;
