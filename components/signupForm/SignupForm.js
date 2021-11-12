import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { auth, db } from '../../firebase'

import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'

const SignupForm = ({navigation}) => {

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async ( username, email, password ) => {
        try {
            const authUser = await auth.createUserWithEmailAndPassword( email, password)
            console.log('Firebase signed up successfully', email)

            db.collection('users')
            .doc(authUser.user.email)
            .set({
                user_uid: authUser.user.uid,
                username: username,
                email: email,
                profile_picture: await getRandomProfilePicture(),
            })
            
        } catch (error) {
            Alert.alert('Oops!!!!', error.message)
        }
    }

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(5, 'As username is required'),
        password: Yup.string().required().min(8, 'Your password has to be at least 8 characters')
    })

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                onSubmit={values => {
                    onSignup( values.username, values.email, values.password )
                }}
                validationSchema={SignupFormSchema}
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
                            placeholder="Email"
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
                            values.username.length < 1 || values.username.length >= 5 ? '#ccc' : 'red'
                        }
                    ]}
                    >
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor='#444'
                            autoCapitalize='none'
                            textContentType='username'
                            autoFocused={true}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
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
                            secureTextEntry={true}
                        />
                    </View>

                    <Pressable
                        style={styles.button(isValid)}
                        titleSize={20} 
                        onPress={handleSubmit}
                    >
                        <Text style={{color: '#fff', fontWeight: '600', fontSize: 20}}>Sign Up</Text>
                    </Pressable>

                    <View style={styles.signinContainer}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                            <Text style={{ color: '#6BB0F5'}}>Sign In</Text>
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
        marginTop: 30,
    }),

    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
})

export default SignupForm
