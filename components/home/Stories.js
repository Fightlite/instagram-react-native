import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'

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
                        <Image source={{uri: story.image}} style={styles.story} />
                        <Text style={{ color: 'white' }}>
                            { story.user.length > 10 ?
                            story.user.slice(0, 9).toLowerCase() + '...' : story.user.toLowerCase() }
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