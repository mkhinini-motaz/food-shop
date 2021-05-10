import React from 'react';
import { connect } from  'react-redux'
import { Typography } from '@material-ui/core';

import { updateShopUserProfile } from '../../store/actions'
import { COLOR_PRIMARY, FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_EMAIL, FORM_FIELD_TYPE_SUBMIT } from '../../constants';
import Form from '../../components/common/form/Form';
import Translate from '../../components/common/Translate';

class Profile extends React.Component {
    formFieldDescriptions () {
        const clientProfileUpdateIsLoading = this.props.clientProfileUpdateIsLoading;
        return [
            {
                name: 'first_name',
                label: <Translate value="form:first_name:label" />,
            },
            {
                name: 'last_name',
                label: <Translate value="form:last_name:label" />,
            },
            {
                name: 'email',
                label: <Translate value="form:email:label" />,
                type: FORM_FIELD_TYPE_EMAIL,
            },
            {
                name: 'phone',
                type: FORM_FIELD_TYPE_PHONE,
                label: <Translate value="form:phone:label" />,
            },
            {
                name: 'password',
                type: FORM_FIELD_TYPE_PASSWORD,
                label: <Translate value="form:password:label" />,
                confirmed: true, // TODO: implement and make confirmation internal in password
                required: false,
            },
            {
                name: 'password_confirmation',
                type: FORM_FIELD_TYPE_PASSWORD,
                label: <Translate value="form:password_confirmation:label" />,
                required: false,
            },
            {
                type: FORM_FIELD_TYPE_SUBMIT,
                label: <Translate value="common:save" />,
                color: 'white',
                backgroundColor: COLOR_PRIMARY,
                isLoading: clientProfileUpdateIsLoading,
            },
        ];
    };

    render() {
        return (
            <div className={'bg-white text-center px-5 py-3 my-3 mx-auto w-md-75 w-sm-100'}>
                <Typography variant="h2" component="h2" color="primary" align={this.props.selectedLangWriteFrom}>
                    <Translate value="common:profile" textOnly={true} />
                </Typography>
                <Form
                    initialValue={this.props.authShopUser}
                    fieldDescriptions={this.formFieldDescriptions()}
                    onSubmit={formData => this.props.updateClientProfile(formData)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLang: state.I18nReducer.selectedLang,
        selectedLangWriteFrom: state.I18nReducer.selectedLangWriteFrom,
        clientProfileUpdateIsLoading: state.AuthReducer.clientLoginIsLoading,
        authShopUser: state.AuthReducer.authShopUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateClientProfile: (clientProfileData) => dispatch(updateShopUserProfile(clientProfileData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
