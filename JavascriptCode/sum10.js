const nums = [1,2,3,4,5,6,7,8,9,10,11,12]
function targetSum(nums, target, temp) {
    let sum;
    temp = temp || [];

    sum = temp.reduce((a, b) => {
      return a + b
    }, 0);
  
    if (sum == target) {
      console.log(temp)
    }
  
    if (sum >= target) {
      return;  
    }

    for (let i = 0; i < nums.length; i++) {
      targetSum(nums.slice(i+1), target, temp.concat(nums[i]));
    }
  }
  
  targetSum(nums,10);

