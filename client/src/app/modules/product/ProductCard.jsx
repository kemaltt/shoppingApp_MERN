import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent, CardMedia, Typography, Card, IconButton, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../../redux/favorite/favorite-api";
import { useSelector, shallowEqual } from "react-redux";
import ProductDeleteDialog from "./product-dialog/ProductDeleteDialog";




export default function ProductCard({ product, id }) {

    const [open, setOpen] = useState(false);
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  // const [deleteProduct] = useDeleteProductMutation()
  const navigate = useNavigate();
  const { token, favorite, user, isAuthenticated } = useSelector((state) => ({
    favorite: state.favorite.favorite,
    token: state.user.token,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated
  }), shallowEqual);

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

  // const delProduct = async () => {
  //   if (token) {
  //     await deleteProduct({ id, token });
  //   }
  // }

  const login = () => {
    navigate('/login')
  }

  return (
    <>

      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          onClick={productDetail}
          component="img"
          sx={{ objectFit: 'contain', width: '100%', height: '400px', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
          image={product.image}
          title={product.name}
        />
        <CardContent sx={{ height: '160px', marginBottom: '4px' }} >
          <Typography onClick={productDetail} gutterBottom variant="h6" component="div" sx={{ cursor: 'pointer' }} >
            {product.name}
          </Typography>
          <Typography variant='h6' color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant='p' color="text.secondary">
            Rating {[...Array(5)].map((star, i) => (
              <i
                key={i}
                style={{
                  fontSize: "1.5rem",
                  color: product?.rating >= i + 1 ? "orange" : "grey",
                }}
                className="las la-star"
              ></i>
            ))}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Box>

            {favorite.some(el => el._id === id) ?
              <IconButton onClick={isAuthenticated ? delFav : login} aria-label="add to favorites" >
                <FavoriteIcon color='warning' />
              </IconButton>
              :
              <IconButton onClick={isAuthenticated ? addFav : login} aria-label="add to favorites" >
                <FavoriteIcon />
              </IconButton>
            }

            {user?.user?.role === 'admin' &&
              <IconButton onClick={()=> setOpen(true)} aria-label="add to favorites" >
                <DeleteIcon color='error' />
              </IconButton>
            }
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', fontStyle: 'italic' }}>
            <Typography color="text.secondary">
              Stock  {product.countInStock}
            </Typography>
            <Typography fontWeight='bold' color="text.secondary">
              {product.price}€
            </Typography>
          </Box>
        </CardActions>
      </Card>

      <ProductDeleteDialog open={open} setOpen={setOpen}  productId={id} token={token} />
    </>

  );
}