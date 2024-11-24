import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useAddProductMutation } from '../../../../redux/product/product-api';
import Button from '../../../components/Button';




export default function ProductAddDialog({ open, setOpen, getProducts }) {


  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit } = useForm();
  // const { token } = useSelector((state) => state.user);

  const [addProduct, {  isLoading, status }] = useAddProductMutation()

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'jewelery', label: 'Jewelery' },
    { value: 'men\'s clothing', label: 'Men\'s Clothing' },
    { value: 'women\'s clothing', label: 'Women\'s Clothing' }
  ];

  const handleClick = async (value) => {
    const { countInStock, price, ...rest } = value;
    if (countInStock && price) {
      const data = {
        ...rest,
        countInStock: +countInStock,
        price: +price
      }
      await addProduct(data);
    }
    setOpen(false);
  };

  useEffect(() => {

    if (status === 'fulfilled') {

      const getProduct = async () => {
        await getProducts()
      }
      getProduct()
    }
  }, [status, getProducts])


  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='lg'
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          onSubmit={handleSubmit(handleClick)}
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
                  defaultValue="" // Boş bir başlangıç değeri
                  {...register("category", {
                    required: true,
                  })}
                >
                  {categories.map((el, i) => (
                    <MenuItem key={i} value={el.value}>{el.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Box>
          </DialogContent>
          <DialogActions>
            <Button onSubmit={handleClick} disabled={isLoading} isLoading={isLoading} title={'Add Product'} />

          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
