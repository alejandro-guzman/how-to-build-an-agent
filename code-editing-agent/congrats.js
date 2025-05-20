/**
 * ROT13 Encoder/Decoder Script
 * 
 * Usage:
 *   node congrats.js --encode "text to encode"
 *   node congrats.js --decode "grkg gb qrpbqr"
 */

// Function to apply ROT13 transform to a string
// ROT13 is its own inverse, so the same function works for both encoding and decoding
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function(char) {
    // Get the ASCII code
    const code = char.charCodeAt(0);
    
    // Handle uppercase letters (ASCII 65-90)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    }
    
    // Handle lowercase letters (ASCII 97-122)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + 13) % 26) + 97);
    }
    
    // Return non-alphabetic characters unchanged
    return char;
  });
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    printUsage();
    process.exit(1);
  }
  
  const option = args[0];
  // Join all remaining arguments to handle text with spaces
  const text = args.slice(1).join(' ');
  
  return { option, text };
}

// Print usage information
function printUsage() {
  console.log(`
ROT13 Encoder/Decoder

Usage:
  node congrats.js --encode "text to encode"
  node congrats.js --decode "grkg gb qrpbqr"
  `);
}

// Main function
function main() {
  const { option, text } = parseArgs();
  
  if (option === '--encode') {
    console.log(rot13(text));
  } else if (option === '--decode') {
    console.log(rot13(text));
  } else {
    console.error(`Unknown option: ${option}`);
    printUsage();
    process.exit(1);
  }
}

// Execute the program
main();