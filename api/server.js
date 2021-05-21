const express = require('express');
const router = require('./router');
const cors = require('cors');
const serverProtocol = require('http');

function exitHandler(exitCode) {
    console.log(`exit code: ${exitCode.stack}`);
    process.stdin.resume();
    process.exit();
  }
  
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = 8000;


app.use(cors());

app.use('/users', router.users);

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));

// catches "kill pid"
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null));

server = serverProtocol.createServer(app);
server.listen(port, () => console.log(`Shop app listening on ${port}!`))