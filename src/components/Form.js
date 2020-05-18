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
}