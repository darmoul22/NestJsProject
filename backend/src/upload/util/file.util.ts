import * as fs from 'fs'
import type { File } from '../types/file.type'

function readJSONFile<T>(filePath: string): T | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const jsonData = JSON.parse(fileContents)
    return jsonData
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return null
  }
}

function readFile(filePath: string): File | null {
  try {
    const fileStats = fs.statSync(filePath)
    const fileSize = fileStats.size
    const fileType = 'application/octet-stream' // Change this based on your file type detection logic
    const fileExtension = filePath.split('.').pop() || '' // Assuming the extension is the part after the last dot
    const fileContent = fs.readFileSync(filePath)

    const file: File = {
      name: filePath.split('/').pop() || '',
      size: fileSize,
      type: fileType,
      extension: fileExtension,
      content: fileContent.buffer.slice(
        fileContent.byteOffset,
        fileContent.byteOffset + fileContent.byteLength,
      ),
    }

    return file
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}

const FileUtil = {
  readJSONFile,
  readFile,
}

export default FileUtil
