const net = require('net');

// Function to handle errors
function error(msg) {
    console.error(msg);
    process.exit(1);
}

// Check for command-line arguments
if (process.argv.length < 4) {
    console.error(`Usage: ${process.argv[0]} hostname port`);
    process.exit(0);
}

const hostname = process.argv[2];
const portno = parseInt(process.argv[3]);
const client = new net.Socket();

client.connect(portno, hostname, () => {
    console.log('Connected to server');
});

// Handle incoming data from server
client.on('data', (data) => {
    console.log(`Server: ${data.toString()}`);
    
    // Check for 'Bye' message to terminate
    if (data.toString().trim() === 'Bye') {
        client.destroy(); // Close the connection
    } else {
        // Read input from stdin
        process.stdout.write('You: ');
        process.stdin.once('data', (input) => {
            client.write(input);
        });
    }
});

// Handle connection closure
client.on('close', () => {
    console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
    error(`Client error: ${err.message}`);
});
