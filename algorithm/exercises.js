//Return two indices of numbers that add up to the target.

//Hash is O(1) time. For-loop is O(n);

var twoSum = (nums, target) => {
    let container = [];
    let hash = {};
      
      for(var x = 0; x < nums.length; x++) {
          let search = target - nums[x]; 
          
          if(hash[search] !== undefined){
              container.push(hash[search]);
              container.push(x);
              return container;
          }
          
          else
              hash[nums[x]] = x; 
      }
  };


//Find the max Profit
/*
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.


*/

var maxProfit = function(prices) {
    var min = 9999;
    var maxProfit = -9999;
    for(var i = 0; i < prices.length; i++){
        if(prices[i] < min) {
            min = prices[i];
        }
        else if(prices[i] - min > maxProfit){
            maxProfit = prices[i] - min;
        }
    }
    
    if(maxProfit === -9999)
        return 0;
    return maxProfit;
    
};


/*Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
*/

var containsDuplicate = function(nums) {
    let container = {};
    for(var x = 0; x < nums.length; x++){
        if(container[nums[x]] !== undefined){
            return true;
        }
        else
            container[nums[x]] = x;
    }
    return false;
};

/*
Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
 */

var productExceptSelf = function(nums) {
    
    var last = 1;
    var temp = [];
    
    for(var x = 0; x < nums.length; x++){
        temp[x] = last;
        last *= nums[x];
    }
    
    last = 1; 
    
    for(var y = nums.length - 1; y >= 0; y--){
        temp[y] *= last;
        last *= nums[y];
    }
    
    return temp;
};


/*Palindrome */

function palindrome(str){
    var result = str.match(/([A-Za-z0-9])+/g).join('');
    result = result.toLowerCase();
    var middle = 0;
    let counter = result.length - 1;
    if((result.length - 1) % 2 === 0)
        middle = (result.length - 1) / 2;
    else
        middle = result.length / 2;
    for(var i = 0; i < middle; i++){
        if(result[i] === result[counter]){
            counter--;
        }
        else
            return false;
    }
    return true;
        
}


//Convert given number into roman numerals


function convertToRoman(num){
    const romanNumerals =  {"M" :1000, "CM":900, "D":500, "CD":400, "C":100, "XC":90, "L":50, "XL":40, "X":10, "IX":9, "V":5, "IV":4, "I":1};
    var result = "";

    for(var letter of Object.keys(romanNumerals)){
        var multiples = Math.floor(num/romanNumerals[letter]);
        num -= multiples * romanNumerals[letter]; 
        result += letter.repeat(multiples); 
    }

    return result;
};

//ROT13 Conversion

function rot13(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const converted = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const originalIndex = letter => alphabet.indexOf(letter);
    var translate = letter => {
        if(originalIndex(letter) === -1)
            return letter;
        let position = originalIndex(letter);
        return converted[position];
    }
    return str.split('').map(translate).join('');
  };
