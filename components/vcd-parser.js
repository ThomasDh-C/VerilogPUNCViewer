const async = require('async');

/**
 * Parse VCD text content and generate a valid JSON representation.
 * The function returns a promise unless a callback is provided.
 * @name VCDParser~parse
 * @function
 * @param {string} content - The text content of the VCD file
 * @return {Promise<VCDParser~ParsedData>} Promise object that resolves with the parsed data
 */
const parse = (content) => {
	return new Promise((resolve, reject) => {
		const blocks = content
			.split(/\s*\$end\s/gm)
			.map(line => line.replace(/[\n\t]/gm, ' '));


		let modules = [];
		const meta = {};
		const signals = [];
		const signalMap = {};
		let lastIndex;

		for (let i = 0; i < blocks.length; i++) {
			const block = blocks[i].trim();
			if (block === '') {
				continue;
			}

			const scopeMatches = /\$(\w+?)\b/gm.exec(block);
			if (scopeMatches) {
				const scopeName = scopeMatches[1];
				if (scopeName === 'scope') {
					const scopeDefMatches = /\$(\w+)\s+([\s\S]+)\s+([\s\S]+)/gm.exec(
						block
					);
					if (!scopeDefMatches) {
						return reject({
							error: 'Invalid VCD data'
						});
					}
					const modName = scopeDefMatches[3];
					modules.push(modName);
				} else if (scopeName === 'enddefinitions') {

					lastIndex = i + 1;
					break;
				} else if (scopeName === 'upscope') {
					modules.pop();
				} else if (scopeName === 'var') {
					const varDefMatches = /\$(\w+)\s+([\s\S]+?)\s+(\d+)\s+([\s\S]+?)\s+([\s\S]+)\s*/gm.exec(
						block
					);
					const signalName = varDefMatches[5].replace(
						/\s+/,
						''
					);
					const refName = varDefMatches[4];
					if (!signalMap[refName]) {
						const signal = {
							type: varDefMatches[2],
							size: parseInt(varDefMatches[3]),
							refName,
							signalName,
							module: modules[modules.length - 1] || '',
							name: modules.concat(signalName).join('.'),
							wave: []
						};
						signals.push(signal);
						signalMap[refName] = signal;
					}
				} else {
					const contentMatches = /\$(\w+)\b\s*([\s\S]+)?\s*/gm.exec(
						block
					);
					if (contentMatches) {
						meta[contentMatches[1]] = contentMatches[2];
					}
				}
			} else {
				return reject({
					error: 'Invalid VCD data'
				});
			}
		}
		if (!lastIndex) {
			return reject({
				error: 'Invalid VCD data'
			});
		}
		let currentTime = 0;
		const rem = content.split(/\s*\$enddefinitions\s*/gm)[1];
		if (!rem) {
			return reject({
				error: 'Invalid VCD data'
			});
		}
		const lines = rem.split(/\s*\n\s*/gm);

		async.eachSeries(
			lines,
			function (line, callback) {
				const block = line.trim();
				if (block === '') {
					return callback();
				}
				const timingMatches = /^#(\d+)$/gm.exec(block);
				if (timingMatches) {
					const time = parseInt(timingMatches[1]);
					currentTime = time;
				} else if (block === '$dumpvars') {
					return callback();
				} else if (block === '$end') {
					return callback();
				} else {
					if (block.startsWith('x')) {
						const refName = block.substr(1).trim();
						if (!signalMap[refName]) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						const wave = signalMap[refName].wave;
						if (
							!wave.length ||
							wave[wave.length - 1][1] !== 'x'
						) {
							signalMap[refName].wave.push([
								currentTime.toString(),
								'x'
							]);
						}
					} else if (block.startsWith('b')) {
						const matches = /b([01xz]+)\s+([\s\S]+)/gm.exec(
							block
						);
						if (!matches) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						const refName = matches[2];
						if (!signalMap[refName]) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						let value = matches[1];

						const wave = signalMap[refName].wave;
						if (
							!wave.length ||
							wave[wave.length - 1][1] !== value
						) {
							signalMap[refName].wave.push([
								currentTime.toString(),
								value
							]);
						}
					} else if (block.startsWith('z')) {
						const refName = block.substr(1).trim();
						if (!signalMap[refName]) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						const wave = signalMap[refName].wave;
						if (
							!wave.length ||
							wave[wave.length - 1][1] !== 'z'
						) {
							signalMap[refName].wave.push([
								currentTime.toString(),
								'z'
							]);
						}
					} else if (/^[01]([\s\S]+)/gm.test(block)) {
						const matches = /^([01])([\s\S]+)/gm.exec(
							block
						);
						const refName = matches[2];
						if (!signalMap[refName]) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						const converted = parseInt(
							matches[1],
							10
						).toString(2);
						const wave = signalMap[refName].wave;
						if (

							!wave.length ||
							wave[wave.length - 1][1] !==
							converted
						) {
							signalMap[refName].wave.push([
								currentTime.toString(),
								converted
							]);
						}
					} else if (block.startsWith('r')) {
						const matches = /r((\d+\.?\d*)|(nan)|(x+)|(z+))\s+([\s\S]+)/gm.exec(
							block
						);
						if (!matches) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						let value;
						if (
							matches[1] === 'nan' ||
							matches[1].charAt(0) === 'x'
						) {
							value = 'x';
						} else if (
							matches[1].charAt(0) === 'z'
						) {
							value = 'z';
						} else {
							value = parseFloat(matches[1]);
						}
						const refName = matches[6];
						if (!signalMap[refName]) {
							return callback({
								error: 'Invalid VCD data'
							});
						}
						const wave = signalMap[refName].wave;
						if (

							!wave.length ||
							wave[wave.length - 1][1] !==
							converted
						) {
							signalMap[refName].wave.push([
								currentTime.toString(),
								isNaN(value)
									? 'x'
									: value.toString()
							]);
						}
					} else {
						return callback({
							error: 'Invalid VCD data'
						});
					}
				}
				return callback();
			},
			function (err) {
				if (err) {
					return reject(err);
				}
				meta.endtime = currentTime.toString();
				meta.scale = meta.timescale;
				let obj = { ...meta, signal: signals };
				return resolve(
					obj
				);
			}
		);

	})
};

/**
 * The value of a signal at a specific point of time, represnted as a tuple [time, value]
 * @typedef {Array<number>} VCDParser~SignalValue
 * @property {number} 0 - The time of the event
 * @property {number} 1 - The value of the signal at that event
 */

/**
 * The object representing one signal data
 * @typedef {Object} VCDParser~Signal
 * @property {string} name - The full name of the signal
 * @property {string} type - The type of the signal, e.g. wire, reg,..etc
 * @property {number} size - The size/width of the signal in bits
 * @property {string} refName - The reference for this signal used inside the VCD file
 * @property {string} module - The name of the top module for which this signal belongs
 * @property {Array<VCDParser~SignalValue>} wave - The values of the signal at different points of time
 */

/**
 * The parsed VCD object generated by the parser
 * @typedef {Object} VCDParser~ParsedData
 * @property {string} [<"meta">] - The values of different initial meta-data, e.g. date, timescale..etc
 * @property {string} endtime - The endtime of the simulation
 * @property {string} scale - The time-scale unit of the simulation
 * @property {Array<VCDParser~Signal>} signal - The signal values of the simulation
 */

export { parse as default };
