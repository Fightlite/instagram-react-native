import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase'

const Header = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image 
                    style={styles.logo}
                    source={require('../../assets/header-logo.png')}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image 
                        style={styles.icon}
                        source={{ uri: "https://img.icons8.com/material-outlined/24/ffffff/plus--v1.png"}}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadBadege}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image 
                        style={styles.icon}
                        source={{ uri: "https://img.icons8.com/material-outlined/24/ffffff/facebook-messenger--v1.png"}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    iconsContainer: {
        flexDirection: 'row',
    },

    logo: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
    },

    icon: {
        height: 30,
        width: 30,
        marginLeft: 15,
        resizeMode: 'contain',
    },

    unreadBadege: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        zIndex: 100,
    },

    unreadBadgeText: {
        color: 'white',
    }
})

export default Header