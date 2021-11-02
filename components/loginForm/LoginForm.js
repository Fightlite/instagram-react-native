import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { auth, db } from '../../firebase'

import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'

const LoginForm = ({navigation}) => {

    const onLogin = async ( email, password ) => {
        try {
            await auth.signInWithEmailAndPassword( email, password)
            console.log('Firebase log in successfully', email)

            db.collection('users')
            .get()
            .then()
            
        } catch (error) {
            Alert.alert(
                'Oops!!!!',
                error.message + '\n\n ... What would you like to do next?',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        style: 'cancel'
                    },
                    {
                        text: 'Sign Up',
                        onPress: () => navigation.push('SignupScreen')
                    }
                ]
            )
        }
    }

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(8, 'Your password has to be at least 8 characters')
    })

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={values => {
                    onLogin( values.email, values.password )
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
                <>
                    <View style={[
                        styles.inputField,
                        { borderColor:
                            values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                        }
                    ]}
                    >
                        <TextInput
                            placeholder="Phone number, username or email"
                            placeholderTextColor='#444'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoFocused={true}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    <View style={[
                        styles.inputField,
                        { borderColor:
                            1 > values.password.length || values.password.length >= 8 ? '#ccc' : 'red'
                        }
                    ]}
                    >
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor='#444'
                            autoCapitalize='none'
                            textContentType='password'
                            secureTextEntry={true}
                            autoCorrect={false}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>
                    <View style={{alignItems: 'flex-end', marginBottom: 30}}>
                        <TouchableOpacity>
                            <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={styles.button(isValid)}
                        titleSize={20} 
                        onPress={handleSubmit}
                    >
                        <Text style={{color: '#fff', fontWeight: '600', fontSize: 20}}>Log in</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                            <Text style={{ color: '#6BB0F5'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },

    inputField: {
        borderRadius: 5,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },

    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 5,
    }),

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },


})

export default LoginForm
