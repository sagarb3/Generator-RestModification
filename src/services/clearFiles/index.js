import fs from "fs";
import { promisify } from "util";
fs.unlink = promisify(fs.unlink);
const clearFile = async absolutefileName => {
  try {
    const deletedFile = await fs.unlink(absolutefileName);
    return null;
  } catch (err) {
    throw err;
  }
};
module.exports.clearFile = clearFile;
