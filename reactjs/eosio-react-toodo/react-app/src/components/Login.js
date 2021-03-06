import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function Login(props) {
    return (
        <div>
            <h1>Log into your account</h1>
            <Box>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField label="Account name" fullWidth onChange={props.onChangeAccount} value={props.account}/>
                    </div>
                    <div>
                        <TextField label="Private key" fullWidth onChange={props.onChangePkey} value={props.pkey}/>
                    </div>
                    <div>
                        <Button type="button" color="primary" fullWidth onClick={props.onClick}>Login</Button>
                    </div>
                </form>
            </Box>
        </div>
    )
}