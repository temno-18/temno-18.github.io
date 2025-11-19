import express from 'express';
import cors from 'cors';
import http from 'node:http';
import path from 'node:path';
import { hostname } from 'node:os';
import chalk from 'chalk';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { libcurlPath } from '@mercuryworkshop/libcurl-transport';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { server as wisp } from '@mercuryworkshop/wisp-js/server';

const server = http.createServer();
const app = express();
const __dirname = process.cwd();
const PORT = process.env.PORT || 8050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/epoxy/', express.static(epoxyPath));
app.use('/uv/', express.static(uvPath));
app.use('/libcurl/', express.static(libcurlPath));
app.use('/baremux/', express.static(baremuxPath));
app.use('/scramjet/', express.static(scramjetPath));
app.use('/', express.static('workerware/src'));

server.on('request', (req, res) => {
	app(req, res);
});

server.on('upgrade', (req, socket, head) => {
	if (req.url.endsWith('/wisp/')) {
		wisp.routeRequest(req, socket, head);
	} else {
		socket.end();
	}
});

server.on('listening', () => {
	const address = server.address();
	const theme = chalk.hex('#f88c00');
	const host = chalk.hex('cc6700');
	console.log(
		chalk.bold(
			theme(`			                                                              
                                                 d8P          
d8 8888b                                    d888888P        
d888bd88b ?88   d8P d888b8b   d888b8b   d8888b  ?88'   .d888b,
d88b'  ?8bd88   88 d8P' ?88  d8P' ?88  d8b_,dP  88P    ?8b,   
d88    88P?8(  d88 88b  ,88b 88b  ,88b 88b      88b      '?8b 
d88'   88b'?88P'?8b'?88P''88b'?88P''88b'?888P'  '?8b  '?888P' 
                          )88       )88                       
                         ,88P      ,88P                       
                     '?8888P   '?8888P                        
	`)
		)
	);

	console.log(
		`  ${chalk.bold(host('Local:'))}         http://localhost${address.port === 8080 ? '' : ':' + chalk.bold(address.port)},`
	);
	console.log(
		`                 http://127.0.0.1${address.port === 8080 ? '' : ':' + chalk.bold(address.port)}`
	);

	if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
		console.log(
			`  ${chalk.bold(host('Replit:'))}           https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
		);
	}

	if (process.env.HOSTNAME && process.env.GITPOD_WORKSPACE_CLUSTER_HOST) {
		console.log(
			`  ${chalk.bold(host('Gitpod:'))}           https://${PORT}-${process.env.HOSTNAME}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
		);
	}

	if (
		process.env.CODESPACE_NAME &&
		process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
	) {
		console.log(
			`  ${chalk.bold(host('Github Codespaces:'))}           https://${process.env.CODESPACE_NAME}-${address.port === 80 ? '' : address.port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
		);
	}
});

server.listen(PORT);
