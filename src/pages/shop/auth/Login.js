import React from 'react';
import { connect } from  'react-redux'
import { Typography } from '@material-ui/core';

import { attemptClientLogin } from '../../../store/actions'
import { APPBAR_LOGIN_BUTTON_BG_COLOR, APPBAR_LOGIN_BUTTON_COLOR, FORM_FIELD_TYPE_PHONE, FORM_FIELD_TYPE_PASSWORD, FORM_FIELD_TYPE_SUBMIT } from '../../../constants';
import Form from '../../../components/common/form/Form';
import { translate } from '../../../i18n';

class Login extends React.Component {
    translate = (translationKey) => {
        return translate(translationKey, this.props.selectedLang);
    }

    formFieldDescriptions = () => {
        const translateMethod = this.translate;
        const clientLoginIsLoading = this.props.clientLoginIsLoading;
        return [
            {
                name: 'phone',
                type: FORM_FIELD_TYPE_PHONE,
                label: translateMethod('form:phone:label'),
                variant: 'outlined',
                shrink: false,
            },
            {
                name: 'password',
                type: FORM_FIELD_TYPE_PASSWORD,
                label: translateMethod('form:password:label'),
                variant: 'outlined',
                shrink: false,
            },
            {
                type: FORM_FIELD_TYPE_SUBMIT,
                label: translateMethod('common:login'),
                fullWidth: true,
                color: APPBAR_LOGIN_BUTTON_COLOR,
                backgroundColor: APPBAR_LOGIN_BUTTON_BG_COLOR,
                isLoading: clientLoginIsLoading,
            },
        ];
    }

    renderContent = () => {
        return <div>
            <Form
                fieldDescriptions={this.formFieldDescriptions()}
                onSubmit={(formData) => this.props.attemptClientLogin(formData)}
            />

            <div className="pt-2 pb-0">
                <Typography color="textSecondary" variant="body2" component="span">
                    {this.translate('common:forgot-password?')}
                </Typography>
            </div>
        </div>;
    }

    render() {
        return (
            <div className={'bg-white text-center my-5 p-5 mx-auto w-md-50 w-sm-100'}>
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLang: state.I18nReducer.selectedLang,
        selectedLangWriteFrom: state.I18nReducer.selectedLangWriteFrom,
        clientLoginIsLoading: state.AuthReducer.clientLoginIsLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        attemptClientLogin: ({ phone, password }) => dispatch(attemptClientLogin({ phone, password }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
