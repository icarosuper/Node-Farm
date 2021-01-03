const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('../modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const notFound = fs.readFileSync(`${__dirname}/templates/404.html`, 'utf-8');

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	switch (pathname) {
		case '/':
		case '/overview':
			res.writeHead(200, { 'Content-type': 'text/html' });

			const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));

			res.end(tempOverview.replace('{PRODUCT_CARDS}', cardsHtml));
			break;

		case '/product':
			res.writeHead(200, { 'Content-type': 'text/html' });

			res.end(replaceTemplate(tempProduct, dataObj[query.id]));
			break;

		case '/api':
			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(data);
			break;

		default:
			res.writeHead(404, {
				'Content-type': 'text/html',
			});
			res.end(notFound);
			break;
	}
});

server.on('request', (req, res) => {
	console.log(`Server aberto na página ${req.url}`);
});

server.listen(8000, 'localhost', () => {
	console.log(`Server iniciado na porta 8000`);
});
