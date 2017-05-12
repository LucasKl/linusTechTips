// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

(function (exports) {
    'use strict';

    exports.version = '0.1.2';
    exports.parse = parse;
    exports.stringify = stringify;
    exports.Parser = Parser;

// ---------------------------------------------------------------------------

    function Parser(input) {
        var o = (this !== exports) ? this : {};
        o.input = input;
        o.pos = 0;
        o.line = 1;
        o.linePos = 0;
    }

    var EOF = Parser.EOF = -1;

    Parser.prototype.error = function (msg) {
        throw new SyntaxError(msg + ' at ' + this.line + ':' + this.linePos);
    };

    Parser.prototype.peek = function () {
        if (this.pos >= this.input.length) return EOF;
        return this.input[this.pos];
    };

    Parser.prototype.eat = function (expected) {
        var ch = this.peek();
        if (expected !== undefined && expected !== ch) {
            this.error('Expected ' + expected + ', got' + ch);
        }
        if (ch === EOF) return EOF;
        this.pos++;
        this.linePos++;
        return ch;
    };

// <ws> ::= <space> <ws> | <empty>;
// <space> ::= " " | "\n" | "\t";
// <empty> ::= "";
    Parser.prototype.ws = function () {
        var ret = '', ch;
        while (' \n\t'.indexOf(ch = this.peek()) >= 0) {
            if (ch === '\n') {
                this.line++;
                this.linePos = 0;
            }
            ret += this.eat();
        }
        return ret;
    };

// <escaped> ::= "\\\"" | "\\n" | "\\t" | "\\\\";
    Parser.prototype.escaped = function () {
        this.eat('\\');
        var ch = this.peek();
        switch (ch) {
            case 'n':  this.eat(); return '\n';
            case 't':  this.eat(); return '\t';
            case '"':  this.eat(); return '"';
            case '\\': this.eat(); return '\\';
        }
        this.error('Invalid escape sequence: \\' + ch);
    };

// <char> ::= <letter> | <digit> | <delim> | <escaped>;
// <letter> ::= "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k"
//            | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v"
//            | "w" | "x" | "y" | "z"
//            | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K"
//            | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V"
//            | "W" | "X" | "Y" | "Z";
// <digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
// <delim> ::= "-" | "_" | "|" | ":" | "=" | ";" | " ";
    Parser.prototype.isChar = function () {
        var ch = this.peek();
        return ch !== EOF && ((/[a-zA-Z0-9\-_|:=; ]/).test(ch) || ch === '\\');
    };

// <text> ::= <char> <text> | <empty>;
    Parser.prototype.text = function () {
        var ret = '', ch;
        while (this.isChar()) {
            if (this.peek() === '\\') ret += this.escaped();
            else ret += this.eat();
        }
        return ret;
    };

// <terminal_text> ::= <terminal_char> <terminal_text> | <empty>;
// <terminal_char> ::= <char> | "<" | ">";
    Parser.prototype.terminal_text = function () {
        var ret = '', ch = this.peek();
        while (this.isChar() || ch === '<' || ch === '>') {
            if (ch === '\\') ret += this.escaped();
            else ret += this.eat();
            ch = this.peek();
        }
        return ret;
    };

// <terminal> ::= "\"" <terminal_text> "\"";
    Parser.prototype.terminal = function () {
        this.eat('"');
        var text = this.terminal_text();
        this.eat('"');
        return { type: 'terminal', text: text };
    };

// <nonterminal> ::= "<" <text> ">";
    Parser.prototype.nonterminal = function () {
        this.eat('<');
        var text = this.text();
        this.eat('>');
        return { type: 'nonterminal', text: text };
    };

// <term> ::= <terminal> | <nonterminal>;
    Parser.prototype.term = function () {
        return (this.peek() === '<') ? this.nonterminal() : this.terminal();
    };

// <expression> ::= <term> <ws> <expression> | <term> <ws>;
    Parser.prototype.expression = function () {
        var terms = [this.term()];
        this.ws();
        while ('<"'.indexOf(this.peek()) >= 0) {
            terms.push(this.term());
            this.ws();
        }
        return { type: 'expression', terms: terms };
    };

// <expressions> ::= <expression> "|" <ws> <expressions> | <expression>;
    Parser.prototype.expressions = function () {
        var expressions = [this.expression()];
        while (this.peek() === '|') {
            this.eat('|');
            this.ws();
            expressions.push(this.expression());
        }
        return expressions;
    };

// <production> ::= <nonterminal> <ws> "::=" <ws> <expressions> ";";
    Parser.prototype.production = function () {
        var lhs = this.nonterminal();
        this.ws();
        this.eat(':'); this.eat(':'); this.eat('=');
        this.ws();
        var rhs = this.expressions();
        this.eat(';');
        return { type: 'production', lhs: lhs, rhs: rhs };
    };

// <grammar> ::= <production> <ws> <grammar> | <production> <ws>;
    Parser.prototype.grammar = function () {
        var productions = [this.production()];
        this.ws();
        while (this.peek() === '<') {
            productions.push(this.production());
            this.ws();
        }
        return { type: 'grammar', productions: productions };
    };

// ---------------------------------------------------------------------------

    function parse(g) {
        return new Parser(g).grammar();
    }

    function escape(text) {
        return text.replace(/\\/g, '\\\\').
        replace(/\"/g, '\\"').
        replace(/\n/g, '\\n').
        replace(/\t/g, '\\t');
    }

    function stringify(node) {
        switch (node.type) {
            case 'terminal':    return '"' + escape(node.text) + '"';
            case 'nonterminal': return '<' + escape(node.text) + '>';
            case 'expression':  return node.terms.map(stringify).join(' ');
            case 'production':  return stringify(node.lhs) + ' ::= ' + node.rhs.map(stringify).join(' | ') + ';';
            case 'grammar':     return node.productions.map(stringify).join('\n') + '\n';
        }
        throw new Error('Unknown node type: ' + node.type);
    }

}(typeof exports === 'undefined' ? this.prettybnf = {} : exports));
