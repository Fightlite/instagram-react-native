import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import LoginForm from '../components/loginForm/LoginForm'


const LoginScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={require('../assets/Instagram-Logo.png')} style={styles.logo}/>
        </View>
        <LoginForm navigation={navigation} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },

    logo: {
        height: 120,
        width: 120,
    },
})

export default LoginScreen
