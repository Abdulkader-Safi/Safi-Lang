// -----------------------------------------------------------
// ---------------          LEXER          -------------------
// ---  Responsible for producing tokens from the source   ---
// -----------------------------------------------------------

// Represents tokens that our language understands in parsing.
export enum TokenType {
  // Literal Types
  Number,
  Identifier,

  // Keywords
  Let,

  // Grouping * Operators
  BinaryOperator,
  Equals,
  OpenParen,
  CloseParen,
  EOF, // Signified the end of file
}

/**
 * Constant lookup for keywords and known identifiers + symbols.
 */
const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

// Reoresents a single token from the source-code.
export interface Token {
  value: string; // contains the raw value as seen inside the source code.
  type: TokenType; // tagged structure.
}

// Returns a token of a given type and value
function token(value = "", type: TokenType): Token {
  return { value, type };
}

/**
 * Returns whether the character passed in alphabetic -> [a-zA-Z]
 */
function isAlpha(src: string) {
  return src.toUpperCase() != src.toLowerCase();
}

/**
 * Returns true if the character is whitespace like -> [\s, \t, \n]
 */
function isSkipAble(str: string) {
  return str == " " || str == "\n" || str == "\t";
}

/**
 * Return whether the character is a valid integer -> [0-9]
 */
function isInt(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

/**
 * Given a string representing source code: Produce tokens and handles
 * possible unidentified characters.
 *
 * - Returns a array of tokens.
 * - Does not modify the incoming string.
 */
export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");

  // produce tokens until the EOF is reached.
  while (src.length > 0) {
    // BEGIN PARSING ONE CHARACTER TOKENS
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } // HANDLE BINARY OPERATORS
    else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%") {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } // Handle Conditional & Assignment Tokens
    else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } // HANDLE MULTICHARACTER KEYWORDS, TOKENS, IDENTIFIERS ETC...
    else {
      // Handle numeric literals -> Integers
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }

        // append new numeric token.
        tokens.push(token(num, TokenType.Number));
      } // Handle Identifier & Keyword Tokens.
      else if (isAlpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }

        // CHECK FOR RESERVED KEYWORDS
        const reserved = KEYWORDS[ident];
        // If value is not undefined then the identifier is
        // reconized keyword
        if (reserved) {
          tokens.push(token(ident, reserved));
        } else {
          // Unrecognized name must mean user defined symbol.
          tokens.push(token(ident, TokenType.Identifier));
        }
      } else if (isSkipAble(src[0])) {
        // Skip unended chars.
        src.shift();
      } // Handle unrecognized characters.
      // TODO: Implement better errors and error recovery.
      else {
        console.error("Unrecognized character found in source: ", src[0].charCodeAt(0), src[0]);
        Deno.exit(1);
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}
