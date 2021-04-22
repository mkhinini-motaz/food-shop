import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

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
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');
    const textAlignClassName = selectedLangWriteFrom === 'right' ? 'text-right' : '';
    const checkIconClassName = selectedLangWriteFrom === 'right' ? 'mr-auto ml-2' : 'pl-0';
    const iconStyle = selectedLangWriteFrom === 'right' ? { marginRight: '-40px' } : { marginLeft: '-40px' };
    const formDescription = [
        {
            name: 'code',
            label: <Translate value="cart:promo_code:label" />,
            required: false,
        }
    ];

    setTimeout(() => { setIsShown(previousIsShown => true); }, 500 + props.showDelay);

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
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 py-2 text-left'}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <div className="col-12" >
                    <div className="mx-3 my-2 p-2 " style={{ backgroundColor: "rgb(22, 158, 31, 0.8)" }} >
                        <div className={'d-flex ' + flexRowClassName + ' ' + textAlignClassName}>
                            <div className="w_15 mx-1 text-center">
                                <img width="40px" height="40px" src="/img/ghost1.svg" alt="logo"/>
                            </div>
                            <div className="w_85 px-1">
                                <Typography variant="body1" color="textSecondary" component="span">
                                    <Translate value="cart:promo_code:free_delivery" />
                                </Typography>
                                <div className="text-center" style={iconStyle}>
                                    <Typography variant="h6" component="h4" color="primary">
                                        ghostchef
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10" >
                    <Form
                        initialValue={promoCode}
                        fieldDescriptions={formDescription}
                        onChange={onChange}
                    />
                </div>
                {! promoCodeIsLoading ? '' :
                    <div className="col-1 mt-3">
                        <Loader size={25} />
                    </div>
                }
                {! promoCode || promoCodeIsLoading ? '' :
                    <div className={checkIconClassName + ' col-1 mt-3'}>
                        <DoneIcon color="primary" fontSize="large" />
                    </div>
                }
            </div>
        </Collapse>
    );
}
