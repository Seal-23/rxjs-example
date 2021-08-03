import { interval, Observable, Observer, PartialObserver, range, Subscription } from "rxjs";
import { map, filter, concatMap, take } from "rxjs/operators";

/*
    Observable
    Observer
    Creation Operators
    Pipeable Operators
    Suscription
*/

const observable: Observable<number> = range(1, 50);

const observable_mod: Observable<number> = observable.pipe(
    concatMap((num) => interval(500).pipe(take(1), map((val) => num))),
    filter(x => x % 2 === 1),
    map(x => x + x),
);

const firsObserver: Observer<number> = {
    next: (value) => { console.log(`Observador 1: ${value}`) },
    error: () => { },
    complete: () => { },
};

const secondObserver: PartialObserver<number> = {
    next: (value) => { console.log(`Observador 2: ${value}`) }
};

const firstSuscription: Subscription = observable_mod.subscribe(firsObserver);
const secondSuscription: Subscription = observable_mod.subscribe(secondObserver);
setTimeout(() => { secondSuscription.unsubscribe() }, 2000)