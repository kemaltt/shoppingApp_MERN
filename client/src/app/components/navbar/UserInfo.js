import React from 'react'
import { Avatar } from '@mui/material';
import { DropdownButton, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutBE } from '../../../middlewares/authApiCalls';
import { clearCart } from '../../../redux/cartSlice';


export default function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Dropdown drop="down" align={'right'}>

      <Dropdown.Toggle as={ButtonGroup} id="dropdown-basic">

        <OverlayTrigger placement="top" overlay={<Tooltip id="quick-actions-tooltip">Account Settings</Tooltip>}>

          <Avatar
            id="basic-button"
            sx={{
              m: 0.7,
              bgcolor: "secondary.main",
              // fontSize: '10px',
            }}
          >
            {user.user.name.slice(0, 2).toUpperCase()}
          </Avatar>
        </OverlayTrigger>

      </Dropdown.Toggle>


      <Dropdown.Menu className="dropdown-menu-right dropdown-menu-anim dropdown-menu-lg p-0" id="dropdown_account">
        <Dropdown.Item eventKey="1">Account</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" onClick={() => { logoutBE(dispatch); dispatch(clearCart()); navigate('/') }} >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

  )
}
