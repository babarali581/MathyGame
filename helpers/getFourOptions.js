import {RandomNumber} from './randomNumber';
function hasDecimal(num) {
  return !!(num % 1);
}

export function getFourOptions(rightAnswer) {
  const one = RandomNumber(1, 10);
  const two = RandomNumber(1, 10);
  const three = RandomNumber(1, 10);
  const four = three;
  const five = one;

  let finalResp = [one, two, three, four, five];
  //algo to get all values in negative
  if (rightAnswer < 0) {
    finalResp = finalResp.map(e => {
      return -e;
    });
  }
  //algo to get all values in hasDecimal

  if (hasDecimal(rightAnswer)) {
    const randomNumb = RandomNumber(1, 10);
    finalResp = finalResp.map(e => {
      let resp = e / randomNumb;
      return resp.toFixed(2);
    });
  }

  //if correct answer have more numbers than

  finalResp = finalResp.map(eachNumb => {
    let lengthOfExtraNumb = rightAnswer.toString().length;
    let lengthOfEachOption = eachNumb.toString().length;

    let checkMinlengthOfExtraNumb = lengthOfExtraNumb - lengthOfEachOption;

    if (checkMinlengthOfExtraNumb > 0) {
      let setOfNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      setOfNums.sort(() => Math.random() - 0.5);

      for (let i = 0; i < checkMinlengthOfExtraNumb; i++) {
        eachNumb = `${eachNumb}${setOfNums[i]}`;
      }
      console.log('eachNumb: ', eachNumb);
    }
    return eachNumb
  });

  console.log('finalResp: ', finalResp);
  return finalResp;
}
