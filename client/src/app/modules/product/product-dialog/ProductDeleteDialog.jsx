import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDeleteProductMutation } from '../../../../redux/product/product-api';


export default function ProductDeleteDialog({ open, setOpen, setRows, rows, productId, token }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const delProduct = async () => {
    // setRows(rows.filter((row) => row.id !== productId));
    if (token && productId) {
      await deleteProduct({ id: productId, token });
    }
    setOpen(false);
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth='xs'
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          setOpen(false);
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Delete Product
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

      <DialogContent dividers>
        <Alert severity="error">Are you sure you want to delete this {productId} product?</Alert>
      </DialogContent>
      <DialogActions>
        {/* <Button variant={'error'} onClick={delProduct} disabled={isLoading} isLoading={isLoading} title={'Delete Product'} /> */}

        {/* <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={delProduct} disabled={isLoading} >
          Delete
        </Button> */}

        <LoadingButton
          size="small"
          onClick={delProduct}
          endIcon={<DeleteIcon />}
          loading={isLoading}
          disabled={isLoading}
          loadingPosition="end"
          variant="outlined"
          color='error'
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}