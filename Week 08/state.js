{
    // abcabx 实现
    function match(str) {
        let state = start;
        for (let i of str) {
            state = state(i);
        }
        if (state === end) {
            return true
        }
        return false;
    }

    function start(i) {
        if (i === 'a') {
            return findA;
        }
        return start;
    }

    function findA(i) {
        if (i === 'b') {
            return findB;
        }
        return start(i)
    }

    function findB(i) {
        if (i === 'c') {
            return findC;
        }
        return start(i);
    }

    function findC(i) {
        if (i === 'a') {
            return findA2;
        }
        return start(i);
    }
    function findA2(i) {
        if (i === 'b') {
            return findB2;
        }
        return start(i);
    }

    function findB2(i) {
        if (i === 'x') {
            return end;
        }
        return findB(i);
    }
    function end(i) {
        return end;
    }

    console.log(match('qabcaboxuio'))
}

{
    // abababx 处理
    function match(str) {
        let state = start;
        for (let i of str) {
            state = state(i);
        }
        if (state === end) {
            return true;
        }
        return false;
    }
    function start(i) {
        if (i === 'a') {
            return findA;
        }
        return start;
    }
    function findA(i) {
        if (i === 'b') {
            return findB;
        }
        return start(i);
    }
    function findB(i) {
        if (i === 'a') {
            return findA2;
        }
        return start(i);
    }
    function findA2(i) {
        if (i === 'b') {
            return findB2;
        }
        return start(i);
    }
    function findB2(i) {
        if (i === 'a') {
            return findA3;
        }
        return start(i);
    }
    function findA3(i) {
        if (i === 'b') {
            return findB3;
        }
        return start(i);
    }
    function findB3(i) {
        if (i === 'x') {
            return end;
        }
        return findB2(i);
    }
    function end(i) {
        return end;
    }
    console.log(match('ababxabababxx'))
}