import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { GridToolbarContainer, GridRowModes } from "@mui/x-data-grid";



export function EditToolbar({ setRows, setRowModesModel, rows, setRowSelection, rowSelection }) {

  const handleClick = () => {
    const id = Math.max(0, ...rows.map((row) => row.id)) + 1;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
        Add row
      </Button>
      <Button color="secondary" startIcon={<CheckBoxOutlinedIcon/>} onClick={() => setRowSelection(!rowSelection)}>
       Row selection
      </Button>
    </GridToolbarContainer>
  );
}