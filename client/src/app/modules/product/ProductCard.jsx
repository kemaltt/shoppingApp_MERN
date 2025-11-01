import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CardActions, CardContent, CardMedia, Typography, Card, IconButton, Box, Tooltip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../../redux/favorite/favorite-api";
import { useSelector, shallowEqual } from "react-redux";
import ProductDeleteDialog from "./product-dialog/ProductDeleteDialog";
import ProductEditDialog from "./product-dialog/ProductEditDialog";




export default function ProductCard({ product, id }) {

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const { t } = useTranslation();
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
      await deleteFavorite(id);
    }
  }
  const addFav = async () => {
    if (token) {
      await addFavorite(id);
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
          image={product.images.length ? product?.images[0]?.url : product?.image}
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
              <Tooltip placement="top" title={t('products.removeFromFavorites')}>
                <IconButton onClick={isAuthenticated ? delFav : login} aria-label="add to favorites" >
                  <FavoriteIcon color='warning' />
                </IconButton>
              </Tooltip>
              :
              <Tooltip placement="top" title={t('products.addToFavorites')}>
                <IconButton onClick={isAuthenticated ? addFav : login} aria-label="add to favorites" >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            }

            {user?.user?.role === 'admin' &&
              <>
                <Tooltip placement="top" title={t('common.delete')}>
                  <IconButton onClick={() => setOpenDelete(true)} aria-label="delete from card" >
                    <DeleteIcon color='error' />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="top" title={t('common.edit')}>
                  <IconButton onClick={() => setOpenEdit(true)} aria-label="edit" >
                    <EditIcon color='primary' />
                  </IconButton>
                </Tooltip>
              </>
            }
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', fontStyle: 'italic' }}>
            <Typography color={product.countInStock === 0 ? "error" : product.countInStock <= 3 ? "warning" : "secondary"}>
              {product.countInStock === 0 ? t('products.outOfStock') : `${t('products.inStock')} ${product.countInStock}`}
            </Typography>
            <Typography fontWeight='bold' color="text.secondary">
              {product.price}€
            </Typography>
          </Box>
        </CardActions>
      </Card>

      {openDelete && <ProductDeleteDialog type={'product'} open={openDelete} setOpen={setOpenDelete} productId={id} token={token} />}
      {openEdit && <ProductEditDialog open={openEdit} setOpen={setOpenEdit} productId={id} token={token} />}
    </>

  );
}
