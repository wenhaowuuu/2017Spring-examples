/* =====================
# Lab 2, Part 2 — Underscore Each Function

## Introduction

Up to this point, we have used Javascript's for loop to loop through data. Underscore's _.each function provides us with an easy to read, simple way to accomplish the same goal.

## Task

Find two previous labs that use for loops. Rewrite these labs to use _.each.



## Syntax
You can see an example of how to use ._each in the underscore documentation: http://underscorejs.org/#each and in the code below.

var myArray = [1, 10, 100, 1000];

_.each(myArray, function(value, key, list) {
  console.log(value, key, list);
});
===================== */
//loop1;

var list = [1,2,3,4,5,6,7,8,9,10];
_.each(list,function(item){
    if (item%3===0 && item%5===0){
      console.log('FizzBuzz');
    }
    else if (item%3===0){
      console.log('Fizz');
    }
    else if (item%5===0){
      console.log('Buzz');
    }
    else console.log('value',item);
});

// var data = [1,2,3,5,6,7,8,9,10];
// _.each(data,function(value){
//   if (value%3===0 && value%5===0){
//   console.log('FizzBuzz');
//   }
//   else if (value%3 === 0){
//   console.log('Fizz');
//   }
//   else if (value%5 === 0){
//   console.log('Buzz');
//   }
//   else console.log('value',value);
// });

//loop2;
var c = prompt("input the sample number");
var array = [1, 2, 3, 4, 5, 4, 4];
var result = _.filter(array,function(value){
    return value == c;});
//questions? Can we do this without using reduce?
console.log(result);
console.log(c + ' appears this many times here: ', result.length);
