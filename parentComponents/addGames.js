/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RandomNumber} from '../helpers/randomNumber';
import {changeOptionsStructure} from '../helpers/changeOptionsStructure';
import CountDown from 'react-native-countdown-component';

const App = ({route, navigation}) => {
  const type = route.params.type.toUpperCase() || 'ADD';
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
  const [until, setUntil] = useState(null);
  const [finishTime, setFinishTime] = useState(false);
  const [colorIndex, setColorIndex] = useState(1);
  const [colors, setColors] = useState([
    '#AC2A2A',
    '#852AAC',
    '#1259FF',
    '#B22222',
  ]);
  useEffect(() => {
    console.log('totalQuestions ', totalQuestions);
    console.log('attemptedQuestions ', attemptedQuestions);

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
        correctAnswer = correctAnswer.toFixed(2);
      }
      setFirstNum(firstNumb);
      setSecondNum(secondNum);
      setCorrectAnswer(correctAnswer);
      getSetOfAnswers(correctAnswer);
      if (until == 10) {
        setUntil(9);
      }
      // changeState();
    }
  });

  const resetGame = () => {
    setTotalQuestions(0);
    setAttemptedQuestions(0);
    setRightAnswer(0);
    setWrongAnswer(0);
    setSelectedIndex(null);
    setFirstNum(null);
    setSecondNum(null);
    setOptions(null);

    if (colorIndex + 1 === colors.length) {
      setColorIndex(0);
    } else {
      setColorIndex(colorIndex + 1);
    }
  };
  const changeState = () => {
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

    console.log('totalQuestions: ', totalQuestions);
    console.log('attemptedQuestions: ', attemptedQuestions);
    // if (totalQuestions == attemptedQuestions) {
    //     console.log("both are eaqualss bab");
    //   setTotalQuestions(0);
    //   setAttemptedQuestions(0);
    //   setRightAnswer(0);
    //   setWrongAnswer(0);
    // } else {
      setTimeout(() => {
        changeState();
        setSelectedIndex(null);
        setFirstNum(null);
        setSecondNum(null);
        setOptions(null);
        setAttemptedQuestions(attemptedQuestions + 1);
        if (colorIndex + 1 === colors.length) {
          setColorIndex(0);
        } else {
          setColorIndex(colorIndex + 1);
        }
      }, 100);
   // }
  };

  const getSetOfAnswers = rightAnswer => {
    let unFlatten = changeOptionsStructure(rightAnswer);

    setOptions(unFlatten);
  };
  const afterFinishCounter = () => {
   // setFinishTime(true);
    // selectAnswer(null , null)
  };
  const startAgain = () => {
    setSelectedIndex(null);
    setFirstNum(null);
    setSecondNum(null);
    setOptions(null);
    setFinishTime(false);
    changeState();
  };
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


  return (
    
    <View style={{...styles.container, backgroundColor: colors[colorIndex]}}>
      <Text style={styles.headingText}>
        {attemptedQuestions}/{totalQuestions}
      </Text>
      <View>
        <CountDown
          until={until === null ? 10 : until == 9 ? 9 : 10}
          size={20}
          //until={0}
          onFinish={() => afterFinishCounter()} //selectAnswer(null , null)
          digitStyle={{backgroundColor: colors[colorIndex]}}
          // digitTxtStyle={{color: '#1CC625'}}
          timeToShow={['S']}
          timeLabels={{s: ''}}
          // running= {checkRun}
        />
      </View>
      {finishTime ? (
        <View
          style={{
            ...styles.TryAgainContainer,
            backgroundColor: colors[colorIndex],
          }}>
          <Text style={styles.TimeOutText}> TIME OUT </Text>
          <TouchableOpacity onPress={e => startAgain()}>
            <Text style={styles.TryAgainText}>Try Again </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.rightWrong}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rightCount}>Right</Text>
              <Text style={styles.rightWrongCount}> {rightAnswer}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
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
                          <TouchableOpacity
                            key={j}
                            style={styles.correctAnswer}
                            onPress={() => selectAnswer(`${i}${j}`, each)}>
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
                          <TouchableOpacity
                            key={j}
                            style={styles.wrongAnswer}
                            onPress={() => selectAnswer(`${i}${j}`, each)}>
                            <Text style={styles.textToCenter}>{each}</Text>
                          </TouchableOpacity>
                        );
                      }
                    } else {
                      return (
                        <TouchableOpacity
                          key={j}
                          style={styles.halfDiv}
                          onPress={() => selectAnswer(`${i}${j}`, each)}>
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
    height: '30%',
  },
  halfDiv: {
    width: '50%',
    borderWidth: 0.5,
    backgroundColor: 'white',
    backgroundColor: '#24a0ed',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

  },
  correctAnswer: {
    backgroundColor: 'green',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',

    //   borderWidth: 0.5,
  },
  wrongAnswer: {
    backgroundColor: 'red',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
     alignItems: 'center'
    //   borderWidth: 0.5,
  },
  questionText: {
    marginTop: '0%',
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
    flexDirection: 'column',
  },

  rightCount: {
    textAlign: 'left',
    color: 'white',
    fontSize: 22,
  },
  wrongCount: {
    textAlign: 'left',
    color: 'white',
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
    backgroundColor: 'lightblue',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeOutText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  TryAgainText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
