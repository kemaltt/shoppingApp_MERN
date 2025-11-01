import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { Alert, Button, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useAddProductMutation } from '../../../../redux/product/product-api';
import SaveIcon from '@mui/icons-material/Save';
import { CATEGORIES_OPTION } from '../../../helpers/UIHelper';
import UploadIcon from '@mui/icons-material/Upload';
import LoadingButton from '@mui/lab/LoadingButton';




export default function ProductAddDialog({ open, setOpen, getProducts }) {

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
    setImagePreviews([]);
    reset();
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const { token } = useSelector((state) => state.user);

  const [addProduct, { isLoading, error, isError }] = useAddProductMutation()
  // const [uploadImages] = useUploadImagesMutation()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Yeni dosyaları filtrele (Daha önce seçilmiş olanları çıkar)
    const newFiles = files.filter(
      (file) => !selectedImages.some((selected) => selected.name === file.name)
    );

    if (newFiles.length + selectedImages.length > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }

    if (newFiles.length < files.length) {
      alert('Some images were already added and skipped.');
    }

    // Yeni dosyaları state'e ekle
    setSelectedImages((prev) => [...prev, ...newFiles]);
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const saveProduct = async (value) => {

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('productImages', image);
    });

    // Diğer input alanlarını formData'ya ekliyoruz
    const { countInStock, price, ...rest } = value;
    Object.entries(rest).forEach(([key, val]) => {
      formData.append(key, val);
    });

    // Numeric alanları dönüştürüp ekliyoruz
    if (countInStock) {
      formData.append("countInStock", +countInStock);
    }
    if (price) {
      formData.append("price", +price);
    }


    await addProduct(formData).unwrap();

    if (!isError) {
      await getProducts();
      setOpen(false);
      reset();
    }



    // const imageDetails = selectedImages.map((image) => ({
    //   url: URL.createObjectURL(image),
    //   name: image.name,
    //   type: image.type,
    //   size: image.size,
    // }));

    // const { countInStock, price, ...rest } = value;
    // if (countInStock && price) {
    //   const data = {
    //     ...rest,
    //     countInStock: +countInStock,
    //     price: +price,
    //   }
    //   await addProduct(data).unwrap();

    //   await getProducts()
    // }

  };


  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

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
                    message: "Title must be between 2 and 25 characters",
                  },
                })}
              />
              {errors.name &&
                <Alert variant="outlined" severity="error">
                  {errors.name.message}
                </Alert>
              }

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
                    message: "Description must be between 2 and 500 characters",
                  },
                })}
              />
              {errors.description &&
                <Alert variant="outlined" severity="error">
                  {errors.description.message}
                </Alert>
              }


              <TextField
                type='text'
                id="image"
                name="image"
                label="Product image URL"
                // autoFocus
                // color="secondary"
                {...register("image", {
                  pattern: {
                    value: /^.{2,700}$/,
                    message: "Name must be between 2 and 700 characters",
                  },
                })}
              />
              <FormControl >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  name='category'
                  defaultValue="" // Boş bir başlangıç değeri
                  {...register("category", {
                    required: true,
                  })}
                >
                  {CATEGORIES_OPTION.map((el, i) => (
                    <MenuItem key={i} value={el.value}>{el.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>



              {/* Display Image Previews */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {imagePreviews.map((preview, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img src={preview} alt={`preview-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                    <IconButton
                      onClick={() => removeImage(index)}
                      sx={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'white', color: 'red' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              {/* Image Upload Section */}
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </Button>
              {isError && <Alert severity="error">{error.data.message}</Alert>}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" size="small" onClick={handleClose} color="primary">
              Close
            </Button>
            {/* <Btn onSubmit={saveProduct} disabled={isLoading} isLoading={isLoading} title={'Add Product'} /> */}
            <LoadingButton
              size="small"
              type="submit"
              endIcon={<SaveIcon />}
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="end"
              variant="outlined"
              color="success"
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
