import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Text, Button } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import validUrl from 'valid-url'
import { auth, db } from '../../firebase'
import firebase from 'firebase/compat/app';


const PLACEHOLDER_IMG = 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character')
})

const FormUploader = ({navigation}) => {
    const [ thumbnailUrl, setThumbnailUrl ] = useState(PLACEHOLDER_IMG)
    const [ currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = auth.currentUser
        const unsubscribe = db.collection('users')
            .where('user_uid', '==', user.uid)
            .limit(1)
            .onSnapshot( snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            }))

        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = ( imageUrl, caption ) => {
        const unsubscribe = db.collection('users')
            .doc(auth.currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                caption: caption,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
                user_uid: auth.currentUser.uid,
                user_email: auth.currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: [],
            })
            .then(() => navigation.goBack())
        return unsubscribe
    }

    return (
        <Formik
            initialValues={{ imageUrl: '', caption: '' }}
            onSubmit={(values) => {
                uploadPostToFirebase( values.imageUrl, values.caption )
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Image
                            source={{ 
                                uri: validUrl.isUri(thumbnailUrl)
                                ? thumbnailUrl 
                                : PLACEHOLDER_IMG}}
                            style={{ width: 100, height: 100 }}
                        />
                        <View style={{ flex: 1, marginLeft: 12}}>
                            <TextInput
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder='Write a caption'
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <TextInput
                        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'white', fontSize:18 }}
                        placeholder='Enter image url'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ color: 'red', fontSize: 15 }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button
                        onPress={handleSubmit}
                        title='Share'
                        disabled={!isValid}
                    />
                </>
            )}
        </Formik>
    )
}

export default FormUploader
