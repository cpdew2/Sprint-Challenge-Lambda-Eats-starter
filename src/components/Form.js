import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from "yup";

//use of yup - schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    size: yup.string().required("Must selet a size"),
    pepperoni: yup.boolean().defined(),
    beef: yup.boolean().defined(),
    sausage: yup.boolean().defined(),
    blackolives: yup.boolean().defined(),
    pineapple: yup.boolean().defined(),
    peppers: yup.boolean().defined(),
    extracheese: yup.boolean().defined(),
    specInstructions: yup.string().notRequired()
});

export default function form() {
    //adding state

    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        beef: false,
        sausage: false,
        blackolives: false,
        pineapple: false,
        peppers: false,
        extracheese: false,
        specInstructions: ""
    })

    // errors

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
    })

    //useState for button
    const [buttonDisabled, setButtonDisabled] = useState(false);

    //useState post
    const [post, setPost] = useState([]);

    //inputchange

    const inputChange = e => {
        e.persist();
        const newFormDate = {
            ...formState, [e.target.name]:
            e.target.type ==="checkbox" ? 
            e.target.checked : e.target.value};
        };

        validateChange(e);
        setFormState(newFormData);
    };

    //button
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    //validate changes
    const validateChange =e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };
    // the send button 
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users?page=2", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", post);
                console.log(res.data.size)
                setFormState({
                  name: "",
                  size: res.data.size,
                  pepperoni: false,
                  beef: false,
                  sausage: false,
                  blackolives: false,
                  pineapple: false,
                  peppers: false,
                  echeese: false,
                  specInstructions: ""  
                });
            })
            .catch(err => console.log(err.response));
    };

    const sent = (e) => {
        e.preventDefault();
        alert("Order Sent Thanks for the Purchase")
    }

    //returning the form
    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Customer's Name
                <br />
                <input
                    type="text"
                    name="name"
                    id="nameinput"
                    placeholder="Name"
                    value={formState.name}
                    onChangg={inputChange}
                />
                {errors.name.length > 5? <p className="error">{errors.name}</p> : null}

            </label>
            <br />

            <label htmlFor='size'>
                Choice of size
                <br />
                <select name='size' id='sizeinput' onChange={inputChange}>
                    <option name='default' value={null}></option>
                    <option name='Sm' value='small'>Small</option>
                    <option name='Md' value='medium'>Medium</option>
                    <option name='Lg' value='large'>Large</option>
                    <option name='XL' value='extraL'>Extra Large</option>
                </select>
            </label>
            <br />

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
                <br />

                <label htmlFor='Special Instructions'>
                    Special Instructions
                    <br /><br />
                    <textarea
                        name='specInstructions'
                        id='specInstructionsInput'
                        placeholder='Extra Requirements...'
                        value={formState.specInstructions}
                        onChange={inputChange}
                    />
                    
                </label>
                <br />
                <button name='submit' onSubmit={sent} disabled={buttonDisabled}>Submit</button>
                <pre>{JSON.stringify(post, null, 2)}</pre>
            </div>
        </form>
    )

    
