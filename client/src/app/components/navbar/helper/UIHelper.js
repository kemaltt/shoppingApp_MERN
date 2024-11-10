import { Badge, styled } from "@mui/material";



export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 5,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '1rem',
  },
}));

export const StyledIcon={
  color:'white',
  fontSize:30
}