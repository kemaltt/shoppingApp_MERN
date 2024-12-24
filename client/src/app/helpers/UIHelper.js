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

export const StyledIcon = {
  color: 'white',
  fontSize: 30
}


export const categories = ['All', 'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'];

export const CATEGORIES_OPTION = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelery' },
  { value: 'men\'s clothing', label: 'Men\'s Clothing' },
  { value: 'women\'s clothing', label: 'Women\'s Clothing' }
];