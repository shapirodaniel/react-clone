class ObservableMutation {
	constructor(fn) {
		this._fn = fn;
	}

	subscribe(observer) {
		this._fn(observer);
	}

	unsubscribe() {
		console.log('unsubbed!');
	}
}

let myString = 'hello';
let numCalls = 0;

const myObserver = {
	next(data) {
		console.log('before update: ', myString);
		myString = data;
		console.log('after update: ', myString);
	},
	error(err) {
		console.error(err);
	},
	complete: observableInstance => {
		return observableInstance.unsubscribe();
	},
};

const words = [
	'heyo',
	'hi',
	'nice day',
	'pierogis',
	'definitely order cheesey bread this week',
	'hi im lily billy',
];

const getRandomWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};

let pizzaWasOrdered = false;

const noPizza = () => pizzaWasOrdered && Math.random() * 100 > 30;

const myObservable = new ObservableMutation(observer => {
	while (numCalls < 3) {
		observer.next(getRandomWord());

		if (myString.split(' ').includes('cheesey')) {
			console.log('pizza on the way!');
			pizzaWasOrdered = true;
		}

		numCalls++;
	}

	while (noPizza()) {
		console.log('waiting for pizza...');
		numCalls++;
	}

	if (pizzaWasOrdered) {
		console.log(
			numCalls > 3
				? `total calls until pizza: ${numCalls}`
				: 'wow that was fast!'
		);
	}

	observer.complete(myObservable);
});

myObservable.subscribe(myObserver);
