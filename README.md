# Safi-Lang

> this project purpose is to learn how programming languages work by creating new basic programming language.

to run the programming language

your need

1. install Deno
2. run

```BASH
deno run -A main.ts
```

it will return playground for now it only show us the AST working and how it split math equation

```bash
deno run -A main.ts

Repl v0.1
>
```

example:

```JSON
deno run -A main.ts

Repl v0.1
>  (4 - 5) * 4
{
  kind: "Program",
  body: [
    {
      kind: "BinaryExpr",
      left: {
        kind: "BinaryExpr",
        left: { kind: "NumericLiteral", value: 4 },
        right: { kind: "NumericLiteral", value: 5 },
        operator: "-"
      },
      right: { kind: "NumericLiteral", value: 4 },
      operator: "*"
    }
  ]
}
```
