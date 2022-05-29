
/**
 * 逆变与协变
 */

class Animal {}

class Dog extends Animal {
    wow() {

    }
}

class Pig extends Animal {
    en() {

    }
}

class BlackDog extends Dog {
    color = 'block'
}

let dog = new Dog()
let animal = new Animal()
let blackDog = new BlackDog()

function test1(a: Animal): Animal {
    return a
}
test1(dog);

function test2(a: Dog): Dog {
    return a;
}

// test2(animal) //Error
test2(blackDog)