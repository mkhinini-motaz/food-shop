import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
    APPBAR_LOGIN_BUTTON_BG_COLOR,
    APPBAR_LOGIN_BUTTON_COLOR,
    BOX_SHADOW_CSS_RULE,
    COMPONENT_SHOW_DELAY,
    FORM_FIELD_TYPE_PASSWORD,
    FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_SUBMIT
} from '../../constants';
import Translate from "../common/Translate";
import FormField from "../common/form/FormField";
import { setAssociatedPhone } from "../../store/actions";
import { Collapse } from "@material-ui/core";
import PhoneField from "../common/form/PhoneField";
import Form from "../common/form/Form";

export default function AssociatedPhone(props) {
    const dispatch = useDispatch();
    const [ isShown, setIsShown ] = React.useState(false);
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    let showDelay = COMPONENT_SHOW_DELAY * (props.products?.length || 1);
    const associatedPhone = useSelector(state => state.CartReducer.associatedPhone);

    useEffect(() => {
        setTimeout(() => { setIsShown(() => true); }, 500 + props.showDelay);
    }, []);

    const formDescriptions = [
        {
            name: 'phone',
            type: FORM_FIELD_TYPE_PHONE,
            label: <Translate value="form:phone:label" />,
            required: false,
        },
    ];

    return (
        <Collapse in={isShown}>
            <div className={props.className + ' ' + flexRowClassName + ' row mx-0 bg-white my-2 py-2 px-3 text-left border_radius_15'}
                 style={{ boxShadow: BOX_SHADOW_CSS_RULE }}
            >
                <Form fieldDescriptions={formDescriptions}
                      value={{ phone: associatedPhone }}
                      onChange={(formData) => dispatch(setAssociatedPhone(formData.phone))}
                />
            </div>
        </Collapse>
    );
}
