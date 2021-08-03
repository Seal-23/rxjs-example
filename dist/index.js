"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/*
    Observable
    Observer
    Creation Operators
    Pipeable Operators
    Suscription
*/
const observable = rxjs_1.range(1, 50);
const observable_mod = observable.pipe(operators_1.concatMap((num) => rxjs_1.interval(500).pipe(operators_1.take(1), operators_1.map((val) => num))), operators_1.filter(x => x % 2 === 1), operators_1.map(x => x + x));
const firsObserver = {
    next: (value) => { console.log(`Observador 1: ${value}`); },
    error: () => { },
    complete: () => { },
};
const secondObserver = {
    next: (value) => { console.log(`Observador 2: ${value}`); }
};
const firstSuscription = observable_mod.subscribe(firsObserver);
const secondSuscription = observable_mod.subscribe(secondObserver);
setTimeout(() => { secondSuscription.unsubscribe(); }, 2000);
//# sourceMappingURL=index.js.map