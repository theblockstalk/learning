// You are given an implementation of a function:
// function solution(A);
// which accepts as input a non-empty zero-indexed array A consisting of N integers.
// The function works slowly on large input data and the goal is to optimize it so as to achieve better time and/or space complexity. The optimized function should return the same result as the given implementation for every input that satisfies the assumptions.
// For example, given array A such that:
// A[0] = 4
//   A[1] = 6
//   A[2] = 2
//   A[3] = 2
//   A[4] = 6
//   A[5] = 6
//   A[6] = 1</tt>
// the function returns 4.
// Also, for given array A such that:
// A[0] = 2
//   A[1] = 2
//   ...
//   A[49999] = 2
//   A[50000] = 2
// in other words, A[K] = 2 for each K (0 ≤ K ≤ 50,000), the given implementation works too slow, but the function would return 50,000.
// Write an efficient algorithm for the following assumptions:
// - N is an integer within the range 1..100,000
// - each element of array A is an integer within the range [<span class="number">1</span>..<span class="number">N</span>].</li>
// The original code is:
// function solution(A) {
//     var N = A.length;
//     var result = 0;
//     var i, j;
//     for (i = 0; i &lt; N; i++)
//         for (j = 0; j &lt; N; j++)
//             if (A[i] == A[j])
//                 result = Math.max(result, Math.abs(i - j));
//     return result;
// }

const A = [4, 6, 2, 2, 6, 6, 1];
console.log(solution(A));

function solution(A) {
    let N = A.length;
    let result = 0;
    for (let i = 0; i < N; i++) {
        let a = A[i];
        if (a) {
            for (let j = i; j < N; j++) {
                if (a === A[j]) {
                    result = Math.max(result, Math.abs(i - j));
                    A[j] = false;
                }
            }
        }
    }
    return result;
}
