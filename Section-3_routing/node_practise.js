//const hobbies=["playing",'reading','cooking'];


//const arr = [...hobbies];
//console.log(arr);

var person={
    name:'siva',
    age:'25',
    greet(){
        console.log("hi"+this.name);
    }
}
;

const copyPerson = {...person}

copyPerson.color="red";

console.log(copyPerson);
console.log(person);

const {name,age} =person;


console.log(name);
console.log(age);

