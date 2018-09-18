// Old format for defining a class in js
// function Person(fullName, favColor){
//     this.name = fullName;
//     this.favoriteColor = favColor;
//     this.greet = function(){
//         console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
//     }
// }

// Format for ES6 using babel
class Person {
    constructor(fullname, favColor){
        this.name = fullname;
        this.favoriteColor = favColor;
    }

    greet(){
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
    }
}

// exports.exampleProperty = "Hello i am a property exported by Person.js";
// exports.exampleFunction = function(){
//     alert("Beep Beep Georgia");
// }

// OLD FORMAT
// module.exports = Person;
// ES6 Format to Export
export default Person;