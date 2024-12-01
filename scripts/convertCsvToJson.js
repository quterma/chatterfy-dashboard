const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const rawDir = path.join(__dirname, '../data/raw');
const outputDir = path.join(__dirname, '../src/data');

function convertCsvToJson(fileName, transformer = (data) => data) {
  const filePath = path.join(rawDir, fileName);
  const csvData = fs.readFileSync(filePath, 'utf8');
  const { data } = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  return transformer(data);
}

function writeJson(fileName, jsonData) {
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
  console.log(`[Success]: ${fileName} has been written.`);
}

function processFile(fileName, transformer) {
  const filePath = path.join(rawDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`[Info]: ${fileName} not found. Skipping.`);
    return false;
  }

  const jsonData = convertCsvToJson(fileName, transformer);
  writeJson(fileName.replace('.csv', '.json'), jsonData);
  fs.unlinkSync(filePath);
  console.log(`[Info]: ${fileName} processed and removed.`);
  return true;
}

function main() {
  const filesToProcess = fs
    .readdirSync(rawDir)
    .filter((file) => file.endsWith('.csv'));
  if (filesToProcess.length === 0) {
    console.log('[Info]: No files to process.');
    return;
  }

  processFile('usages.csv', (data) => data);
  processFile('costs.csv', (data) => data);
}

main();
