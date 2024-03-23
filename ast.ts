// abstract syntax tree

export type NodeType = "Program" | "NumericLiteral" | "Identifier" | "BinaryExpr";

export interface Stmt {
  kind: NodeType;
}

export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

// deno-lint-ignore no-empty-interface
export interface Expr extends Stmt {}

// Identifier operation Identifier
// NumericLiteral operation NumericLiteral
// 10 - 5 -> 10 left | 5 right | - operator
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}

// strings
export interface Identifier extends Stmt {
  kind: "Identifier";
  symbol: string;
}

// numbers
export interface NumericLiteral extends Stmt {
  kind: "NumericLiteral";
  value: number;
}
