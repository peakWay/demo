
console.log('hello-world');


// interface Person {
//     isOld(age: number): boolean
// }

// class Young implements Person {
//     isOld(age: number) {
//         return false;
//     }
// }

// var person: { [age: number]: Person } = {};

// person[12]= new Young();

// let fn = () : string => {
//     return '23';
// }

class Control {
    private state: any;
}

class A {
    state: any;
}

let c = new Control();

// c.state

new A().state;

// interface SelectableControl extends Control {
//     select(): void;
// }

// class Button extends Control implements SelectableControl {
//     select() { }
// }

// class TextBox extends Control {
//     select() { }
// }

// class Animal {
//     name: string;
//     constructor(theName: string) { this.name = theName; }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }

// class Dog extends Animal {
//     constructor(name: string) { super(name); }
//     dogmove(distanceInMeters = 5) {
//         console.log("Slithering...", this);

//         this.move(distanceInMeters);
//     }
// }


// let d = new Dog('wc');
// d.dogmove()


throw Error('sd');