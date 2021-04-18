// first import supresses a parcel typeerror
import 'regenerator-runtime/runtime';
import axios from 'axios';

// fetch data from random facts api
let currentData = async () => {
	const { data } = await axios.get(
		'https://uselessfacts.jsph.pl/random.json?language=en'
	);
	return data.text.replace(/\\/gi, '');
};

// return new innerHTML for DOM
let currentDOM = async () => `<section><p>${await currentData()}</p></section>`;

// initialize a fact
(async () =>
	(document.getElementById('root').innerHTML = await currentDOM()))();

// the Observable class throws values by invoking
// an anonymous function that's passed a subscriber instance
// that has next, error, complete methods
// which are invoked with setInterval
// subscribe sets isObserving to true
// and the subscriber's complete method
// sets isObserving to false and calls
// the Observable instance's unsubscribe method
// which clears the DOM and displays a farewell message

class Observable {
	constructor(fn) {
		this._fn = fn;
		this.count = 0;
	}

	subscribe(observer) {
		observer.isObserving = true;
		this._fn(observer);
	}

	unsubscribe(observer) {
		// setting isObserving flag to false allows us to end the subscription -- any next calls after !isObserving will do nothing
		observer.isObserving = false;

		Array.from(document.querySelectorAll('#previous, #root')).forEach(
			node =>
				(node.innerHTML =
					node.id === 'previous'
						? ''
						: 'thanks for subscribing to random facts!')
		);
	}
}

const observer = {
	async next(observableInstance) {
		// only fire if observing
		if (this.isObserving) {
			// count is num api calls
			observableInstance.count++;
			console.log(`count is ${observableInstance.count}`);

			// move root data into previous
			document.getElementById(
				'previous'
			).innerHTML = `<section><div>previous data:</div><p>${
				document.getElementById('root').querySelector('p').innerHTML
			}</p></section>`;

			// update root data
			document.getElementById(
				'root'
			).innerHTML = `<section><div>new data available!</div><p>${await currentData()}</p></section>`;
		}
	},

	error(err) {
		console.error(err);
	},

	complete(observableInstance) {
		// unsubscribe method replaces DOM with farewell message
		observableInstance.unsubscribe(this);
		console.log('unsubbed!');
	},

	// flag to indicate a subscription
	isObserving: false,
};

let newObservable = new Observable(subscriber => {
	const myInterval = () => {
		// if subscriber has unsubbed, clear the tick fn
		if (!subscriber.isObserving) {
			return clearInterval(this);
		}

		// if count has reached 3 unsubscribe
		if (subscriber.isObserving && newObservable.count >= 3) {
			console.log('done observing!');
			return subscriber.complete(newObservable);
		}

		// otherwise log the fn tick and call next to update DOM
		console.log('interval tick');
		subscriber.next(newObservable);
	};

	// setup tick fn
	setInterval(myInterval, 5000);
});

// start listening to observable
newObservable.subscribe(observer);
