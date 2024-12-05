$(document).ready(function () {
    function Term(coefficient, variables = {}) {
        this.coefficient = coefficient;
        this.variables = variables;
    }
    var solve = document.getElementById("solve");
    var integer_max = 4;
    var denominator_max = 4; // 나중에 설정할수 있는 옵션을 만들면, 최솟값을 2로하게 해야함
    var frac_rate = 0.1;
    var negative_rate = 0.25;
    var varcnt_rate = [0, 3 / 4, 11 / 12, 1];
    var vardegree_rate = [0, 3 / 4, 11 / 12, 1];
    var vartype_rate = 0.6;
    var varlist_a = ["a", "b", "c"];
    var varlist_x = ["x", "y", "z"];
    var integer_sum = integer_max * (integer_max + 1) / 2;
    var denominator_sum = denominator_max * (denominator_max - 1) / 2;

    function showTerm(t, div) {
        var str = "";
        var var_key_arr, var_value_arr;
        [var_key_arr, var_value_arr] = sortTerm(Object.keys(t.variables), Object.values(t.variables));
        //var var_key_arr = Object.keys(t.variables);
        //var var_value_arr = Object.values(t.variables);
        if (t.coefficient != 1) {
            if (t.coefficient != -1)
                str += t.coefficient;
            else
                str += "-";
        }
        for (var i = 0; i < var_key_arr.length; i++) {
            str += var_key_arr[i];
            if (var_value_arr[i] != 1)
                str += "<sup>" + var_value_arr[i] + "</sup>";
        }
        div.innerHTML = str;
    }
    function sortTerm(array1, array2) {
        var arr1 = array1;
        var arr2 = array2;
        if (arr1.length == 1)
            return [arr1, arr2];
        if (arr1.length == 2) {
            if (arr1.includes("a")) {
                if (arr1.indexOf("b") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("c") == 1) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("a") == 1) { //a가 있을때, b와 c가 없다면 여기서 자리바꿈
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            } else if (arr1.includes("b")) {
                if (arr1.indexOf("c") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("b") == 1) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            } else if (arr1.includes("c")) {
                if (arr1.indexOf("c") == 1) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            }

            if (arr1.includes("x")) {
                if (arr1.indexOf("y") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("z") == 1) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("x") == 0 && arr1.indexOf("y") == -1) { //x가 있을때, y와z가 없을때, x가 앞자리면 뒤로 옮겨야함(abc가 앞에와야해서)
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            } else if (arr1.includes("y")) {
                if (arr1.indexOf("z") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                } else if (arr1.indexOf("y") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            } else if (arr1.includes("z")) {
                if (arr1.indexOf("z") == 0) {
                    var tmp = [arr1[0], arr2[0]];
                    [arr1[0], arr2[0]] = [arr1[1], arr2[1]];
                    [arr1[1], arr2[1]] = tmp;
                }
            }
        } else {
            var indexarr = new Array(arr1.length).fill(0);
            for (var i = 0; i < arr1.length; i++) {
                switch (arr1[i]) {
                    case "a": indexarr[i] = 1; break;
                    case "b": indexarr[i] = 2; break;
                    case "c": indexarr[i] = 3; break;
                    case "x": indexarr[i] = 4; break;
                    case "y": indexarr[i] = 5; break;
                    case "z": indexarr[i] = 6; break;
                }
            }
            for (var i = 0; i < arr1.length; i++) {
                for (var j = i + 1; j < arr1.length; j++) {
                    if (indexarr[i] > indexarr[j]) {
                        var tmp = [arr1[i], arr2[i], indexarr[i]];
                        [arr1[i], arr2[i], indexarr[i]] = [arr1[j], arr2[j], indexarr[j]];
                        [arr1[j], arr2[j], indexarr[j]] = tmp;
                    }
                }
            }
        }
        return [arr1, arr2];
    }
    function randTerm(c, v /*c가 100이면 rand, v가 -1이면 rand, v가 0이면 상수*/) {
        if (c == 100) {
            if (v == -1)
                return new Term(randCoef(), randVar([]));
            if (v == 0)
                return new Term(randCoef(), {});
            if (Object.values(v)[0] == -1)
                return new Term(randCoef(), randVar(Object.keys(v)));
        }
        if (v == -1)
            return new Term(c, randVar([]));
        if (v == 0)
            return new Term(c, {});
        return new Term(c, randVar(Object.keys(v)));
        //분수에서 분모분자 구분선은 분모의 border-top임
    }
    function randCoef() {
        var rand = Math.random();
        var neg = 1;
        if (Math.random() < negative_rate)
            neg = -1;
        if (rand < frac_rate)
            return neg * randFrac();
        else
            return neg * randInt();
    }
    function randInt() {
        var result;
        var rand = Math.random();
        var sum = 0;
        for (var k = 1; k <= integer_max; k++) {
            sum += k;
            if (rand <= sum / integer_sum) {
                result = integer_max - k + 1;
                break;
            }
        }
        console.log("int" + result);
        return result;
    }
    function randFrac() {
        var denominator;
        var numerator;
        var rand = Math.random();
        var sum = 0;
        for (var k = 2; k <= denominator_max; k++) {
            sum += k - 1;
            if (rand < sum / denominator_sum) {
                denominator = denominator_max - k + 2;
                break;
            }
        }
        sum = 0;
        rand = Math.random();
        for (var k = 1; k <= denominator - 1; k++) {
            sum += k;
            if (rand < (sum * 2) / (denominator * (denominator - 1))) {
                numerator = denominator - k;
                break;
            }
        }
        console.log("frac" + numerator + "/" + denominator);
        return numerator / denominator;
    }
    function randVar(arr) {
        var result = {};
        if (arr.length != 0) {
            for (var k = 0; k < arr.length; k++) {
                rand = Math.random();
                for (var i = 1; i < 4; i++) {
                    if (rand < vardegree_rate[i]) {
                        result[arr[k]] = i;
                        break;
                    }
                }
            }
            return result;
        }
        var cnt = 0;
        var degree = 0;
        var varset;
        var rand = Math.random();
        if (rand < vartype_rate)
            varset = varlist_a;
        else
            varset = varlist_x;
        rand = Math.random();
        for (var k = 1; k < 4; k++) {
            if (rand < varcnt_rate[k]) {
                cnt = k;
                break;
            }
        }
        for (var k = 1; k <= cnt; k++) {
            rand = Math.random();
            for (var i = 1; i < 4; i++) {
                if (rand < vardegree_rate[i]) {
                    result[varset[k - 1]] = i;
                    break;
                }
            }
        }
        return result;
    }
    var algebra_list = ["(a+b)2", "(a-b)2", "(x+a)(x+b)", "(ax+b)(cx+d)",
        "(x+a)(x+b)(x+c)", "(x-a)(x-b)(x-c)", "(a+b+c)2",
        "(a+b)3", "(a-b)3", "(a+b)(a2-ab+b2)", "(a-b)(a2+ab+b2)",
        "(a+b+c)(a2+b2+c2-ab-bc-ca)", "(a2+ab+b2)(a2-ab+b2)"];
    var algebra_list_length = algebra_list.length;
    var algebra_list_on = new Array(algebra_list_length).fill(true);
    var prob_num_in_eq = 0.2;

    function showEquation(eq, div) {
        console.log(eq);
        var str = "";
        var arr = [false, false, false, false, false]; //a,b,c,d,x
        var termArr = new Array(5).fill(randTerm(0, 0));
        if (eq.includes("a"))
            arr[0] = true;
        if (eq.includes("b"))
            arr[0] = true;
        if (eq.includes("c"))
            arr[0] = true;
        if (eq.includes("d"))
            arr[0] = true;
        if (eq.includes("x"))
            arr[0] = true;

        if (!arr[2] && !arr[4]) { //ab
            if (Math.random() < vartype_rate) {
                termArr[0] = randTerm(100, { a: -1 });
                if (Math.random() < prob_num_in_eq)
                    termArr[1] = randTerm(100, 0);
                else
                    termArr[1] = randTerm(100, { b: -1 });
            } else {
                termArr[0] = randTerm(100, { x: -1 });
                if (Math.random() < prob_num_in_eq)
                    termArr[1] = randTerm(100, 0);
                else
                    termArr[1] = randTerm(100, { y: -1 });
            }
        } else if (arr[2] && !arr[4]) { //abc
            if (Math.random() < vartype_rate) {
                termArr[0] = randTerm(100, { a: -1 });
                termArr[1] = randTerm(100, { b: -1 });
                if (Math.random() < prob_num_in_eq)
                    termArr[2] = randTerm(100, 0);
                else
                    termArr[2] = randTerm(100, { c: -1 });
            } else {
                termArr[0] = randTerm(100, { x: -1 });
                termArr[1] = randTerm(100, { y: -1 });
                if (Math.random() < prob_num_in_eq)
                    termArr[2] = randTerm(100, 0);
                else
                    termArr[2] = randTerm(100, { z: -1 });
            }
        } else if (!arr[2] && arr[4]) { //abx
            termArr[0] = randTerm(100, 0);
            termArr[1] = randTerm(100, 0);
            termArr[4] = randTerm(1, { x: 1 });
        } else if (arr[3]) { //abcdx
            termArr[0] = randTerm(100,0);
            termArr[1] = randTerm(100,0);
            termArr[2] = randTerm(100,0);
            termArr[3] = randTerm(100,0);
            termArr[4] = randTerm(1, { x: 1 });
        } else { //xabc
            termArr[0] = randTerm(100, 0);
            termArr[1] = randTerm(100, 0);
            termArr[2] = randTerm(100, 0);
            termArr[4] = randTerm(1, { x: 1 });
        }
        for(var k = 0;k<eq.length;k++){
            if(eq[k] =="a")
                str +=//여기부터해야함, termToString함수 만들어야할듯
        }
        div.innerHTML = str;
    }
    var used_algebra_list = [];
    for (var k = 0; k < algebra_list_length; k++) {
        console.log(algebra_list_on[k]);
        if (algebra_list_on[k])
            used_algebra_list.push(k);
    }
    var show_algebra_num = Math.floor(Math.random() * (used_algebra_list.length - 1));
    showEquation(algebra_list[show_algebra_num], solve);

    /*
    var t = new Term(2 / 5, { z: 1, x: 4, y: 3 });
    var a = new Term(1, { x: 4 })
    showTerm(t, solve);
    var q = randTerm();
    //console.log(q.coefficient);
    //console.log(q.variables);
    showTerm(q, solve);
    */
});