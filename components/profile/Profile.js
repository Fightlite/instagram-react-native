import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { auth, db } from '../../firebase'

const logout = async () => {
    try {
        await auth.signOut()
        console.log('Sign out')
    } catch (error) {
        console.log(error.message)
    }
}

const Profile = ({ navigation, user, posts }) => {

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <ScrollView style={{ height: '100%'}}>
                    <ProfileInformation user={user} />
                    {posts.length < 1 && <Text style={styles.aboutUser}>No Posts</Text>}
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
            </ScrollView>
        </View>
    )
}

const Header = ({ navigation }) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image
            style={styles.icon}
            source={{
            uri: "https://img.icons8.com/external-becris-lineal-becris/64/ffffff/external-left-arrow-mintab-for-ios-becris-lineal-becris.png",
            }}
        />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <Text style={styles.headerText}>...</Text>
    </View>
)

const ProfileInformation = ({user}) => {
    return (
        <View style={styles.infoContainer}>
            <Image
                source={{ uri: user?.profile_picture}}
                style={styles.avatar}
            />
            <Text style={styles.userName}>
                {user?.username}
            </Text>
            <Text style={styles.aboutUser}>
                This is a story about myself.
            </Text>
            <View style={styles.userBtnWrapper}>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => {}}>
                    <Text style={styles.userBtnTxt}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                    <Text style={styles.userBtnTxt}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.userInfoWrapper}>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>100</Text>
                    <Text style={styles.userInfoSubTitle}>Posts</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>999</Text>
                    <Text style={styles.userInfoSubTitle}>Followers</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>100</Text>
                    <Text style={styles.userInfoSubTitle}>Following</Text>
                </View>
            </View>

        </View>
    )
}

const PostCard = ({post}) => (
    <View style={styles.postContainer}>
        <Image
            style={{width: '100%', height: 400, resizeMode: 'cover',}}
            source={{ uri: post?.imageUrl }}
        />
    </View>
)



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: '3%',
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
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        paddingTop: 20,
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#ff8501',
    },

    userName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
      },
    
    aboutUser: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
      },
    
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 10,

    },
    userBtn: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
      userBtnTxt: {
        color: '#fff',
        fontSize: 14,
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
      },
    userInfoItem: {
        justifyContent: 'center',
      },
    userInfoTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
      },
      userInfoSubTitle: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
      },
      postContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
})

export default Profile
