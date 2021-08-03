import { interval, Observable, Observer, PartialObserver, range, Subscription, Subject, of } from "rxjs";
import { map, filter, concatMap, take, share, delay, tap, switchMap, exhaustMap, mergeMap } from "rxjs/operators";
import debug from 'debug';


const debugA = debug('Observador I:');
const debugB = debug('Observador II:');
const debugC = debug('Observador III:');
const debugEventA = debug('Event: ');
const debugEventB = debug('Event II: ');



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

    const observable: Observable<number> = range(1, 50);


    const observable_mod: Observable<number> = observable.pipe(
        concatMap((num) => interval(100).pipe(take(1), map((val) => num))),
        filter(x => x % 2 === 1),
        map(x => x + x),
    );

    const firsObserver: Observer<number> = {
        next: (value) => { debugA('%d', value) },
        error: () => { },
        complete: () => { },
    };

    const secondObserver: PartialObserver<number> = {
        next: (value) => { debugB('%d', value) }
    };

    const firstSuscription: Subscription = observable_mod.subscribe(firsObserver);
    const secondSuscription: Subscription = observable_mod.subscribe(secondObserver);
    setTimeout(() => {
        const thirdSuscription: Subscription = observable_mod.subscribe((value) => {
            debugC('%d', value)
        });
    }, 2500);

    setTimeout(() => {
        secondSuscription.unsubscribe()
    }, 800);
}

function subject() {

    /*
    subject
    */

    const subject: Subject<number> = new Subject();
    let counter = 0;

    const interval = setInterval(() => {
        subject.next(counter);
        counter++;
        if (counter === 50) {
            subject.complete();
            clearInterval(interval)
        }
    }, 100);


    const firstSuscription: Subscription = subject.subscribe((value) => {
        debugA('%d', value)
    });
    const secondSuscription: Subscription = subject.subscribe((value) => {
        debugB('%d', value)
    });
    setTimeout(() => {
        const thirdSuscription: Subscription = subject.subscribe((value) => {
            debugC('%d', value)
        });
    }, 2500);

    setTimeout(() => {
        secondSuscription.unsubscribe()
    }, 800);
}

function multicastObservable() {
    /*
    multicast
    */

    const observable: Observable<number> = range(1, 50);


    const observable_mod: Observable<number> = observable.pipe(
        concatMap((num) => interval(100).pipe(take(1), map((val) => num))),
        filter(x => x % 2 === 1),
        map(x => x + x),
        share()
    );

    const firsObserver: Observer<number> = {
        next: (value) => { debugA('%d', value) },
        error: () => { },
        complete: () => { },
    };

    const secondObserver: PartialObserver<number> = {
        next: (value) => { debugB('%d', value) }
    };

    const firstSuscription: Subscription = observable_mod.subscribe(firsObserver);
    const secondSuscription: Subscription = observable_mod.subscribe(secondObserver);
    setTimeout(() => {
        const thirdSuscription: Subscription = observable_mod.subscribe((value) => {
            debugC('%d', value)
        });
    }, 2500);

    setTimeout(() => {
        secondSuscription.unsubscribe()
    }, 800);
}

function joinOperators() {
    const fatherObservable = range(1, 5).pipe(
        concatMap((num) => of([num]).pipe(delay(100)))
    );

    const childObservable = of(...['A', 'B', 'C', 'D', 'E']).pipe(
        concatMap((num) => of([num]).pipe(delay(30)))
    );

    const firstSuscription: Subscription = fatherObservable.pipe(
        tap(() => { debugEventA('Number Change') }),
        concatMap((num) => {
            debugEventB('Number Really Change')
            return childObservable.pipe(
                map((character) => `${num}${character}`)
            )
        })
    ).subscribe((value) => {
        debugA('%s', value)
    });
}

baseConcepts();