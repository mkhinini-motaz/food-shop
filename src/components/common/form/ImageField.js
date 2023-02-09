import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Fab } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { BASE_BACKEND_URL, BOX_SHADOW_CSS_RULE } from "../../../constants";
import { useSelector } from "react-redux";

export default function ImageField(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const shrinkIsFalse = props.shrink === false;
    const labelStyle    = shrinkIsFalse ? {} : { fontSize: '1.25rem' };
    const isRequired    = props.required === undefined ? true : props.required;
    const [loadedImage, setLoadedImage] = useState(null);

    const handleUploadClick = event => {
        const file = event.target.files[0];
        props.onChange({ target: { value: file } });

        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = () => {
            setLoadedImage(reader.result);
        };
    };

    return (
        <FormControl error={props.error} className={'w-100 my-2'} >
            <InputLabel
                htmlFor={'form_input_' + props.name}
                shrink={shrinkIsFalse ? undefined : true}
                variant={props.variant || 'standard'}
                required={isRequired}
                style={labelStyle}
            >
                {props.label}
            </InputLabel>
            <input
                accept="image/*"
                id={'form_input_' + props.name}
                type="file"
                onChange={handleUploadClick}
                style={{ display: 'none' }}
            />
            <label className={"mt-4 text-" + selectedLangWriteFrom} htmlFor={'form_input_' + props.name}>
                <Fab component="span" >
                    <AddPhotoAlternateIcon />
                </Fab>
            </label>
            <img src={props.value ? ((typeof props.value === 'string') ? BASE_BACKEND_URL + props.value : loadedImage) : ''}
                 className={"my-2 border_radius_15"}
                 style={{ maxHeight: '50vh', boxShadow: BOX_SHADOW_CSS_RULE }}
            />
        </FormControl>
    );
}
