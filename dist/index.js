"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const debug_1 = __importDefault(require("debug"));
const debugA = debug_1.default('Observador I:');
const debugB = debug_1.default('Observador II:');
const debugC = debug_1.default('Observador III:');
const debugEventA = debug_1.default('Event: ');
const debugEventB = debug_1.default('Event II: ');
debugA('init');
debugB('init');
debugC('init');
function baseConcepts() {
    /*
    Observable
    Observer
    Creation Operators
    Pipeable Operators
    Suscription
    */
    const observable = rxjs_1.range(1, 50);
    const observable_mod = observable.pipe(operators_1.concatMap((num) => rxjs_1.interval(100).pipe(operators_1.take(1), operators_1.map((val) => num))), operators_1.filter(x => x % 2 === 1), operators_1.map(x => x + x));
    const firsObserver = {
        next: (value) => { debugA('%d', value); },
        error: () => { },
        complete: () => { },
    };
    const secondObserver = {
        next: (value) => { debugB('%d', value); }
    };
    const firstSuscription = observable_mod.subscribe(firsObserver);
    const secondSuscription = observable_mod.subscribe(secondObserver);
    setTimeout(() => {
        const thirdSuscription = observable_mod.subscribe((value) => {
            debugC('%d', value);
        });
    }, 2500);
    setTimeout(() => {
        secondSuscription.unsubscribe();
    }, 800);
}
function subject() {
    /*
    subject
    */
    const subject = new rxjs_1.Subject();
    let counter = 0;
    const interval = setInterval(() => {
        subject.next(counter);
        counter++;
        if (counter === 50) {
            subject.complete();
            clearInterval(interval);
        }
    }, 100);
    const firstSuscription = subject.subscribe((value) => {
        debugA('%d', value);
    });
    const secondSuscription = subject.subscribe((value) => {
        debugB('%d', value);
    });
    setTimeout(() => {
        const thirdSuscription = subject.subscribe((value) => {
            debugC('%d', value);
        });
    }, 2500);
    setTimeout(() => {
        secondSuscription.unsubscribe();
    }, 800);
}
function multicastObservable() {
    /*
    multicast
    */
    const observable = rxjs_1.range(1, 50);
    const observable_mod = observable.pipe(operators_1.concatMap((num) => rxjs_1.interval(100).pipe(operators_1.take(1), operators_1.map((val) => num))), operators_1.filter(x => x % 2 === 1), operators_1.map(x => x + x), operators_1.share());
    const firsObserver = {
        next: (value) => { debugA('%d', value); },
        error: () => { },
        complete: () => { },
    };
    const secondObserver = {
        next: (value) => { debugB('%d', value); }
    };
    const firstSuscription = observable_mod.subscribe(firsObserver);
    const secondSuscription = observable_mod.subscribe(secondObserver);
    setTimeout(() => {
        const thirdSuscription = observable_mod.subscribe((value) => {
            debugC('%d', value);
        });
    }, 2500);
    setTimeout(() => {
        secondSuscription.unsubscribe();
    }, 800);
}
function joinOperators() {
    const fatherObservable = rxjs_1.range(1, 5).pipe(operators_1.concatMap((num) => rxjs_1.of([num]).pipe(operators_1.delay(100))));
    const childObservable = rxjs_1.of(...['A', 'B', 'C', 'D', 'E']).pipe(operators_1.concatMap((num) => rxjs_1.of([num]).pipe(operators_1.delay(30))));
    const firstSuscription = fatherObservable.pipe(operators_1.tap(() => { debugEventA('Number Change'); }), operators_1.concatMap((num) => {
        debugEventB('Number Really Change');
        return childObservable.pipe(operators_1.map((character) => `${num}${character}`));
    })).subscribe((value) => {
        debugA('%s', value);
    });
}
baseConcepts();
//# sourceMappingURL=index.js.map