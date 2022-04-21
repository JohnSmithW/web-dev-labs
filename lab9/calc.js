'use strict'


const checkOperator = (value) => {

}

const calc = (value) => {

  
  const regExp = /\(([^)]+)\)/g;
  const matches = value.match(regExp);
  const result = [];
  for (let index = 0; index < matches.length; index += 1) {
    result.push(matches[index].substring(1, matches[index].length - 1));
  }

 
  console.log(result);

}