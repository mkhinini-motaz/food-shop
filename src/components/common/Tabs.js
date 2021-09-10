import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Box, Typography, Tab, Tabs as MuiTabs } from '@material-ui/core';

function TabPanel(props) {
    const { children, selectedTab, index, ...other } = props;
console.log({ children, selectedTab, index, other }, selectedTab === index)
    return (
        <div
            role="tabpanel"
            hidden={selectedTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {selectedTab === index ? children : ''}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Tabs(props) {
    const classes = useStyles();
    const tabs = props.tabs;
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newSelectedTab) => {
        setSelectedTab(newSelectedTab);
    };
    let tab;
    const tabsOutput      = [];
    const tabPanelsOutput = [];
    for (let index in tabs) {
        tab = tabs[index];
        tabsOutput.push(<Tab key={'tab_' + index + '_' + tab.title} label={tab.title} {...a11yProps(index)} />);
        tabPanelsOutput.push(<TabPanel key={'tab_panel_' + index + '_' + tab.title} selectedTab={selectedTab} index={parseInt(index)}>{tab.content}</TabPanel>);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <MuiTabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
                    {tabsOutput}
                </MuiTabs>
            </AppBar>
            {tabPanelsOutput}
        </div>
    );
}
