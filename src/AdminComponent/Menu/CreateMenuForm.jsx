import { AddPhotoAlternate } from '@mui/icons-material'
import { Box, Button, Chip, CircularProgress, FormControl,  IconButton, InputLabel, MenuItem,  OutlinedInput, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId:"",
  ingredients:[],
  nonvegetarian:"",
  seasonal:"",
  vegetarian:"",
  images:[],
};

const CreateMenuForm = () => {
  const dispatch = useDispatch(); 
  const jwt = localStorage.getItem("jwt");
   const { restaurant , ingredients } = useSelector(store=>store)
  const [uploadImage, setUploadImage] = useState(false);
  const formik=useFormik({
    initialValues,
    onSubmit: (values) =>{
        values.restaurantId = 2;
        dispatch(createMenu({menu:values,jwt}))
        console.log("data ---",values)
    },
  });
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    setUploadImage(true)
    const image = await uploadImageToCloudinary(file)
    console.log("image ---",image)
    formik.setFieldValue("images", [...formik.values.images,image])
    setUploadImage(false)
  };
  const handleRemoveImage=(index) => {
    const updatedImages = [...formik.values.images]
    updatedImages.splice(index,1);
    formik.setFieldValue("images",updatedImages)
  };

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({id:restaurant.usersRestaurant.id,jwt}))
  }
  ,[])

  return (
    <div className="py-20 px-20 lg:flex itmes-center justify-center min-h-screen">
     <div className="lg:max-w-4xl">
     <h1 className="font-bold text-2xl text-center py-2">
        Add New Menu
      </h1>
      <form onSubmit={formik.handleSubmit} className="spy-5">
        <Grid container spacing={5}>
          <Grid className="flex flex-wrap gap-3" size= {{ xs:12, lg:6 }} >
              <input
              accept='image/*'
              id='fileinput'
              style={{display:"none"}}
              onChange={handleImageChange}
              type='file' />

              <label className='relative' htmlFor="fileinput">
                <span 
                  className='w-24 h-24 cursor-pointer flex items-center justify-center 
                  p-3 bprder rounded-md border-gray-600 '>
                  <AddPhotoAlternate className='text-white' />
                </span>
                {
                  uploadImage && <div className="absolute top-0 bottom-0 right-0 left-0 w-24 h-24 flex items-center justify-center">
                    <CircularProgress />
                  </div>
                }
              </label>
            <div
            className="flex flex-wrap gap-2">
              {(formik.values.images).map((image,index)=>
              <div className="relative" key={index}>
                <img className="w-24 h-24 object-cover"
                key={index}
                  src={image}
                 alt="" />
                 <IconButton 
                 size="small"
                 sx={{position:"absolute",top:0,right:0, outline:"none"}}
                 onClick={()=>handleRemoveImage(index)}>
                  <CloseIcon sx={{fontSize:"1rem"}}/>
                 </IconButton>

              </div>)}

            </div>
            

          </Grid>
          <Grid size= {{ xs:12 }} >
            <TextField fullWidth
            label="Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}  >

            </TextField>

          </Grid>
          <Grid size= {{ xs:12 }} >
            <TextField fullWidth
            label="Description"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            >

            </TextField>

          </Grid>
          <Grid size= {{ xs:12 }} >
            <TextField fullWidth
            label="Price"
            id="price"
            name="price"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.price}
            >

            </TextField>

          </Grid>
          <Grid size= {{ xs:12 }} >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> Category </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}  
                  label="Food Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                 {restaurant.categories?.map((item)=>
                  <MenuItem value={item}>{item.name}</MenuItem>)}
                 
                </Select>
              </FormControl>
              </Grid>

              <Grid size= {{ xs:12  }} >
            <TextField fullWidth
            label="RestaurantId"
            id="restaurantId"
            name="restaurantId"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.restaurantId}
            >

            </TextField>

          </Grid>

          <Grid size= {{ xs:12 }} >
          <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name="ingredients"
          multiple
          value={formik.values.ingredients}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
        //MenuProps={MenuProps}
        >
          {ingredients.ingredients.map((item,index) => (
            <MenuItem
              key={item.id}
              value={item}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

          </Grid>

          <Grid size= {{ xs:12 }} >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> Non-Vegetarian</InputLabel>
                <Select
                  labelId="non-vegetarian"
                  id="demo-simple-select"
                  value={formik.values.nonvegetarian}  
                  label="Non-vegetarian"
                  onChange={formik.handleChange}
                  name="nonvegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

          <Grid size= {{ xs:12 }} >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> Seasonal</InputLabel>
                <Select
                  labelId="seasonal"
                  id="demo-simple-select"
                  value={formik.values.seasonal}  
                  label=" Seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid size= {{ xs:12, lg:6 }} >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="vegetarian"
                  value={formik.values.vegetarian}  
                  label="Vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>
        </Grid>
        <br/>
        <Button variant="contained" color="primary" type="submit"> Create Menu </Button>
      </form>
     </div>
    </div>
  )
}

export default CreateMenuForm;
