// const { Observable } = require('rxjs');

// const observable = new Observable(subscriber => {
// 	subscriber.next(1);
// 	subscriber.next(2);
// 	subscriber.next(3);
// 	setTimeout(() => {
// 		subscriber.next(4);
// 		subscriber.complete();
// 	}, 1000);
// });

// console.log('just before subscribe');

// observable.subscribe({
// 	next(val) {
// 		console.log(`val ${val} received from Observable`);
// 	},
// 	error(err) {
// 		console.error(`oops! ${err}`);
// 	},
// 	complete() {
// 		console.log('done');
// 	},
// });

// console.log('just after subscribe');

// const foo = new Observable(subscribe => {
// 	console.log('heyo');
// 	console.log(42);
// });

// foo.subscribe(x => console.log(x));

// // observables take one argument: the subscribe function

// const hiObservable = new Observable(subscriber => {
// 	const id = setInterval(() => {
// 		subscriber.next('hi');
// 	}, 500);
// });

// hiObservable.subscribe(x => {
// 	console.log(x);
// });

// hiObservable.subscribe(y => {
// 	console.log(y + y + y + ' guys!');
// });

// because observable executions are potentially infinite
// we need an API for canceling an execution

const { from } = require('rxjs');

const pubNums = from(new Array(10).fill(null).map((_val, i) => i + 1));

const subscription = pubNums.subscribe(val => {
	console.log(val);

	return function unsubscribe() {
		console.log('heyo');
	};
});

subscription.unsubscribe();
