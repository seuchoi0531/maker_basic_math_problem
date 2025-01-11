export const sum = [
    sumConstFunc,
    sumPowFunc,
    sumExpFunc,
    sumLogFunc,
    sumTrigFunc,
];
function sumFunc(f1, f2) {
    if (f1.constructor === f2.constructor) {
        typeFullName.forEach((name, i)=> {
            if(f1.constructor.name === name)
                sum[i](f1,f2);
        });
    }
}

function sumConstFunc(f1, f2) {
    return new Const(f1.num + f2.num);
}

function sumPowFunc(f1,f2) {

}

function sumExpFunc(f1,f2) {
    
}

function sumLogFunc(f1,f2) {
    
}

function sumTrigFunc(f1,f2) {
    
}

