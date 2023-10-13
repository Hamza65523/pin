// var twoSum = function(nums, target) {
//     for(let i=1;i<nums.length;i++){
//         for(let j=0;j<i;j++){
//             if(nums[i]+nums[j]==target){
//                 return[i,j]
//             }
//         }
//     }
// };
// // console.log(twoSum([2,11,15,7], 9))

let array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
// let target = 23;

// let binarySearch = (array,target)=>{
//     let l=0;
//     let r=array.length-1;
//     let mid;
//     while(r>=l){
//         mid = l+Math.floor((r-l)/2)

//         if(array[mid]==target){
//             return mid
//         }

//         if(array[mid]>target){
//             r = mid-1
//         }else{
//             l = mid+1   
//         }
//     }
//     return -1
// }
// console.log(binarySearch(array,target))

// const findlargest3element = ()=>{
//     let temp;
//     for(let i=1;i<array.length;i++){
//         for(let j=0;j<i;j++){
//             if(array[j]>array[i]){
//                 temp=array[j]
//                 array[i]=array[j]
//             }
//         }
//     }
// }

// Javascript code to implement the approach
 
// Function to find the missing number
function findMissing(arr,N){
    let i;
    let temp = [];
    for (i = 1; i <= N; i++) {
        if(arr[i]!=i){
            console.log(i);
            return i
        }
          }
          console.log(ans);
  }
   
  // Driver code
          let arr = [1, 2, 5, 6,34 ];
          let n = arr.length;
   
          // Function call
         findMissing(arr,n);
   

