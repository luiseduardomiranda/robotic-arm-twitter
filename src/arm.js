import { Observable } from 'rxjs';
import { getCommand } from './commands';
import SerialPort from 'serialport';

const port = new SerialPort(process.env.SERIAL_PORT, {
	baudRate: 9600,
	autoOpen: false
});

port.on('error', function (err) {
	console.log('Error: ', err.message);
});

let onDataCallback = () => null;
port.on('data', data => {
	onDataCallback(data.toString());
});

const writeMove = (move) => {
	return Observable.create(subscriber => {
		onDataCallback = (data) => {
			if (data === '1') {
				subscriber.next(true);
				subscriber.complete();
			}
		};

		port.write(move, (err) => {
			if (err) {
				console.error(err);
			}
		});
	});
};

const createMovement = (moves) => {
	let obsMoves = [];

	moves.map(move => {
		obsMoves.push(writeMove(move));
	});

	obsMoves.push(Observable.timer(5000));

	return Observable.concat(...obsMoves);
};

const openPort = () => {
	return Observable.of(port.isOpen)
		.flatMap(isOpen => {
			if (!isOpen) {
				return Observable.bindCallback(port.open.bind(port))()
					.flatMap(err => {
						if (err) {
							throw new Error(err);
						}

						return Observable.timer(3000);
					});
			}

			return Observable.of(1);
		});
};

export const sendCommand = (name) => {
	const command = getCommand(name);
	const resetCommand = getCommand('RESET');

	if (!command) {
		console.error('move not found');
	}

	return openPort()
		.flatMap(open => {
			return Observable.concat(
				createMovement(command)
			);
		});
};