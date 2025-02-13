import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const DialogBox = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: 'pink' }}>
            <Text>DialogBox</Text>
            <Modal transparent={true}
                visible={showModal}
                animationType='slide'
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>hello world </Text>
                        <Button title='close modal' onPress={() => setShowModal(false)} />
                    </View>
                </View>
            </Modal>
            <View style={styles.buttonView}>
                <Button title='open modal' onPress={() => setShowModal(true)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView:{
        backgroundColor:'#fff',
        padding:30,
        borderRadius:20,
        shadowColor:'Black',
        elevation:5,
    },
    modalText:{
        fontSize:28,
        marginBottom:20
    }
})

export default DialogBox