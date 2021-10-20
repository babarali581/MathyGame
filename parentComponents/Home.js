import React from 'react';
import {View , Text ,Button , StyleSheet  , TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Home = ({ navigation }) => {

    let upperPosition = ["add" , "subtract" ]
    let lowerPosition = ["multiply" , "divide" ]
  
    let lightColors = ["#26F634" ,"#26F6E1" , "#E8F626" , "#F5258D"]
    lightColors.sort(() => Math.random() - 0.5);

let upperValues =  upperPosition.map((e , i)=>{

    return (
        <TouchableOpacity onPress={()=> navigation.navigate('Game',{type : e})} key={i} style={{...styles.eachOptions ,backgroundColor: lightColors[i]}}><Text >{e}</Text></TouchableOpacity>

    )
  })

  let lowerValues =  lowerPosition.map((e ,i)=>{

    return (
        <TouchableOpacity onPress={()=> navigation.navigate('Game',{type : e})} key={i} style={{...styles.eachOptions ,backgroundColor: lightColors[i+2]}} ><Text>{e}</Text></TouchableOpacity>

    )
  })
    return(
       <View style={styles.container}>
           <View style={styles.manageButtons} >
           {upperValues}
           </View>
           <View style={styles.manageButtons} >
             {lowerValues}
           </View>

       
       </View>
    )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    manageButtons : {
     flexDirection: 'row',
     height: "30%",

    },
    eachOptions: {

        width: "40%",
        borderWidth: 1,
        border: "4px solid black",
        justifyContent: 'center',
        alignItems: 'center'
    }


})
export default Home
