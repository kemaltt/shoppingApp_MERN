import React from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent, CardMedia, Typography, Card, IconButton, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../redux/favorite/favorite-api";
import { useSelector, shallowEqual } from "react-redux";
import { useDeleteProductMutation } from "../../redux/product/product-api";




export default function ProductCard({ product, i, id, cart }) {
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const navigate = useNavigate();
  const { token, favorite } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token,
  }), shallowEqual);
  const { user } = useSelector((state) => state.user);

  const productDetail = () => {
    // fetchSingleProduct(dispatch, id, token);
    navigate(`/product/${id}`);
  };
  const delFav = async () => {
    if (token) {
      await deleteFavorite({ id, token });
    }
  }
  const addFav = async () => {
    if (token) {
      await addFavorite({ token, id });
    }
  }

  const delProduct = async () => {
    if (token) {
      await deleteProduct({ id, token });
    }
  }

  return (
    <>

      <Card sx={{ maxWidth: 350, }}>
        <CardMedia
          onClick={productDetail}
          component="img"
          sx={{ objectFit: 'contain', width: '100%', height: '400px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
          image={product.image}
          title={product.name}
        />
        <CardContent sx={{ height: '120px' }} >
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant='h6' color="text.secondary">
            {product.category}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Box>
            {favorite.some(el => el._id === id) ?
              <IconButton onClick={delFav} aria-label="add to favorites" >
                <FavoriteIcon color='warning' />
              </IconButton>
              :
              <IconButton onClick={addFav} aria-label="add to favorites" >
                <FavoriteIcon />
              </IconButton>
            }

            {user?.user?.role === 'admin' &&
              <IconButton onClick={delProduct} aria-label="add to favorites" >
                <DeleteIcon color='error' />
              </IconButton>
            }
          </Box>

          <Typography fontWeight='bold' color="text.secondary">
            {product.price}€
          </Typography>
        </CardActions>
      </Card>
    </>

  );
}
