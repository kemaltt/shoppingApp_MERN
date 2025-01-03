import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useUploadProfileImageMutation } from '../../../redux/auth/auth-api';

export default function Profile() {
  const [uploadProfileImage, { isLoading: uploadLoading }] = useUploadProfileImageMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.user?.name);
  const [email, setEmail] = useState(user?.user?.email);
  const [avatar, setAvatar] = useState(user?.user?.image || "https://via.placeholder.com/150?text=Profile");
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    let uploadedImage = avatar;

    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file);

      const uploadedData = await uploadProfileImage(formData).unwrap();
      uploadedImage = uploadedData;
      setFile(null);
    }

    const data = {
      name,
      image: uploadedImage,
    };

    await updateUser(data);

    setAvatar(uploadedImage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Dosya boyutu 3 MB\'dan küçük olmalıdır.');
      return;
    }

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = async () => {

    const data = {
      name,
      image: null,
    };

    await updateUser(data);
    setAvatar('https://via.placeholder.com/150?text=Profile');
    setFile(null);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3 }}>
      <CardHeader
        avatar={
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={avatar}
              sx={{ width: 80, height: 80 }}
            />
            {isEditing && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: 'white',
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: 'red',
                    color: 'white',
                  },
                }}
                onClick={handleDeleteAvatar}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        }
        title={
          <Box display="flex" alignItems="center">
            <Box flex={1} fontWeight="bold" fontSize="1.5rem">
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                name
              )}
            </Box>
            {isEditing ? (
              <>
                <IconButton onClick={handleSave} disabled={uploadLoading || updateLoading} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="secondary">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              disabled={!isEditing}
              fullWidth
            >
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
