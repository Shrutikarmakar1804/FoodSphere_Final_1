import { Button, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';

const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant , ingredients } = useSelector(store=>store)
    const [formData, setFormData] = useState({
        Name:"",
        CatagoryId:""
    });
    const handleSubmit = ( e ) => {
            e.preventDefault()
        const data={
            ...formData,
            restaurantId:restaurant.usersRestaurant.id          
        };
        dispatch(createIngredient({data:formData , jwt}))
        
        console.log(data);
        dispatch(createIngredientCategory({data:formData , jwt}))
        
    };
        const handleInputChange = (e) => {
            const {name,value}=e.target
            setFormData({
                ...formData,[name]:value,
            })
        }
  return (
    <div className=''>
        <div className="p-5">
            <h3 className="text-gray-400 text-center text-xl pb-10">
                Create Category
            </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <TextField fullWidth
                                label="name"
                                id="name"
                                name="name"
                                varient="outlined"
                                onChange={handleInputChange}
                                value={formData.categoryname}
                                ></TextField>

                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={formData.ingredientCatagoryId}  
                                      label="ingredientCatagoryId"
                                      onChange={handleInputChange}
                                      name="CatagoryId"
                                    >
                                      {ingredients.category.map((item)=>
                                      <MenuItem value={item.id}>{item.name}</MenuItem>)}
                                      
                                    </Select>
                                  </FormControl>
                    <Button variant="contained" type="submit"> 
                        Create Ingredient
                    </Button>
                </form>

        </div>
    
    </div>
  );
};

export default CreateIngredientForm;