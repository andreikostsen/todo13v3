import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {focusElement} from "@testing-library/user-event/event/focus";
import {useDispatch} from "react-redux";
import {authorizeTC} from "./login-reducer";

export const  Login = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log("auth request started")

            // @ts-ignore
            dispatch(authorizeTC(values.email, values.password, values.rememberMe))

        },
    });

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal"
                               id="email"
                               name="email"
                               type="email"
                               onChange={formik.handleChange}
                               value={formik.values.email}
                    />
                    <TextField type="password" label="Password"
                               margin="normal"
                               id="password"
                               name="password"
                               onChange={formik.handleChange}
                               value={formik.values.password}

                    />

                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox checked={formik.values.rememberMe} />}
                                      name="rememberMe"
                                      onChange={formik.handleChange}/>

                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>

                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}