// components/Card.js

import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

// Define the prop types for CustomCard component
type CustomCardProps = {
  title: string;
  imageSrc: string;
};

const CustomCard: React.FC<CustomCardProps> = ({ title, imageSrc }) => {
  return (
    <Card>
      <CardImg top width="50%" src={imageSrc} alt="Card image cap" />
      <CardBody>
        <CardTitle>{title}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
