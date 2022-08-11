import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import Store from './store';
import { COLOR_PRIMARY, COLOR_SECONDARY, GOOGLE_ANALYTICS_TRACKING_ID } from './constants';
import Router from "./Router";
import middlewares from './middleware';

middlewares();

const theme = createMuiTheme({
    palette: {
        primary: {
            main: COLOR_PRIMARY,
            text: 'white',
        },
        secondary: {
            main: COLOR_SECONDARY,
            text: 'white',
        },
        shadows: [
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
            '0px 2px 4px -1px rgba(209, 17, 17, 0.75)',
        ],
      }
    },
);

function App(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <Store>
                <Router />
            </Store>
        </MuiThemeProvider>
    );
}

export default App;
