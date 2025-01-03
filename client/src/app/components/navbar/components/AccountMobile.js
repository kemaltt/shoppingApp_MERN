import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../../redux/auth/auth-api';
import Cart from './Cart';
import { Typography } from '@mui/material';
import WishList from './WishList';
import Product from './Product';

export default function AccountMobile({ isAuthenticated, cartBadge, wishBadge, productBadge, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [logout] = useLogoutMutation()

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip placement="top" title="Account settings">
          <IconButton
            onClick={handleClick}
            // size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              src={user?.user?.image || "https://via.placeholder.com/150?text=Profile"}
              sx={{ width: 50, height: 50 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {isAuthenticated ? (
          <div>

            <MenuItem onClick={() => { handleClose(); navigate('/favorite-list') }}>
              <WishList badge={wishBadge} color={{ color: 'green', fontSize: 30 }} />
              <Typography >Favorite</Typography>
            </MenuItem>

            <MenuItem className='d-flex gap-1' onClick={() => { handleClose(); navigate('/cart-list') }}>
              <Cart badge={cartBadge} color={{ color: 'orange', fontSize: 30 }} />
              <Typography >Cart</Typography>
            </MenuItem>

            <Divider />
            {user?.user?.role === 'admin'
              ? <MenuItem className='d-flex gap-1' onClick={() => { handleClose(); navigate('/product-list') }}>
                <Product badge={productBadge} color={{ color: 'secondary', fontSize: 30 }} />
                <Typography >Products</Typography>
              </MenuItem>
              : null
            }

            <MenuItem className='d-flex gap-1' onClick={() => navigate('/profile')}>
              <Avatar sx={{ width: 32, height: 32, marginRight: 1 }} />
              <Typography >Profile</Typography>
            </MenuItem>
            
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <MenuItem onClick={() => { logout(); navigate('/') }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={() => { navigate('/login') }}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}