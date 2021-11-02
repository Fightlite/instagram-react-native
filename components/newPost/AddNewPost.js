import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FormUploader from './FormUploader'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormUploader navigation={navigation}/>
    </View>
)

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image
                style={styles.icon}
                source={{
                uri: "https://img.icons8.com/external-becris-lineal-becris/64/ffffff/external-left-arrow-mintab-for-ios-becris-lineal-becris.png",
                }}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <Text style={styles.headerText}>...</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    icon: {
        width: 25,
        height: 25,
    },

    headerText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    }

})

export default AddNewPost
