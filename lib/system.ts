import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Constants
const GB = 1024 ** 3; // Bytes in a gigabyte

function getCpuUsage() {
  const cpus = os.cpus();
  return cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = 100 - (100 * cpu.times.idle) / total;
    return usage.toFixed(1);
  });
}

async function getCpuTemp(): Promise<number> {
  try {
    const { stdout } = await execAsync("vcgencmd measure_temp");
    // in celsius! OBVIOUSLY!
    const temp = parseFloat(stdout.replace("temp=", "").replace("'C", ""));
    return isNaN(temp) ? 0 : temp;
  } catch (error) {
    console.error("Failed to get CPU temperature:", error);
    // Return 0 if command fails (e.g., not running on Raspberry Pi)
    return 0;
  }
}

function bytesToGB(bytes: number) {
  return (bytes / GB).toFixed(2);
}

export async function getSystemDetails() {
  try {
    // Get CPU usage
    const cpuUsage = getCpuUsage();

    // Get memory info
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    // Get CPU temperature (with error handling built in)
    const cpuTemp = await getCpuTemp();

    return {
      os,
      cpuTemp,
      cpuUsage,
      memoryUsage: {
        total: parseFloat(bytesToGB(totalMem)),
        used: parseFloat(bytesToGB(usedMem)),
        free: parseFloat(bytesToGB(freeMem)),
      },
    };
  } catch (error) {
    console.error("Error getting system details:", error);
    throw new Error("Failed to retrieve system information");
  }
}
