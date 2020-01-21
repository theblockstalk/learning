// Write a function that, given two integers A and B, returns the number of integers from the range [A..B] (ends are included) which can be expressed as the product of two consecutive integers, that is X * (X + 1), for some integer X.
// Examples:
// 1. Given A = 6 and B = 20, the function should return 3. These integers are: 6 = 2 * 3, 12 = 3 * 4 and 20 = 4 * 5.
// 2. Given A = 21 and B = 29, the function should return 0. There are no integers of the form X * (X + 1) in this interval.
// Write an efficient algorithm for the following assumptions:
// - A and B are integers within the range 1..1,000,000,000
// - A ≤ B

console.log(solution(6, 20));
console.log(solution(21, 29));
console.log(solution(1, 100));
console.log(solution(100, 1000));
console.log(solution(99, 999));
console.log(solution(101, 1001));
console.log(solution(99, 1001));
console.log();
console.log(solution2(6, 20));
console.log(solution2(21, 29));
console.log(solution2(1, 100));
console.log(solution2(100, 1000));
console.log(solution2(99, 999));
console.log(solution2(101, 1001));
console.log(solution2(99, 1001));
console.log();
console.log(solution3(6, 20));
console.log(solution3(21, 29));
console.log(solution3(1, 100));
console.log(solution3(100, 1000));
console.log(solution3(99, 999));
console.log(solution3(101, 1001));
console.log(solution3(99, 1001));

function solution(A, B) {
    let count = 0;
    for (let i = 1; i < B; i++) {
        let res = i * (i+1);
        if ( res >= A && res <= B) {
            // console.log(i, i+1, res)
            count++;
        }
    }
    return count;
}

function solution2(A, B) {
    let count = 0;
    let sqrtA = Math.floor(Math.sqrt(A));
    let sqrtB = Math.floor(Math.sqrt(B));
    for (let i = sqrtA; i <= sqrtB; i++) {
        let res = i * (i+1);
        if ( res >= A && res <= B) {
            // console.log(i, i+1, res)
            count++;
        }
    }
    return count;
}

function solution3(A, B) {
    let count = 0;
    let sqrtA = Math.floor(Math.sqrt(A));
    let sqrtB = Math.floor(Math.sqrt(B));
    count = Math.max(0, sqrtB - sqrtA - 1);
    isInBound(sqrtA);
    isInBound(sqrtB);
    function isInBound(i) {
        let res = i * (i+1);
        if ( res >= A && res <= B) {
            console.log(i, i+1, res);
            count++;
        }
    }
    return count;
}
