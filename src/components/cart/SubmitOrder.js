import React from 'react';
import { Collapse } from '@material-ui/core';
import SubmitButton from "../common/form/SubmitButton";
import Translate from "../common/Translate";
import {BOX_SHADOW_CSS_RULE, COLOR_PRIMARY} from "../../constants";

export default function SubmitOrder(props) {
    const [ isShown, setIsShown ] = React.useState(false);
    setTimeout(() => { setIsShown((previousIsShown) => true); }, 500 + props.showDelay);
    // TODO: submit button is loading

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' bg-white my-2 py-2'} style={{ boxShadow: BOX_SHADOW_CSS_RULE }}>
                <SubmitButton
                    color={'white'}
                    backgroundColor={COLOR_PRIMARY}
                    label={<Translate value="cart:order:submit" />}
                    isLoading={false}
                />
            </div>
        </Collapse>
    );
}
