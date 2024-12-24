import React, { useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEditProductMutation, useGetProductByIdQuery } from '../../../../redux/product/product-api';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Textarea from '@mui/joy/Textarea';
import { CATEGORIES_OPTION } from '../../../helpers/UIHelper';
import { useForm } from 'react-hook-form';


export default function ProductEditDialog({ open, setOpen, productId, token }) {
  const [editProduct, { isLoading }] = useEditProductMutation()
  useGetProductByIdQuery({ id: productId, token }, { skip: !token });
  const { product } = useSelector((state) => state.products);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: product
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        countInStock: product.countInStock,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category || '',
      });
    }
  }, [product, reset, open]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const saveProduct = async (value) => {
    const data = {
      ...product,
      ...value
    }

    if (token && value) {
      await editProduct({ id: productId, token, data });
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   if (status === 'fulfilled') {
  //     toast.success('Product updated successfully');
  //   }
  //   if (isError) {
  //     toast.error('Product update failed. Please try again.');
  //   }
  // }, [status, isError]);

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={'md'}
      fullWidth
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Product Edit
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <form
        component="form"
        // sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(saveProduct)}
      >
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem", gap: '15px', width: '100%', marginTop: '2vh' }} >
            <TextField
              required
              type='text'
              id="name"
              name="name"
              label="Product Title"
              // autoFocus
              // color="secondary"
              {...register("name", {
                required: true,
                pattern: {
                  value: /^.{2,25}$/,
                  message: "Name must be between 2 and 25 characters",
                },
              })}
            />
            <Row >
              <Col lg='6' >
                <TextField
                  required
                  id="outlined-number"
                  label="Quantity"
                  type="number"
                  name='countInStock'
                  fullWidth
                  inputProps={{
                    min: 0, // Minimum değer
                  }}
                  {...register("countInStock", {
                    required: true,
                  })}
                />
              </Col>
              <Col lg='6' >
                <TextField
                  required
                  id="outlined-number"
                  label="Price"
                  type="number"
                  name='price'
                  fullWidth
                  inputProps={{
                    min: 0, // Minimum değer
                  }}
                  {...register("price", {
                    required: true,
                  })}
                />
              </Col>
            </Row>
            <Textarea
              required
              minRows={5}
              sx={{ borderStyle: 'solid', borderColor: 'gray', borderRadius: '5px', borderWidth: '1px' }}
              type="text"
              name="description"
              placeholder="Product Description"
              id="description"
              {...register("description", {
                required: true,
                pattern: {
                  value: /^.{2,500}$/,
                  message: "Name must be between 2 and 25 characters",
                },
              })}
            />


            <TextField
              required
              type='text'
              id="image"
              name="image"
              label="Product image URL"
              // autoFocus
              // color="secondary"
              {...register("image", {
                required: true,
                pattern: {
                  value: /^.{2,700}$/,
                  message: "Name must be between 2 and 25 characters",
                },
              })}
            />
            <FormControl >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                name='category'
                defaultValue={product?.category || ''}
                {...register("category", {
                  required: true,
                })}
              >
                {CATEGORIES_OPTION.map((el, i) => (
                  <MenuItem key={i} value={el.value}>{el.label}</MenuItem>
                ))}
              </Select>
            </FormControl>


          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' onClick={handleClose} color="primary">
            Close
          </Button>

          <LoadingButton
            size="small"
            onSubmit={saveProduct}
            type='submit'
            endIcon={<SaveIcon />}
            loading={isLoading}
            disabled={isLoading}
            loadingPosition="end"
            variant="outlined"
            color='success'
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>




    </Dialog>
  )
}
