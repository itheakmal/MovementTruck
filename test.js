// for (let i = 0; i < 5; i++) {
//     setTimeout(function() {
//       console.log(i);
//     });
//   }




console.log(this)

// const original = { name: "John", hobbies: ["Reading", "Gaming"] };
// const shallowCopy = { ...original };

// shallowCopy.name = "Alice";
// shallowCopy.hobbies.push("Cooking");

// console.log(original.name); // "jOHN"
// console.log(original.hobbies); // ["Reading", "Gaming"]


// async function foo() {
//     console.log("A");
//     await bar();
//     console.log("B");
// }

// async function bar() {
//     console.log("C");
// }

// foo();
// console.log("D");



// function sample () {
//     let value = 10 
//     function innerf () {
//       value = value + 10
//       return value
//     }
//     return innerf
//   }
  
//   const funCall = sample()
//   console.log(funCall())
//   console.log(funCall())
//   console.log(funCall())
//   console.log(funCall())
//   console.log(funCall())


// function test () {
//     const obj = {
//         name: "Allah",
//         sing: () => {
//             console.log('a', this)
//             // console.log('a', this)
//         }
//     }

//     const temp = () => {
//         console.log('a', this)

//     }
// }

// this and its binding


// ---------
// console.log('a')
// setTimeout(() => {
//     console.log('b')
// }, 0);
// new Promise.resolve(console.log('c'))
// console.log('d')
// console.log('e')