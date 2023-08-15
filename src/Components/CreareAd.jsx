import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography, MenuItem } from '@mui/material';
import useAddAdToFirebase from '../Context/addAdtoFirbase';

const PopupForm = ({ open, onClose }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
    location: Yup.string().required('Location is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const {addAd} = useAddAdToFirebase()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      location: '',
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addAd(values)
      console.log(values);
      
      onClose(); // Close the popup after submission

    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Ad</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details for the new ad.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            id="title"
            name="title"
            margin="dense"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Description"
            id="description"
            name="description"
            margin="dense"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            label="Price"
            id="price"
            name="price"
            type="number"
            margin="dense"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            error={formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            select
            label="Category"
            id="category"
            name="category"
            margin="dense"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            error={formik.touched.category && !!formik.errors.category}
            helperText={formik.touched.category && formik.errors.category}
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="cosmetics">Cosmetics</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="mobiles">Mobiles</MenuItem>
            <MenuItem value="clothes">Clothes</MenuItem>
            <MenuItem value="jewelry">Jewelry</MenuItem>
            <MenuItem value="shoes">Shoes</MenuItem>
            <MenuItem value="cars">Cars</MenuItem>
            <MenuItem value="houses">Houses</MenuItem>
            {/* Add more categories */}
          </TextField>
          <TextField
            select
            label="Location"
            id="location"
            name="location"
            margin="dense"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            error={formik.touched.location && !!formik.errors.location}
            helperText={formik.touched.location && formik.errors.location}
          >
            <MenuItem value="">Select a location</MenuItem>
            <MenuItem value="lahore">Lahore</MenuItem>
            <MenuItem value="karachi">Karachi</MenuItem>
            <MenuItem value="islamabad">Islamabad</MenuItem>
            {/* Add more cities */}
          </TextField>
          <Typography margin="dense">Select images (.png ,jpg, jpeg)</Typography>
          <input
            type="file"
            name="image"
            accept=".png, .jpeg, .jpg" // Only allow png and jpeg files
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <div style={{ color: 'red' }}>{formik.errors.image}</div>
          )}
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PopupForm;
