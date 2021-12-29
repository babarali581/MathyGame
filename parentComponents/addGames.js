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
    '#EA13DD',
    '#D35400',
    '#F4D03F',
    '#9B59B6',
    '#40E0D0',
  ]);
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
        correctAnswer = correctAnswer.toFixed(2);
      }
      setFirstNum(firstNumb);
      setSecondNum(secondNum);
      setCorrectAnswer(correctAnswer);
      getSetOfAnswers(correctAnswer);
      if (until == 10) {
        setUntil(9);
      }
    }
  });

  const changeState = () => {
    console.log('inside change state');
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
    } else if (userSelectedIndex === 'LAST') {
      setFinishTime(true);

      setAttemptedQuestions(0);
      setUntil(0);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }

    if (totalQuestions - 1 <= attemptedQuestions) {
      setFinishTime(true);

      setAttemptedQuestions(0);
      setUntil(0);
    } else {
      setTimeout(() => {
        if (userSelectedIndex !== 'LAST') {
          changeState();
        }
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
    }
  };

  const getSetOfAnswers = rightAnswer => {
    let unFlatten = changeOptionsStructure(rightAnswer);

    setOptions(unFlatten);
  };
  const afterFinishCounter = () => {
    if (totalQuestions == 10 && attemptedQuestions == 9) {
      selectAnswer('LAST', null);
    } else {
      selectAnswer(null, null);
    }
  };
  const startAgain = () => {
    setSelectedIndex(null);
    setFirstNum(null);
    setSecondNum(null);
    setOptions(null);
    setFinishTime(false);
    setRightAnswer(0);
    setWrongAnswer(0);
    setAttemptedQuestions(0);
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
  let checkIfPass = rightAnswer < (totalQuestions * 80) / 100 ? 'FAIL' : 'PASS';
  let bgColorOfTryAgain = checkIfPass == 'PASS' ? 'green' : 'red';
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: !finishTime ? colors[colorIndex] : 'black',
      }}>
      <Text style={styles.headingText}>
        {attemptedQuestions}/{totalQuestions}
      </Text>
      <View>
        <CountDown
          until={until === null ? 10 : until == 9 ? 9 : until}
          size={20}
          //until={0}
          onFinish={() => afterFinishCounter()} //selectAnswer(null , null)
          digitStyle={{
            backgroundColor: !finishTime ? colors[colorIndex] : 'black',
          }}
          // digitTxtStyle={{color: '#1CC625'}}
          timeToShow={['S']}
          timeLabels={{s: ''}}
          // running= {checkRun}
        />
      </View>
      {finishTime ? (
        <View style={styles.parentTryAgain}>
          <Text style={styles.TryAgainText}> 80% Required To Pass </Text>

          <View
            style={{
              ...styles.TryAgainContainer,
              backgroundColor: bgColorOfTryAgain,
            }}>
            <Text style={styles.TimeOutText}>
              {' '}
              {rightAnswer < (totalQuestions * 80) / 100 ? 'Fail' : 'PASS'}
            </Text>
            <Text style={styles.TimeOutText}>
              {' '}
              Total {rightAnswer + wrongAnswer}
            </Text>
            <Text style={styles.TimeOutText}> Right {rightAnswer}</Text>
            <Text style={styles.TimeOutText}> Wrong {wrongAnswer}</Text>
          </View>
          <TouchableOpacity onPress={e => startAgain()}>
            <Text style={styles.TryAgainText}>Start Again </Text>
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
              <Text style={styles.rightWrongCount}> {wrongAnswer}</Text>
            </View>
          </View>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              {firstNum} {sign} {secondNum}
            </Text>
          </View>
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
                          <Text style={styles.textToCenter}>{each}</Text>
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
    borderWidth: 6,
    borderColor: 'white',
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
    borderColor: 'white',
    backgroundColor: '#24a0ed',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 50,
  },
  correctAnswer: {
    backgroundColor: 'green',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,

    //   borderWidth: 0.5,
  },
  wrongAnswer: {
    backgroundColor: 'red',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,

    //   borderWidth: 0.5,
  },
  questionText: {
    marginTop: '0%',
    textAlign: 'center',
    fontSize: 58,
    color: 'white',
  },
  question: {
    height: '20%',
  },
  headingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    color: 'white',
    backgroundColor: 'black', //'yellow',
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
    marginLeft: 5,
  },
  wrongCount: {
    textAlign: 'left',
    color: 'white',
    fontSize: 22,
    marginLeft: 5,
  },

  iconColor: {
    color: 'red',
  },
  rightWrongCount: {
    color: 'white',
    fontSize: 22,
  },
  TryAgainContainer: {
    //  width: '70%',
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 22,
    borderColor: 'black',
    borderRadius: 1000,
  },
  parentTryAgain: {
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  TimeOutText: {
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TryAgainText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
