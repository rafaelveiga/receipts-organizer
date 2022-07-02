const fs = require("fs");
const dayjs = require("dayjs");

readDir("./receipts/unorganized");

function readDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      readDir(filePath);
    } else {
      fs.stat(filePath, (err, stats) => {
        const newName = `${dayjs(stats.mtime).format("YYYY-MM-DD")}-${file}`;

        fs.copyFileSync(filePath, `./receipts/organized/${newName}`);
      });
    }
  }
}
