import React from 'react';
import { BASE_BACKEND_URL, COLOR_PRIMARY, IMAGE_WITH_TEXT_TINT } from "../../constants";
import TranslateField from "../common/TranslateField";

export default function Category(props) {
    const { onClick, category } = props;
    return (
        <div className={'p-1 text-center'} onClick={onClick} >
            <div className={"p-2"}
                 style={{
                     backgroundImage: IMAGE_WITH_TEXT_TINT + ', url(' + BASE_BACKEND_URL + category.photo + ')',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     borderRadius: '15px',
                 }}
            >
                <h3><TranslateField value={category.name} /></h3>
            </div>
        </div>
    );
};

