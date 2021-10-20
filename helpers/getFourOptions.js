import {RandomNumber} from "./randomNumber"


export function getFourOptions (){
    const one = RandomNumber(1, 10);
    const two = RandomNumber(1, 10);
    const three = RandomNumber(1, 10);
    const four = three;
    const five = one;
  
    return [one, two, three, four, five];
  };
  