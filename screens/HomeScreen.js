import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import BottomTabs from '../components/home/BottomTabs'
import { db } from '../firebase'

const HomeScreen = ({ navigation }) => {
    const [ posts, setPosts ] = useState([])

    useEffect(()=> {
        const unsub = db.collectionGroup('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot( (snapshot) => {
            setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data()}) ))
        })

        // Stop listening for changes
        return () => {
            unsub()
        };

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </ScrollView>
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'black',
        flex: 1,
    },
})

export default HomeScreen
