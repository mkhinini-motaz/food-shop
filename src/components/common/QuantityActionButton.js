import React from 'react';
import { IconButton, Icon } from '@material-ui/core';
import { useSelector } from "react-redux";
import { translate } from "../../i18n";

export default function QuantityActionButton(props) {
    const lang = props.lang;
    let icons = [];
    const step = props.forWeight ? 200 : 1;
    if (props.count > 0) {
        icons.push((
            <IconButton
                key="quantity-action-button-minus"
                variant="contained"
                color="secondary"
                className={'no_focus_frame' + (! props.hideCount ? '' : ' p-1' )}
                onClick={event => props.onClick(props.count - step, -step)}
                size={props.bigSize ? 'large' : 'medium'}
            >
                <Icon className="m-0" style={{ transform: props.bigSize ? "scale(2.0)" : '' }}>remove_circle</Icon>
            </IconButton>
        ));

        if (! props.hideCount) {
            icons.push((
                <span key="quantity-action-button-count" variant="outlined" disabled className={"lang_aware"} style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                    {props.count > 999 ?
                        [<span>{(props.count / 1000).toString().replace('.', ',')}</span>, <span>{(props.forWeight ? translate('common:kg', lang, true) : '')}</span>] :
                        [<span>{props.count}</span>, <span>{props.forWeight ? translate('common:g', lang, true) : ''}</span>]
                    }
                </span>
            ));
        }
    }

    let rootClasses = 'w-100 text-' + (props.textAlign || 'center') +
        ' ' + (props.classes && props.classes.root ? props.classes.root : '') +
        ' ' + (props.bigSize ? 'h1' : '');
    return (
        <div className={rootClasses}>
            {icons}
            <IconButton
                key="quantity-action-button-plus"
                variant="contained"
                color="primary"
                className={'no_focus_frame' + (! props.hideCount ? '' : ' p-1' )}
                onClick={event => {props.onClick(props.count + step, step)}}
                size={props.bigSize ? 'large' : 'medium'}
            >
                <Icon className="m-0" style={{ transform: props.bigSize ? "scale(2.0)" : '' }}>add_circle</Icon>
            </IconButton>

        </div>
    );
}
