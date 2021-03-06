import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Profile from '../components/profile/Profile'
import { db } from '../firebase'
import firebase from 'firebase/compat/app';


const ProfileScreen = ({ navigation }) => {
    const [ user, setUser ] = useState(null)
    const [ posts, setPosts ] = useState([])


    const getUser = async () => {
        const authUser = firebase.auth().currentUser;

        const query = await db.collection('users').where('email', '==', authUser.email).get();

        if (!query.empty) {
            const snapshot = query.docs[0];
            const data = snapshot.data();
            setUser(data);
        } else {
            // not found
        }
    }

    useEffect(() => {
        getUser();

        // fetchPosts;
        const authUser = firebase.auth().currentUser;
        const unsub = db.collectionGroup('posts')
        .where('userId', '==', authUser.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot( snapshot => {
            setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data()}) ))
        })

        // Stop listening for changes
        return () => { unsub() };

    }, [])
    
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <Profile navigation={navigation} user={user} posts={posts}/>
        </SafeAreaView>
    )
}

export default ProfileScreen
