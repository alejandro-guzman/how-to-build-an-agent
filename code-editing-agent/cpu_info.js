const os = require('os');

// Basic CPU information
function getCpuInfo() {
    console.log('==== CPU Information ====');
    
    // CPU model
    console.log(`CPU Model: ${os.cpus()[0].model}`);
    
    // CPU architecture
    console.log(`Architecture: ${os.arch()}`);
    
    // CPU cores
    const cpus = os.cpus();
    console.log(`CPU Cores: ${cpus.length}`);
    
    // CPU speed
    console.log(`CPU Speed: ${cpus[0].speed} MHz`);
    
    // Load average (1, 5, and 15 minute averages)
    const loadAvg = os.loadavg();
    console.log(`Load Average: ${loadAvg[0].toFixed(2)}, ${loadAvg[1].toFixed(2)}, ${loadAvg[2].toFixed(2)}`);
    
    // Platform
    console.log(`Platform: ${os.platform()}`);
    
    // OS release
    console.log(`OS Release: ${os.release()}`);

    // Total memory
    const totalMemory = os.totalmem();
    console.log(`Total Memory: ${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
    
    // Free memory
    const freeMemory = os.freemem();
    console.log(`Free Memory: ${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log(`Memory Usage: ${((totalMemory - freeMemory) / totalMemory * 100).toFixed(2)}%`);
    
    // Uptime
    const uptime = os.uptime();
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    console.log(`System Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`);
}

// Note: CPU temperature monitoring requires additional tools/libraries
console.log('Note: Getting CPU temperature on macOS requires additional tools like "osx-temperature-sensor"');
console.log('If you want to add temperature monitoring, install it using: npm install osx-temperature-sensor');

// Display all CPU information
getCpuInfo();

// To get CPU temperature, you would need to install and use a package like:
// const tempSensor = require('osx-temperature-sensor');
// const temp = tempSensor.cpuTemperature();
// console.log(`CPU Temperature: ${temp}°C`);