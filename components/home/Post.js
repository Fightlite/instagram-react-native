import React, { useState, useEffect, useCallback }from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native'
import { postFooterIcons } from '../../data/postFooterIcons'
import { auth, db } from '../../firebase'
import firebase from 'firebase/compat/app';
import DoubleClick from 'react-native-double-tap-without-opacity'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const Post = ({ post }) => {

    const handleLike = (post) => {
        const currentLikeStatus = !post.likes_by_users.includes(auth.currentUser.email)

        db.collection('users')
        .doc(post.user_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users: currentLikeStatus ?
                ( firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)) :
                ( firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email))
        })
        .then(() => console.log('Likes updated'))
        .catch((error) => console.error('Error updating likes', error))
    }

    return (
        <View style={{ marginBottom: 30, }}>
            <PostHeader post={post}/>
            <PostImage post={post} handleLike={handleLike}/>
            <View style={{marginTop: 10, marginHorizontal: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSections post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
            alignItems: 'center',
        }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture }} style={styles.story}/>
            <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700'}}>{post.user?.toLowerCase()}</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: '900'}}>...</Text>
    </View>
)

const AnimatedImage = Animated.createAnimatedComponent(Image)

const PostImage = ({post, handleLike }) => {
    const scale = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scale.value, 0) }]
    }))

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withSpring(0)
            }
        })
    }, [])

    return (
        <View style={{ width: '100%', height: 450}}>
            <DoubleClick 
                doubleTap={() => {
                    handleLike(post)
                    onDoubleTap()
                }} 
                delay={200}
            >
                <Animated.View >
                <ImageBackground
                    source={{ uri: post.imageUrl}}
                    style={{ height: '100%', resizeMode: 'cover', alignItems: 'center', justifyContent: 'center'}}
                >
                    <AnimatedImage
                        source={{ uri: "https://img.icons8.com/color/96/000000/heart-with-arrow--v2.png"}}
                        style={[{ height: 150, width: 150, shadowOffset: { width: 0, height: 10}, shadowOpacity: .2}, rStyle]}
                    />
                </ImageBackground>
                </Animated.View>
            </DoubleClick>
        </View>
    )
}

const PostFooter = ({ post, handleLike }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.leftFooterIcons}>
                {/* heart icon */}
                <TouchableOpacity onPress={() => handleLike(post) }>
                    <Image 
                        style={styles.footerIcon} 
                        source={{ uri: post.likes_by_users.includes(auth.currentUser.email)
                            ? postFooterIcons[0].likedImageUrl
                            : postFooterIcons[0].imageUrl
                        }}
                    />
                </TouchableOpacity>
                {/* comment icon */}
                <TouchableOpacity>
                    <Image
                        style={styles.footerIcon}
                        source={{ uri: postFooterIcons[1].imageUrl }}
                    />
                </TouchableOpacity>
                {/* share icon */}
                <TouchableOpacity>
                    <Image
                        style={styles.footerIcon}
                        source={{ uri: postFooterIcons[2].imageUrl }}
                    />
                </TouchableOpacity>

            </View>

            <TouchableOpacity>
                <Image
                    style={styles.footerIconRight}
                    source={{ uri: postFooterIcons[3].imageUrl }}
                />
            </TouchableOpacity>
        </View>
    )
}

const Likes = ({post}) => (
    <View style={{ flexDirection: 'row', marginTop: 7}}>
        <Text style={{ color: 'white' ,fontWeight: '600'}}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
)

const Caption = ({post}) => (
    <Text style={{ color: 'white', marginTop: 5}}>
        <Text style={{ fontWeight: '600'}}>{post.user}</Text>
        <Text> {post.caption}</Text>
    </Text>
)

const CommentsSections = ({post}) => (
    <View>
        {post.comments.length > 0 && (
        <Text style={{ color: 'gray', marginTop: 5 }}>
            View { post.comments.length > 1? 'all' : ''}{post.comments.length > 1? ' ' : ''}{post.comments.length} { post.comments.length > 1? 'comments' : 'comment'}
        </Text>
        )}
    </View>
)

const Comments = ({post}) => (
    <>
    {post.comments.map((comment, index) => (
        <View key={index}>
            <Text style={{ color: 'white', marginTop: 5}}>
                <Text style={{ fontWeight: '600'}}>{comment.user}</Text>
                <Text> {comment.comment}</Text>
            </Text>
        </View>
    ))}
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1.6,
        marginLeft: 6,
        borderColor: '#ff8501',
    },

    footerIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },

    footerIconRight: {
        width: 30,
        height: 30,
    },

    leftFooterIcons: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'center',
    }
})

export default Post
