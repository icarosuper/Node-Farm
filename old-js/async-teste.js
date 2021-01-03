const fs = require('fs');
const agent = require('superagent');

(async () => {
	return await fs.readFile('dogname.txt', (err, data) => {
		console.log(`Arquivo lido! ${data}`);
	});
})().then(async (res) => {
	const query = await agent.get(`https://dog.ceo/api/breed/${res}/images/random`);
	console.log(query.body.message);
})

/*
new Promise((resolve, reject) => {
	fs.readFile('dognames.txt', (err, data) => {
		if(err) reject(err);
		resolve(data);
	});
})
	.catch((err) => {
		console.log(`ERRO NA ETAPA 1 - ${err}`);
	})
	.then((res) => {
		return agent.get(`https://dog.ceo/api/breed/${res}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);
	})
	.catch((err) => {
		console.log(`ERRO NA ETAPA 3 - ${err}`);
	})
*/
