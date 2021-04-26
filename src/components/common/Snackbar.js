import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar as BaseSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

import { SNACKBAR_AUTO_HIDE_DURATION, SNACKBAR_POSITION } from "../../constants";
import { hideSnackbar } from "../../store/actions";
import Translate from "./Translate";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snackbar(props) {
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.SnackbarReducer.isOpen);
	const title = useSelector((state) => state.SnackbarReducer.title);
	const message = useSelector((state) => state.SnackbarReducer.message);
	const severity = useSelector((state) => state.SnackbarReducer.severity);
	const hideSnackbarAction = () => dispatch(hideSnackbar());

	return (
        <BaseSnackbar open={isOpen}
                      autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
                      anchorOrigin={SNACKBAR_POSITION}
                      onClose={hideSnackbarAction}
        >
            <Alert onClose={hideSnackbarAction} severity={severity}>
                <AlertTitle><Translate value={title}/></AlertTitle>
                <Translate value={message}/>
            </Alert>
        </BaseSnackbar>
	);
}
