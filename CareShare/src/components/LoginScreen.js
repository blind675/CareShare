import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import FadeImage from 'react-native-fade-image';
import * as actions from '../actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: null,
            emailError: null,
            email: '',
            password: '',
            foundCompany: null,
        };

        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');
    }

    componentWillMount() {
        // load companies 
        this.props.getCompanies();
    }

    onEmailChange(text) {
        this.state.email = text;
        this.setState({ emailError: null });
    }

    onPasswordChange(text) {
        this.state.password = text;
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    testEmail() {
        if (this.state.email) {
            let foundCompany = null;
            const index = this.state.email.indexOf('@');
            const companyEmailKey = this.state.email.substring(index, this.state.email.length);

            if (this.props.companies) {
                this.props.companies.forEach(
                    (element) => {
                        if (element.email === companyEmailKey) {
                            foundCompany = element;
                        }
                    }
                );

                if (foundCompany === null) {
                    this.setState({ emailError: 'This company is not registered.' });
                } else if (foundCompany.licencesCount === 0) {
                    this.setState({ emailError: 'This company has no more licences.' });
                }
            } else {
                this.setState({ emailError: 'Error getting the companies list.' });
            }
            this.setState({
                foundCompany
            });
        }
    }

    loginCreateAccount() {
        if (this.state.email &&
            this.state.password &&
            this.state.foundCompany &&
            this.state.emailError === null
        ) {
            this.props.loginCreateAccount({
                email: this.state.email,
                password: this.state.password,
                company: this.state.foundCompany
            });
        } else {
            alert('Not all fields or wrong email');
        }
    }

    renderLogoImage() {
        if (this.state.foundCompany) {
            return (<FadeImage
                style={{
                    width: 50,
                    height: 50,
                    padding: 10,
                }}
                source={{ uri: this.state.foundCompany.logo }}
                resizeMode='cover'
                duration={1000}
            />);
        }

        return (<Image
            style={{
                width: 50,
                height: 50,
                padding: 10,
            }}
            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
        />);
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={
                    () => {
                        this.email.blur();
                        this.password.blur();
                    }}
                activeOpacity={1}
            >
                {this.renderLogoImage()}
                <View
                    style={{
                        width: 250,
                        padding: 10,
                    }}
                >
                    <TextField
                        ref={this.emailRef}
                        label='E-mail'
                        textColor='#000'
                        autoCorrect={false}
                        onChangeText={this.onEmailChange.bind(this)}
                        autoCapitalize={'none'}
                        onSubmitEditing={() => {
                            //this.passwordRef.focus();
                        }}
                        onBlur={() => {
                            this.testEmail();
                        }}
                        error={this.state.emailError}
                    />
                    <TextField
                        ref={this.passwordRef}
                        label='Parola'
                        textColor='#000'
                        autoCorrect={false}
                        onChangeText={this.onPasswordChange.bind(this)}
                        secureTextEntry
                        autoCapitalize={'none'}
                        error={this.state.passwordError}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: '#3B5998',
                        width: 120,
                        alignItems: 'center',
                    }}
                    onPress={() => this.loginCreateAccount()}
                >
                    <Text style={{ color: 'white' }}> Sign In </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => {
    return {
        companies: state.companies,
    };
};

export default connect(mapStateToProps, actions)(LoginScreen);
