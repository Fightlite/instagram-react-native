import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { USERS } from '../../data/users'

const Stories = () => {
    return (
        <View >
            <ScrollView
                horizontal
                showHorizontalScrollIndicator={false}
            >
                {USERS.map((story, index) => (
                    <View key={index} style={{ alignItems: 'center', marginLeft: 10 }}>
                        <TouchableOpacity>
                            <Image source={{uri: story.image}} style={styles.story} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white' }}>
                            { story.user.length > 8 ?
                                story.user.slice(0, 8).toLowerCase() + '...' : story.user.toLowerCase() }
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <Text>Stories</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ff8501',
    }
})

export default Stories