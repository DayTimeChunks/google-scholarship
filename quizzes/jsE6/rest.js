/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */

// your code goes here
function average(...nums) {
    if (nums.length === 0) {
      return 0;
    } else {
      total = 0;
      for (const num of nums) {
          total += num;
      }
      return total/nums.length;
    }
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
