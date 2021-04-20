// observables are functions invoked
// by calling their subscribe method
// and passing in an observer

// observers are objects
// containing three methods or notification types
// next -> pulls data from observable
// error -> logs error from observable
// complete -> signals to observable that we're done pulling data

class Observable {
	constructor(fn) {
		this._fn = fn;
	}

	subscribe(observer) {
		return this._fn(observer);
	}
}

// here we pass fn to the observable constructor
// and define the outcomes of .next(), .complete() methods
// on the observer we'll set to subscribe to (ie pull) observable notifications

// observables are functions that throw values
// ie generators

let numCalls = 0;

let myObservable = new Observable(({ next, error, complete }) => {
	try {
		while (numCalls < Infinity) {
			next('called');
			numCalls++;

			// chaos monkey
			if (Math.random() * 10 < 1) throw new Error('chaos monkey!');
		}
	} catch (err) {
		error(err);
		complete('request errored');
	}
});

let myObserver = {
	next(data) {
		console.log(data);
	},
	error(e) {
		console.log(e);
	},
	complete(msg) {
		console.log(msg);
	},
};

myObservable.subscribe(myObserver);
