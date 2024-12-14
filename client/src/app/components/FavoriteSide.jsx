import React from "react";
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { StyledBadge, StyledIcon } from "./navbar/helper/UIHelper";
import { useSelector } from "react-redux";


export default function FavoriteSide() {
  const { favorite } = useSelector((state) => state.favorite);
  return (
       <Link to="/wishlist" className='compare-side' >
       <Tooltip placement="top" title="Favorite">
         <IconButton aria-label="favorite">
           <StyledBadge badgeContent={favorite?.length} color="primary">
           <FavoriteBorderOutlinedIcon sx={StyledIcon}/>
           </StyledBadge>
         </IconButton>
       </Tooltip>
       </Link>
  );
}