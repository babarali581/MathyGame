import CountDown from 'react-native-countdown-component';
import {View, Button, Text} from 'react-native';

import React, {useState, useEffect} from 'react';

const timer = () => {
 // const [me, setMe] = useState(0);
  const [until, setUntil] = useState(null);
  const [checkRun , setCheckRun] = useState()
  const changeState = () => {

    if(until == 10){

        setUntil(0);
    }else{
        setUntil(10)

    }



  };

  useEffect(function(){

    console.log('until:2 ', until);
    if(until == 10){

        setUntil(0);
    }
  })

//console.log("work again ");
  return (
    <View>
      {/* {me ?( */}
      <View>
        <CountDown
          until={until === null ? 10 : until == 0 ? 0 : 10 }
          size={20}
       //   onFinish={() => alert('Finished')}
          onPress={() => alert('hello')}

          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#1CC625'}}
          timeToShow={['S']}
          timeLabels={{s: ''}}
         // running= {checkRun}
        />
        <Text>{until}</Text>
      </View>

      <View>
        <Button title="press me" onPress={() => changeState()} />
      </View>
    </View>
  );
};
export default timer;
