import { View, Text, StatusBar, Button } from 'react-native'
import React, { useState } from 'react'

const StatusBarComp = () => {
    const [hide, setHide] = useState(false);
    const [barStyle, setBarStyle] = useState('default');
  return (
    <View style={{flex:1, justifyContent:'center'}}>
        <StatusBar
        backgroundColor='green'
        hidden={hide}
        barStyle={barStyle}
        />
      <Button title='Toggle Status Bar' onPress={()=>setHide(!hide)}/>
      <Button title='Update Style' onPress={()=>setBarStyle('dark-content')}/>
    </View>
  )
}

export default StatusBarComp