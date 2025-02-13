import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

const ToggleComp = () => {
    const [show, setShow] = useState(true);

    return (
        <View>
            <Text style={{fontSize:30}}>Toggle Component</Text>
            <Button title='Toggle' onPress={() => setShow(!show)} ></Button>
            { show ? <User /> : null}
            <Text>show: {show}</Text>

        </View>
    )
}
const User = () => {
    let timer = setInterval(()=> console.warn('Timer Called'),3000)
    useEffect(()=>{ 
        return()=> clearInterval(timer);
    })  //componentDidUnmount

    return (
        <View>
            <Text style={{fontSize:30}}>User Component</Text>
        </View>
    )
}

export default ToggleComp
