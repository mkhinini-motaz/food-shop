import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Card as MuiCard, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

import { BOX_SHADOW_CSS_RULE, COLOR_PRIMARY, IMAGE_WITH_TEXT_TINT } from "../../constants";

export default function Card(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const classes = makeStyles({
        root: {
            position: 'relative',
            width: 275,
            margin: 10,
            display: 'inline-block',
            boxShadow: BOX_SHADOW_CSS_RULE,
            borderRadius: '15px',
        },
        media: {
            height: '59%',
            background: IMAGE_WITH_TEXT_TINT + ', url(' + props.image + ');',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px',
        },
        title: {
            color: 'white',
            position: 'absolute',
            width: '90%',
            marginLeft: '5%',
            textAlign: 'center',
            bottom: '45%',
            left: 0,
        },
        cardActionArea: {
            height: 350,
        },
        content: {
            height: '37%',
        },
        headerActions: {
            backgroundColor: COLOR_PRIMARY + '90',
            position: 'absolute',
            top: 0,
            zIndex: 2,
            [selectedLangWriteFrom === 'right' ? 'left' : 'right']: 0,
            borderRadius: selectedLangWriteFrom === 'left' ? '0 15px 0 15px' : '15px 0 15px 0',
        }
    })();
    const [ isShown, setIsShown ] = React.useState(false);

    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);

    return (
        <Grow in={isShown}>
            <MuiCard className={classes.root} >
                {! props.headerActions ? '' :
                    <div className={classes.headerActions}>{props.headerActions}</div>
                }
                <CardActionArea className={classes.cardActionArea}
                    onClick={props.onClick}
                    disabled={props.disabled}
                >
                    <div className={classes.media + ' mx-2'} />

                    <CardContent className={classes.content}>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>

                        {props.children}
                    </CardContent>
                </CardActionArea>

                {!props.actions || !props.bottomText ? '' :
                    <CardActions className={props.classes && props.classes.cardActions}>
                        {!props.bottomText ? '' :
                            <Typography className="w-100 text-break" color="primary" variant="h6" component="h6">
                                {props.bottomText}
                            </Typography>
                        }
                        {props.actions}
                    </CardActions>
                }
            </MuiCard>
        </Grow>
    );
  }
