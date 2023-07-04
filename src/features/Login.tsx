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
import {useDispatch} from "react-redux";
import {authorizeTC} from "./login-reducer";
import * as yup from 'yup';


const validationSchema = yup.object({
    firstName: yup.string().required('Required field'),
    lastName: yup.string().required('Required field'),
    country: yup.string().required('Required field'),
    age: yup.number().required('Required field'),
})


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
        validationSchema
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
                    <TextField

                        label="Email"
                        margin="normal"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        helperText={formik.errors.email && formik.touched.email && `${formik.errors.email}`}
                        error={formik.errors.email?true:false}
                    />
                    <TextField type="password" label="Password"
                               margin="normal"
                               id="password"
                               name="password"
                               onChange={formik.handleChange}
                               value={formik.values.password}
                               helperText={formik.errors.password && formik.touched.password && `${formik.errors.password}`}
                               error={formik.errors.password?true:false}

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