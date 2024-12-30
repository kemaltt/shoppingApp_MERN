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

    const formData = new FormData();
    formData.append('profile_image', file);

    const uploadData = {
      token: user.access_token,
      formData,
    }

    const uploadedData = await uploadProfileImage(uploadData).unwrap();
    const data = {
      name,
      ...(uploadedData.length && { image: uploadedData }),
    };

    await updateUser({ token: user.access_token, data });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    // Dosya boyutu kontrolü (3 MB = 3 * 1024 * 1024 bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Dosya boyutu 5 MB\'dan küçük olmalıdır.');
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

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            src={avatar}
            sx={{ width: 80, height: 80 }}
          />
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
                  disabled={!isEditing}
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
