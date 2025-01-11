const typeFullName = [
    'Const',
    'Pow',
    'Exp',
    'Log',
    'Trig',
    'Base',
    'Abs',
    'Complexity'
]
const typeFuncs = ['sum', 'product'];
const typeFunc = ['c', 'p', 'e', 'l', 't', 'b', 'a', 'x'];
const typeTrig = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot'];

class func {
    constructor(typeNum, num, f1, f2) {
        this.type = typeFullName[typeNum];
        this.num = num;
        this.f = f1;
        if (num == null) {
            this.type = typeFuncs[typeNum];
            this.f = [f1, f2];
        }
    }
    toString() {
        throw new Error("I don't know what this function is.");
    }
}

class singleFunc extends func {
    constructor(typeNum, num, f) {
        super(typeNum, num, f, null);
    }
    toString() {
        throw new Error("I don't know what this single function is.");
    }
}

class multiFunc extends func {
    constructor(typeNum, f1, f2) {
        super(typeNum, null, f1, f2);
    }
    toString() {
        throw new Error("I don't know what this multi function is.");
    }
}

function makeBaseFunc(typeNum, num) {
    switch (typeNum) {
        case 0: return new Const(num);
        case 1: return new Pow(num, new Base());
        case 2: return new Exp(num, new Base());
        case 3: return new Log(num, new Base());
        case 4: return new Trig(num, new Base());
    }
}

class Const extends singleFunc {
    constructor(num) {
        super(0, num, 0);
    }
    toString() {
        return String(this.num);
    }
}

class Pow extends singleFunc {
    constructor(num, f) {
        super(1, num, f);
    }
    toString() {
        return `(${this.f})^${String(this.num)}`;
    }
}

class Exp extends singleFunc {
    constructor(num, f) {
        super(2, num, f);
    }
    toString() {
        return `${String(this.num)}^(${this.f})`;
    }
}

class Log extends singleFunc {
    constructor(num, f) {
        super(3, num, f);
    }
    toString() {
        return `log_${String(this.num)}(${this.f})`;
    }
}

class Trig extends singleFunc {
    constructor(num, f) {
        super(4, num, f);
    }
    toString() {
        return `${typeTrig[this.num]}(${this.f})`;
    }
}

class Base extends singleFunc {
    constructor() {
        super(5, 0, 0);
    }
    toString() {
        return 'x';
    }
}

class Abs extends singleFunc {

}

class sumFuncs extends multiFunc {
    constructor(f1, f2) {
        super(0, f1, f2);
    }
    toString() {
        return `${this.f1}+${this.f2}`;
    }
}

class proFuncs extends multiFunc {
    constructor(f1, f2) {
        super(1, f1, f2);
    }
    toString() {
        return `(${this.f1})(${this.f2})`;
    }
}

let a = makeBaseFunc(4, 3);
let b = makeBaseFunc(2, 5);
console.log(a);
console.log(b);
console.log(a.toString());
console.log(b.toString());
let c = new proFuncs(a, b);
console.log(c);
console.log(c.toString()); // (undefined)(undefined)로 나오는거 수정해야함

export { func, Const, Pow, Exp, Log, Trig, Base, sumFuncs, proFuncs, makeBaseFunc };