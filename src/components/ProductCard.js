import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const { name, category, cost, rating, image, id } = product;

  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="100"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         ${cost}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
      <Button fullWidth variant="contained"  
  type="submit" onClick = {()=>handleAddToCart(product)}>
           <AddShoppingCartOutlined />&nbsp;
            ADD TO CART
           </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
