import {
    func,
    Const,
    Pow,
    Exp,
    Log,
    Trig,
    Base,
    makeBaseFunc
} from '/func.js';

class expression {
    constructor(arr){
        this.arr = arr;
    }
}

class siex extends expression {
    constructor(f) {
        super([f]);
    }
    toString() {
        return this.f.toString();
    }
}

class suex extends expression {
    constructor(...arr) {
        super(arr);
    }
}

class prex extends expression {
    constructor() {

    }
}

class muex extends expression {
    constructor() {

    }
}