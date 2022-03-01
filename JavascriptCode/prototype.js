// Parent function
function User(uname,email) {
    this.uname = uname;
    this.email = email;
}
User.prototype.showInfo = function(){
    console.log("Username is:",this.uname,"\nEmail is:",this.email);

}

const user1 = new User("Ben","ben@bd.com");
console.log(user1.showInfo());

// Child function
function PremiumUser(uname,email,ads) {
    User.call(this,uname,email);      //Inheriting properties from User
    this.ads =false
}

// PremiumUser.prototype = Object.create(User.prototype);
PremiumUser.prototype = User.prototype;



const puser1 = new PremiumUser("Jack","jk@xyz.com");
// Object.getPrototypeOf(puser1);
// console.log(Object.getPrototypeOf(puser1));
// puser1.prototype.showInfo();
// Object.getPrototypeOf(puser1).showInfo();
console.log(puser1.showInfo(),puser1.ads);
