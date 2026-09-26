const { spawn } = require('child_process');

function startTunnel(port, subdomain) {
  console.log(`Starting tunnel for port ${port}...`);
  const lt = spawn('npx', ['localtunnel', '--port', port, ...(subdomain ? ['--subdomain', subdomain] : [])], {
    shell: true
  });

  lt.stdout.on('data', (data) => {
    console.log(`Tunnel URL: ${data.toString().trim()}`);
  });

  lt.stderr.on('data', (data) => {
    console.error(`Tunnel Error: ${data}`);
  });

  lt.on('close', (code) => {
    console.log(`Tunnel process exited with code ${code}`);
  });
}

// Share the frontend (port 3000) and API (port 4000)
startTunnel(3000, 'code-engine-frontend-view');
startTunnel(4000, 'code-engine-api-view');
