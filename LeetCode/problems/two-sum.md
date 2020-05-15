#### 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例：  

```
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

##### 暴力法：
* 使用两层循环，外层循环计算当前元素与 targettarget 之间的差值，内层循环寻找该差值，若找到该差值，则返回两个元素的下标。
* 时间复杂度：O(n^2)

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
		for(let j = i + 1; j < nums.length; j++) {
			if(target === nums[i] + nums[j]) {
				return [i, j]
			}
		}
	}
};
```

##### 利用数组减少查询时间
* 在暴力法中，内层循环查找差值很浪费时间，那么如何减少查询时间呢？利用数组就可以减少查询时间
* 使用一层循环，每遍历到一个元素就计算该元素与 targettarget 之间的差值 difdif，然后以 difdif 为下标到数组temp中寻找，如果 temp[dif] 有值(即不是 undefinedundefined)，则返回两个元素在数组 numsnums 的下标，如果没有找到，则将当前元素存入数组 temptemp 中(下标: nums[i], Value: inums[i],Value:i) 
* 时间复杂度：O(n)

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let temp = [];
    for(let i = 0; i < nums.length; i++){
        let dif = target - nums[i];
        if(temp[dif] != undefined){
            return [temp[dif], i];
        }
        temp[nums[i]] = i;
    }
};
```