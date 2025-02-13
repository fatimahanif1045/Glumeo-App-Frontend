import { View, Text, ActivityIndicator, Button } from 'react-native'
import React, { useState } from 'react'

const ActivityIndicatorComp = () => {
    const [show, setShow] = useState(false);
    function displayLoader() {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 5000);
    }

    return (
        <View>
            <Text>Activity Indicator</Text>
            <ActivityIndicator size='large' />
            <ActivityIndicator size={200} color='blue' />
            <ActivityIndicator size={200} color='pink' animating={show} />
            <Button title='show loader' onPress={displayLoader} />
        </View>
    )
}

export default ActivityIndicatorComp