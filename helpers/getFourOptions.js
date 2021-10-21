import {RandomNumber} from "./randomNumber"
function hasDecimal (num) {
	return !!(num % 1);
}

export function getFourOptions (rightAnswer){
    console.log("inside get four Options bab");
    console.log('rightAnswer: ', rightAnswer);
    const one = RandomNumber(1, 10);
    const two = RandomNumber(1, 10);
    const three = RandomNumber(1, 10);
    const four = three;
    const five = one;
  
    let finalResp = [one, two, three, four, five];
    //algo to get all values in negative
    if(rightAnswer < 0){
        finalResp =   finalResp.map((e)=> {

            return -e
        })
    }
    //algo to get all values in hasDecimal

     if(hasDecimal(rightAnswer) ){
        const randomNumb = RandomNumber(1, 10);
        finalResp =   finalResp.map((e)=> {
           let resp = e/randomNumb
            return resp.toFixed(2);
        })
    
     }



    return finalResp
  };
  