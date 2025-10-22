import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Button = ({ text, path }: { text: string, path:string }) => {
    return (
        <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => router.replace({path})}
        >
            <Text style={styles.nextText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    nextBtn: {
        backgroundColor: "#F86241",
        paddingVertical: 15,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
        marginTop: 50
    },
    nextText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});