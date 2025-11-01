import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { StyledBadge, StyledIcon } from '../../../helpers/UIHelper';
import { useTranslation } from 'react-i18next';

export default function WishList({ badge, color }) {

  const { t } = useTranslation();

  return (
    <Link to="/favorite-list" >
      <Tooltip placement="top-end" title={t('wishlist.favorite')}>
        <IconButton aria-label={t('wishlist.favorite')}>
          <StyledBadge badgeContent={badge} color="primary">
            <FavoriteBorderOutlinedIcon sx={color ? color : StyledIcon} />
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </Link>
  )
}
