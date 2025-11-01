import React, { useState } from 'react'
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { shallowEqual, useSelector } from 'react-redux';
import { useEditProductMutation } from '../../../../redux/product/product-api';
import { categories } from '../../../helpers/UIHelper';
import ProductDeleteDialog from '../product-dialog/ProductDeleteDialog';





export default function ProductTable({ isLoading }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const [editProduct] = useEditProductMutation()

  const { token, products } = useSelector((state) => ({
    products: state.products.products,
    token: state.user.token,
  }), shallowEqual);

  const [rows, setRows] = useState(products);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rowSelection, setRowSelection] = useState(true);

  console.log(setRowSelection);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setOpen(true);
    setProductId(id);
  };


  // const delProduct = async () => {
  //   setRows(rows.filter((row) => row.id !== productId));
  //   if (token && productId) {
  //     await deleteProduct({ id: productId, token });
  //   }
  //   setOpen(false);
  // };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const updatedRow = { ...newRow, isNew: false };
    const id = updatedRow._id;

    if (token && newRow) {
      await editProduct({ id, data: updatedRow });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // {
    //   field: '_id',
    //   headerName: 'ID',
    //   width: 120,
    //   editable: false,
    //   headerAlign: 'center',
    //   cellClassName: 'text-center',
    // },
    {
      field: 'name',
      headerName: t('productTable.name'),
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          sx={{
            '& img': {
              width: '50px',
              height: '50px',
              objectFit: 'contain',
              borderRadius: '5px',
              marginRight: '10px',
              flexShrink: 0,
            },
          }}
        >
          <img
            src={params?.row?.images[0]?.url || params?.row?.image}
            alt={params.row.name}
          />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {params.row.name}
          </span>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: t('productTable.price'),
      type: 'number',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'countInStock',
      headerName: t('productTable.quantity'),
      type: 'number',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: t('productTable.createdDate'),
      type: 'date',
      width: 180,
      editable: true,
      headerAlign: 'center',
      cellClassName: 'text-center',
      valueGetter: (cell) => {
        return cell ? new Date(cell) : null;
      },

    },
    {
      field: 'updatedAt',
      headerName: t('productTable.updatedDate'),
      type: 'date',
      width: 180,
      editable: true,
      headerAlign: 'center',
      cellClassName: 'text-center',
      valueGetter: (cell) => {
        return cell ? new Date(cell) : null;
      },
    },
    {
      field: 'category',
      headerName: t('productTable.category'),
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: categories.filter(category => category !== 'All'),
    },
    {
      field: 'actions',
  type: 'actions',
  headerName: t('productTable.actions'),
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label={t('common.save')}
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label={t('common.cancel')}
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label={t('common.edit')}
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label={t('common.delete')}
            onClick={handleDeleteClick(id)}
            color="inherit"
            sx={{ ":hover": { color: 'error.main' } }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id} // Benzersiz id'yi burada belirtiyoruz
          rows={products}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{ toolbar: EditToolbar }}
          // slotProps={{
          //   toolbar: { rows, setRows, setRowModesModel, setRowSelection, rowSelection },
          // }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ '--DataGrid-overlayHeight': '300px' }}
          loading={isLoading}
          rowSelection={rowSelection}
          checkboxSelection={rowSelection}
          disableRowSelectionOnClick

        />

      </Box>
      <ProductDeleteDialog type={'product'} open={open} setOpen={setOpen} setRows={setRows} rows={rows} productId={productId} token={token} />

    </>
  );
}



const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}));

function CustomNoRowsOverlay() {
  const { t } = useTranslation();
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>{t('productTable.noProductsMessage')}</Box>
    </StyledGridOverlay>
  );
}

