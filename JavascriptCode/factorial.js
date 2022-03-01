function factorial(n) {
    let fact=1;
    for(var i=1;i<=n;i++) 
    {
        fact = fact * i;

    }
    console.log("Factorial of a number is: ",fact);

}
const prompt = require('prompt-sync')();
let num = prompt("Enter a number: ");
factorial(num);