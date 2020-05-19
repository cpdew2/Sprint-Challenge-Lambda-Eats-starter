import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from 'axios';


//use of yup - schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    size: yup.string().required("Must selet a size"),
    pepperoni: yup.string().defined(),
    beef: yup.string().defined(),
    sausage: yup.string().defined(),
    blackolives: yup.string().defined(),
    pineapple: yup.string().defined(),
    peppers: yup.string().defined(),
    extracheese: yup.string().defined(),
    specInstructions: yup.string().notRequired()
});

export default function Form() {
    //adding state

    //const [forms, setForms] = useState({
    const initialFormState ={
        name: "",
        size: "",
        pepperoni: "",
        beef: "",
        sausage: "",
        blackolives: "",
        pineapple: "",
        peppers: "",
        extracheese: "",
        specInstructions: "",
    };

    // errors

   

    //useState for button
    

    const [serverError, setServerError] = useState("");

    const [post, setPost] = useState([]);

    const [formState, setFormState] = useState(initialFormState);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        beef: "",
        sausage: "",
        blackolives: "",
        pineapple: "",
        peppers: "",
        extracheese: "",
        specInstructions: "",
    });


    const validateChange = e => {
        yup
           .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]:""
                })
            })
            .catch(errors => {
                setErrors({
                    ...errors,
                    [e.target.name]:errors.errors[0]
                });
           });
   };

   useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        console.log('valid?', valid);
        setIsButtonDisabled(!valid);
     });
 }, [formState]);


 const formSubmit = e => {
    e.preventDefault();
    console.log('form submitted!');
    axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
            setPost(response.data);
           console.log("success", post);
           console.log(response.data.size)
            setFormState({
              name: "",
              size: response.data.size,
              pepperoni: "",
              beef: "",
              sausage: "",
              blackolives: "",
              pineapple: "",
              peppers: "",
              echeese: "",
              specInstructions: ""  
            });
            serverError(null);
        })
        .catch(error => {
            setServerError("something went wrong!");
});
 };
    //inputchange

        const inputChange = e => {
         e.persist();

    const newFormData = {
        ...formState, [e.target.name]: e.target.type === "checkbox" ?
        e.target.checked: e.target.value };
        
      validateChange(e);
      setFormState(newFormData);
      console.log(e.target.name.howmany)
    };

    
     
    
    //returning the form
    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
         alert("Order Sent Thanks for the Purchase")
        }}>
            <label htmlFor="name">
                Customer's Name
                
                <input
                    type="text"
                    name="name"
                    id="nameinput"
                    placeholder="Name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                <br />
            </label>
            <br />

            <label htmlFor='size'>
                Choice of size
                
                <select name='size' id='sizeinput' onChange={inputChange}>
                    <option name='default' value={null}></option>
                    <option name='Sm' value='small'>Small</option>
                    <option name='Md' value='medium'>Medium</option>
                    <option name='Lg' value='large'>Large</option>
                    <option name='XL' value='extraL'>Extra Large</option>
                </select>
            </label>
            
        
            <div className='toppingsCheckList'>
                <p>Select Toppings</p>

                <label htmlFor='pepperoni'>
                    <input
                    type='checkbox'
                    name='pepperoni'
                    id='pepperoniCheckBox'
                    checked={formState.pepperoni}
                    onChange={inputChange}
                    />
                    Pepperoni
                </label>
                <br />

                <label htmlFor='beef'>
                    <input
                    type='checkbox'
                    name='beef'
                    id='beefCheckBox'
                    checked={formState.beef}
                    onChange={inputChange}
                    />
                    Beef
                </label>
                
                <br />
                <label htmlFor='sausage'>
                    <input
                    type='checkbox'
                    name='sausage'
                    id='sausageCheckBox'
                    checked={formState.sausage}
                    onChange={inputChange}
                    />
                    Sausage
                </label>
                
                <br />
                <label htmlFor='blackolives'>
                    <input
                    type='checkbox'
                    name='blackolives'
                    id='blackolivesCheckBox'
                    checked={formState.blackolives}
                    onChange={inputChange}
                    />
                    Black Olives
                </label>
                <br />

                <label htmlFor='pineapple'>
                    <input
                    type='checkbox'
                    name='pineapple'
                    id='pineappleCheckBox'
                    checked={formState.pineapple}
                    onChange={inputChange}
                    />
                    Pineapple
                </label>
               
                <br />
                <label htmlFor='peppers'>
                    <input
                    type='checkbox'
                    name='peppers'
                    id='peppersCheckBox'
                    checked={formState.peppers}
                    onChange={inputChange}
                    />
                    Peppers
                </label>
                
                <br />
                <label htmlFor='echeese'>
                    <input
                    type='checkbox'
                    name='echeese'
                    id='echeeseCheckBox'
                    checked={formState.echeese}
                    onChange={inputChange}
                    />
                    Extra Cheese
                </label>
                        
                </div>
                <br />                    
                <label htmlFor='Special Instructions'>
                    Special Instructions
                    <br />
                    <textarea
                        name='specInstructions'
                        id='specInstructionsInput'
                        placeholder='Extra Requirements...'
                        value={formState.specInstructions}
                        onChange={inputChange}
                    />
                  
                </label>
                <br />
                <button name='submit' onSubmit={post} disabled={isButtonDisabled}>Submit</button>
                <pre>{JSON.stringify(post, 'https://localhost.3000', 2)}</pre>
               
        </form>
    )

}
