/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {View, StyleSheet, Text , TouchableOpacity} from 'react-native';
 import {RandomNumber} from '../helpers/randomNumber';
 // import Timer from '../childComponents/Timer'
 import {changeOptionsStructure} from '../helpers/changeOptionsStructure';
 //import { Icon } from 'react-native-elements'
 import CountDown from 'react-native-countdown-component';
 
 const App = ({route, navigation}) => {
   console.log("route.params'';", route.params);
   const type = route.params.type.toUpperCase() || 'ADD';
   console.log('type: ', type);
   const [selectedIndex, setSelectedIndex] = useState('');
   const [selectedAnswer, setSelectedAnswer] = useState('');
   const [options, setOptions] = useState(null);
   const [firstNum, setFirstNum] = useState(null);
   const [secondNum, setSecondNum] = useState(null);
   const [correctAnswer, setCorrectAnswer] = useState(null);
   const [totalQuestions, setTotalQuestions] = useState(10);
   const [attemptedQuestions, setAttemptedQuestions] = useState(0);
   const [rightAnswer, setRightAnswer] = useState(0);
   const [wrongAnswer, setWrongAnswer] = useState(0);
   const [seconds, setSeconds] = useState(10);
   const [until, setUntil] = useState(null);
   const [finishTime, setFinishTime] = useState(false);
   const [colorIndex, setColorIndex] = useState(1);
   const [colors , setColors] = useState(["#AC2A2A" , "#852AAC" , '#1259FF' , "#B22222"]);
   useEffect(() => {
     if (options === null) {
       const firstNumb = RandomNumber(1, 10);
       const secondNum = RandomNumber(1, 10);
       let correctAnswer;
       if (type === 'ADD') {
         correctAnswer = firstNumb + secondNum;
       } else if (type === 'SUBTRACT') {
         correctAnswer = firstNumb - secondNum;
       } else if (type === 'MULTIPLY') {
         correctAnswer = firstNumb * secondNum;
       } else if (type === 'DIVIDE') {
         correctAnswer = firstNumb / secondNum;
       }
       setFirstNum(firstNumb);
       setSecondNum(secondNum);
       setCorrectAnswer(correctAnswer);
       getSetOfAnswers(correctAnswer);
          if(until == 10){
 
            setUntil(9);
        }
      // changeState();
     }
   });
 
   const changeState = () => {
       console.log('until ==> ', until);
     if (until == 10) {
       setUntil(9);
     } else {
       setUntil(10);
     }
   };
   const selectAnswer = (userSelectedIndex, selectAnswer) => {
     setSelectedIndex(userSelectedIndex);
     setSelectedAnswer(selectAnswer);
 
     if (selectAnswer === correctAnswer) {
       setRightAnswer(rightAnswer + 1);
     } else {
       setWrongAnswer(wrongAnswer + 1);
     }
     changeState();
    //  console.log('colorIndex: ----------------- ', colorIndex);
    //  console.log('colors.length: ', colors.length);
    //  if(colorIndex === colors.length){
    //      console.log("000000");
    //     setColorIndex(0)
    // }
     setTimeout(() => {
       setSelectedIndex(null);
       setFirstNum(null);
       setSecondNum(null);
       setOptions(null);
       setAttemptedQuestions(attemptedQuestions + 1);
       if(colorIndex + 1 === colors.length){
       setColorIndex(0)
   }else{
       setColorIndex(colorIndex + 1)
   }
     }, 1000);

    
   };
 
   const getSetOfAnswers = rightAnswer => {
     let unFlatten = changeOptionsStructure(rightAnswer);
 
     setOptions(unFlatten);
   };
   const afterFinishCounter = () => {
   console.log("inside after finish time");
    // setFinishTime(true);
    // selectAnswer(null , null)
 
   };
   const startAgain = () => {
    setSelectedIndex(null);
    setFirstNum(null);
    setSecondNum(null);
    setOptions(null);
    setFinishTime(false)
    changeState()
   }
   let sign = '';
   if (type === 'ADD') {
     sign = '+';
   } else if (type === 'SUBTRACT') {
     sign = '-';
   } else if (type === 'MULTIPLY') {
     sign = '*';
   } else if (type === 'DIVIDE') {
     sign = '/';
   }
 
  let totalLengthColors = colors.length
  let bgColor = totalLengthColors - colorIndex
  //console.log('bgColor: ', bgColor);

  console.log('bgColor: ', bgColor);
  console.log('colors[bgColor]: ', colors[colorIndex]);
 
   return (
     // firstNum &&
     // secondNum && (
     <View style={{...styles.container , backgroundColor:colors[colorIndex]}}>
       <Text style={styles.headingText}>
         {attemptedQuestions}/{totalQuestions}
       </Text>
       <View>
         <CountDown
           until={until === null ? 10 : until == 9 ? 9 : 10}
           size={20}
           //until={0}
           onFinish={() => afterFinishCounter() }   //selectAnswer(null , null)
 
           digitStyle={{backgroundColor: colors[colorIndex]}}
          // digitTxtStyle={{color: '#1CC625'}}
           timeToShow={['S']}
           timeLabels={{s: ''}}
           // running= {checkRun}
         />
       </View>
       {finishTime ? (
        <View style={styles.TryAgainContainer}>
         <Text style={styles.TimeOutText}> TIME OUT </Text>
         <TouchableOpacity onPress={((e)=>startAgain())}><Text style={styles.TryAgainText}>Try Again </Text></TouchableOpacity>
         </View>
       ) : (
         <View >
           <View style={styles.rightWrong}>
            <View style= {{flexDirection: 'row'}}>
               <Text style={styles.rightCount}>Right</Text>
               <Text style={styles.rightWrongCount}> {rightAnswer}</Text>
            </View>
            <View style= {{flexDirection: 'row'}}>

             <Text style={styles.wrongCount}>Wrong</Text>
             <Text style={styles.rightWrongCount}>{wrongAnswer}</Text>
            
             </View>

           </View>
           <Text style={styles.questionText}>
             {firstNum} {sign} {secondNum}
           </Text>
 
           {options &&
             options.map((twoValues, i) => {
              
               return (
                 <View key={i} style={{...styles.mainText}}>
                   {twoValues.map((each, j) => {
                     if (selectedIndex === `${i}${j}`) {
                       if (correctAnswer === each) {
                         return (
                           <TouchableOpacity key={j} style={styles.correctAnswer}
                           onPress={() => selectAnswer(`${i}${j}`, each)}

                           >
                             <Text
                               style={styles.textToCenter}
                            //   onPress={() => selectAnswer(`${i}${j}`, each)}
                            >
                               {each}
                             </Text>
                           </TouchableOpacity>
                         );
                       } else {
                         return (
                           <TouchableOpacity key={j} style={styles.wrongAnswer}
                           onPress={() => selectAnswer(`${i}${j}`, each)}
 
                           >
                             <Text
                               style={styles.textToCenter}
                               >
                               {each}
                             </Text>
                           </TouchableOpacity>
                         );
                       }
                     } else {
                       return (
                         <TouchableOpacity key={j} style={styles.halfDiv}
                         onPress={() => selectAnswer(`${i}${j}`, each)}

                         >
                           <Text
                             style={styles.textToCenter}
                             //onPress={() => selectAnswer(`${i}${j}`, each)}
                             >
                             {each}
                           </Text>
                         </TouchableOpacity>
                       );
                     }
                   })}
                 </View>
               );
             })}
         </View>
       )}
     </View>
   );
   //);
 };
 
 const styles = StyleSheet.create({
   container: {
    // backgroundColor: colors[0],//"#FF6666",//'lightblue', //'#B4D2D7',
     height: '100%',
     width: '100%',
   },
   bigBlue: {
     color: 'blue',
     fontWeight: 'bold',
     fontSize: 30,
   },
 
   input: {
     height: 40,
     margin: 12,
     borderWidth: 0,
     padding: 10,
   },
 
   mainText: {
     flexDirection: 'row',
     borderWidth: 0,
     display: 'flex',
     height: '20%',
   },
   halfDiv: {
     width: '50%',
     borderWidth: 0.5,
     backgroundColor: 'white',
     backgroundColor: '#24a0ed'
   },
   correctAnswer: {
     backgroundColor: 'green',
     width: '50%',
  //   borderWidth: 0.5,
   },
   wrongAnswer: {
     backgroundColor: 'red',
     width: '50%',
     textAlign: 'center',
  //   borderWidth: 0.5,
   },
   questionText: {
     marginTop: '50%',
     textAlign: 'center',
     fontSize: 28,
     color: 'white',
   },
   headingText: {
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 18,
     marginTop: 0,
     backgroundColor: 'yellow',
   },
   textToCenter: {
     textAlign: 'center',
     fontSize: 28,
   },
   rightWrong: {
     display: 'flex',
    // borderWidth: 5,
     flexDirection: 'column',
   },
 
   rightCount: {
     //    width: "50%",
     textAlign: 'left',
     color: 'white',
     fontSize: 22,
   },
   wrongCount: {
     //  width: "10%",
     textAlign: 'left',
     color: 'white',
    // marginLeft: '2%',
     fontSize: 22,
   },
 
   iconColor: {
     color: 'red',
   },
   rightWrongCount: {
     color: 'white',
     fontSize: 22,
   },
   TryAgainContainer: {
    backgroundColor: "lightblue",
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TimeOutText: {
    fontSize: 40,
    fontWeight: "bold"
  },
  TryAgainText: {
    fontSize: 30,
    fontWeight: "bold"
  }
 });
 
 export default App;
 