import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Collapse, IconButton, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import Translate from "../common/Translate";
import Loader from "../common/Loader";
import Form from "../common/form/Form";
import { BOX_SHADOW_CSS_RULE, CART_PROMO_CODE_CHANGE_TIMEOUT_DELAY } from "../../constants";
import { getPromoCode } from "../../store/actions";

export default function PromoCode(props) {
    const dispatch = useDispatch();
    const [ timeoutId, setTimeoutId ] = React.useState(0);
    const [ isShown, setIsShown ] = React.useState(false);

    const promoCodeIsLoading = useSelector(state => state.CartReducer.promoCodeIsLoading);
    const promoCode = useSelector(state => state.CartReducer.promoCode);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);

    const iconStyle          = selectedLangWriteFrom === 'right' ? { marginRight: '-40px' } : { marginLeft: '-40px' };
    const flexRowClassName   = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    const textAlignClassName = selectedLangWriteFrom === 'right' ? 'text-right' : '';

    const iconsClassName       = 'col-2 align-self-center ' + (selectedLangWriteFrom === 'right' ? 'pr-0' : 'pl-0');
    const loyaltyIconClassName = 'col-2 align-self-center ' + (selectedLangWriteFrom === 'right' ? 'pl-0' : '');

    const formDescription = [ {
        name: 'code',
        label: <Translate value="cart:promo_code:label" />,
        required: false,
    } ];

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    const onChange = (newValue) => {
        setTimeoutId(previousTimeoutId => {
            clearTimeout(previousTimeoutId);
            return setTimeout(
                () => dispatch(getPromoCode(newValue.code)),
                CART_PROMO_CODE_CHANGE_TIMEOUT_DELAY
            );
        });
    };

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 py-2 px-1 text-left border_radius_15'}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <div className={loyaltyIconClassName}>
                    <LoyaltyIcon color={! promoCode || promoCodeIsLoading ? 'secondary' : 'primary'} fontSize="large" style={{ transition: 'color 3s' }}/>
                </div>
                <div className="col-8" >
                    <Form
                        initialValue={promoCode}
                        fieldDescriptions={formDescription}
                        onChange={onChange}
                    />
                </div>
                {! promoCodeIsLoading ? '' :
                    <div className={iconsClassName}>
                        <Loader size={25} />
                    </div>
                }
                {! promoCode || promoCodeIsLoading ? '' :
                    <div className={iconsClassName}>
                        <DoneIcon color="primary" fontSize="large" />
                    </div>
                }
            </div>
        </Collapse>
    );
}
