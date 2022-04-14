'use strict';

const isPrimeNumber = (number) => {
  for (let index = 2; index < number; index += 1) {
    if (number % index === 0) {
      return console.log(`Value ${number} is not prime`);
    }
    // return value !== 1 && value !== 0
  }
  number > 1 && console.log(`Value ${number} is prime`);
};

const isPrimeValue = (value) => {
  const isArray = Array.isArray(value);
  if (isArray) {
    for (let index = 0; index < value.length; index += 1) {
      isPrimeNumber(value[index]);
    }
  } else if (typeof value === 'number') {
    isPrimeNumber(value);
  } else {
    console.log('Wrong value type!');
  }
};
