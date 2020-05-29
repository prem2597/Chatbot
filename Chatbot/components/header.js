import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'lightblue',
    },
    title: {
        textAlign: 'center',
        color: "green",
        fontSize: 25,
        fontWeight: 'bold',
    }
})

function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Query Bot</Text>
        </View>
    )
}

export default Header

