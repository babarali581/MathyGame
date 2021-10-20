
import {RandomNumber} from "./randomNumber"
import {getFourOptions} from "../helpers/getFourOptions"

export function changeOptionsStructure(rightAnswer){

    let getRandomNum = RandomNumber(1, 4);

    let fourOptions = getFourOptions();

    let finalArray = [];

    for (let i = 1; i < 5; i++) {
      if (i === getRandomNum) {
        finalArray.push(rightAnswer);
      } else {
        finalArray.push(fourOptions[i]);
      }
    }

    //unflatten array

    let unFlatten = [];
    finalArray.reduce((acc, e, i) => {
      if (i === 0) {
        return [...acc, [e]];
      }
      let lastArray = acc[acc.length - 1];
      if (lastArray.length === 1) {
        unFlatten.push([...lastArray, e]);
        return [...acc, [...lastArray, e]];
      }
      return [...acc, [e]];
    }, []);

  return unFlatten

}