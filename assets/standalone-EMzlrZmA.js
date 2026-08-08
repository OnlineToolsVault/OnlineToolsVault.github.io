import { e as Wl, g as $l, b as jl } from "./index-BtmU1OS0.js";
import { s as zl } from "./standalone-CihvUZad.js";
import { r as Do } from "./___vite-browser-external_commonjs-proxy-CWywmtvW.js";
function Kl(Ft, Mt) {
  for (var q = 0; q < Mt.length; q++) {
    const B = Mt[q];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const et in B) if (et !== "default" && !(et in Ft)) {
        const st = Object.getOwnPropertyDescriptor(B, et);
        st && Object.defineProperty(Ft, et, st.get ? st : { enumerable: true, get: () => B[et] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(Ft, Symbol.toStringTag, { value: "Module" }));
}
var Le = { exports: {} };
const Xl = Wl(zl);
(function(Ft, Mt) {
  (function(q, B) {
    B(Mt, Xl, Do, Do);
  })(jl, function(q, B, et, st) {
    function Po(t) {
      return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
    }
    var it = { exports: {} }, Fo = { attributeIndex: 0, attributeListDepth: {}, matchST_ATTRIBUTE() {
      let t = this.input();
      if (this.is_WHITESPACE()) {
        do
          t = this.input();
        while (this.is_WHITESPACE());
        return this.unput(1), null;
      }
      switch (t) {
        case "]":
          return this.attributeListDepth[this.attributeIndex] === 0 ? (delete this.attributeListDepth[this.attributeIndex], this.attributeIndex--, this.popState()) : this.attributeListDepth[this.attributeIndex]--, "]";
        case "(":
        case ")":
        case ":":
        case "=":
        case "|":
        case "&":
        case "^":
        case "-":
        case "+":
        case "*":
        case "%":
        case "~":
        case "<":
        case ">":
        case "!":
        case ".":
          return this.consume_TOKEN();
        case "[":
          return this.attributeListDepth[this.attributeIndex]++, "[";
        case ",":
          return ",";
        case '"':
          return this.ST_DOUBLE_QUOTES();
        case "'":
          return this.T_CONSTANT_ENCAPSED_STRING();
        case "/":
          return this._input[this.offset] === "/" ? this.T_COMMENT() : this._input[this.offset] === "*" ? (this.input(), this.T_DOC_COMMENT()) : this.consume_TOKEN();
      }
      if (this.is_LABEL_START() || t === "\\") {
        for (; this.offset < this.size; ) {
          const e = this.input();
          if (!this.is_LABEL() && e !== "\\") {
            e && this.unput(1);
            break;
          }
        }
        return this.T_STRING();
      }
      if (this.is_NUM()) return this.consume_NUM();
      throw new Error(`Bad terminal sequence "${t}" at line ${this.yylineno} (offset ${this.offset})`);
    } }, Mo = { T_COMMENT() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (t === `
` || t === "\r") return this.tok.T_COMMENT;
        if (t === "?" && !this.aspTagMode && this._input[this.offset] === ">") return this.unput(1), this.tok.T_COMMENT;
        if (t === "%" && this.aspTagMode && this._input[this.offset] === ">") return this.unput(1), this.tok.T_COMMENT;
      }
      return this.tok.T_COMMENT;
    }, T_DOC_COMMENT() {
      let t = this.input(), e = this.tok.T_COMMENT;
      if (t === "*") {
        if (t = this.input(), this.is_WHITESPACE() && (e = this.tok.T_DOC_COMMENT), t === "/") return e;
        this.unput(1);
      }
      for (; this.offset < this.size; ) if (t = this.input(), t === "*" && this._input[this.offset] === "/") {
        this.input();
        break;
      }
      return e;
    } }, Bo = { nextINITIAL() {
      return this.conditionStack.length > 1 && this.conditionStack[this.conditionStack.length - 1] === "INITIAL" ? this.popState() : this.begin("ST_IN_SCRIPTING"), this;
    }, matchINITIAL() {
      for (; this.offset < this.size; ) {
        let t = this.input();
        if (t == "<") {
          if (t = this.ahead(1), t == "?") {
            if (this.tryMatch("?=")) {
              this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
              break;
            }
            if (this.tryMatchCaseless("?php") && (t = this._input[this.offset + 4], t === " " || t === "	" || t === `
` || t === "\r")) {
              this.unput(1).appendToken(this.tok.T_OPEN_TAG, 6).nextINITIAL();
              break;
            }
            if (this.short_tags) {
              this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
              break;
            }
          } else if (this.asp_tags && t == "%") {
            if (this.tryMatch("%=")) {
              this.aspTagMode = true, this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
              break;
            }
            this.aspTagMode = true, this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
            break;
          }
        }
      }
      return this.yytext.length > 0 && this.tok.T_INLINE_HTML;
    } }, Ho = { consume_NUM() {
      let t = this.yytext[0], e = t === ".";
      if (t === "0") if (t = this.input(), t === "x" || t === "X") {
        if (t = this.input(), t !== "_" && this.is_HEX()) return this.consume_HNUM();
        this.unput(t ? 2 : 1);
      } else if (t === "b" || t === "B") {
        if (t = this.input(), t !== "_" && t === "0" || t === "1") return this.consume_BNUM();
        this.unput(t ? 2 : 1);
      } else if (t === "o" || t === "O") {
        if (t = this.input(), t !== "_" && this.is_OCTAL()) return this.consume_ONUM();
        this.unput(t ? 2 : 1);
      } else this.is_NUM() || t && this.unput(1);
      for (; this.offset < this.size; ) {
        const s = t;
        if (t = this.input(), t === "_") {
          if (s === "_") {
            this.unput(2);
            break;
          }
          if (s === ".") {
            this.unput(1);
            break;
          }
          if (s === "e" || s === "E") {
            this.unput(2);
            break;
          }
        } else {
          if (t === ".") {
            if (e) {
              this.unput(1);
              break;
            }
            if (s === "_") {
              this.unput(2);
              break;
            }
            e = true;
            continue;
          }
          if (t === "e" || t === "E") {
            if (s === "_") {
              this.unput(1);
              break;
            }
            let i = 2;
            if (t = this.input(), t !== "+" && t !== "-" || (i = 3, t = this.input()), this.is_NUM_START()) return this.consume_LNUM(), this.tok.T_DNUMBER;
            this.unput(t ? i : i - 1);
            break;
          }
        }
        if (!this.is_NUM()) {
          t && this.unput(1);
          break;
        }
      }
      return e ? this.tok.T_DNUMBER : this.yytext.length < 9 || this.yytext.length < 10 || this.yytext.length == 10 && this.yytext < "2147483648" ? this.tok.T_LNUMBER : this.tok.T_DNUMBER;
    }, consume_HNUM() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (!this.is_HEX()) {
          t && this.unput(1);
          break;
        }
      }
      return this.tok.T_LNUMBER;
    }, consume_LNUM() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (!this.is_NUM()) {
          t && this.unput(1);
          break;
        }
      }
      return this.tok.T_LNUMBER;
    }, consume_BNUM() {
      let t;
      for (; this.offset < this.size; ) if (t = this.input(), t !== "0" && t !== "1" && t !== "_") {
        t && this.unput(1);
        break;
      }
      return this.tok.T_LNUMBER;
    }, consume_ONUM() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (!this.is_OCTAL()) {
          t && this.unput(1);
          break;
        }
      }
      return this.tok.T_LNUMBER;
    } }, Go = { matchST_LOOKING_FOR_PROPERTY() {
      let t = this.input();
      if (t === "-") {
        if (t = this.input(), t === ">") return this.tok.T_OBJECT_OPERATOR;
        t && this.unput(1);
      } else {
        if (this.is_WHITESPACE()) return this.tok.T_WHITESPACE;
        if (this.is_LABEL_START()) return this.consume_LABEL(), this.popState(), this.tok.T_STRING;
      }
      return this.popState(), t && this.unput(1), false;
    }, matchST_LOOKING_FOR_VARNAME() {
      let t = this.input();
      if (this.popState(), this.begin("ST_IN_SCRIPTING"), this.is_LABEL_START()) {
        if (this.consume_LABEL(), t = this.input(), t === "[" || t === "}") return this.unput(1), this.tok.T_STRING_VARNAME;
        this.unput(this.yytext.length);
      } else t && this.unput(1);
      return false;
    }, matchST_VAR_OFFSET() {
      const t = this.input();
      if (this.is_NUM_START()) return this.consume_NUM(), this.tok.T_NUM_STRING;
      if (t === "]") return this.popState(), "]";
      if (t === "$") {
        if (this.input(), this.is_LABEL_START()) return this.consume_LABEL(), this.tok.T_VARIABLE;
        throw new Error("Unexpected terminal");
      }
      if (this.is_LABEL_START()) return this.consume_LABEL(), this.tok.T_STRING;
      if (this.is_WHITESPACE() || t === "\\" || t === "'" || t === "#") return this.tok.T_ENCAPSED_AND_WHITESPACE;
      if (t === "[" || t === "{" || t === "}" || t === '"' || t === "`" || this.is_TOKEN()) return t;
      throw new Error("Unexpected terminal");
    } }, Vo = { matchST_IN_SCRIPTING() {
      let t = this.input();
      switch (t) {
        case " ":
        case "	":
        case `
`:
        case "\r":
        case `\r
`:
          return this.T_WHITESPACE();
        case "#":
          return this.version >= 800 && this._input[this.offset] === "[" ? (this.input(), this.attributeListDepth[++this.attributeIndex] = 0, this.begin("ST_ATTRIBUTE"), this.tok.T_ATTRIBUTE) : this.T_COMMENT();
        case "/":
          return this._input[this.offset] === "/" ? this.T_COMMENT() : this._input[this.offset] === "*" ? (this.input(), this.T_DOC_COMMENT()) : this.consume_TOKEN();
        case "'":
          return this.T_CONSTANT_ENCAPSED_STRING();
        case '"':
          return this.ST_DOUBLE_QUOTES();
        case "`":
          return this.begin("ST_BACKQUOTE"), "`";
        case "?":
          if (!this.aspTagMode && this.tryMatch(">")) {
            this.input();
            const e = this._input[this.offset];
            return e !== `
` && e !== "\r" || this.input(), this.conditionStack.length > 1 && this.begin("INITIAL"), this.tok.T_CLOSE_TAG;
          }
          return this.consume_TOKEN();
        case "%":
          return this.aspTagMode && this._input[this.offset] === ">" ? (this.input(), t = this._input[this.offset], t !== `
` && t !== "\r" || this.input(), this.aspTagMode = false, this.conditionStack.length > 1 && this.begin("INITIAL"), this.tok.T_CLOSE_TAG) : this.consume_TOKEN();
        case "{":
          return this.begin("ST_IN_SCRIPTING"), "{";
        case "}":
          return this.conditionStack.length > 2 && this.popState(), "}";
        default:
          if (t === ".") {
            if (t = this.input(), this.is_NUM_START()) return this.consume_NUM();
            t && this.unput(1);
          }
          if (this.is_NUM_START()) return this.consume_NUM();
          if (this.is_LABEL_START()) return this.consume_LABEL().T_STRING();
          if (this.is_TOKEN()) return this.consume_TOKEN();
      }
      throw new Error('Bad terminal sequence "' + t + '" at line ' + this.yylineno + " (offset " + this.offset + ")");
    }, T_WHITESPACE() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (t !== " " && t !== "	" && t !== `
` && t !== "\r") {
          t && this.unput(1);
          break;
        }
      }
      return this.tok.T_WHITESPACE;
    } };
    const ot = [`
`, "\r"], be = [`
`, "\r", ";"], Qo = be.concat(["	", " ", ",", "]", ")", "/", "=", "!", "."]);
    var Yo = { T_CONSTANT_ENCAPSED_STRING() {
      let t;
      for (; this.offset < this.size; ) if (t = this.input(), t == "\\") this.input();
      else if (t == "'") break;
      return this.tok.T_CONSTANT_ENCAPSED_STRING;
    }, is_HEREDOC() {
      const t = this.offset;
      if (this._input[this.offset - 1] === "<" && this._input[this.offset] === "<" && this._input[this.offset + 1] === "<") {
        if (this.offset += 3, this.is_TABSPACE()) for (; this.offset < this.size && (this.offset++, this.is_TABSPACE()); ) ;
        let e = this._input[this.offset - 1];
        if (e === "'" || e === '"' ? this.offset++ : e = null, this.is_LABEL_START()) {
          let s = this.offset - 1;
          for (; this.offset < this.size && (this.offset++, this.is_LABEL()); ) ;
          const i = this._input.substring(s, this.offset - 1);
          if ((!e || e === this._input[this.offset - 1]) && (e && this.offset++, ot.includes(this._input[this.offset - 1]))) return this.heredoc_label.label = i, this.heredoc_label.length = i.length, this.heredoc_label.finished = false, s = this.offset - t, this.offset = t, this.consume(s), e === "'" ? this.begin("ST_NOWDOC") : this.begin("ST_HEREDOC"), this.prematch_ENDOFDOC(), this.tok.T_START_HEREDOC;
        }
      }
      return this.offset = t, false;
    }, ST_DOUBLE_QUOTES() {
      let t;
      for (; this.offset < this.size; ) if (t = this.input(), t == "\\") this.input();
      else {
        if (t == '"') break;
        if (t == "$") {
          if (t = this.input(), t == "{" || this.is_LABEL_START()) {
            this.unput(2);
            break;
          }
          t && this.unput(1);
        } else if (t == "{") {
          if (t = this.input(), t == "$") {
            this.unput(2);
            break;
          }
          t && this.unput(1);
        }
      }
      if (t == '"') return this.tok.T_CONSTANT_ENCAPSED_STRING;
      {
        let e = 1;
        return this.yytext[0] !== "b" && this.yytext[0] !== "B" || (e = 2), this.yytext.length > 2 && this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE, this.yytext.length - e), this.unput(this.yytext.length - e), this.begin("ST_DOUBLE_QUOTES"), this.yytext;
      }
    }, isDOC_MATCH(t, e) {
      const s = this._input[t - 2];
      if (!ot.includes(s)) return false;
      let i = false, n = false, r = 0, a = this._input[t - 1];
      if (this.version >= 703) {
        for (; a === "	" || a === " "; ) a === " " ? i = true : a === "	" && (n = true), a = this._input[t + r], r++;
        if (t += r, ot.includes(this._input[t - 1])) return false;
      }
      if (this._input.substring(t - 1, t - 1 + this.heredoc_label.length) === this.heredoc_label.label) {
        const o = this._input[t - 1 + this.heredoc_label.length];
        if ((this.version >= 703 ? Qo : be).includes(o)) {
          if (e) {
            if (this.consume(r), i && n) throw new Error("Parse error:  mixing spaces and tabs in ending marker at line " + this.yylineno + " (offset " + this.offset + ")");
          } else this.heredoc_label.indentation = r, this.heredoc_label.indentation_uses_spaces = i, this.heredoc_label.first_encaps_node = true;
          return true;
        }
      }
      return false;
    }, prematch_ENDOFDOC() {
      this.heredoc_label.indentation_uses_spaces = false, this.heredoc_label.indentation = 0, this.heredoc_label.first_encaps_node = true;
      let t = this.offset + 1;
      for (; t < this._input.length; ) {
        if (this.isDOC_MATCH(t, false)) return;
        if (!ot.includes(this._input[t - 1])) for (; !ot.includes(this._input[t++]) && t < this._input.length; ) ;
        t++;
      }
    }, matchST_NOWDOC() {
      if (this.isDOC_MATCH(this.offset, true)) return this.consume(this.heredoc_label.length), this.popState(), this.tok.T_END_HEREDOC;
      let t = this._input[this.offset - 1];
      for (; this.offset < this.size; ) if (ot.includes(t)) {
        if (t = this.input(), this.isDOC_MATCH(this.offset, true)) return this.unput(1).popState(), this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length), this.tok.T_ENCAPSED_AND_WHITESPACE;
      } else t = this.input();
      return this.tok.T_ENCAPSED_AND_WHITESPACE;
    }, matchST_HEREDOC() {
      let t = this.input();
      if (this.isDOC_MATCH(this.offset, true)) return this.consume(this.heredoc_label.length - 1), this.popState(), this.tok.T_END_HEREDOC;
      for (; this.offset < this.size; ) if (t === "\\" && (t = this.input(), ot.includes(t) || (t = this.input())), ot.includes(t)) {
        if (t = this.input(), this.isDOC_MATCH(this.offset, true)) return this.unput(1).popState(), this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length), this.tok.T_ENCAPSED_AND_WHITESPACE;
      } else if (t === "$") {
        if (t = this.input(), t === "{") return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
        if (this.is_LABEL_START()) {
          const e = this.offset, s = this.consume_VARIABLE();
          return this.yytext.length > this.offset - e + 2 ? (this.appendToken(s, this.offset - e + 2), this.unput(this.offset - e + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : s;
        }
      } else if (t === "{") {
        if (t = this.input(), t === "$") return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
      } else t = this.input();
      return this.tok.T_ENCAPSED_AND_WHITESPACE;
    }, consume_VARIABLE() {
      this.consume_LABEL();
      const t = this.input();
      if (t == "[") return this.unput(1), this.begin("ST_VAR_OFFSET"), this.tok.T_VARIABLE;
      if (t === "-") {
        if (this.input() === ">") return this.input(), this.is_LABEL_START() && this.begin("ST_LOOKING_FOR_PROPERTY"), this.unput(3), this.tok.T_VARIABLE;
        this.unput(2);
      } else t && this.unput(1);
      return this.tok.T_VARIABLE;
    }, matchST_BACKQUOTE() {
      let t = this.input();
      if (t === "$") {
        if (t = this.input(), t === "{") return this.begin("ST_LOOKING_FOR_VARNAME"), this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
        if (this.is_LABEL_START()) return this.consume_VARIABLE();
      } else if (t === "{") {
        if (this._input[this.offset] === "$") return this.begin("ST_IN_SCRIPTING"), this.tok.T_CURLY_OPEN;
      } else if (t === "`") return this.popState(), "`";
      for (; this.offset < this.size; ) {
        if (t === "\\") this.input();
        else {
          if (t === "`") {
            this.unput(1), this.popState(), this.appendToken("`", 1);
            break;
          }
          if (t === "$") {
            if (t = this.input(), t === "{") return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
            if (this.is_LABEL_START()) {
              const e = this.offset, s = this.consume_VARIABLE();
              return this.yytext.length > this.offset - e + 2 ? (this.appendToken(s, this.offset - e + 2), this.unput(this.offset - e + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : s;
            }
            continue;
          }
          if (t === "{") {
            if (t = this.input(), t === "$") return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
            continue;
          }
        }
        t = this.input();
      }
      return this.tok.T_ENCAPSED_AND_WHITESPACE;
    }, matchST_DOUBLE_QUOTES() {
      let t = this.input();
      if (t === "$") {
        if (t = this.input(), t === "{") return this.begin("ST_LOOKING_FOR_VARNAME"), this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
        if (this.is_LABEL_START()) return this.consume_VARIABLE();
      } else if (t === "{") {
        if (this._input[this.offset] === "$") return this.begin("ST_IN_SCRIPTING"), this.tok.T_CURLY_OPEN;
      } else if (t === '"') return this.popState(), '"';
      for (; this.offset < this.size; ) {
        if (t === "\\") this.input();
        else {
          if (t === '"') {
            this.unput(1), this.popState(), this.appendToken('"', 1);
            break;
          }
          if (t === "$") {
            if (t = this.input(), t === "{") return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
            if (this.is_LABEL_START()) {
              const e = this.offset, s = this.consume_VARIABLE();
              return this.yytext.length > this.offset - e + 2 ? (this.appendToken(s, this.offset - e + 2), this.unput(this.offset - e + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : s;
            }
            t && this.unput(1);
          } else if (t === "{") {
            if (t = this.input(), t === "$") return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
            t && this.unput(1);
          }
        }
        t = this.input();
      }
      return this.tok.T_ENCAPSED_AND_WHITESPACE;
    } }, Wo = { T_STRING() {
      const t = this.yytext.toLowerCase();
      let e = this.keywords[t];
      if (typeof e != "number") {
        if (t === "yield") this.version >= 700 && this.tryMatch(" from") ? (this.consume(5), e = this.tok.T_YIELD_FROM) : e = this.tok.T_YIELD;
        else if (e = this.tok.T_STRING, t === "b" || t === "B") {
          const s = this.input();
          if (s === '"') return this.ST_DOUBLE_QUOTES();
          if (s === "'") return this.T_CONSTANT_ENCAPSED_STRING();
          s && this.unput(1);
        }
      }
      if (e === this.tok.T_ENUM) {
        if (this.version < 801) return this.tok.T_STRING;
        const s = this.offset;
        let i = this.input();
        for (; i == " "; ) i = this.input();
        let n = false;
        if (this.is_LABEL_START()) {
          for (; this.is_LABEL(); ) i += this.input();
          const r = i.slice(0, -1).toLowerCase();
          n = r !== "extends" && r !== "implements";
        }
        return this.unput(this.offset - s), n ? this.tok.T_ENUM : this.tok.T_STRING;
      }
      if (this.offset < this.size && e !== this.tok.T_YIELD_FROM) {
        let s = this.input();
        if (s === "\\") {
          e = t === "namespace" ? this.tok.T_NAME_RELATIVE : this.tok.T_NAME_QUALIFIED;
          do {
            if (this._input[this.offset] === "{") {
              this.input();
              break;
            }
            this.consume_LABEL(), s = this.input();
          } while (s === "\\");
        }
        s && this.unput(1);
      }
      return e;
    }, consume_TOKEN() {
      const t = this._input[this.offset - 1], e = this.tokenTerminals[t];
      return e ? e.apply(this, []) : this.yytext;
    }, tokenTerminals: { $() {
      return this.offset++, this.is_LABEL_START() ? (this.offset--, this.consume_LABEL(), this.tok.T_VARIABLE) : (this.offset--, "$");
    }, "-"() {
      const t = this._input[this.offset];
      return t === ">" ? (this.begin("ST_LOOKING_FOR_PROPERTY").input(), this.tok.T_OBJECT_OPERATOR) : t === "-" ? (this.input(), this.tok.T_DEC) : t === "=" ? (this.input(), this.tok.T_MINUS_EQUAL) : "-";
    }, "\\"() {
      if (this.offset < this.size) {
        if (this.input(), this.is_LABEL_START()) {
          let t;
          do {
            if (this._input[this.offset] === "{") {
              this.input();
              break;
            }
            this.consume_LABEL(), t = this.input();
          } while (t === "\\");
          return this.unput(1), this.tok.T_NAME_FULLY_QUALIFIED;
        }
        this.unput(1);
      }
      return this.tok.T_NS_SEPARATOR;
    }, "/"() {
      return this._input[this.offset] === "=" ? (this.input(), this.tok.T_DIV_EQUAL) : "/";
    }, ":"() {
      return this._input[this.offset] === ":" ? (this.input(), this.tok.T_DOUBLE_COLON) : ":";
    }, "("() {
      const t = this.offset;
      if (this.input(), this.is_TABSPACE() && this.consume_TABSPACE().input(), this.is_LABEL_START()) {
        const e = this.yytext.length;
        this.consume_LABEL();
        const s = this.yytext.substring(e - 1).toLowerCase(), i = this.castKeywords[s];
        if (typeof i == "number" && (this.input(), this.is_TABSPACE() && this.consume_TABSPACE().input(), this._input[this.offset - 1] === ")")) return i;
      }
      return this.unput(this.offset - t), "(";
    }, "="() {
      const t = this._input[this.offset];
      return t === ">" ? (this.input(), this.tok.T_DOUBLE_ARROW) : t === "=" ? this._input[this.offset + 1] === "=" ? (this.consume(2), this.tok.T_IS_IDENTICAL) : (this.input(), this.tok.T_IS_EQUAL) : "=";
    }, "+"() {
      const t = this._input[this.offset];
      return t === "+" ? (this.input(), this.tok.T_INC) : t === "=" ? (this.input(), this.tok.T_PLUS_EQUAL) : "+";
    }, "!"() {
      return this._input[this.offset] === "=" ? this._input[this.offset + 1] === "=" ? (this.consume(2), this.tok.T_IS_NOT_IDENTICAL) : (this.input(), this.tok.T_IS_NOT_EQUAL) : "!";
    }, "?"() {
      return this.version >= 700 && this._input[this.offset] === "?" ? this.version >= 704 && this._input[this.offset + 1] === "=" ? (this.consume(2), this.tok.T_COALESCE_EQUAL) : (this.input(), this.tok.T_COALESCE) : this.version >= 800 && this._input[this.offset] === "-" && this._input[this.offset + 1] === ">" ? (this.consume(1), this.begin("ST_LOOKING_FOR_PROPERTY").input(), this.tok.T_NULLSAFE_OBJECT_OPERATOR) : "?";
    }, "<"() {
      let t = this._input[this.offset];
      return t === "<" ? (t = this._input[this.offset + 1], t === "=" ? (this.consume(2), this.tok.T_SL_EQUAL) : t === "<" && this.is_HEREDOC() ? this.tok.T_START_HEREDOC : (this.input(), this.tok.T_SL)) : t === "=" ? (this.input(), this.version >= 700 && this._input[this.offset] === ">" ? (this.input(), this.tok.T_SPACESHIP) : this.tok.T_IS_SMALLER_OR_EQUAL) : t === ">" ? (this.input(), this.tok.T_IS_NOT_EQUAL) : "<";
    }, ">"() {
      let t = this._input[this.offset];
      return t === "=" ? (this.input(), this.tok.T_IS_GREATER_OR_EQUAL) : t === ">" ? (t = this._input[this.offset + 1], t === "=" ? (this.consume(2), this.tok.T_SR_EQUAL) : (this.input(), this.tok.T_SR)) : ">";
    }, "*"() {
      const t = this._input[this.offset];
      return t === "=" ? (this.input(), this.tok.T_MUL_EQUAL) : t === "*" ? (this.input(), this._input[this.offset] === "=" ? (this.input(), this.tok.T_POW_EQUAL) : this.tok.T_POW) : "*";
    }, "."() {
      const t = this._input[this.offset];
      return t === "=" ? (this.input(), this.tok.T_CONCAT_EQUAL) : t === "." && this._input[this.offset + 1] === "." ? (this.consume(2), this.tok.T_ELLIPSIS) : ".";
    }, "%"() {
      return this._input[this.offset] === "=" ? (this.input(), this.tok.T_MOD_EQUAL) : "%";
    }, "&"() {
      const t = this._input[this.offset];
      return t === "=" ? (this.input(), this.tok.T_AND_EQUAL) : t === "&" ? (this.input(), this.tok.T_BOOLEAN_AND) : "&";
    }, "|"() {
      const t = this._input[this.offset];
      return t === "=" ? (this.input(), this.tok.T_OR_EQUAL) : t === "|" ? (this.input(), this.tok.T_BOOLEAN_OR) : "|";
    }, "^"() {
      return this._input[this.offset] === "=" ? (this.input(), this.tok.T_XOR_EQUAL) : "^";
    } } }, $o = { is_NUM() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 47 && t < 58 || t === 95;
    }, is_NUM_START() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 47 && t < 58;
    }, is_LABEL() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 96 && t < 123 || t > 64 && t < 91 || t === 95 || t > 47 && t < 58 || t > 126;
    }, is_LABEL_START() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 64 && t < 91 || t > 96 && t < 123 || t === 95 || t > 126;
    }, consume_LABEL() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (!this.is_LABEL()) {
          t && this.unput(1);
          break;
        }
      }
      return this;
    }, is_TOKEN() {
      const t = this._input[this.offset - 1];
      return ";:,.\\[]()|^&+-/*=%!~$<>?@".indexOf(t) !== -1;
    }, is_WHITESPACE() {
      const t = this._input[this.offset - 1];
      return t === " " || t === "	" || t === `
` || t === "\r";
    }, is_TABSPACE() {
      const t = this._input[this.offset - 1];
      return t === " " || t === "	";
    }, consume_TABSPACE() {
      for (; this.offset < this.size; ) {
        const t = this.input();
        if (!this.is_TABSPACE()) {
          t && this.unput(1);
          break;
        }
      }
      return this;
    }, is_HEX() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 47 && t < 58 || t > 64 && t < 71 || t > 96 && t < 103 || t === 95;
    }, is_OCTAL() {
      const t = this._input.charCodeAt(this.offset - 1);
      return t > 47 && t < 56 || t === 95;
    } };
    const P = function(t) {
      this.engine = t, this.tok = this.engine.tokens.names, this.EOF = 1, this.debug = false, this.all_tokens = true, this.comment_tokens = false, this.mode_eval = false, this.asp_tags = false, this.short_tags = false, this.version = 803, this.yyprevcol = 0, this.keywords = { __class__: this.tok.T_CLASS_C, __trait__: this.tok.T_TRAIT_C, __function__: this.tok.T_FUNC_C, __method__: this.tok.T_METHOD_C, __line__: this.tok.T_LINE, __file__: this.tok.T_FILE, __dir__: this.tok.T_DIR, __namespace__: this.tok.T_NS_C, exit: this.tok.T_EXIT, die: this.tok.T_EXIT, function: this.tok.T_FUNCTION, const: this.tok.T_CONST, return: this.tok.T_RETURN, try: this.tok.T_TRY, catch: this.tok.T_CATCH, finally: this.tok.T_FINALLY, throw: this.tok.T_THROW, if: this.tok.T_IF, elseif: this.tok.T_ELSEIF, endif: this.tok.T_ENDIF, else: this.tok.T_ELSE, while: this.tok.T_WHILE, endwhile: this.tok.T_ENDWHILE, do: this.tok.T_DO, for: this.tok.T_FOR, endfor: this.tok.T_ENDFOR, foreach: this.tok.T_FOREACH, endforeach: this.tok.T_ENDFOREACH, declare: this.tok.T_DECLARE, enddeclare: this.tok.T_ENDDECLARE, instanceof: this.tok.T_INSTANCEOF, as: this.tok.T_AS, switch: this.tok.T_SWITCH, endswitch: this.tok.T_ENDSWITCH, case: this.tok.T_CASE, default: this.tok.T_DEFAULT, break: this.tok.T_BREAK, continue: this.tok.T_CONTINUE, goto: this.tok.T_GOTO, echo: this.tok.T_ECHO, print: this.tok.T_PRINT, class: this.tok.T_CLASS, interface: this.tok.T_INTERFACE, trait: this.tok.T_TRAIT, enum: this.tok.T_ENUM, extends: this.tok.T_EXTENDS, implements: this.tok.T_IMPLEMENTS, new: this.tok.T_NEW, clone: this.tok.T_CLONE, var: this.tok.T_VAR, eval: this.tok.T_EVAL, include: this.tok.T_INCLUDE, include_once: this.tok.T_INCLUDE_ONCE, require: this.tok.T_REQUIRE, require_once: this.tok.T_REQUIRE_ONCE, namespace: this.tok.T_NAMESPACE, use: this.tok.T_USE, insteadof: this.tok.T_INSTEADOF, global: this.tok.T_GLOBAL, isset: this.tok.T_ISSET, empty: this.tok.T_EMPTY, __halt_compiler: this.tok.T_HALT_COMPILER, static: this.tok.T_STATIC, abstract: this.tok.T_ABSTRACT, final: this.tok.T_FINAL, private: this.tok.T_PRIVATE, protected: this.tok.T_PROTECTED, public: this.tok.T_PUBLIC, unset: this.tok.T_UNSET, list: this.tok.T_LIST, array: this.tok.T_ARRAY, callable: this.tok.T_CALLABLE, or: this.tok.T_LOGICAL_OR, and: this.tok.T_LOGICAL_AND, xor: this.tok.T_LOGICAL_XOR, match: this.tok.T_MATCH, readonly: this.tok.T_READ_ONLY }, this.castKeywords = { int: this.tok.T_INT_CAST, integer: this.tok.T_INT_CAST, real: this.tok.T_DOUBLE_CAST, double: this.tok.T_DOUBLE_CAST, float: this.tok.T_DOUBLE_CAST, string: this.tok.T_STRING_CAST, binary: this.tok.T_STRING_CAST, array: this.tok.T_ARRAY_CAST, object: this.tok.T_OBJECT_CAST, bool: this.tok.T_BOOL_CAST, boolean: this.tok.T_BOOL_CAST, unset: this.tok.T_UNSET_CAST };
    };
    P.prototype.setInput = function(t) {
      return this._input = t, this.size = t.length, this.yylineno = 1, this.offset = 0, this.yyprevcol = 0, this.yytext = "", this.yylloc = { first_offset: 0, first_line: 1, first_column: 0, prev_offset: 0, prev_line: 1, prev_column: 0, last_line: 1, last_column: 0 }, this.tokens = [], this.version > 703 ? this.keywords.fn = this.tok.T_FN : delete this.keywords.fn, this.done = this.offset >= this.size, !this.all_tokens && this.mode_eval ? (this.conditionStack = ["INITIAL"], this.begin("ST_IN_SCRIPTING")) : (this.conditionStack = [], this.begin("INITIAL")), this.heredoc_label = { label: "", length: 0, indentation: 0, indentation_uses_spaces: false, finished: false, first_encaps_node: false, toString() {
        this.label;
      } }, this;
    }, P.prototype.input = function() {
      const t = this._input[this.offset];
      return t ? (this.yytext += t, this.offset++, t === "\r" && this._input[this.offset] === `
` && (this.yytext += `
`, this.offset++), t === `
` || t === "\r" ? (this.yylloc.last_line = ++this.yylineno, this.yyprevcol = this.yylloc.last_column, this.yylloc.last_column = 0) : this.yylloc.last_column++, t) : "";
    }, P.prototype.unput = function(t) {
      if (t === 1) this.offset--, this._input[this.offset] === `
` && this._input[this.offset - 1] === "\r" && (this.offset--, t++), this._input[this.offset] === "\r" || this._input[this.offset] === `
` ? (this.yylloc.last_line--, this.yylineno--, this.yylloc.last_column = this.yyprevcol) : this.yylloc.last_column--, this.yytext = this.yytext.substring(0, this.yytext.length - t);
      else if (t > 0) if (this.offset -= t, t < this.yytext.length) {
        this.yytext = this.yytext.substring(0, this.yytext.length - t), this.yylloc.last_line = this.yylloc.first_line, this.yylloc.last_column = this.yyprevcol = this.yylloc.first_column;
        for (let e = 0; e < this.yytext.length; e++) {
          let s = this.yytext[e];
          s === "\r" ? (s = this.yytext[++e], this.yyprevcol = this.yylloc.last_column, this.yylloc.last_line++, this.yylloc.last_column = 0, s !== `
` && (s === "\r" ? this.yylloc.last_line++ : this.yylloc.last_column++)) : s === `
` ? (this.yyprevcol = this.yylloc.last_column, this.yylloc.last_line++, this.yylloc.last_column = 0) : this.yylloc.last_column++;
        }
        this.yylineno = this.yylloc.last_line;
      } else this.yytext = "", this.yylloc.last_line = this.yylineno = this.yylloc.first_line, this.yylloc.last_column = this.yylloc.first_column;
      return this;
    }, P.prototype.tryMatch = function(t) {
      return t === this.ahead(t.length);
    }, P.prototype.tryMatchCaseless = function(t) {
      return t === this.ahead(t.length).toLowerCase();
    }, P.prototype.ahead = function(t) {
      let e = this._input.substring(this.offset, this.offset + t);
      return e[e.length - 1] === "\r" && this._input[this.offset + t + 1] === `
` && (e += `
`), e;
    }, P.prototype.consume = function(t) {
      for (let e = 0; e < t; e++) {
        const s = this._input[this.offset];
        if (!s) break;
        this.yytext += s, this.offset++, s === "\r" && this._input[this.offset] === `
` && (this.yytext += `
`, this.offset++, e++), s === `
` || s === "\r" ? (this.yylloc.last_line = ++this.yylineno, this.yyprevcol = this.yylloc.last_column, this.yylloc.last_column = 0) : this.yylloc.last_column++;
      }
      return this;
    }, P.prototype.getState = function() {
      return { yytext: this.yytext, offset: this.offset, yylineno: this.yylineno, yyprevcol: this.yyprevcol, yylloc: { first_offset: this.yylloc.first_offset, first_line: this.yylloc.first_line, first_column: this.yylloc.first_column, last_line: this.yylloc.last_line, last_column: this.yylloc.last_column }, heredoc_label: this.heredoc_label };
    }, P.prototype.setState = function(t) {
      return this.yytext = t.yytext, this.offset = t.offset, this.yylineno = t.yylineno, this.yyprevcol = t.yyprevcol, this.yylloc = t.yylloc, t.heredoc_label && (this.heredoc_label = t.heredoc_label), this;
    }, P.prototype.appendToken = function(t, e) {
      return this.tokens.push([t, e]), this;
    }, P.prototype.lex = function() {
      this.yylloc.prev_offset = this.offset, this.yylloc.prev_line = this.yylloc.last_line, this.yylloc.prev_column = this.yylloc.last_column;
      let t = this.next() || this.lex();
      if (!this.all_tokens) {
        for (; t === this.tok.T_WHITESPACE || !this.comment_tokens && (t === this.tok.T_COMMENT || t === this.tok.T_DOC_COMMENT) || t === this.tok.T_OPEN_TAG; ) t = this.next() || this.lex();
        if (t == this.tok.T_OPEN_TAG_WITH_ECHO) return this.tok.T_ECHO;
        if (t === this.tok.T_CLOSE_TAG) return ";";
      }
      return this.yylloc.prev_offset || (this.yylloc.prev_offset = this.yylloc.first_offset, this.yylloc.prev_line = this.yylloc.first_line, this.yylloc.prev_column = this.yylloc.first_column), t;
    }, P.prototype.begin = function(t) {
      if (this.conditionStack.push(t), this.curCondition = t, this.stateCb = this["match" + t], typeof this.stateCb != "function") throw new Error('Undefined condition state "' + t + '"');
      return this;
    }, P.prototype.popState = function() {
      const t = this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      if (this.curCondition = this.conditionStack[this.conditionStack.length - 1], this.stateCb = this["match" + this.curCondition], typeof this.stateCb != "function") throw new Error('Undefined condition state "' + this.curCondition + '"');
      return t;
    }, P.prototype.next = function() {
      let t;
      if (this._input || (this.done = true), this.yylloc.first_offset = this.offset, this.yylloc.first_line = this.yylloc.last_line, this.yylloc.first_column = this.yylloc.last_column, this.yytext = "", this.done) return this.yylloc.prev_offset = this.yylloc.first_offset, this.yylloc.prev_line = this.yylloc.first_line, this.yylloc.prev_column = this.yylloc.first_column, this.EOF;
      if (this.tokens.length > 0 ? (t = this.tokens.shift(), typeof t[1] == "object" ? this.setState(t[1]) : this.consume(t[1]), t = t[0]) : t = this.stateCb.apply(this, []), this.offset >= this.size && this.tokens.length === 0 && (this.done = true), this.debug) {
        let e = t;
        e = typeof e == "number" ? this.engine.tokens.values[e] : '"' + e + '"';
        const s = new Error(e + "	from " + this.yylloc.first_line + "," + this.yylloc.first_column + "	 - to " + this.yylloc.last_line + "," + this.yylloc.last_column + '	"' + this.yytext + '"');
        console.error(s.stack);
      }
      return t;
    }, [Fo, Mo, Bo, Ho, Go, Vo, Yo, Wo, $o].forEach(function(t) {
      for (const e in t) P.prototype[e] = t[e];
    });
    var jo = P, Ie = function(t, e, s) {
      this.line = t, this.column = e, this.offset = s;
    }, zo = { read_array() {
      let t = null, e = false;
      const s = this.node("array");
      this.token === this.tok.T_ARRAY ? (this.next().expect("("), t = ")") : (e = true, t = "]");
      let i = [];
      return this.next().token !== t && (i = this.read_array_pair_list(e)), this.expect(t), this.next(), s(e, i);
    }, read_array_pair_list(t) {
      const e = this;
      return this.read_list(function() {
        return e.read_array_pair(t);
      }, ",", true);
    }, read_array_pair(t) {
      if (!t && this.token === ")" || t && this.token === "]") return;
      if (this.token === ",") return this.node("noop")();
      const e = this.node("entry");
      let s = null, i = null, n = false, r = false;
      if (this.token === "&") this.next(), n = true, i = this.read_variable(true, false);
      else if (this.token === this.tok.T_ELLIPSIS && this.version >= 704) this.next(), this.token === "&" && this.error(), r = true, i = this.read_expr();
      else {
        const a = this.read_expr();
        this.token === this.tok.T_DOUBLE_ARROW ? (this.next(), s = a, this.token === "&" ? (this.next(), n = true, i = this.read_variable(true, false)) : i = this.read_expr()) : i = a;
      }
      return e(s, i, n, r);
    } }, Ko = { read_class_declaration_statement(t) {
      const e = this.node("class"), s = this.read_class_modifiers();
      if (this.token !== this.tok.T_CLASS) return this.error(this.tok.T_CLASS), this.next(), null;
      this.next().expect(this.tok.T_STRING);
      let i = this.node("identifier");
      const n = this.text();
      this.next(), i = i(n);
      const r = this.read_extends_from(), a = this.read_implements_list();
      this.expect("{");
      const o = e(i, r, a, this.next().read_class_body(true, false), s);
      return t && (o.attrGroups = t), o;
    }, read_class_modifiers() {
      const t = this.read_class_modifier({ readonly: 0, final_or_abstract: 0 });
      return [0, 0, t.final_or_abstract, t.readonly];
    }, read_class_modifier(t) {
      return this.token === this.tok.T_READ_ONLY ? (this.next(), t.readonly = 1, t = this.read_class_modifier(t)) : t.final_or_abstract === 0 && this.token === this.tok.T_ABSTRACT ? (this.next(), t.final_or_abstract = 1, t = this.read_class_modifier(t)) : t.final_or_abstract === 0 && this.token === this.tok.T_FINAL && (this.next(), t.final_or_abstract = 2, t = this.read_class_modifier(t)), t;
    }, read_class_body(t, e) {
      let s = [], i = [];
      for (; this.token !== this.EOF && this.token !== "}"; ) {
        if (this.token === this.tok.T_COMMENT) {
          s.push(this.read_comment());
          continue;
        }
        if (this.token === this.tok.T_DOC_COMMENT) {
          s.push(this.read_doc_comment());
          continue;
        }
        if (this.token === this.tok.T_USE) {
          s = s.concat(this.read_trait_use_statement());
          continue;
        }
        if (e && this.token === this.tok.T_CASE) {
          const a = this.read_enum_case();
          this.expect(";") && this.next(), s = s.concat(a);
          continue;
        }
        this.token === this.tok.T_ATTRIBUTE && (i = this.read_attr_list());
        const n = this.position(), r = this.read_member_flags(false);
        if (this.token !== this.tok.T_CONST) if (t && this.token === this.tok.T_VAR && (this.next().expect(this.tok.T_VARIABLE), r[0] = null, r[1] = 0), this.token === this.tok.T_FUNCTION) s.push(this.read_function(false, r, i, n)), i = [];
        else if (t && (this.token === this.tok.T_VARIABLE || this.version >= 801 && this.token === this.tok.T_READ_ONLY || this.version >= 704 && (this.token === "?" || this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE || this.token === this.tok.T_NAMESPACE || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_STRING))) {
          const a = this.read_variable_list(r, i);
          i = [], this.expect(";"), this.next(), s = s.concat(a);
        } else this.error([this.tok.T_CONST, ...t ? [this.tok.T_VARIABLE] : [], ...e ? [this.tok.T_CASE] : [], this.tok.T_FUNCTION]), this.next();
        else {
          const a = this.read_constant_list(r, i);
          this.expect(";") && this.next(), s = s.concat(a);
        }
      }
      return this.expect("}"), this.next(), s;
    }, read_variable_list(t, e) {
      const s = this.node("propertystatement"), i = this.read_list(function() {
        const n = this.node("property");
        let r = false;
        this.token === this.tok.T_READ_ONLY && (r = true, this.next());
        const [a, o] = this.read_optional_type();
        this.expect(this.tok.T_VARIABLE);
        let c = this.node("identifier");
        const l = this.text().substring(1);
        this.next(), c = c(l);
        let h = null;
        return this.expect([",", ";", "="]), this.token === "=" && (h = this.next().read_expr()), n(c, h, r, a, o, e || []);
      }, ",");
      return s(null, i, t);
    }, read_constant_list(t, e) {
      this.expect(this.tok.T_CONST) && this.next();
      const [s, i] = this.version >= 803 ? this.read_optional_type() : [false, null], n = this.node("classconstant"), r = this.read_list(function() {
        const a = this.node("constant");
        let o = null, c = null;
        if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
          o = this.node("identifier");
          const l = this.text();
          this.next(), o = o(l);
        } else this.expect("IDENTIFIER");
        return this.expect("=") && (c = this.next().read_expr()), a(o, c);
      }, ",");
      return n(null, r, t, s, i, e || []);
    }, read_member_flags(t) {
      const e = [-1, -1, -1];
      if (this.is("T_MEMBER_FLAGS")) {
        let s = 0, i = 0;
        do {
          switch (this.token) {
            case this.tok.T_PUBLIC:
              s = 0, i = 0;
              break;
            case this.tok.T_PROTECTED:
              s = 0, i = 1;
              break;
            case this.tok.T_PRIVATE:
              s = 0, i = 2;
              break;
            case this.tok.T_STATIC:
              s = 1, i = 1;
              break;
            case this.tok.T_ABSTRACT:
              s = 2, i = 1;
              break;
            case this.tok.T_FINAL:
              s = 2, i = 2;
          }
          t && (s === 0 && i === 2 ? (this.expect([this.tok.T_PUBLIC, this.tok.T_PROTECTED]), i = -1) : s === 2 && i === 1 && (this.error(), i = -1)), e[s] !== -1 ? this.error() : i !== -1 && (e[s] = i);
        } while (this.next().is("T_MEMBER_FLAGS"));
      }
      return e[1] === -1 && (e[1] = 0), e[2] === -1 && (e[2] = 0), e;
    }, read_optional_type() {
      const t = this.token === "?";
      if (t && this.next(), this.peekSkipComments() === "=") return [false, null];
      let e = this.read_types();
      if (t && !e && this.raiseError("Expecting a type definition combined with nullable operator"), !t && !e) return [false, null];
      if (this.token === "|") {
        e = [e];
        do {
          this.next();
          const s = this.read_type();
          if (!s) {
            this.raiseError("Expecting a type definition");
            break;
          }
          e.push(s);
        } while (this.token === "|");
      }
      return [t, e];
    }, peekSkipComments() {
      const t = this.lexer.getState();
      let e;
      do
        e = this.lexer.lex();
      while (e === this.tok.T_COMMENT || e === this.tok.T_WHITESPACE);
      return this.lexer.setState(t), e;
    }, read_interface_declaration_statement(t) {
      const e = this.node("interface");
      if (this.token !== this.tok.T_INTERFACE) return this.error(this.tok.T_INTERFACE), this.next(), null;
      this.next().expect(this.tok.T_STRING);
      let s = this.node("identifier");
      const i = this.text();
      this.next(), s = s(i);
      const n = this.read_interface_extends_list();
      return this.expect("{"), e(s, n, this.next().read_interface_body(), t || []);
    }, read_interface_body() {
      let t = [], e = [];
      for (; this.token !== this.EOF && this.token !== "}"; ) {
        if (this.token === this.tok.T_COMMENT) {
          t.push(this.read_comment());
          continue;
        }
        if (this.token === this.tok.T_DOC_COMMENT) {
          t.push(this.read_doc_comment());
          continue;
        }
        const s = this.position();
        e = this.read_attr_list();
        const i = this.read_member_flags(true);
        if (this.token === this.tok.T_CONST) {
          const n = this.read_constant_list(i, e);
          this.expect(";") && this.next(), t = t.concat(n), e = [];
        } else if (this.token === this.tok.T_FUNCTION) {
          const n = this.read_function_declaration(2, i, e, s);
          n.parseFlags(i), t.push(n), this.expect(";") && this.next(), e = [];
        } else this.error([this.tok.T_CONST, this.tok.T_FUNCTION]), this.next();
      }
      return this.expect("}") && this.next(), t;
    }, read_trait_declaration_statement() {
      const t = this.node("trait");
      if (this.token !== this.tok.T_TRAIT) return this.error(this.tok.T_TRAIT), this.next(), null;
      this.next().expect(this.tok.T_STRING);
      let e = this.node("identifier");
      const s = this.text();
      return this.next(), e = e(s), this.expect("{"), t(e, this.next().read_class_body(true, false));
    }, read_trait_use_statement() {
      const t = this.node("traituse");
      this.expect(this.tok.T_USE) && this.next();
      const e = [this.read_namespace_name()];
      let s = null;
      for (; this.token === ","; ) e.push(this.next().read_namespace_name());
      if (this.token === "{") {
        for (s = []; this.next().token !== this.EOF && this.token !== "}"; ) s.push(this.read_trait_use_alias()), this.expect(";");
        this.expect("}") && this.next();
      } else this.expect(";") && this.next();
      return t(e, s);
    }, read_trait_use_alias() {
      const t = this.node();
      let e, s = null;
      if (this.is("IDENTIFIER")) {
        e = this.node("identifier");
        const i = this.text();
        this.next(), e = e(i);
      } else if (e = this.read_namespace_name(), this.token === this.tok.T_DOUBLE_COLON) if (this.next(), this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
        s = e, e = this.node("identifier");
        const i = this.text();
        this.next(), e = e(i);
      } else this.expect(this.tok.T_STRING);
      else e = e.name;
      if (this.token === this.tok.T_INSTEADOF) return t("traitprecedence", s, e, this.next().read_name_list());
      if (this.token === this.tok.T_AS) {
        let i = null, n = null;
        if (this.next().is("T_MEMBER_FLAGS") && (i = this.read_member_flags()), this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
          n = this.node("identifier");
          const r = this.text();
          this.next(), n = n(r);
        } else i === false && this.expect(this.tok.T_STRING);
        return t("traitalias", s, e, n, i);
      }
      return this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]), t("traitalias", s, e, null, null);
    } }, Xo = { read_comment() {
      const t = this.text();
      let e = this.ast.prepare(t.substring(0, 2) === "/*" ? "commentblock" : "commentline", null, this);
      const s = this.lexer.yylloc.first_offset, i = this.prev;
      return this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset], this.lex(), e = e(t), e.offset = s, this.prev = i, e;
    }, read_doc_comment() {
      let t = this.ast.prepare("commentblock", null, this);
      const e = this.lexer.yylloc.first_offset, s = this.text(), i = this.prev;
      return this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset], this.lex(), t = t(s), t.offset = e, this.prev = i, t;
    } }, qo = { read_expr(t) {
      const e = this.node();
      if (this.token === "@") return t || (t = this.next().read_expr()), e("silent", t);
      if (t || (t = this.read_expr_item()), this.token === "|") return e("bin", "|", t, this.next().read_expr());
      if (this.token === "&") return e("bin", "&", t, this.next().read_expr());
      if (this.token === "^") return e("bin", "^", t, this.next().read_expr());
      if (this.token === ".") return e("bin", ".", t, this.next().read_expr());
      if (this.token === "+") return e("bin", "+", t, this.next().read_expr());
      if (this.token === "-") return e("bin", "-", t, this.next().read_expr());
      if (this.token === "*") return e("bin", "*", t, this.next().read_expr());
      if (this.token === "/") return e("bin", "/", t, this.next().read_expr());
      if (this.token === "%") return e("bin", "%", t, this.next().read_expr());
      if (this.token === this.tok.T_POW) return e("bin", "**", t, this.next().read_expr());
      if (this.token === this.tok.T_SL) return e("bin", "<<", t, this.next().read_expr());
      if (this.token === this.tok.T_SR) return e("bin", ">>", t, this.next().read_expr());
      if (this.token === this.tok.T_BOOLEAN_OR) return e("bin", "||", t, this.next().read_expr());
      if (this.token === this.tok.T_LOGICAL_OR) return e("bin", "or", t, this.next().read_expr());
      if (this.token === this.tok.T_BOOLEAN_AND) return e("bin", "&&", t, this.next().read_expr());
      if (this.token === this.tok.T_LOGICAL_AND) return e("bin", "and", t, this.next().read_expr());
      if (this.token === this.tok.T_LOGICAL_XOR) return e("bin", "xor", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_IDENTICAL) return e("bin", "===", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_NOT_IDENTICAL) return e("bin", "!==", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_EQUAL) return e("bin", "==", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_NOT_EQUAL) return e("bin", "!=", t, this.next().read_expr());
      if (this.token === "<") return e("bin", "<", t, this.next().read_expr());
      if (this.token === ">") return e("bin", ">", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL) return e("bin", "<=", t, this.next().read_expr());
      if (this.token === this.tok.T_IS_GREATER_OR_EQUAL) return e("bin", ">=", t, this.next().read_expr());
      if (this.token === this.tok.T_SPACESHIP) return e("bin", "<=>", t, this.next().read_expr());
      if (this.token === this.tok.T_INSTANCEOF && (t = e("bin", "instanceof", t, this.next().read_class_name_reference()), this.token !== ";" && this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF && (t = this.read_expr(t))), this.token === this.tok.T_COALESCE) return e("bin", "??", t, this.next().read_expr());
      if (this.token === "?") {
        let s = null;
        return this.next().token !== ":" && (s = this.read_expr()), this.expect(":") && this.next(), e("retif", t, s, this.read_expr());
      }
      return e.destroy(t), t;
    }, read_expr_cast(t) {
      return this.node("cast")(t, this.text(), this.next().read_expr());
    }, read_isset_variable() {
      return this.read_expr();
    }, read_isset_variables() {
      return this.read_function_list(this.read_isset_variable, ",");
    }, read_internal_functions_in_yacc() {
      let t = null;
      switch (this.token) {
        case this.tok.T_ISSET:
          {
            t = this.node("isset"), this.next().expect("(") && this.next();
            const e = this.read_isset_variables();
            this.expect(")") && this.next(), t = t(e);
          }
          break;
        case this.tok.T_EMPTY:
          {
            t = this.node("empty"), this.next().expect("(") && this.next();
            const e = this.read_expr();
            this.expect(")") && this.next(), t = t(e);
          }
          break;
        case this.tok.T_INCLUDE:
          t = this.node("include")(false, false, this.next().read_expr());
          break;
        case this.tok.T_INCLUDE_ONCE:
          t = this.node("include")(true, false, this.next().read_expr());
          break;
        case this.tok.T_EVAL:
          {
            t = this.node("eval"), this.next().expect("(") && this.next();
            const e = this.read_expr();
            this.expect(")") && this.next(), t = t(e);
          }
          break;
        case this.tok.T_REQUIRE:
          t = this.node("include")(false, true, this.next().read_expr());
          break;
        case this.tok.T_REQUIRE_ONCE:
          t = this.node("include")(true, true, this.next().read_expr());
      }
      return t;
    }, read_optional_expr(t) {
      return this.token !== t ? this.read_expr() : null;
    }, read_exit_expr() {
      let t = null;
      return this.token === "(" && (this.next(), t = this.read_optional_expr(")"), this.expect(")") && this.next()), t;
    }, read_expr_item() {
      let t, e, s = [];
      if (this.token === "+") return this.node("unary")("+", this.next().read_expr());
      if (this.token === "-") return this.node("unary")("-", this.next().read_expr());
      if (this.token === "!") return this.node("unary")("!", this.next().read_expr());
      if (this.token === "~") return this.node("unary")("~", this.next().read_expr());
      if (this.token === "(") return e = this.next().read_expr(), e.parenthesizedExpression = true, this.expect(")") && this.next(), this.handleDereferencable(e);
      if (this.token === "`") return this.read_encapsed_string("`");
      if (this.token === this.tok.T_LIST) {
        let i = null;
        const n = this.innerList;
        t = this.node("list"), n || (i = this.node("assign")), this.next().expect("(") && this.next(), this.innerList || (this.innerList = true);
        const r = this.read_array_pair_list(false);
        this.expect(")") && this.next();
        let a = false;
        for (let o = 0; o < r.length; o++) if (r[o] !== null && r[o].kind !== "noop") {
          a = true;
          break;
        }
        return a || this.raiseError("Fatal Error :  Cannot use empty list on line " + this.lexer.yylloc.first_line), n ? t(r, false) : (this.innerList = false, this.expect("=") ? i(t(r, false), this.next().read_expr(), "=") : t(r, false));
      }
      if (this.token === this.tok.T_ATTRIBUTE && (s = this.read_attr_list()), this.token === this.tok.T_CLONE) return this.node("clone")(this.next().read_expr());
      switch (this.token) {
        case this.tok.T_INC:
          return this.node("pre")("+", this.next().read_variable(false, false));
        case this.tok.T_DEC:
          return this.node("pre")("-", this.next().read_variable(false, false));
        case this.tok.T_NEW:
          return e = this.read_new_expr(), this.token === this.tok.T_OBJECT_OPERATOR && this.version < 804 && this.raiseError("New without parenthesis is not allowed before PHP 8.4"), this.handleDereferencable(e);
        case this.tok.T_ISSET:
        case this.tok.T_EMPTY:
        case this.tok.T_INCLUDE:
        case this.tok.T_INCLUDE_ONCE:
        case this.tok.T_EVAL:
        case this.tok.T_REQUIRE:
        case this.tok.T_REQUIRE_ONCE:
          return this.read_internal_functions_in_yacc();
        case this.tok.T_MATCH:
          return this.read_match_expression();
        case this.tok.T_INT_CAST:
          return this.read_expr_cast("int");
        case this.tok.T_DOUBLE_CAST:
          return this.read_expr_cast("float");
        case this.tok.T_STRING_CAST:
          return this.read_expr_cast(this.text().indexOf("binary") !== -1 ? "binary" : "string");
        case this.tok.T_ARRAY_CAST:
          return this.read_expr_cast("array");
        case this.tok.T_OBJECT_CAST:
          return this.read_expr_cast("object");
        case this.tok.T_BOOL_CAST:
          return this.read_expr_cast("bool");
        case this.tok.T_UNSET_CAST:
          return this.read_expr_cast("unset");
        case this.tok.T_THROW:
          return this.version < 800 && this.raiseError("PHP 8+ is required to use throw as an expression"), this.node("throw")(this.next().read_expr());
        case this.tok.T_EXIT: {
          const i = this.lexer.yytext.toLowerCase() === "die";
          return t = this.node("exit"), this.next(), t(this.read_exit_expr(), i);
        }
        case this.tok.T_PRINT:
          return this.node("print")(this.next().read_expr());
        case this.tok.T_YIELD: {
          let i = null, n = null;
          return t = this.node("yield"), this.next().is("EXPR") && (i = this.read_expr(), this.token === this.tok.T_DOUBLE_ARROW && (n = i, i = this.next().read_expr())), t(i, n);
        }
        case this.tok.T_YIELD_FROM:
          return t = this.node("yieldfrom"), e = this.next().read_expr(), t(e);
        case this.tok.T_FN:
        case this.tok.T_FUNCTION:
          return this.read_inline_function(void 0, s);
        case this.tok.T_STATIC: {
          const i = [this.token, this.lexer.getState()];
          if (this.next(), this.token === this.tok.T_FUNCTION || this.version >= 704 && this.token === this.tok.T_FN) return this.read_inline_function([0, 1, 0], s);
          this.lexer.tokens.push(i), this.next();
        }
      }
      if (this.is("VARIABLE")) {
        t = this.node(), e = this.read_variable(false, false);
        const i = e.kind === "identifier" || e.kind === "staticlookup" && e.offset.kind === "identifier";
        switch (this.token) {
          case "=":
            return i && this.error("VARIABLE"), this.next().token == "&" ? this.read_assignref(t, e) : t("assign", e, this.read_expr(), "=");
          case this.tok.T_PLUS_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "+=");
          case this.tok.T_MINUS_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "-=");
          case this.tok.T_MUL_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "*=");
          case this.tok.T_POW_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "**=");
          case this.tok.T_DIV_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "/=");
          case this.tok.T_CONCAT_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), ".=");
          case this.tok.T_MOD_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "%=");
          case this.tok.T_AND_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "&=");
          case this.tok.T_OR_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "|=");
          case this.tok.T_XOR_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "^=");
          case this.tok.T_SL_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "<<=");
          case this.tok.T_SR_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), ">>=");
          case this.tok.T_COALESCE_EQUAL:
            return i && this.error("VARIABLE"), t("assign", e, this.next().read_expr(), "??=");
          case this.tok.T_INC:
            return i && this.error("VARIABLE"), this.next(), t("post", "+", e);
          case this.tok.T_DEC:
            return i && this.error("VARIABLE"), this.next(), t("post", "-", e);
          default:
            t.destroy(e);
        }
      } else {
        if (this.is("SCALAR")) {
          if (t = this.node(), e = this.read_scalar(), e.kind === "array" && e.shortForm && this.token === "=") {
            const i = this.convertToList(e);
            return e.loc && (i.loc = e.loc), t("assign", i, this.next().read_expr(), "=");
          }
          return t.destroy(e), this.handleDereferencable(e);
        }
        this.error("EXPR"), this.next();
      }
      return e;
    }, convertToList(t) {
      const e = t.items.map((i) => (i.value && i.value.kind === "array" && i.value.shortForm && (i.value = this.convertToList(i.value)), i)), s = this.node("list")(e, true);
      return t.loc && (s.loc = t.loc), t.leadingComments && (s.leadingComments = t.leadingComments), t.trailingComments && (s.trailingComments = t.trailingComments), s;
    }, read_assignref(t, e) {
      let s;
      return this.next(), this.token === this.tok.T_NEW ? (this.version >= 700 && this.error(), s = this.read_new_expr()) : s = this.read_variable(false, false), t("assignref", e, s);
    }, read_inline_function(t, e) {
      if (this.token === this.tok.T_FUNCTION) {
        const c = this.read_function(true, t, e);
        return c.attrGroups = e, c;
      }
      !this.version >= 704 && this.raiseError("Arrow Functions are not allowed");
      const s = this.node("arrowfunc");
      this.expect(this.tok.T_FN) && this.next();
      const i = this.is_reference();
      this.expect("(") && this.next();
      const n = this.read_parameter_list();
      this.expect(")") && this.next();
      let r = false, a = null;
      this.token === ":" && (this.next().token === "?" && (r = true, this.next()), a = this.read_types()), this.expect(this.tok.T_DOUBLE_ARROW) && this.next();
      const o = s(n, i, this.read_expr(), a, r, !!t);
      return o.attrGroups = e, o;
    }, read_match_expression() {
      const t = this.node("match");
      this.expect(this.tok.T_MATCH) && this.next(), this.version < 800 && this.raiseError("Match statements are not allowed before PHP 8");
      let e = null, s = [];
      return this.expect("(") && this.next(), e = this.read_expr(), this.expect(")") && this.next(), this.expect("{") && this.next(), s = this.read_match_arms(), this.expect("}") && this.next(), t(e, s);
    }, read_match_arms() {
      return this.read_list(() => this.read_match_arm(), ",", true);
    }, read_match_arm() {
      if (this.token !== "}") return this.node("matcharm")(this.read_match_arm_conds(), this.read_expr());
    }, read_match_arm_conds() {
      let t = [];
      if (this.token === this.tok.T_DEFAULT) t = null, this.next();
      else for (t.push(this.read_expr()); this.token === ","; ) {
        if (this.next(), this.token === this.tok.T_DOUBLE_ARROW) return this.next(), t;
        t.push(this.read_expr());
      }
      return this.expect(this.tok.T_DOUBLE_ARROW) && this.next(), t;
    }, read_attribute() {
      const t = this.text();
      let e = [];
      return this.next(), this.token === "(" && (e = this.read_argument_list()), this.node("attribute")(t, e);
    }, read_attr_list() {
      const t = [];
      if (this.token === this.tok.T_ATTRIBUTE) do {
        const e = this.node("attrgroup")([]);
        for (this.next(), e.attrs.push(this.read_attribute()); this.token === ","; ) this.next(), this.token !== "]" && e.attrs.push(this.read_attribute());
        t.push(e), this.expect("]"), this.next();
      } while (this.token === this.tok.T_ATTRIBUTE);
      return t;
    }, read_new_expr() {
      const t = this.node("new");
      this.expect(this.tok.T_NEW) && this.next();
      let e = [];
      if (this.token === "(") {
        this.next();
        const n = this.read_expr();
        return this.expect(")"), this.next(), this.token === "(" && (e = this.read_argument_list()), t(n, e);
      }
      const s = this.read_attr_list();
      if (this.token === this.tok.T_CLASS) {
        const n = this.node("class");
        this.next().token === "(" && (e = this.read_argument_list());
        const r = this.read_extends_from(), a = this.read_implements_list();
        let o = null;
        this.expect("{") && (o = this.next().read_class_body(true, false));
        const c = n(null, r, a, o, [0, 0, 0]);
        return c.attrGroups = s, t(c, e);
      }
      let i = this.read_new_class_name();
      for (; this.token === "["; ) {
        const n = this.node("offsetlookup"), r = this.next().read_encaps_var_offset();
        this.expect("]") && this.next(), i = n(i, r);
      }
      return this.token === "(" && (e = this.read_argument_list()), t(i, e);
    }, read_new_class_name() {
      if (this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_NAMESPACE) {
        let t = this.read_namespace_name(true);
        return this.token === this.tok.T_DOUBLE_COLON && (t = this.read_static_getter(t)), t;
      }
      if (this.is("VARIABLE")) return this.read_variable(true, false);
      this.expect([this.tok.T_STRING, "VARIABLE"]);
    }, handleDereferencable(t) {
      for (; this.token !== this.EOF; ) if (this.token === this.tok.T_OBJECT_OPERATOR || this.token === this.tok.T_DOUBLE_COLON) t = this.recursive_variable_chain_scan(t, false, false, true);
      else if (this.token === this.tok.T_CURLY_OPEN || this.token === "[") t = this.read_dereferencable(t);
      else {
        if (this.token !== "(") return t;
        t = this.node("call")(t, this.read_argument_list());
      }
      return t;
    } }, Jo = { read_enum_declaration_statement(t) {
      const e = this.node("enum");
      if (!this.expect(this.tok.T_ENUM)) return null;
      this.next().expect(this.tok.T_STRING);
      let s = this.node("identifier");
      const i = this.text();
      this.next(), s = s(i);
      const n = this.read_enum_value_type(), r = this.read_implements_list();
      this.expect("{");
      const a = e(s, n, r, this.next().read_class_body(false, true));
      return t && (a.attrGroups = t), a;
    }, read_enum_value_type() {
      return this.token === ":" ? this.next().read_namespace_name() : null;
    }, read_enum_case() {
      this.expect(this.tok.T_CASE);
      const t = this.node("enumcase");
      let e = this.node("identifier");
      const s = this.next().text();
      this.next(), e = e(s);
      const i = this.token === "=" ? this.next().read_expr() : null;
      return this.expect(";"), t(e, i);
    } }, Zo = { is_reference() {
      return this.token === "&" && (this.next(), true);
    }, is_variadic() {
      return this.token === this.tok.T_ELLIPSIS && (this.next(), true);
    }, read_function(t, e, s, i) {
      const n = this.read_function_declaration(t ? 1 : e ? 2 : 0, e && e[1] === 1, s || [], i);
      return e && e[2] == 1 ? (n.parseFlags(e), this.expect(";") && this.next()) : (this.expect("{") && (n.body = this.read_code_block(false), n.loc && n.body.loc && (n.loc.end = n.body.loc.end)), !t && e && n.parseFlags(e)), n;
    }, read_function_declaration(t, e, s, i) {
      let n = "function";
      t === 1 ? n = "closure" : t === 2 && (n = "method");
      const r = this.node(n);
      this.expect(this.tok.T_FUNCTION) && this.next();
      const a = this.is_reference();
      let o = false, c = [], l = null, h = false;
      if (t !== 1) {
        const d = this.node("identifier");
        t === 2 ? this.version >= 700 ? this.token === this.tok.T_STRING || this.is("IDENTIFIER") ? (o = this.text(), this.next()) : this.version < 704 && this.error("IDENTIFIER") : this.token === this.tok.T_STRING ? (o = this.text(), this.next()) : this.error("IDENTIFIER") : this.version >= 700 ? this.token === this.tok.T_STRING ? (o = this.text(), this.next()) : this.version >= 704 ? this.expect("(") || this.next() : (this.error(this.tok.T_STRING), this.next()) : (this.expect(this.tok.T_STRING) && (o = this.text()), this.next()), o = d(o);
      }
      this.expect("(") && this.next();
      const u = this.read_parameter_list(o.name === "__construct");
      return this.expect(")") && this.next(), t === 1 && (c = this.read_lexical_vars()), this.token === ":" && (this.next().token === "?" && (h = true, this.next()), l = this.read_types()), ((d) => (d.attrGroups = s || [], i && d.loc && (d.loc.start = i, d.loc.source && (d.loc.source = this.lexer._input.substr(d.loc.start.offset, d.loc.end.offset - d.loc.start.offset))), d))(t === 1 ? r(u, a, c, l, h, e) : r(o, u, a, l, h));
    }, read_lexical_vars() {
      let t = [];
      return this.token === this.tok.T_USE && (this.next(), this.expect("(") && this.next(), t = this.read_lexical_var_list(), this.expect(")") && this.next()), t;
    }, read_list_with_dangling_comma(t) {
      const e = [];
      for (; this.token != this.EOF; ) {
        if (e.push(t()), this.token != ",") {
          if (this.token == ")") break;
          this.error([",", ")"]);
          break;
        }
        if (this.next(), this.version >= 800 && this.token === ")") return e;
      }
      return e;
    }, read_lexical_var_list() {
      return this.read_list_with_dangling_comma(this.read_lexical_var.bind(this));
    }, read_lexical_var() {
      if (this.token === "&") return this.read_byref(this.read_lexical_var.bind(this));
      const t = this.node("variable");
      this.expect(this.tok.T_VARIABLE);
      const e = this.text().substring(1);
      return this.next(), t(e, false);
    }, read_parameter_list(t) {
      if (this.token !== ")") {
        let e = false;
        return this.read_list_with_dangling_comma((function() {
          const s = this.read_parameter(t);
          return s && (e && this.raiseError("Unexpected parameter after a variadic parameter"), s.variadic && (e = true)), s;
        }).bind(this), ",");
      }
      return [];
    }, read_parameter(t) {
      const e = this.node("parameter");
      let s = null, i = null, n = null, r = false, a = false, o = [];
      this.token === this.tok.T_ATTRIBUTE && (o = this.read_attr_list()), this.version >= 801 && this.token === this.tok.T_READ_ONLY && (t ? (this.next(), a = true) : this.raiseError("readonly properties can be used only on class constructor"));
      const c = this.read_promoted();
      !a && this.version >= 801 && this.token === this.tok.T_READ_ONLY && (t ? (this.next(), a = true) : this.raiseError("readonly properties can be used only on class constructor")), this.token === "?" && (this.next(), r = true), n = this.read_types(), r && !n && this.raiseError("Expecting a type definition combined with nullable operator");
      const l = this.is_reference(), h = this.is_variadic();
      if (this.expect(this.tok.T_VARIABLE)) {
        s = this.node("identifier");
        const p = this.text().substring(1);
        this.next(), s = s(p);
      }
      this.token == "=" && (i = this.next().read_expr());
      const u = e(s, n, i, l, h, a, r, c);
      return o && (u.attrGroups = o), u;
    }, read_types() {
      const t = "unset", e = "union", s = "intersection", i = [];
      let n = t;
      const r = this.read_type();
      if (!r) return null;
      for (i.push(r); this.token === "|" || this.version >= 801 && this.token === "&"; ) {
        const a = this.peek();
        if (a === this.tok.T_ELLIPSIS || a === this.tok.T_VARIABLE) break;
        n === t ? n = this.token === "|" ? e : s : (n === e && this.token !== "|" || n === s && this.token !== "&") && this.raiseError('Unexpect token "' + this.token + '", "|" and "&" can not be mixed'), this.next(), i.push(this.read_type());
      }
      return i.length === 1 ? i[0] : n === s ? this.node("intersectiontype")(i) : this.node("uniontype")(i);
    }, read_promoted() {
      return this.token === this.tok.T_PUBLIC ? (this.next(), 1) : this.token === this.tok.T_PROTECTED ? (this.next(), 2) : this.token === this.tok.T_PRIVATE ? (this.next(), 4) : 0;
    }, read_argument_list() {
      let t = [];
      return this.expect("(") && this.next(), this.version >= 801 && this.token === this.tok.T_ELLIPSIS && this.peek() === ")" ? (t.push(this.node("variadicplaceholder")()), this.next()) : this.token !== ")" && (t = this.read_non_empty_argument_list()), this.expect(")") && this.next(), t;
    }, read_non_empty_argument_list() {
      let t = false;
      return this.read_function_list((function() {
        const e = this.read_argument();
        if (e) {
          const s = e.kind === "variadic";
          t && !s && this.raiseError("Unexpected non-variadic argument after a variadic argument"), s && (t = true);
        }
        return e;
      }).bind(this), ",");
    }, read_argument() {
      return this.token === this.tok.T_ELLIPSIS ? this.node("variadic")(this.next().read_expr()) : (this.token === this.tok.T_STRING || Object.values(this.lexer.keywords).includes(this.token)) && this.peek() === ":" ? (this.version < 800 && this.raiseError("PHP 8+ is required to use named arguments"), this.node("namedargument")(this.text(), this.next().next().read_expr())) : this.read_expr();
    }, read_type() {
      const t = this.node();
      if (this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE) {
        const e = this.text();
        return this.next(), t("typereference", e.toLowerCase(), e);
      }
      if (this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_STATIC) {
        const e = this.text(), s = [this.token, this.lexer.getState()];
        return this.next(), this.token !== this.tok.T_NS_SEPARATOR && this.ast.typereference.types.indexOf(e.toLowerCase()) > -1 ? t("typereference", e.toLowerCase(), e) : (this.lexer.tokens.push(s), this.next(), t.destroy(), this.read_namespace_name());
      }
      return t.destroy(), null;
    } }, th = { read_if() {
      const t = this.node("if"), e = this.next().read_if_expr();
      let s = null, i = null, n = false;
      if (this.token === ":") {
        n = true, this.next(), s = this.node("block");
        const r = [];
        for (; this.token !== this.EOF && this.token !== this.tok.T_ENDIF; ) {
          if (this.token === this.tok.T_ELSEIF) {
            i = this.read_elseif_short();
            break;
          }
          if (this.token === this.tok.T_ELSE) {
            i = this.read_else_short();
            break;
          }
          r.push(this.read_inner_statement());
        }
        s = s(null, r), this.expect(this.tok.T_ENDIF) && this.next(), this.expectEndOfStatement();
      } else s = this.read_statement(), this.token === this.tok.T_ELSEIF ? i = this.read_if() : this.token === this.tok.T_ELSE && (i = this.next().read_statement());
      return t(e, s, i, n);
    }, read_if_expr() {
      this.expect("(") && this.next();
      const t = this.read_expr();
      return this.expect(")") && this.next(), t;
    }, read_elseif_short() {
      let t = null;
      const e = this.node("if"), s = this.next().read_if_expr();
      this.expect(":") && this.next();
      const i = this.node("block"), n = [];
      for (; this.token != this.EOF && this.token !== this.tok.T_ENDIF; ) {
        if (this.token === this.tok.T_ELSEIF) {
          t = this.read_elseif_short();
          break;
        }
        if (this.token === this.tok.T_ELSE) {
          t = this.read_else_short();
          break;
        }
        n.push(this.read_inner_statement());
      }
      return e(s, i(null, n), t, true);
    }, read_else_short() {
      this.next().expect(":") && this.next();
      const t = this.node("block"), e = [];
      for (; this.token != this.EOF && this.token !== this.tok.T_ENDIF; ) e.push(this.read_inner_statement());
      return t(null, e);
    } }, eh = { read_while() {
      const t = this.node("while");
      this.expect(this.tok.T_WHILE) && this.next();
      let e = null, s = null, i = false;
      return this.expect("(") && this.next(), e = this.read_expr(), this.expect(")") && this.next(), this.token === ":" ? (i = true, s = this.read_short_form(this.tok.T_ENDWHILE)) : s = this.read_statement(), t(e, s, i);
    }, read_do() {
      const t = this.node("do");
      this.expect(this.tok.T_DO) && this.next();
      let e = null, s = null;
      return s = this.read_statement(), this.expect(this.tok.T_WHILE) && (this.next().expect("(") && this.next(), e = this.read_expr(), this.expect(")") && this.next(), this.expect(";") && this.next()), t(e, s);
    }, read_for() {
      const t = this.node("for");
      this.expect(this.tok.T_FOR) && this.next();
      let e = [], s = [], i = [], n = null, r = false;
      return this.expect("(") && this.next(), this.token !== ";" ? (e = this.read_list(this.read_expr, ","), this.expect(";") && this.next()) : this.next(), this.token !== ";" ? (s = this.read_list(this.read_expr, ","), this.expect(";") && this.next()) : this.next(), this.token !== ")" ? (i = this.read_list(this.read_expr, ","), this.expect(")") && this.next()) : this.next(), this.token === ":" ? (r = true, n = this.read_short_form(this.tok.T_ENDFOR)) : n = this.read_statement(), t(e, s, i, n, r);
    }, read_foreach() {
      const t = this.node("foreach");
      this.expect(this.tok.T_FOREACH) && this.next();
      let e = null, s = null, i = null, n = null, r = false;
      return this.expect("(") && this.next(), e = this.read_expr(), this.expect(this.tok.T_AS) && (this.next(), i = this.read_foreach_variable(), this.token === this.tok.T_DOUBLE_ARROW && (s = i, i = this.next().read_foreach_variable())), s && s.kind === "list" && this.raiseError("Fatal Error : Cannot use list as key element"), this.expect(")") && this.next(), this.token === ":" ? (r = true, n = this.read_short_form(this.tok.T_ENDFOREACH)) : n = this.read_statement(), t(e, s, i, n, r);
    }, read_foreach_variable() {
      if (this.token === this.tok.T_LIST || this.token === "[") {
        const t = this.token === "[", e = this.node("list");
        this.next(), !t && this.expect("(") && this.next();
        const s = this.read_array_pair_list(t);
        return this.expect(t ? "]" : ")") && this.next(), e(s, t);
      }
      return this.read_variable(false, false);
    } }, sh = { read_start() {
      return this.token == this.tok.T_NAMESPACE ? this.read_namespace() : this.read_top_statement();
    } }, ih = { read_namespace() {
      const t = this.node("namespace");
      let e, s;
      return this.expect(this.tok.T_NAMESPACE) && this.next(), s = this.token === "{" ? { name: [""] } : this.read_namespace_name(), this.currentNamespace = s, this.token === ";" ? (this.currentNamespace = s, e = this.next().read_top_statements(), this.expect(this.EOF), t(s.name, e, false)) : this.token === "{" ? (this.currentNamespace = s, e = this.next().read_top_statements(), this.expect("}") && this.next(), e.length === 0 && this.extractDoc && this._docs.length > this._docIndex && e.push(this.node("noop")()), t(s.name, e, true)) : (this.error(["{", ";"]), this.currentNamespace = s, e = this.read_top_statements(), this.expect(this.EOF), t(s, e, false));
    }, read_namespace_name(t) {
      const e = this.node();
      let s, i = this.text();
      switch (this.token) {
        case this.tok.T_NAME_RELATIVE:
          s = this.ast.name.RELATIVE_NAME, i = i.replace(/^namespace\\/, "");
          break;
        case this.tok.T_NAME_QUALIFIED:
          s = this.ast.name.QUALIFIED_NAME;
          break;
        case this.tok.T_NAME_FULLY_QUALIFIED:
          s = this.ast.name.FULL_QUALIFIED_NAME;
          break;
        default:
          if (s = this.ast.name.UNQUALIFIED_NAME, !this.expect(this.tok.T_STRING)) return e("name", "", this.ast.name.FULL_QUALIFIED_NAME);
      }
      if (this.next(), t || this.token !== "(") {
        if (i.toLowerCase() === "parent") return e("parentreference", i);
        if (i.toLowerCase() === "self") return e("selfreference", i);
      }
      return e("name", i, s);
    }, read_use_statement() {
      let t = this.node("usegroup"), e = [], s = null;
      this.expect(this.tok.T_USE) && this.next();
      const i = this.read_use_type();
      return e.push(this.read_use_declaration(false)), this.token === "," ? e = e.concat(this.next().read_use_declarations(false)) : this.token === "{" && (s = e[0].name, e = this.next().read_use_declarations(i === null), this.expect("}") && this.next()), t = t(s, i, e), this.expect(";") && this.next(), t;
    }, read_class_name_reference() {
      return this.read_variable(true, false);
    }, read_use_declaration(t) {
      const e = this.node("useitem");
      let s = null;
      t && (s = this.read_use_type());
      const i = this.read_namespace_name(), n = this.read_use_alias();
      return e(i.name, n, s);
    }, read_use_declarations(t) {
      const e = [this.read_use_declaration(t)];
      for (; this.token === ","; ) {
        if (this.next(), t) {
          if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_FUNCTION && this.token !== this.tok.T_CONST && this.token !== this.tok.T_STRING) break;
        } else if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_STRING && this.token !== this.tok.T_NS_SEPARATOR) break;
        e.push(this.read_use_declaration(t));
      }
      return e;
    }, read_use_alias() {
      let t = null;
      if (this.token === this.tok.T_AS && this.next().expect(this.tok.T_STRING)) {
        const e = this.node("identifier"), s = this.text();
        this.next(), t = e(s);
      }
      return t;
    }, read_use_type() {
      return this.token === this.tok.T_FUNCTION ? (this.next(), this.ast.useitem.TYPE_FUNCTION) : this.token === this.tok.T_CONST ? (this.next(), this.ast.useitem.TYPE_CONST) : null;
    } };
    const Ce = { "\\": "\\", $: "$", n: `
`, r: "\r", t: "	", f: "\f", v: "\v", e: "\x1B" };
    var nh = { resolve_special_chars: (t, e) => e ? t.replace(/\\"/, '"').replace(/\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g, (s, i, n) => Ce[i] ? Ce[i] : i[0] === "x" || i[0] === "X" ? String.fromCodePoint(parseInt(i.substr(1), 16)) : i[0] === "u" ? String.fromCodePoint(parseInt(n, 16)) : String.fromCodePoint(parseInt(i, 8))) : t.replace(/\\\\/g, "\\").replace(/\\'/g, "'"), remove_heredoc_leading_whitespace_chars(t, e, s, i) {
      if (e === 0) return t;
      this.check_heredoc_indentation_level(t, e, s, i);
      const n = s ? " " : "	", r = new RegExp(`\\n${n}{${e}}`, "g"), a = new RegExp(`^${n}{${e}}`);
      return i && (t = t.replace(a, "")), t.replace(r, `
`);
    }, check_heredoc_indentation_level(t, e, s, i) {
      const n = t.length;
      let r = 0, a = 0, o = true;
      const c = s ? " " : "	";
      let l = false;
      if (!i) {
        if (r = t.indexOf(`
`), r === -1) return;
        r++;
      }
      for (; r < n; ) o ? t[r] === c ? a++ : l = true : o = false, t[r] !== `
` && l && a < e ? this.raiseError(`Invalid body indentation level (expecting an indentation at least ${e})`) : l = false, t[r] === `
` && (o = true, a = 0), r++;
    }, read_dereferencable_scalar() {
      let t = null;
      switch (this.token) {
        case this.tok.T_CONSTANT_ENCAPSED_STRING:
          {
            let e = this.node("string");
            const s = this.text();
            let i = 0;
            s[0] !== "b" && s[0] !== "B" || (i = 1);
            const n = s[i] === '"';
            this.next(), e = e(n, this.resolve_special_chars(s.substring(i + 1, s.length - 1), n), i === 1, s), t = this.token === this.tok.T_DOUBLE_COLON ? this.read_static_getter(e) : e;
          }
          break;
        case this.tok.T_ARRAY:
        case "[":
          t = this.read_array();
      }
      return t;
    }, read_scalar() {
      if (this.is("T_MAGIC_CONST")) return this.get_magic_constant();
      {
        let t, e;
        switch (this.token) {
          case this.tok.T_LNUMBER:
          case this.tok.T_DNUMBER: {
            const s = this.node("number");
            return t = this.text(), this.next(), s(t, null);
          }
          case this.tok.T_START_HEREDOC:
            if (this.lexer.curCondition === "ST_NOWDOC") {
              const s = this.lexer.yylloc.first_offset;
              e = this.node("nowdoc"), t = this.next().text(), this.lexer.heredoc_label.indentation > 0 && (t = t.substring(0, t.length - this.lexer.heredoc_label.indentation));
              const i = t[t.length - 1];
              i === `
` ? t = t[t.length - 2] === "\r" ? t.substring(0, t.length - 2) : t.substring(0, t.length - 1) : i === "\r" && (t = t.substring(0, t.length - 1)), this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next(), this.expect(this.tok.T_END_HEREDOC) && this.next();
              const n = this.lexer._input.substring(s, this.lexer.yylloc.first_offset);
              return e = e(this.remove_heredoc_leading_whitespace_chars(t, this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node), n, this.lexer.heredoc_label.label), this.lexer.heredoc_label.finished = true, e;
            }
            return this.read_encapsed_string(this.tok.T_END_HEREDOC);
          case '"':
            return this.read_encapsed_string('"');
          case 'b"':
          case 'B"':
            return this.read_encapsed_string('"', true);
          case this.tok.T_CONSTANT_ENCAPSED_STRING:
          case this.tok.T_ARRAY:
          case "[":
            return this.read_dereferencable_scalar();
          default: {
            const s = this.error("SCALAR");
            return this.next(), s;
          }
        }
      }
    }, read_dereferencable(t) {
      let e, s;
      const i = this.node("offsetlookup");
      return this.token === "[" ? (s = this.next().read_expr(), this.expect("]") && this.next(), e = i(t, s)) : this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES && (s = this.read_encapsed_string_item(false), e = i(t, s)), e;
    }, read_encapsed_string_item(t) {
      const e = this.node("encapsedpart");
      let s, i, n, r = null, a = false, o = this.node();
      if (this.token === this.tok.T_ENCAPSED_AND_WHITESPACE) {
        const c = this.text();
        this.next(), o = o("string", false, this.version >= 703 && !this.lexer.heredoc_label.finished ? this.remove_heredoc_leading_whitespace_chars(this.resolve_special_chars(c, t), this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node) : c, false, c);
      } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
        if (r = "simple", a = true, n = null, this.next().token === this.tok.T_STRING_VARNAME) {
          n = this.node("variable");
          const c = this.text();
          this.next(), o.destroy(), this.token === "[" ? (n = n(c, false), i = this.node("offsetlookup"), s = this.next().read_expr(), this.expect("]") && this.next(), o = i(n, s)) : o = n(c, false);
        } else o = o("variable", this.read_expr(), false);
        this.expect("}") && this.next();
      } else if (this.token === this.tok.T_CURLY_OPEN) r = "complex", o.destroy(), o = this.next().read_variable(false, false), this.expect("}") && this.next();
      else if (this.token === this.tok.T_VARIABLE) {
        if (r = "simple", o.destroy(), o = this.read_simple_variable(), this.token === "[" && (i = this.node("offsetlookup"), s = this.next().read_encaps_var_offset(), this.expect("]") && this.next(), o = i(o, s)), this.token === this.tok.T_OBJECT_OPERATOR) {
          i = this.node("propertylookup"), this.next().expect(this.tok.T_STRING);
          const c = this.node("identifier");
          n = this.text(), this.next(), o = i(o, c(n));
        }
      } else {
        this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);
        const c = this.text();
        this.next(), o.destroy(), o = o("string", false, c, false, c);
      }
      return this.lexer.heredoc_label.first_encaps_node = false, e(o, r, a);
    }, read_encapsed_string(t) {
      let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
      const s = this.lexer.yylloc.first_offset;
      let i = this.node("encapsed");
      this.next();
      const n = this.lexer.yylloc.prev_offset - (e ? 1 : 0), r = [];
      let a = null;
      for (a = t === "`" ? this.ast.encapsed.TYPE_SHELL : t === '"' ? this.ast.encapsed.TYPE_STRING : this.ast.encapsed.TYPE_HEREDOC; this.token !== t && this.token !== this.EOF; ) r.push(this.read_encapsed_string_item(true));
      if (r.length > 0 && r[r.length - 1].kind === "encapsedpart" && r[r.length - 1].expression.kind === "string") {
        const o = r[r.length - 1].expression, c = o.value[o.value.length - 1];
        c === `
` ? o.value[o.value.length - 2] === "\r" ? o.value = o.value.substring(0, o.value.length - 2) : o.value = o.value.substring(0, o.value.length - 1) : c === "\r" && (o.value = o.value.substring(0, o.value.length - 1));
      }
      return this.expect(t) && this.next(), i = i(r, this.lexer._input.substring(a === "heredoc" ? s : n - 1, this.lexer.yylloc.first_offset), a), t === this.tok.T_END_HEREDOC && (i.label = this.lexer.heredoc_label.label, this.lexer.heredoc_label.finished = true), i;
    }, get_magic_constant() {
      const t = this.node("magic"), e = this.text();
      return this.next(), t(e.toUpperCase(), e);
    } }, rh = { read_top_statements() {
      let t = [];
      for (; this.token !== this.EOF && this.token !== "}"; ) {
        const e = this.read_top_statement();
        e && (Array.isArray(e) ? t = t.concat(e) : t.push(e));
      }
      return t;
    }, read_top_statement() {
      let t = [];
      switch (this.token === this.tok.T_ATTRIBUTE && (t = this.read_attr_list()), this.token) {
        case this.tok.T_FUNCTION:
          return this.read_function(false, false, t);
        case this.tok.T_ABSTRACT:
        case this.tok.T_FINAL:
        case this.tok.T_READ_ONLY:
        case this.tok.T_CLASS:
          return this.read_class_declaration_statement(t);
        case this.tok.T_INTERFACE:
          return this.read_interface_declaration_statement(t);
        case this.tok.T_TRAIT:
          return this.read_trait_declaration_statement();
        case this.tok.T_ENUM:
          return this.read_enum_declaration_statement(t);
        case this.tok.T_USE:
          return this.read_use_statement();
        case this.tok.T_CONST: {
          const e = this.node("constantstatement"), s = this.next().read_const_list();
          return this.expectEndOfStatement(), e(null, s);
        }
        case this.tok.T_NAMESPACE:
          return this.read_namespace();
        case this.tok.T_HALT_COMPILER: {
          const e = this.node("halt");
          return this.next().expect("(") && this.next(), this.expect(")") && this.next(), this.expect(";"), this.lexer.done = true, e(this.lexer._input.substring(this.lexer.offset));
        }
        default:
          return this.read_statement();
      }
    }, read_inner_statements() {
      let t = [];
      for (; this.token != this.EOF && this.token !== "}"; ) {
        const e = this.read_inner_statement();
        e && (Array.isArray(e) ? t = t.concat(e) : t.push(e));
      }
      return t;
    }, read_const_list() {
      return this.read_list(function() {
        this.expect(this.tok.T_STRING);
        const t = this.node("constant");
        let e = this.node("identifier");
        const s = this.text();
        return this.next(), e = e(s), this.expect("=") ? t(e, this.next().read_expr()) : t(e, null);
      }, ",", false);
    }, read_declare_list() {
      const t = [];
      for (; this.token != this.EOF && this.token !== ")"; ) {
        this.expect(this.tok.T_STRING);
        const e = this.node("declaredirective");
        let s = this.node("identifier");
        const i = this.text();
        this.next(), s = s(i);
        let n = null;
        if (this.expect("=") && (n = this.next().read_expr()), t.push(e(s, n)), this.token !== ",") break;
        this.next();
      }
      return t;
    }, read_inner_statement() {
      let t = [];
      switch (this.token === this.tok.T_ATTRIBUTE && (t = this.read_attr_list()), this.token) {
        case this.tok.T_FUNCTION: {
          const e = this.read_function(false, false);
          return e.attrGroups = t, e;
        }
        case this.tok.T_ABSTRACT:
        case this.tok.T_FINAL:
        case this.tok.T_CLASS:
          return this.read_class_declaration_statement();
        case this.tok.T_INTERFACE:
          return this.read_interface_declaration_statement();
        case this.tok.T_TRAIT:
          return this.read_trait_declaration_statement();
        case this.tok.T_ENUM:
          return this.read_enum_declaration_statement();
        case this.tok.T_HALT_COMPILER: {
          this.raiseError("__HALT_COMPILER() can only be used from the outermost scope");
          let e = this.node("halt");
          return this.next().expect("(") && this.next(), this.expect(")") && this.next(), e = e(this.lexer._input.substring(this.lexer.offset)), this.expect(";") && this.next(), e;
        }
        default:
          return this.read_statement();
      }
    }, read_statement() {
      switch (this.token) {
        case "{":
          return this.read_code_block(false);
        case this.tok.T_IF:
          return this.read_if();
        case this.tok.T_SWITCH:
          return this.read_switch();
        case this.tok.T_FOR:
          return this.read_for();
        case this.tok.T_FOREACH:
          return this.read_foreach();
        case this.tok.T_WHILE:
          return this.read_while();
        case this.tok.T_DO:
          return this.read_do();
        case this.tok.T_COMMENT:
          return this.read_comment();
        case this.tok.T_DOC_COMMENT:
          return this.read_doc_comment();
        case this.tok.T_RETURN: {
          const t = this.node("return");
          this.next();
          const e = this.read_optional_expr(";");
          return this.expectEndOfStatement(), t(e);
        }
        case this.tok.T_BREAK:
        case this.tok.T_CONTINUE: {
          const t = this.node(this.token === this.tok.T_CONTINUE ? "continue" : "break");
          this.next();
          const e = this.read_optional_expr(";");
          return this.expectEndOfStatement(), t(e);
        }
        case this.tok.T_GLOBAL: {
          const t = this.node("global"), e = this.next().read_list(this.read_simple_variable, ",");
          return this.expectEndOfStatement(), t(e);
        }
        case this.tok.T_STATIC: {
          const t = [this.token, this.lexer.getState()], e = this.node();
          if (this.next().token === this.tok.T_DOUBLE_COLON) {
            this.lexer.tokens.push(t);
            const i = this.next().read_expr();
            return this.expectEndOfStatement(i), e("expressionstatement", i);
          }
          if (this.token === this.tok.T_FUNCTION) return this.read_function(true, [0, 1, 0]);
          const s = this.read_variable_declarations();
          return this.expectEndOfStatement(), e("static", s);
        }
        case this.tok.T_ECHO: {
          const t = this.node("echo"), e = this.text(), s = e === "<?=" || e === "<%=", i = this.next().read_function_list(this.read_expr, ",");
          return this.expectEndOfStatement(), t(i, s);
        }
        case this.tok.T_INLINE_HTML: {
          const t = this.text();
          let e = this.lexer.yylloc.first_offset > 0 ? this.lexer._input[this.lexer.yylloc.first_offset - 1] : null;
          const s = e === "\r" || e === `
`;
          s && e === `
` && this.lexer.yylloc.first_offset > 1 && this.lexer._input[this.lexer.yylloc.first_offset - 2] === "\r" && (e = `\r
`);
          const i = this.node("inline");
          return this.next(), i(t, s ? e + t : t);
        }
        case this.tok.T_UNSET: {
          const t = this.node("unset");
          this.next().expect("(") && this.next();
          const e = this.read_function_list(this.read_variable, ",");
          return this.expect(")") && this.next(), this.expect(";") && this.next(), t(e);
        }
        case this.tok.T_DECLARE: {
          const t = this.node("declare"), e = [];
          let s;
          this.next().expect("(") && this.next();
          const i = this.read_declare_list();
          if (this.expect(")") && this.next(), this.token === ":") {
            for (this.next(); this.token != this.EOF && this.token !== this.tok.T_ENDDECLARE; ) e.push(this.read_top_statement());
            e.length === 0 && this.extractDoc && this._docs.length > this._docIndex && e.push(this.node("noop")()), this.expect(this.tok.T_ENDDECLARE) && this.next(), this.expectEndOfStatement(), s = this.ast.declare.MODE_SHORT;
          } else if (this.token === "{") {
            for (this.next(); this.token != this.EOF && this.token !== "}"; ) e.push(this.read_top_statement());
            e.length === 0 && this.extractDoc && this._docs.length > this._docIndex && e.push(this.node("noop")()), this.expect("}") && this.next(), s = this.ast.declare.MODE_BLOCK;
          } else this.expect(";") && this.next(), s = this.ast.declare.MODE_NONE;
          return t(i, e, s);
        }
        case this.tok.T_TRY:
          return this.read_try();
        case this.tok.T_THROW: {
          const t = this.node("throw"), e = this.next().read_expr();
          return this.expectEndOfStatement(), t(e);
        }
        case ";":
          return this.next(), null;
        case this.tok.T_STRING: {
          const t = this.node(), e = [this.token, this.lexer.getState()], s = this.text();
          let i = this.node("identifier");
          if (this.next().token === ":") return i = i(s), this.next(), t("label", i);
          i.destroy(), t.destroy(), this.lexer.tokens.push(e);
          const n = this.node("expressionstatement"), r = this.next().read_expr();
          return this.expectEndOfStatement(r), n(r);
        }
        case this.tok.T_GOTO: {
          const t = this.node("goto");
          let e = null;
          if (this.next().expect(this.tok.T_STRING)) {
            e = this.node("identifier");
            const s = this.text();
            this.next(), e = e(s), this.expectEndOfStatement();
          }
          return t(e);
        }
        default: {
          const t = this.node("expressionstatement"), e = this.read_expr();
          return this.expectEndOfStatement(e), t(e);
        }
      }
    }, read_code_block(t) {
      const e = this.node("block");
      this.expect("{") && this.next();
      const s = t ? this.read_top_statements() : this.read_inner_statements();
      return s.length === 0 && this.extractDoc && this._docs.length > this._docIndex && s.push(this.node("noop")()), this.expect("}") && this.next(), e(null, s);
    } }, oh = { read_switch() {
      const t = this.node("switch");
      this.expect(this.tok.T_SWITCH) && this.next(), this.expect("(") && this.next();
      const e = this.read_expr();
      this.expect(")") && this.next();
      const s = this.token === ":";
      return t(e, this.read_switch_case_list(), s);
    }, read_switch_case_list() {
      let t = null;
      const e = this.node("block"), s = [];
      for (this.token === "{" ? t = "}" : this.token === ":" ? t = this.tok.T_ENDSWITCH : this.expect(["{", ":"]), this.next(), this.token === ";" && this.next(); this.token !== this.EOF && this.token !== t; ) s.push(this.read_case_list(t));
      return s.length === 0 && this.extractDoc && this._docs.length > this._docIndex && s.push(this.node("noop")()), this.expect(t) && this.next(), t === this.tok.T_ENDSWITCH && this.expectEndOfStatement(), e(null, s);
    }, read_case_list(t) {
      const e = this.node("case");
      let s = null;
      this.token === this.tok.T_CASE ? s = this.next().read_expr() : this.token === this.tok.T_DEFAULT ? this.next() : this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]), this.expect([":", ";"]) && this.next();
      const i = this.node("block"), n = [];
      for (; this.token !== this.EOF && this.token !== t && this.token !== this.tok.T_CASE && this.token !== this.tok.T_DEFAULT; ) n.push(this.read_inner_statement());
      return e(s, i(null, n));
    } }, hh = { read_try() {
      this.expect(this.tok.T_TRY);
      const t = this.node("try");
      let e = null;
      const s = [], i = this.next().read_statement();
      for (; this.token === this.tok.T_CATCH; ) {
        const n = this.node("catch");
        this.next().expect("(") && this.next();
        const r = this.read_list(this.read_namespace_name, "|", false);
        let a = null;
        (this.version < 800 || this.token === this.tok.T_VARIABLE) && (a = this.read_variable(true, false)), this.expect(")"), s.push(n(this.next().read_statement(), r, a));
      }
      return this.token === this.tok.T_FINALLY && (e = this.next().read_statement()), t(i, s, e);
    } }, ah = { read_short_form(t) {
      const e = this.node("block"), s = [];
      for (this.expect(":") && this.next(); this.token != this.EOF && this.token !== t; ) s.push(this.read_inner_statement());
      return s.length === 0 && this.extractDoc && this._docs.length > this._docIndex && s.push(this.node("noop")()), this.expect(t) && this.next(), this.expectEndOfStatement(), e(null, s);
    }, read_function_list(t, e) {
      const s = [];
      do {
        if (this.token == e && this.version >= 703 && s.length > 0) {
          s.push(this.node("noop")());
          break;
        }
        if (s.push(t.apply(this, [])), this.token != e || this.next().token == ")" && this.version >= 703) break;
      } while (this.token != this.EOF);
      return s;
    }, read_list(t, e, s) {
      const i = [];
      if (this.token == e && (s && i.push(typeof t == "function" ? this.node("noop")() : null), this.next()), typeof t == "function") do {
        const n = t.apply(this, []);
        if (n && i.push(n), this.token != e) break;
      } while (this.next().token != this.EOF);
      else {
        if (!this.expect(t)) return [];
        for (i.push(this.text()); this.next().token != this.EOF && this.token == e && this.next().token == t; ) i.push(this.text());
      }
      return i;
    }, read_name_list() {
      return this.read_list(this.read_namespace_name, ",", false);
    }, read_byref(t) {
      let e = this.node("byref");
      this.next(), e = e(null);
      const s = t();
      return s && (this.ast.swapLocations(s, e, s, this), s.byref = true), s;
    }, read_variable_declarations() {
      return this.read_list(function() {
        const t = this.node("staticvariable");
        let e = this.node("variable");
        if (this.expect(this.tok.T_VARIABLE)) {
          const s = this.text().substring(1);
          this.next(), e = e(s, false);
        } else e = e("#ERR", false);
        return this.token === "=" ? t(e, this.next().read_expr()) : e;
      }, ",");
    }, read_extends_from() {
      return this.token === this.tok.T_EXTENDS ? this.next().read_namespace_name() : null;
    }, read_interface_extends_list() {
      return this.token === this.tok.T_EXTENDS ? this.next().read_name_list() : null;
    }, read_implements_list() {
      return this.token === this.tok.T_IMPLEMENTS ? this.next().read_name_list() : null;
    } }, lh = { read_variable(t, e) {
      let s;
      if (this.token === "&") return this.read_byref(this.read_variable.bind(this, t, e));
      if (this.is([this.tok.T_VARIABLE, "$"])) s = this.read_reference_variable(e);
      else if (this.is([this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE])) {
        s = this.node();
        const i = this.read_namespace_name();
        if (this.token != this.tok.T_DOUBLE_COLON && this.token != "(" && ["parentreference", "selfreference"].indexOf(i.kind) === -1) {
          const n = i.name.toLowerCase();
          n === "true" ? s = i.destroy(s("boolean", true, i.name)) : n === "false" ? s = i.destroy(s("boolean", false, i.name)) : n === "null" ? s = i.destroy(s("nullkeyword", i.name)) : (s.destroy(i), s = i);
        } else s.destroy(i), s = i;
      } else if (this.token === this.tok.T_STATIC) {
        s = this.node("staticreference");
        const i = this.text();
        this.next(), s = s(i);
      } else this.expect("VARIABLE");
      return this.token === this.tok.T_DOUBLE_COLON && (s = this.read_static_getter(s, e)), this.recursive_variable_chain_scan(s, t, e);
    }, read_static_getter(t, e) {
      const s = this.node("staticlookup");
      let i, n;
      return this.next().is([this.tok.T_VARIABLE, "$"]) ? i = this.read_reference_variable(e) : this.token === this.tok.T_STRING || this.token === this.tok.T_CLASS || this.version >= 700 && this.is("IDENTIFIER") ? (i = this.node("identifier"), n = this.text(), this.next(), i = i(n)) : this.token === "{" ? (i = this.node("literal"), n = this.next().read_expr(), this.expect("}") && this.next(), i = i("literal", n, null), this.expect("(")) : (this.error([this.tok.T_VARIABLE, this.tok.T_STRING]), i = this.node("identifier"), n = this.text(), this.next(), i = i(n)), s(t, i);
    }, read_what() {
      let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = null, s = null;
      switch (this.next().token) {
        case this.tok.T_STRING:
          e = this.node("identifier"), s = this.text(), this.next(), e = e(s), t && this.token === this.tok.T_OBJECT_OPERATOR && this.error();
          break;
        case this.tok.T_VARIABLE:
          e = this.node("variable"), s = this.text().substring(1), this.next(), e = e(s, false);
          break;
        case "$":
          e = this.node(), this.next().expect(["$", "{", this.tok.T_VARIABLE]), this.token === "{" ? (s = this.next().read_expr(), this.expect("}") && this.next(), e = e("variable", s, true)) : (s = this.read_expr(), e = e("variable", s, false));
          break;
        case "{":
          e = this.node("encapsedpart"), s = this.next().read_expr(), this.expect("}") && this.next(), e = e(s, "complex", false);
          break;
        default:
          this.error([this.tok.T_STRING, this.tok.T_VARIABLE, "$", "{"]), e = this.node("identifier"), s = this.text(), this.next(), e = e(s);
      }
      return e;
    }, recursive_variable_chain_scan(t, e, s) {
      let i, n;
      t: for (; this.token != this.EOF; ) switch (this.token) {
        case "(":
          if (e) return t;
          t = this.node("call")(t, this.read_argument_list());
          break;
        case "[":
        case "{": {
          const r = this.token === "[";
          i = this.node("offsetlookup"), this.next(), n = false, s ? (n = this.read_encaps_var_offset(), this.expect(r ? "]" : "}") && this.next()) : (r ? this.token !== "]" : this.token !== "}") ? (n = this.read_expr(), this.expect(r ? "]" : "}") && this.next()) : this.next(), t = i(t, n);
          break;
        }
        case this.tok.T_DOUBLE_COLON:
          t.kind === "staticlookup" && t.offset.kind === "identifier" && this.error(), i = this.node("staticlookup"), t = i(t, this.read_what(true));
          break;
        case this.tok.T_OBJECT_OPERATOR:
          i = this.node("propertylookup"), t = i(t, this.read_what());
          break;
        case this.tok.T_NULLSAFE_OBJECT_OPERATOR:
          i = this.node("nullsafepropertylookup"), t = i(t, this.read_what());
          break;
        default:
          break t;
      }
      return t;
    }, read_encaps_var_offset() {
      let t = this.node();
      if (this.token === this.tok.T_STRING) {
        const e = this.text();
        this.next(), t = t("identifier", e);
      } else if (this.token === this.tok.T_NUM_STRING) {
        const e = this.text();
        this.next(), t = t("number", e, null);
      } else if (this.token === "-") {
        this.next();
        const e = -1 * this.text();
        this.expect(this.tok.T_NUM_STRING) && this.next(), t = t("number", e, null);
      } else if (this.token === this.tok.T_VARIABLE) {
        const e = this.text().substring(1);
        this.next(), t = t("variable", e, false);
      } else {
        this.expect([this.tok.T_STRING, this.tok.T_NUM_STRING, "-", this.tok.T_VARIABLE]);
        const e = this.text();
        this.next(), t = t("identifier", e);
      }
      return t;
    }, read_reference_variable(t) {
      let e, s = this.read_simple_variable();
      for (; this.token != this.EOF; ) {
        const i = this.node();
        if (this.token != "{" || t) {
          i.destroy();
          break;
        }
        e = this.next().read_expr(), this.expect("}") && this.next(), s = i("offsetlookup", s, e);
      }
      return s;
    }, read_simple_variable() {
      let t, e = this.node("variable");
      if (this.expect([this.tok.T_VARIABLE, "$"]) && this.token === this.tok.T_VARIABLE) t = this.text().substring(1), this.next(), e = e(t, false);
      else switch (this.token === "$" && this.next(), this.token) {
        case "{": {
          const s = this.next().read_expr();
          this.expect("}") && this.next(), e = e(s, true);
          break;
        }
        case "$":
          e = e(this.read_simple_variable(), false);
          break;
        case this.tok.T_VARIABLE: {
          t = this.text().substring(1);
          const s = this.node("variable");
          this.next(), e = e(s(t, false), false);
          break;
        }
        default:
          this.error(["{", "$", this.tok.T_VARIABLE]), t = this.text(), this.next(), e = e(t, false);
      }
      return e;
    } };
    const ch = Ie;
    function te(t) {
      return t != "." && t != "," && !isNaN(parseFloat(t)) && isFinite(t);
    }
    const U = function(t, e) {
      this.lexer = t, this.ast = e, this.tok = t.tok, this.EOF = t.EOF, this.token = null, this.prev = null, this.debug = false, this.version = 803, this.extractDoc = false, this.extractTokens = false, this.suppressErrors = false;
      const s = function(i) {
        return [i, null];
      };
      this.entries = { IDENTIFIER: new Map([this.tok.T_ABSTRACT, this.tok.T_ARRAY, this.tok.T_AS, this.tok.T_BREAK, this.tok.T_CALLABLE, this.tok.T_CASE, this.tok.T_CATCH, this.tok.T_CLASS, this.tok.T_CLASS_C, this.tok.T_CLONE, this.tok.T_CONST, this.tok.T_CONTINUE, this.tok.T_DECLARE, this.tok.T_DEFAULT, this.tok.T_DIR, this.tok.T_DO, this.tok.T_ECHO, this.tok.T_ELSE, this.tok.T_ELSEIF, this.tok.T_EMPTY, this.tok.T_ENDDECLARE, this.tok.T_ENDFOR, this.tok.T_ENDFOREACH, this.tok.T_ENDIF, this.tok.T_ENDSWITCH, this.tok.T_ENDWHILE, this.tok.T_ENUM, this.tok.T_EVAL, this.tok.T_EXIT, this.tok.T_EXTENDS, this.tok.T_FILE, this.tok.T_FINAL, this.tok.T_FINALLY, this.tok.T_FN, this.tok.T_FOR, this.tok.T_FOREACH, this.tok.T_FUNC_C, this.tok.T_FUNCTION, this.tok.T_GLOBAL, this.tok.T_GOTO, this.tok.T_IF, this.tok.T_IMPLEMENTS, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_INSTANCEOF, this.tok.T_INSTEADOF, this.tok.T_INTERFACE, this.tok.T_ISSET, this.tok.T_LINE, this.tok.T_LIST, this.tok.T_LOGICAL_AND, this.tok.T_LOGICAL_OR, this.tok.T_LOGICAL_XOR, this.tok.T_MATCH, this.tok.T_METHOD_C, this.tok.T_NAMESPACE, this.tok.T_NEW, this.tok.T_NS_C, this.tok.T_PRINT, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_PUBLIC, this.tok.T_READ_ONLY, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_RETURN, this.tok.T_STATIC, this.tok.T_SWITCH, this.tok.T_THROW, this.tok.T_TRAIT, this.tok.T_TRY, this.tok.T_UNSET, this.tok.T_USE, this.tok.T_VAR, this.tok.T_WHILE, this.tok.T_YIELD].map(s)), VARIABLE: new Map([this.tok.T_VARIABLE, "$", "&", this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE, this.tok.T_STATIC].map(s)), SCALAR: new Map([this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(s)), T_MAGIC_CONST: new Map([this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C].map(s)), T_MEMBER_FLAGS: new Map([this.tok.T_PUBLIC, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_STATIC, this.tok.T_ABSTRACT, this.tok.T_FINAL].map(s)), EOS: new Map([";", this.EOF, this.tok.T_INLINE_HTML].map(s)), EXPR: new Map(["@", "-", "+", "!", "~", "(", "`", this.tok.T_LIST, this.tok.T_CLONE, this.tok.T_INC, this.tok.T_DEC, this.tok.T_NEW, this.tok.T_ISSET, this.tok.T_EMPTY, this.tok.T_MATCH, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_EVAL, this.tok.T_INT_CAST, this.tok.T_DOUBLE_CAST, this.tok.T_STRING_CAST, this.tok.T_ARRAY_CAST, this.tok.T_OBJECT_CAST, this.tok.T_BOOL_CAST, this.tok.T_UNSET_CAST, this.tok.T_EXIT, this.tok.T_PRINT, this.tok.T_YIELD, this.tok.T_STATIC, this.tok.T_FUNCTION, this.tok.T_FN, this.tok.T_VARIABLE, "$", this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_STRING, this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(s)) };
    };
    U.prototype.getTokenName = function(t) {
      return te(t) ? t == this.EOF ? "the end of file (EOF)" : this.lexer.engine.tokens.values[t] : "'" + t + "'";
    }, U.prototype.parse = function(t, e) {
      this._errors = [], this.filename = e || "eval", this.currentNamespace = [""], this.extractDoc ? this._docs = [] : this._docs = null, this.extractTokens ? this._tokens = [] : this._tokens = null, this._docIndex = 0, this._lastNode = null, this.lexer.setInput(t), this.lexer.all_tokens = this.extractTokens, this.lexer.comment_tokens = this.extractDoc, this.length = this.lexer._input.length, this.innerList = false, this.innerListForm = false;
      const s = this.node("program"), i = [];
      for (this.next(); this.token != this.EOF; ) i.push(this.read_start());
      i.length === 0 && this.extractDoc && this._docs.length > this._docIndex && i.push(this.node("noop")()), this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
      const n = s(i, this._errors, this._docs, this._tokens);
      if (this.debug) {
        const r = this.ast.checkNodes();
        if (r.length > 0) throw r.forEach(function(a) {
          a.position && console.log("Node at line " + a.position.line + ", column " + a.position.column), console.log(a.stack.join(`
`));
        }), new Error("Some nodes are not closed");
      }
      return n;
    }, U.prototype.raiseError = function(t, e, s, i) {
      if (t += " on line " + this.lexer.yylloc.first_line, !this.suppressErrors) {
        const r = new SyntaxError(t, this.filename, this.lexer.yylloc.first_line);
        throw r.lineNumber = this.lexer.yylloc.first_line, r.fileName = this.filename, r.columnNumber = this.lexer.yylloc.first_column, r;
      }
      const n = this.ast.prepare("error", null, this)(t, i, this.lexer.yylloc.first_line, s);
      return this._errors.push(n), n;
    }, U.prototype.error = function(t) {
      let e = "Parse Error : syntax error", s = this.getTokenName(this.token), i = "";
      if (this.token !== this.EOF) {
        if (te(this.token)) {
          let n = this.text();
          n.length > 10 && (n = n.substring(0, 7) + "..."), s = "'" + n + "' (" + s + ")";
        }
        e += ", unexpected " + s;
      }
      return t && !Array.isArray(t) && ((te(t) || t.length === 1) && (i = ", expecting " + this.getTokenName(t)), e += i), this.raiseError(e, i, t, s);
    }, U.prototype.position = function() {
      return new ch(this.lexer.yylloc.first_line, this.lexer.yylloc.first_column, this.lexer.yylloc.first_offset);
    }, U.prototype.node = function(t) {
      if (this.extractDoc) {
        let e = null;
        this._docIndex < this._docs.length && (e = this._docs.slice(this._docIndex), this._docIndex = this._docs.length, this.debug && (console.log(new Error("Append docs on " + t)), console.log(e)));
        const s = this.ast.prepare(t, e, this);
        return s.postBuild = (function(i) {
          if (this._docIndex < this._docs.length) if (this._lastNode) {
            const n = this.prev[2];
            let r = this._docIndex;
            for (; r < this._docs.length && !(this._docs[r].offset > n); r++) ;
            r > this._docIndex && (this._lastNode.setTrailingComments(this._docs.slice(this._docIndex, r)), this._docIndex = r);
          } else this.token === this.EOF && (i.setTrailingComments(this._docs.slice(this._docIndex)), this._docIndex = this._docs.length);
          this._lastNode = i;
        }).bind(this), s;
      }
      return this.ast.prepare(t, null, this);
    }, U.prototype.expectEndOfStatement = function(t) {
      if (this.token === ";") t && this.lexer.yytext === ";" && t.includeToken(this);
      else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) return this.error(";"), false;
      return this.next(), true;
    };
    const ee = ["parser.next", "parser.node", "parser.showlog"];
    U.prototype.showlog = function() {
      const t = new Error().stack.split(`
`);
      let e;
      for (let s = 2; s < t.length; s++) {
        e = t[s].trim();
        let i = false;
        for (let n = 0; n < ee.length; n++) if (e.substring(3, 3 + ee[n].length) === ee[n]) {
          i = true;
          break;
        }
        if (!i) break;
      }
      return console.log("Line " + this.lexer.yylloc.first_line + " : " + this.getTokenName(this.token) + ">" + this.lexer.yytext + "< @-->" + e), this;
    }, U.prototype.expect = function(t) {
      if (Array.isArray(t)) {
        if (t.indexOf(this.token) === -1) return this.error(t), false;
      } else if (this.token != t) return this.error(t), false;
      return true;
    }, U.prototype.text = function() {
      return this.lexer.yytext;
    }, U.prototype.next = function() {
      if (this.token === ";" && this.lexer.yytext !== ";" || (this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset]), this.lex(), this.debug && this.showlog(), this.extractDoc) for (; this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT; ) this.token === this.tok.T_COMMENT ? this._docs.push(this.read_comment()) : this._docs.push(this.read_doc_comment());
      return this;
    }, U.prototype.peek = function() {
      const t = this.lexer.getState(), e = this.lexer.lex();
      return this.lexer.setState(t), e;
    }, U.prototype.lex = function() {
      if (this.extractTokens) do {
        if (this.token = this.lexer.lex() || this.EOF, this.token === this.EOF) return this;
        let t = this.lexer.yytext;
        if (t = Object.prototype.hasOwnProperty.call(this.lexer.engine.tokens.values, this.token) ? [this.lexer.engine.tokens.values[this.token], t, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset] : [null, t, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset], this._tokens.push(t), this.token === this.tok.T_CLOSE_TAG) return this.token = ";", this;
        if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) return this.token = this.tok.T_ECHO, this;
      } while (this.token === this.tok.T_WHITESPACE || !this.extractDoc && (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) || this.token === this.tok.T_OPEN_TAG);
      else this.token = this.lexer.lex() || this.EOF;
      return this;
    }, U.prototype.is = function(t) {
      return Array.isArray(t) ? t.indexOf(this.token) !== -1 : this.entries[t].has(this.token);
    }, [zo, Ko, Xo, qo, Jo, Zo, th, eh, sh, ih, nh, rh, oh, hh, ah, lh].forEach(function(t) {
      for (const e in t) {
        if (Object.prototype.hasOwnProperty.call(U.prototype, e)) throw new Error("Function " + e + " is already defined - collision");
        U.prototype[e] = t[e];
      }
    });
    var uh = U;
    const Se = { T_HALT_COMPILER: 101, T_USE: 102, T_ENCAPSED_AND_WHITESPACE: 103, T_OBJECT_OPERATOR: 104, T_STRING: 105, T_DOLLAR_OPEN_CURLY_BRACES: 106, T_STRING_VARNAME: 107, T_CURLY_OPEN: 108, T_NUM_STRING: 109, T_ISSET: 110, T_EMPTY: 111, T_INCLUDE: 112, T_INCLUDE_ONCE: 113, T_EVAL: 114, T_REQUIRE: 115, T_REQUIRE_ONCE: 116, T_NAMESPACE: 117, T_NS_SEPARATOR: 118, T_AS: 119, T_IF: 120, T_ENDIF: 121, T_WHILE: 122, T_DO: 123, T_FOR: 124, T_SWITCH: 125, T_BREAK: 126, T_CONTINUE: 127, T_RETURN: 128, T_GLOBAL: 129, T_STATIC: 130, T_ECHO: 131, T_INLINE_HTML: 132, T_UNSET: 133, T_FOREACH: 134, T_DECLARE: 135, T_TRY: 136, T_THROW: 137, T_GOTO: 138, T_FINALLY: 139, T_CATCH: 140, T_ENDDECLARE: 141, T_LIST: 142, T_CLONE: 143, T_PLUS_EQUAL: 144, T_MINUS_EQUAL: 145, T_MUL_EQUAL: 146, T_DIV_EQUAL: 147, T_CONCAT_EQUAL: 148, T_MOD_EQUAL: 149, T_AND_EQUAL: 150, T_OR_EQUAL: 151, T_XOR_EQUAL: 152, T_SL_EQUAL: 153, T_SR_EQUAL: 154, T_INC: 155, T_DEC: 156, T_BOOLEAN_OR: 157, T_BOOLEAN_AND: 158, T_LOGICAL_OR: 159, T_LOGICAL_AND: 160, T_LOGICAL_XOR: 161, T_SL: 162, T_SR: 163, T_IS_IDENTICAL: 164, T_IS_NOT_IDENTICAL: 165, T_IS_EQUAL: 166, T_IS_NOT_EQUAL: 167, T_IS_SMALLER_OR_EQUAL: 168, T_IS_GREATER_OR_EQUAL: 169, T_INSTANCEOF: 170, T_INT_CAST: 171, T_DOUBLE_CAST: 172, T_STRING_CAST: 173, T_ARRAY_CAST: 174, T_OBJECT_CAST: 175, T_BOOL_CAST: 176, T_UNSET_CAST: 177, T_EXIT: 178, T_PRINT: 179, T_YIELD: 180, T_YIELD_FROM: 181, T_FUNCTION: 182, T_DOUBLE_ARROW: 183, T_DOUBLE_COLON: 184, T_ARRAY: 185, T_CALLABLE: 186, T_CLASS: 187, T_ABSTRACT: 188, T_TRAIT: 189, T_FINAL: 190, T_EXTENDS: 191, T_INTERFACE: 192, T_IMPLEMENTS: 193, T_VAR: 194, T_PUBLIC: 195, T_PROTECTED: 196, T_PRIVATE: 197, T_CONST: 198, T_NEW: 199, T_INSTEADOF: 200, T_ELSEIF: 201, T_ELSE: 202, T_ENDSWITCH: 203, T_CASE: 204, T_DEFAULT: 205, T_ENDFOR: 206, T_ENDFOREACH: 207, T_ENDWHILE: 208, T_CONSTANT_ENCAPSED_STRING: 209, T_LNUMBER: 210, T_DNUMBER: 211, T_LINE: 212, T_FILE: 213, T_DIR: 214, T_TRAIT_C: 215, T_METHOD_C: 216, T_FUNC_C: 217, T_NS_C: 218, T_START_HEREDOC: 219, T_END_HEREDOC: 220, T_CLASS_C: 221, T_VARIABLE: 222, T_OPEN_TAG: 223, T_OPEN_TAG_WITH_ECHO: 224, T_CLOSE_TAG: 225, T_WHITESPACE: 226, T_COMMENT: 227, T_DOC_COMMENT: 228, T_ELLIPSIS: 229, T_COALESCE: 230, T_POW: 231, T_POW_EQUAL: 232, T_SPACESHIP: 233, T_COALESCE_EQUAL: 234, T_FN: 235, T_NULLSAFE_OBJECT_OPERATOR: 236, T_MATCH: 237, T_ATTRIBUTE: 238, T_ENUM: 239, T_READ_ONLY: 240, T_NAME_RELATIVE: 241, T_NAME_QUALIFIED: 242, T_NAME_FULLY_QUALIFIED: 243 }, _h = { values: Object.entries(Se).reduce((t, e) => {
      let [s, i] = e;
      return { ...t, [i]: s };
    }, {}), names: Se };
    var ph = Object.freeze(_h), dh = function(t, e, s) {
      this.source = t, this.start = e, this.end = s;
    };
    const yt = function(t, e, s) {
      this.kind = t, e && (this.leadingComments = e), s && (this.loc = s);
    };
    yt.prototype.setTrailingComments = function(t) {
      this.trailingComments = t;
    }, yt.prototype.destroy = function(t) {
      if (!t) throw new Error("Node already initialized, you must swap with another node");
      return this.leadingComments && (t.leadingComments ? t.leadingComments = Array.concat(this.leadingComments, t.leadingComments) : t.leadingComments = this.leadingComments), this.trailingComments && (t.trailingComments ? t.trailingComments = Array.concat(this.trailingComments, t.trailingComments) : t.trailingComments = this.trailingComments), t;
    }, yt.prototype.includeToken = function(t) {
      return this.loc && (this.loc.end && (this.loc.end.line = t.lexer.yylloc.last_line, this.loc.end.column = t.lexer.yylloc.last_column, this.loc.end.offset = t.lexer.offset), t.ast.withSource && (this.loc.source = t.lexer._input.substring(this.loc.start.offset, t.lexer.offset))), this;
    }, yt.extends = function(t, e) {
      return e.prototype = Object.create(this.prototype), e.extends = this.extends, e.prototype.constructor = e, e.kind = t, e;
    };
    var v = yt;
    const Oe = v, Re = "expression";
    var b = Oe.extends(Re, function(t, e, s) {
      Oe.apply(this, [t || Re, e, s]);
    });
    const ve = b, we = "array";
    var fh = ve.extends(we, function(t, e, s, i) {
      ve.apply(this, [we, s, i]), this.items = e, this.shortForm = t;
    });
    const De = b, Ue = "arrowfunc";
    var kh = De.extends(Ue, function(t, e, s, i, n, r, a, o) {
      De.apply(this, [Ue, a, o]), this.arguments = t, this.byref = e, this.body = s, this.type = i, this.nullable = n, this.isStatic = r || false;
    });
    const Pe = b, Fe = "assign";
    var Th = Pe.extends(Fe, function(t, e, s, i, n) {
      Pe.apply(this, [Fe, i, n]), this.left = t, this.right = e, this.operator = s;
    });
    const Me = b, Be = "assignref";
    var xh = Me.extends(Be, function(t, e, s, i) {
      Me.apply(this, [Be, s, i]), this.left = t, this.right = e;
    });
    const He = v, Ge = "attribute";
    var Eh = He.extends(Ge, function(t, e, s, i) {
      He.apply(this, [Ge, s, i]), this.name = t, this.args = e;
    });
    const Ve = v, Qe = "attrgroup";
    var mh = Ve.extends(Qe, function(t, e, s) {
      Ve.apply(this, [Qe, e, s]), this.attrs = t || [];
    });
    const Ye = b, We = "operation";
    var pt = Ye.extends(We, function(t, e, s) {
      Ye.apply(this, [t || We, e, s]);
    });
    const $e = pt;
    var yh = $e.extends("bin", function(t, e, s, i, n) {
      $e.apply(this, ["bin", i, n]), this.type = t, this.left = e, this.right = s;
    });
    const je = v, ze = "statement";
    var C = je.extends(ze, function(t, e, s) {
      je.apply(this, [t || ze, e, s]);
    });
    const Ke = C, Xe = "block";
    var Bt = Ke.extends(Xe, function(t, e, s, i) {
      Ke.apply(this, [t || Xe, s, i]), this.children = e.filter(Boolean);
    });
    const qe = b, Je = "literal";
    var ht = qe.extends(Je, function(t, e, s, i, n) {
      qe.apply(this, [t || Je, i, n]), this.value = e, s && (this.raw = s);
    });
    const Ze = ht, ts = "boolean";
    var Ah = Ze.extends(ts, function(t, e, s, i) {
      Ze.apply(this, [ts, t, e, s, i]);
    });
    const es = C, ss = "break";
    var gh = es.extends(ss, function(t, e, s) {
      es.apply(this, [ss, e, s]), this.level = t;
    });
    const is = b, ns = "byref";
    var Nh = is.extends(ns, function(t, e, s) {
      is.apply(this, [ns, e, s]), this.what = t;
    });
    const rs = b, os = "call";
    var Lh = rs.extends(os, function(t, e, s, i) {
      rs.apply(this, [os, s, i]), this.what = t, this.arguments = e;
    });
    const hs = C, as = "case";
    var bh = hs.extends(as, function(t, e, s, i) {
      hs.apply(this, [as, s, i]), this.test = t, this.body = e;
    });
    const ls = pt, cs = "cast";
    var Ih = ls.extends(cs, function(t, e, s, i, n) {
      ls.apply(this, [cs, i, n]), this.type = t, this.raw = e, this.expr = s;
    });
    const us = C, _s = "catch";
    var Ch = us.extends(_s, function(t, e, s, i, n) {
      us.apply(this, [_s, i, n]), this.body = t, this.what = e, this.variable = s;
    });
    const ps = C, ds = "declaration", fs = ps.extends(ds, function(t, e, s, i) {
      ps.apply(this, [t || ds, s, i]), this.name = e;
    });
    fs.prototype.parseFlags = function(t) {
      this.isAbstract = t[2] === 1, this.isFinal = t[2] === 2, this.isReadonly = t[3] === 1, this.kind !== "class" && (t[0] === -1 ? this.visibility = "" : t[0] === null ? this.visibility = null : t[0] === 0 ? this.visibility = "public" : t[0] === 1 ? this.visibility = "protected" : t[0] === 2 && (this.visibility = "private"), this.isStatic = t[1] === 1);
    };
    var nt = fs;
    const ks = nt, Ts = "class";
    var Sh = ks.extends(Ts, function(t, e, s, i, n, r, a) {
      ks.apply(this, [Ts, t, r, a]), this.isAnonymous = !t, this.extends = e, this.implements = s, this.body = i, this.attrGroups = [], this.parseFlags(n);
    });
    const xs = C, Es = "constantstatement";
    var ms = xs.extends(Es, function(t, e, s, i) {
      xs.apply(this, [t || Es, s, i]), this.constants = e;
    });
    const ys = ms, As = "classconstant", gs = ys.extends(As, function(t, e, s, i, n, r, a, o) {
      ys.apply(this, [t || As, e, a, o]), this.parseFlags(s), this.nullable = i, this.type = n, this.attrGroups = r;
    });
    gs.prototype.parseFlags = function(t) {
      t[0] === -1 ? this.visibility = "" : t[0] === null ? this.visibility = null : t[0] === 0 ? this.visibility = "public" : t[0] === 1 ? this.visibility = "protected" : t[0] === 2 && (this.visibility = "private"), this.final = t[2] === 2;
    };
    var Oh = gs;
    const Ns = b, Ls = "clone";
    var Rh = Ns.extends(Ls, function(t, e, s) {
      Ns.apply(this, [Ls, e, s]), this.what = t;
    });
    const bs = b, Is = "closure";
    var vh = bs.extends(Is, function(t, e, s, i, n, r, a, o) {
      bs.apply(this, [Is, a, o]), this.uses = s, this.arguments = t, this.byref = e, this.type = i, this.nullable = n, this.isStatic = r || false, this.body = null, this.attrGroups = [];
    });
    const Cs = v;
    var se = Cs.extends("comment", function(t, e, s, i) {
      Cs.apply(this, [t, s, i]), this.value = e;
    });
    const Ss = se, Os = "commentblock";
    var wh = Ss.extends(Os, function(t, e, s) {
      Ss.apply(this, [Os, t, e, s]);
    });
    const Rs = se, vs = "commentline";
    var Dh = Rs.extends(vs, function(t, e, s) {
      Rs.apply(this, [vs, t, e, s]);
    });
    const ws = v, Ds = "constant";
    var Uh = ws.extends(Ds, function(t, e, s, i) {
      ws.apply(this, [Ds, s, i]), this.name = t, this.value = e;
    });
    const Us = C, Ps = "continue";
    var Ph = Us.extends(Ps, function(t, e, s) {
      Us.apply(this, [Ps, e, s]), this.level = t;
    });
    const Fs = Bt, Ms = "declare", Ht = Fs.extends(Ms, function(t, e, s, i, n) {
      Fs.apply(this, [Ms, e, i, n]), this.directives = t, this.mode = s;
    });
    Ht.MODE_SHORT = "short", Ht.MODE_BLOCK = "block", Ht.MODE_NONE = "none";
    var Fh = Ht;
    const Bs = v, Hs = "declaredirective";
    var Mh = Bs.extends(Hs, function(t, e, s, i) {
      Bs.apply(this, [Hs, s, i]), this.key = t, this.value = e;
    });
    const Gs = C;
    var Bh = Gs.extends("do", function(t, e, s, i) {
      Gs.apply(this, ["do", s, i]), this.test = t, this.body = e;
    });
    const Vs = C, Qs = "echo";
    var Hh = Vs.extends(Qs, function(t, e, s, i) {
      Vs.apply(this, [Qs, s, i]), this.shortForm = e, this.expressions = t;
    });
    const Ys = b, Ws = "empty";
    var Gh = Ys.extends(Ws, function(t, e, s) {
      Ys.apply(this, [Ws, e, s]), this.expression = t;
    });
    const $s = ht, js = "encapsed", At = $s.extends(js, function(t, e, s, i, n) {
      $s.apply(this, [js, t, e, i, n]), this.type = s;
    });
    At.TYPE_STRING = "string", At.TYPE_SHELL = "shell", At.TYPE_HEREDOC = "heredoc", At.TYPE_OFFSET = "offset";
    var Vh = At;
    const zs = b, Ks = "encapsedpart";
    var Qh = zs.extends(Ks, function(t, e, s, i, n) {
      zs.apply(this, [Ks, i, n]), this.expression = t, this.syntax = e, this.curly = s;
    });
    const Xs = b, qs = "entry";
    var Yh = Xs.extends(qs, function(t, e, s, i, n, r) {
      Xs.apply(this, [qs, n, r]), this.key = t, this.value = e, this.byRef = s, this.unpack = i;
    });
    const Js = nt, Zs = "enum";
    var Wh = Js.extends(Zs, function(t, e, s, i, n, r) {
      Js.apply(this, [Zs, t, n, r]), this.valueType = e, this.implements = s, this.body = i, this.attrGroups = [];
    });
    const ti = v, ei = "enumcase";
    var $h = ti.extends(ei, function(t, e, s, i) {
      ti.apply(this, [ei, s, i]), this.name = t, this.value = e;
    });
    const si = v, ii = "error";
    var jh = si.extends(ii, function(t, e, s, i, n, r) {
      si.apply(this, [ii, n, r]), this.message = t, this.token = e, this.line = s, this.expected = i;
    });
    const ni = b, ri = "eval";
    var zh = ni.extends(ri, function(t, e, s) {
      ni.apply(this, [ri, e, s]), this.source = t;
    });
    const oi = b, hi = "exit";
    var Kh = oi.extends(hi, function(t, e, s, i) {
      oi.apply(this, [hi, s, i]), this.expression = t, this.useDie = e;
    });
    const ai = C, li = "expressionstatement";
    var Xh = ai.extends(li, function(t, e, s) {
      ai.apply(this, [li, e, s]), this.expression = t;
    });
    const ci = C;
    var qh = ci.extends("for", function(t, e, s, i, n, r, a) {
      ci.apply(this, ["for", r, a]), this.init = t, this.test = e, this.increment = s, this.shortForm = n, this.body = i;
    });
    const ui = C, _i = "foreach";
    var Jh = ui.extends(_i, function(t, e, s, i, n, r, a) {
      ui.apply(this, [_i, r, a]), this.source = t, this.key = e, this.value = s, this.shortForm = n, this.body = i;
    });
    const pi = nt, di = "function";
    var fi = pi.extends(di, function(t, e, s, i, n, r, a) {
      pi.apply(this, [di, t, r, a]), this.arguments = e, this.byref = s, this.type = i, this.nullable = n, this.body = null, this.attrGroups = [];
    });
    const ki = C, Ti = "global";
    var Zh = ki.extends(Ti, function(t, e, s) {
      ki.apply(this, [Ti, e, s]), this.items = t;
    });
    const xi = C, Ei = "goto";
    var ta = xi.extends(Ei, function(t, e, s) {
      xi.apply(this, [Ei, e, s]), this.label = t;
    });
    const mi = C, yi = "halt";
    var ea = mi.extends(yi, function(t, e, s) {
      mi.apply(this, [yi, e, s]), this.after = t;
    });
    const Ai = v, gi = "identifier";
    var sa = Ai.extends(gi, function(t, e, s) {
      Ai.apply(this, [gi, e, s]), this.name = t;
    });
    const Ni = C;
    var ia = Ni.extends("if", function(t, e, s, i, n, r) {
      Ni.apply(this, ["if", n, r]), this.test = t, this.body = e, this.alternate = s, this.shortForm = i;
    });
    const Li = b, bi = "include";
    var na = Li.extends(bi, function(t, e, s, i, n) {
      Li.apply(this, [bi, i, n]), this.once = t, this.require = e, this.target = s;
    });
    const Ii = ht, Ci = "inline";
    var ra = Ii.extends(Ci, function(t, e, s, i) {
      Ii.apply(this, [Ci, t, e, s, i]);
    });
    const Si = nt, Oi = "interface";
    var oa = Si.extends(Oi, function(t, e, s, i, n, r) {
      Si.apply(this, [Oi, t, n, r]), this.extends = e, this.body = s, this.attrGroups = i;
    });
    const Ri = nt, vi = "intersectiontype";
    var ha = Ri.extends(vi, function(t, e, s) {
      Ri.apply(this, [vi, null, e, s]), this.types = t;
    });
    const wi = b, Di = "isset";
    var aa = wi.extends(Di, function(t, e, s) {
      wi.apply(this, [Di, e, s]), this.variables = t;
    });
    const Ui = C, Pi = "label";
    var la = Ui.extends(Pi, function(t, e, s) {
      Ui.apply(this, [Pi, e, s]), this.name = t;
    });
    const Fi = b, Mi = "list";
    var ca = Fi.extends(Mi, function(t, e, s, i) {
      Fi.apply(this, [Mi, s, i]), this.items = t, this.shortForm = e;
    });
    const Bi = b, Hi = "lookup";
    var gt = Bi.extends(Hi, function(t, e, s, i, n) {
      Bi.apply(this, [t || Hi, i, n]), this.what = e, this.offset = s;
    });
    const Gi = ht, Vi = "magic";
    var ua = Gi.extends(Vi, function(t, e, s, i) {
      Gi.apply(this, [Vi, t, e, s, i]);
    });
    const Qi = b, Yi = "match";
    var _a = Qi.extends(Yi, function(t, e, s, i) {
      Qi.apply(this, [Yi, s, i]), this.cond = t, this.arms = e;
    });
    const Wi = b, $i = "matcharm";
    var pa = Wi.extends($i, function(t, e, s, i) {
      Wi.apply(this, [$i, s, i]), this.conds = t, this.body = e;
    });
    const ji = fi, zi = "method";
    var da = ji.extends(zi, function() {
      ji.apply(this, arguments), this.kind = zi;
    });
    const Ki = v, Xi = "reference";
    var dt = Ki.extends(Xi, function(t, e, s) {
      Ki.apply(this, [t || Xi, e, s]);
    });
    const qi = dt, Ji = "name", Nt = qi.extends(Ji, function(t, e, s, i) {
      qi.apply(this, [Ji, s, i]), this.name = t.replace(/\\$/, ""), this.resolution = e;
    });
    Nt.UNQUALIFIED_NAME = "uqn", Nt.QUALIFIED_NAME = "qn", Nt.FULL_QUALIFIED_NAME = "fqn", Nt.RELATIVE_NAME = "rn";
    var fa = Nt;
    const Zi = Bt, tn = "namespace";
    var ka = Zi.extends(tn, function(t, e, s, i, n) {
      Zi.apply(this, [tn, e, i, n]), this.name = t, this.withBrackets = s || false;
    });
    const en = b, sn = "namedargument";
    var Ta = en.extends(sn, function(t, e, s, i) {
      en.apply(this, [sn, s, i]), this.name = t, this.value = e;
    });
    const nn = b;
    var xa = nn.extends("new", function(t, e, s, i) {
      nn.apply(this, ["new", s, i]), this.what = t, this.arguments = e;
    });
    const rn = v, on = "noop";
    var Ea = rn.extends(on, function(t, e) {
      rn.apply(this, [on, t, e]);
    });
    const hn = ht, an = "nowdoc";
    var ma = hn.extends(an, function(t, e, s, i, n) {
      hn.apply(this, [an, t, e, i, n]), this.label = s;
    });
    const ln = v, cn = "nullkeyword";
    var ya = ln.extends(cn, function(t, e, s) {
      ln.apply(this, [cn, e, s]), this.raw = t;
    });
    const un = gt, _n = "nullsafepropertylookup";
    var Aa = un.extends(_n, function(t, e, s, i) {
      un.apply(this, [_n, t, e, s, i]);
    });
    const pn = ht, dn = "number";
    var ga = pn.extends(dn, function(t, e, s, i) {
      pn.apply(this, [dn, t, e, s, i]);
    });
    const fn = gt, kn = "offsetlookup";
    var Na = fn.extends(kn, function(t, e, s, i) {
      fn.apply(this, [kn, t, e, s, i]);
    });
    const Tn = nt, xn = "parameter";
    var La = Tn.extends(xn, function(t, e, s, i, n, r, a, o, c, l) {
      Tn.apply(this, [xn, t, c, l]), this.value = s, this.type = e, this.byref = i, this.variadic = n, this.readonly = r, this.nullable = a, this.flags = o || 0, this.attrGroups = [];
    });
    const En = dt, mn = "parentreference";
    var ba = En.extends(mn, function(t, e, s) {
      En.apply(this, [mn, e, s]), this.raw = t;
    });
    const yn = pt, An = "post";
    var Ia = yn.extends(An, function(t, e, s, i) {
      yn.apply(this, [An, s, i]), this.type = t, this.what = e;
    });
    const gn = pt;
    var Ca = gn.extends("pre", function(t, e, s, i) {
      gn.apply(this, ["pre", s, i]), this.type = t, this.what = e;
    });
    const Nn = b, Ln = "print";
    var Sa = Nn.extends(Ln, function(t, e, s) {
      Nn.apply(this, [Ln, e, s]), this.expression = t;
    });
    const bn = Bt, In = "program";
    var Oa = bn.extends(In, function(t, e, s, i, n, r) {
      bn.apply(this, [In, t, n, r]), this.errors = e, s && (this.comments = s), i && (this.tokens = i);
    });
    const Cn = C, Sn = "property";
    var Ra = Cn.extends(Sn, function(t, e, s, i, n, r, a, o) {
      Cn.apply(this, [Sn, a, o]), this.name = t, this.value = e, this.readonly = s, this.nullable = i, this.type = n, this.attrGroups = r;
    });
    const On = gt, Rn = "propertylookup";
    var va = On.extends(Rn, function(t, e, s, i) {
      On.apply(this, [Rn, t, e, s, i]);
    });
    const vn = C, wn = "propertystatement", Dn = vn.extends(wn, function(t, e, s, i, n) {
      vn.apply(this, [wn, i, n]), this.properties = e, this.parseFlags(s);
    });
    Dn.prototype.parseFlags = function(t) {
      t[0] === -1 ? this.visibility = "" : t[0] === null ? this.visibility = null : t[0] === 0 ? this.visibility = "public" : t[0] === 1 ? this.visibility = "protected" : t[0] === 2 && (this.visibility = "private"), this.isStatic = t[1] === 1;
    };
    var wa = Dn;
    const Un = b, Pn = "retif";
    var Da = Un.extends(Pn, function(t, e, s, i, n) {
      Un.apply(this, [Pn, i, n]), this.test = t, this.trueExpr = e, this.falseExpr = s;
    });
    const Fn = C, Mn = "return";
    var Ua = Fn.extends(Mn, function(t, e, s) {
      Fn.apply(this, [Mn, e, s]), this.expr = t;
    });
    const Bn = dt, Hn = "selfreference";
    var Pa = Bn.extends(Hn, function(t, e, s) {
      Bn.apply(this, [Hn, e, s]), this.raw = t;
    });
    const Gn = b, Vn = "silent";
    var Fa = Gn.extends(Vn, function(t, e, s) {
      Gn.apply(this, [Vn, e, s]), this.expr = t;
    });
    const Qn = C, Yn = "static";
    var Ma = Qn.extends(Yn, function(t, e, s) {
      Qn.apply(this, [Yn, e, s]), this.variables = t;
    });
    const Wn = v, $n = "staticvariable";
    var Ba = Wn.extends($n, function(t, e, s, i) {
      Wn.apply(this, [$n, s, i]), this.variable = t, this.defaultValue = e;
    });
    const jn = gt, zn = "staticlookup";
    var Ha = jn.extends(zn, function(t, e, s, i) {
      jn.apply(this, [zn, t, e, s, i]);
    });
    const Kn = dt, Xn = "staticreference";
    var Ga = Kn.extends(Xn, function(t, e, s) {
      Kn.apply(this, [Xn, e, s]), this.raw = t;
    });
    const qn = ht, Jn = "string";
    var Va = qn.extends(Jn, function(t, e, s, i, n, r) {
      qn.apply(this, [Jn, e, i, n, r]), this.unicode = s, this.isDoubleQuote = t;
    });
    const Zn = C, tr = "switch";
    var Qa = Zn.extends(tr, function(t, e, s, i, n) {
      Zn.apply(this, [tr, i, n]), this.test = t, this.body = e, this.shortForm = s;
    });
    const er = C, sr = "throw";
    var Ya = er.extends(sr, function(t, e, s) {
      er.apply(this, [sr, e, s]), this.what = t;
    });
    const ir = nt, nr = "trait";
    var Wa = ir.extends(nr, function(t, e, s, i) {
      ir.apply(this, [nr, t, s, i]), this.body = e;
    });
    const rr = v, or = "traitalias";
    var $a = rr.extends(or, function(t, e, s, i, n, r) {
      rr.apply(this, [or, n, r]), this.trait = t, this.method = e, this.as = s, this.visibility = "", i && (i[0] === 0 ? this.visibility = "public" : i[0] === 1 ? this.visibility = "protected" : i[0] === 2 && (this.visibility = "private"));
    });
    const hr = v, ar = "traitprecedence";
    var ja = hr.extends(ar, function(t, e, s, i, n) {
      hr.apply(this, [ar, i, n]), this.trait = t, this.method = e, this.instead = s;
    });
    const lr = v, cr = "traituse";
    var za = lr.extends(cr, function(t, e, s, i) {
      lr.apply(this, [cr, s, i]), this.traits = t, this.adaptations = e;
    });
    const ur = C;
    var Ka = ur.extends("try", function(t, e, s, i, n) {
      ur.apply(this, ["try", i, n]), this.body = t, this.catches = e, this.always = s;
    });
    const _r = dt, pr = "typereference", dr = _r.extends(pr, function(t, e, s, i) {
      _r.apply(this, [pr, s, i]), this.name = t, this.raw = e;
    });
    dr.types = ["int", "float", "string", "bool", "object", "array", "callable", "iterable", "void", "static"];
    var Xa = dr;
    const fr = pt, kr = "unary";
    var qa = fr.extends(kr, function(t, e, s, i) {
      fr.apply(this, [kr, s, i]), this.type = t, this.what = e;
    });
    const Tr = nt, xr = "uniontype";
    var Ja = Tr.extends(xr, function(t, e, s) {
      Tr.apply(this, [xr, null, e, s]), this.types = t;
    });
    const Er = C, mr = "unset";
    var Za = Er.extends(mr, function(t, e, s) {
      Er.apply(this, [mr, e, s]), this.variables = t;
    });
    const yr = C, Ar = "usegroup";
    var tl = yr.extends(Ar, function(t, e, s, i, n) {
      yr.apply(this, [Ar, i, n]), this.name = t, this.type = e, this.items = s;
    });
    const gr = C, Nr = "useitem", ie = gr.extends(Nr, function(t, e, s, i, n) {
      gr.apply(this, [Nr, i, n]), this.name = t, this.alias = e, this.type = s;
    });
    ie.TYPE_CONST = "const", ie.TYPE_FUNCTION = "function";
    var el = ie;
    const Lr = b, br = "variable";
    var sl = Lr.extends(br, function(t, e, s, i) {
      Lr.apply(this, [br, s, i]), this.name = t, this.curly = e || false;
    });
    const Ir = b, Cr = "variadic";
    var il = Ir.extends(Cr, function(t, e, s) {
      Ir.apply(this, [Cr, e, s]), this.what = t;
    });
    const Sr = v, Or = "variadicplaceholder";
    var nl = Sr.extends(Or, function(t, e) {
      Sr.apply(this, [Or, t, e]);
    });
    const Rr = C, vr = "while";
    var rl = Rr.extends(vr, function(t, e, s, i, n) {
      Rr.apply(this, [vr, i, n]), this.test = t, this.body = e, this.shortForm = s;
    });
    const wr = b, Dr = "yield";
    var ol = wr.extends(Dr, function(t, e, s, i) {
      wr.apply(this, [Dr, s, i]), this.value = t, this.key = e;
    });
    const Ur = b, Pr = "yieldfrom";
    var hl = Ur.extends(Pr, function(t, e, s) {
      Ur.apply(this, [Pr, e, s]), this.value = t;
    });
    const al = dh, ll = Ie, F = function(t, e) {
      this.withPositions = t, this.withSource = e;
    };
    F.precedence = {}, [["or"], ["xor"], ["and"], ["="], ["?"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "!=", "===", "!==", "<=>"], ["<", "<=", ">", ">="], ["<<", ">>"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["cast", "silent"], ["**"]].forEach(function(t, e) {
      t.forEach(function(s) {
        F.precedence[s] = e + 1;
      });
    }), F.prototype.isRightAssociative = function(t) {
      return t === "**" || t === "??";
    }, F.prototype.swapLocations = function(t, e, s, i) {
      this.withPositions && (t.loc.start = e.loc.start, t.loc.end = s.loc.end, this.withSource && (t.loc.source = i.lexer._input.substring(t.loc.start.offset, t.loc.end.offset)));
    }, F.prototype.resolveLocations = function(t, e, s, i) {
      this.withPositions && (t.loc.start.offset > e.loc.start.offset && (t.loc.start = e.loc.start), t.loc.end.offset < s.loc.end.offset && (t.loc.end = s.loc.end), this.withSource && (t.loc.source = i.lexer._input.substring(t.loc.start.offset, t.loc.end.offset)));
    }, F.prototype.resolvePrecedence = function(t, e) {
      let s, i, n;
      return t.kind === "call" ? this.resolveLocations(t, t.what, t, e) : t.kind === "propertylookup" || t.kind === "staticlookup" || t.kind === "offsetlookup" && t.offset ? this.resolveLocations(t, t.what, t.offset, e) : t.kind === "bin" ? t.right && !t.right.parenthesizedExpression && (t.right.kind === "bin" ? (i = F.precedence[t.type], n = F.precedence[t.right.type], i && n && n <= i && (t.type !== t.right.type || !this.isRightAssociative(t.type)) && (s = t.right, t.right = t.right.left, this.swapLocations(t, t.left, t.right, e), s.left = this.resolvePrecedence(t, e), this.swapLocations(s, s.left, s.right, e), t = s)) : t.right.kind === "retif" && (i = F.precedence[t.type], n = F.precedence["?"], i && n && n <= i && (s = t.right, t.right = t.right.test, this.swapLocations(t, t.left, t.right, e), s.test = this.resolvePrecedence(t, e), this.swapLocations(s, s.test, s.falseExpr, e), t = s))) : t.kind !== "silent" && t.kind !== "cast" || !t.expr || t.expr.parenthesizedExpression ? t.kind === "unary" ? t.what && !t.what.parenthesizedExpression && (t.what.kind === "bin" ? (s = t.what, t.what = t.what.left, this.swapLocations(t, t, t.what, e), s.left = this.resolvePrecedence(t, e), this.swapLocations(s, s.left, s.right, e), t = s) : t.what.kind === "retif" && (s = t.what, t.what = t.what.test, this.swapLocations(t, t, t.what, e), s.test = this.resolvePrecedence(t, e), this.swapLocations(s, s.test, s.falseExpr, e), t = s)) : t.kind === "retif" ? t.falseExpr && t.falseExpr.kind === "retif" && !t.falseExpr.parenthesizedExpression && (s = t.falseExpr, t.falseExpr = s.test, this.swapLocations(t, t.test, t.falseExpr, e), s.test = this.resolvePrecedence(t, e), this.swapLocations(s, s.test, s.falseExpr, e), t = s) : t.kind === "assign" ? t.right && t.right.kind === "bin" && !t.right.parenthesizedExpression && (i = F.precedence["="], n = F.precedence[t.right.type], i && n && n < i && (s = t.right, t.right = t.right.left, s.left = t, this.swapLocations(s, s.left, t.right, e), t = s)) : t.kind === "expressionstatement" && this.swapLocations(t, t.expression, t, e) : t.expr.kind === "bin" ? (s = t.expr, t.expr = t.expr.left, this.swapLocations(t, t, t.expr, e), s.left = this.resolvePrecedence(t, e), this.swapLocations(s, s.left, s.right, e), t = s) : t.expr.kind === "retif" && (s = t.expr, t.expr = t.expr.test, this.swapLocations(t, t, t.expr, e), s.test = this.resolvePrecedence(t, e), this.swapLocations(s, s.test, s.falseExpr, e), t = s), t;
    }, F.prototype.prepare = function(t, e, s) {
      let i = null;
      (this.withPositions || this.withSource) && (i = s.position());
      const n = this, r = function() {
        let a = null;
        const o = Array.prototype.slice.call(arguments);
        if (o.push(e), n.withPositions || n.withSource) {
          let h = null;
          n.withSource && (h = s.lexer._input.substring(i.offset, s.prev[2])), a = new al(h, i, new ll(s.prev[0], s.prev[1], s.prev[2])), o.push(a);
        }
        t || (t = o.shift());
        const c = n[t];
        if (typeof c != "function") throw new Error('Undefined node "' + t + '"');
        const l = Object.create(c.prototype);
        return c.apply(l, o), r.instance = l, r.trailingComments && (l.trailingComments = r.trailingComments), typeof r.postBuild == "function" && r.postBuild(l), s.debug && delete n.stack[r.stackUid], n.resolvePrecedence(l, s);
      };
      return s.debug && (this.stack || (this.stack = {}, this.stackUid = 1), this.stack[++this.stackUid] = { position: i, stack: new Error().stack.split(`
`).slice(3, 5) }, r.stackUid = this.stackUid), r.setTrailingComments = function(a) {
        r.instance ? r.instance.setTrailingComments(a) : r.trailingComments = a;
      }, r.destroy = function(a) {
        e && (a ? a.leadingComments ? a.leadingComments = e.concat(a.leadingComments) : a.leadingComments = e : s._docIndex = s._docs.length - e.length), s.debug && delete n.stack[r.stackUid];
      }, r;
    }, F.prototype.checkNodes = function() {
      const t = [];
      for (const e in this.stack) Object.prototype.hasOwnProperty.call(this.stack, e) && (this.stack[e].key = e, t.push(this.stack[e]));
      return this.stack = {}, t;
    }, [fh, kh, Th, xh, Eh, mh, yh, Bt, Ah, gh, Nh, Lh, bh, Ih, Ch, Sh, Oh, Rh, vh, se, wh, Dh, Uh, ms, Ph, nt, Fh, Mh, Bh, Hh, Gh, Vh, Qh, Yh, Wh, $h, jh, zh, Kh, b, Xh, qh, Jh, fi, Zh, ta, ea, sa, ia, na, ra, oa, ha, aa, la, ca, ht, gt, ua, _a, pa, da, fa, ka, Ta, xa, v, Ea, ma, ya, Aa, ga, Na, pt, La, ba, Ia, Ca, Sa, Oa, Ra, va, wa, dt, Da, Ua, Pa, Fa, C, Ma, Ba, Ha, Ga, Va, Qa, Ya, Wa, $a, ja, za, Ka, Xa, qa, Ja, Za, tl, el, sl, il, nl, rl, ol, hl].forEach(function(t) {
      F.prototype[t.kind] = t;
    });
    const Fr = jo, Mr = uh, Br = ph, Hr = F;
    function ne(t, e) {
      const s = Object.keys(t);
      let i = s.length;
      for (; i--; ) {
        const n = s[i], r = t[n];
        r === null ? delete e[n] : typeof r == "function" ? e[n] = r.bind(e) : Array.isArray(r) ? e[n] = Array.isArray(e[n]) ? e[n].concat(r) : r : e[n] = typeof r == "object" && typeof e[n] == "object" ? ne(r, e[n]) : r;
      }
      return e;
    }
    const H = function(t) {
      if (typeof this == "function") return new this(t);
      if (this.tokens = Br, this.lexer = new Fr(this), this.ast = new Hr(), this.parser = new Mr(this.lexer, this.ast), t && typeof t == "object") {
        if (t.parser && (t.lexer || (t.lexer = {}), t.parser.version)) {
          if (typeof t.parser.version == "string") {
            let e = t.parser.version.split(".");
            if (e = 100 * parseInt(e[0]) + parseInt(e[1]), isNaN(e)) throw new Error("Bad version number : " + t.parser.version);
            t.parser.version = e;
          } else if (typeof t.parser.version != "number") throw new Error("Expecting a number for version");
          if (t.parser.version < 500 || t.parser.version > 900) throw new Error("Can only handle versions between 5.x to 8.x");
        }
        ne(t, this), this.lexer.version = this.parser.version;
      }
    }, re = function(t) {
      return typeof t.write == "function" ? t.toString() : t;
    };
    H.create = function(t) {
      return new H(t);
    }, H.parseEval = function(t, e) {
      return new H(e).parseEval(t);
    }, H.prototype.parseEval = function(t) {
      return this.lexer.mode_eval = true, this.lexer.all_tokens = false, t = re(t), this.parser.parse(t, "eval");
    }, H.parseCode = function(t, e, s) {
      return typeof e != "object" || s || (s = e, e = "unknown"), new H(s).parseCode(t, e);
    }, H.prototype.parseCode = function(t, e) {
      return this.lexer.mode_eval = false, this.lexer.all_tokens = false, t = re(t), this.parser.parse(t, e);
    }, H.tokenGetAll = function(t, e) {
      return new H(e).tokenGetAll(t);
    }, H.prototype.tokenGetAll = function(t) {
      this.lexer.mode_eval = false, this.lexer.all_tokens = true, t = re(t);
      const e = this.lexer.EOF, s = this.tokens.values;
      this.lexer.setInput(t);
      let i = this.lexer.lex() || e;
      const n = [];
      for (; i != e; ) {
        let r = this.lexer.yytext;
        Object.prototype.hasOwnProperty.call(s, i) && (r = [s[i], r, this.lexer.yylloc.first_line]), n.push(r), i = this.lexer.lex() || e;
      }
      return n;
    }, it.exports = H, it.exports.tokens = Br, it.exports.lexer = Fr, it.exports.AST = Hr, it.exports.parser = Mr, it.exports.combine = ne, it.exports.Engine = H, it.exports.default = H;
    var cl = Po(it.exports);
    const Gt = "PHP", Gr = [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 7, 7.1, 7.2, 7.3, 7.4, 8, 8.1, 8.2, 8.3, 8.4], oe = Math.max(...Gr);
    let Vt = "";
    function Vr() {
      const t = process.cwd();
      let e = null;
      const s = st.join(t, "composer.json");
      if (et.existsSync(s) && (e = s), !e) {
        let i = st.dirname(t);
        for (; i !== st.parse(i).root; ) {
          const n = st.join(i, "composer.json");
          if (et.existsSync(n)) {
            e = n;
            break;
          }
          i = st.dirname(i);
        }
      }
      if (e) try {
        const i = et.readFileSync(e, "utf8"), n = JSON.parse(i);
        if (n.require && n.require.php) {
          const r = n.require.php.match(/^(?:[^0-9]*)?([0-9]+)\.\*/);
          if (r) return parseFloat(`${r[1]}.0`);
          const a = n.require.php.match(/^(?:[^0-9]*)?([0-9]+)\.([0-9]+)/);
          return a ? parseFloat(`${a[1]}.${a[2]}`) : (Vt = `Could not decode PHP version (${n.require.php}})`, null);
        }
      } catch (i) {
        Vt = `Error reading composer.json: ${i.message}`;
      }
      else Vt = "Could not find composer.json";
      return null;
    }
    var ul = { phpVersion: { since: "0.13.0", category: Gt, type: "choice", default: "auto", description: "Minimum target PHP version.", choices: [...Gr.map((t) => ({ value: t.toFixed(1) })), { value: "composer", description: "Use the PHP version defined in composer.json" }, { value: "auto", description: `Try composer.json, else latest PHP Version (${oe})` }] }, trailingCommaPHP: { since: "0.0.0", category: Gt, type: "boolean", default: true, description: "Print trailing commas wherever possible when multi-line." }, braceStyle: { since: "0.10.0", category: Gt, type: "choice", default: "per-cs", description: "Print one space or newline for code blocks (classes and functions).", choices: [{ value: "psr-2", description: "(deprecated) Use per-cs" }, { value: "per-cs", description: "Use the PER Coding Style brace style." }, { value: "1tbs", description: "Use 1tbs brace style." }] }, singleQuote: { since: "0.0.0", category: Gt, type: "boolean", default: false, description: "Use single quotes instead of double quotes." } };
    function Qr(t, e) {
      const s = e && e.parentParser === "markdown";
      if (!t && s) return "";
      (function(o) {
        if (o) if (o.phpVersion === "auto") o.phpVersion = Vr() ?? oe;
        else if (o.phpVersion === "composer") {
          const c = Vr();
          if (c === null) throw new Error(`Could not determine PHP version from composer; ${Vt}`);
          o.phpVersion = c;
        } else o.phpVersion = parseFloat(o.phpVersion);
      })(e), t = t.replace(/\?>\n<\?/g, `?>
___PSEUDO_INLINE_PLACEHOLDER___<?`);
      const i = new cl({ parser: { extractDoc: true, version: `${oe}` }, ast: { withPositions: true, withSource: true } }), n = t.indexOf("<?php") !== -1, r = s && !n;
      let a;
      try {
        a = r ? i.parseEval(t) : i.parseCode(t);
      } catch (o) {
        throw o instanceof SyntaxError && "lineNumber" in o && (o.loc = { start: { line: o.lineNumber, column: o.columnNumber } }, delete o.lineNumber, delete o.columnNumber), o;
      }
      return a.extra = { parseAsEval: r }, a.comments.forEach((o) => {
        o.value[o.value.length - 1] === `
` && (o.value = o.value.slice(0, -1), o.loc.end.offset = o.loc.end.offset - 1);
      }), a;
    }
    const Yr = (t) => (e) => {
      var _a2, _b;
      return (_b = (_a2 = e.loc) == null ? void 0 : _a2[t]) == null ? void 0 : _b.offset;
    }, G = Yr("start"), S = Yr("end"), { hasNewline: _l, skipEverythingButNewLine: pl, skipNewline: dl } = B.util;
    function Wr(t) {
      return t.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e)/, "");
    }
    const fl = new Map([["or"], ["xor"], ["and"], ["=", "+=", "-=", "*=", "**=", "/=", ".=", "%=", "&=", "|=", "^=", "<<=", ">>="], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!==", "<>", "<=>"], ["<", ">", "<=", ">="], [">>", "<<"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["++", "--", "~"], ["**"]].flatMap((t, e) => t.map((s) => [s, e])));
    function Qt(t) {
      return fl.get(t);
    }
    const $r = ["==", "!=", "===", "!==", "<>", "<=>"], Yt = ["*", "/", "%"], he = [">>", "<<"];
    function ae(t, e) {
      return Qt(e) === Qt(t) && t !== "**" && (!$r.includes(t) || !$r.includes(e)) && !(e === "%" && Yt.includes(t) || t === "%" && Yt.includes(e)) && (e === t || !Yt.includes(e) || !Yt.includes(t)) && (!he.includes(t) || !he.includes(e));
    }
    function Lt(t) {
      const e = t.children || t.body || t.adaptations;
      return Array.isArray(e) ? e : null;
    }
    function j(t) {
      return t.length > 0 ? t[t.length - 1] : null;
    }
    function bt(t) {
      const { node: e } = t;
      if (e.kind === "program") {
        const i = Lt(e);
        return !(!i || i.length === 0) && i[0].kind === "inline";
      }
      if (e.kind === "switch") {
        if (!e.body) return false;
        const i = Lt(e.body);
        if (i.length === 0) return false;
        const [n] = i;
        if (!n.body) return false;
        const r = Lt(n.body);
        return r.length !== 0 && r[0].kind === "inline";
      }
      const s = function(i) {
        let { body: n } = i;
        return n ? (n.kind === "block" && (n = n.children), n[0]) : null;
      }(e);
      return !!s && s.kind === "inline";
    }
    function le(t) {
      return t.kind === "nowdoc" || t.kind === "encapsed" && t.type === "heredoc";
    }
    function Wt(t) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      const s = t.getNode(e), i = t.getNode(e + 1), n = t.getNode(e + 2);
      if (!i) return false;
      if (n && ["call", "new", "echo"].includes(n.kind) && !["call", "array"].includes(i.kind) || i.kind === "parameter") {
        const r = n.arguments.length - 1;
        return n.arguments.indexOf(i) !== r;
      }
      if (n && n.kind === "for") {
        const r = n.init.indexOf(i);
        if (r !== -1) return r !== n.init.length - 1;
        const a = n.test.indexOf(i);
        if (a !== -1) return a !== n.test.length - 1;
        const o = n.increment.indexOf(i);
        if (o !== -1) return o !== n.increment.length - 1;
      }
      if (i.kind === "bin") return i.left === s || Wt(t, e + 1);
      if (i.kind === "case" && i.test === s) return true;
      if (i.kind === "staticvariable") {
        const r = n.variables.length - 1;
        return n.variables.indexOf(i) !== r;
      }
      if (i.kind === "entry") {
        if (i.key === s) return true;
        const r = n.items.length - 1;
        return n.items.indexOf(i) !== r;
      }
      if (["call", "new"].includes(i.kind)) {
        const r = i.arguments.length - 1;
        return i.arguments.indexOf(s) !== r;
      }
      if (i.kind === "echo") {
        const r = i.expressions.length - 1;
        return i.expressions.indexOf(s) !== r;
      }
      if (i.kind === "array") {
        const r = i.items.length - 1;
        return i.items.indexOf(s) !== r;
      }
      return i.kind === "retif" && Wt(t, e + 1);
    }
    function jr(t) {
      const e = t.replace(/^\\/, "");
      return e.indexOf("\\") !== -1 ? e : t;
    }
    function W(t) {
      return t.comments && t.comments.some((e) => !e.leading && !e.trailing);
    }
    function M(t) {
      return t.kind === "propertylookup" || t.kind === "nullsafepropertylookup" || t.kind === "staticlookup" || t.kind === "offsetlookup";
    }
    function kl(t) {
      const { node: e } = t;
      return !["try", "catch"].includes(e.kind) && bt(t);
    }
    function Tl(t) {
      const { node: e } = t;
      if (["try", "catch"].includes(e.kind)) return true;
      if (e.kind === "switch") {
        const s = Lt(e.body);
        if (s.length === 0) return true;
        const i = j(s);
        if (!i.body) return true;
        const n = Lt(i.body);
        return n.length === 0 || n[0].kind !== "inline";
      }
      return !bt(t);
    }
    function ce(t) {
      return ["program", "declare", "namespace"].includes(t.kind);
    }
    function ue(t) {
      return ["name", "parentreference", "selfreference", "staticreference"].includes(t.kind);
    }
    function ft(t) {
      return t.kind === "bin" && ["||", "&&"].includes(t.type) ? "logical" : t.kind;
    }
    function $t(t) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "body";
      const { node: s } = t;
      return s[e] && s[e].children && s[e].children.length === 0 && (!s[e].comments || s[e].comments.length === 0);
    }
    function xl(t, e) {
      let s = G(e);
      return s = pl(t, s), s = dl(t, s), _l(t, s);
    }
    function zr(t) {
      return t.kind === "nowdoc" || t.kind === "encapsed" && t.type === "heredoc" || t.kind === "entry" && (t.value.kind === "nowdoc" || t.value.kind === "encapsed" && t.value.type === "heredoc");
    }
    function _e(t, e) {
      const s = function(i, n) {
        const r = [].concat(n);
        let a, o = -1;
        for (; a = i.getParentNode(++o); ) if (r.indexOf(a.kind) !== -1) return o;
        return -1;
      }(t, e);
      return s === -1 ? null : t.getParentNode(s);
    }
    const Kr = new Map(["__construct", "__destruct", "__call", "__callStatic", "__get", "__set", "__isset", "__unset", "__sleep", "__wakeup", "__toString", "__invoke", "__set_state", "__clone", "__debugInfo"].map((t) => [t.toLowerCase(), t]));
    function Xr(t) {
      const e = t.toLowerCase();
      return Kr.has(e) ? Kr.get(e) : t;
    }
    function jt(t) {
      const e = new Set(t);
      return (s) => e.has(s == null ? void 0 : s.kind);
    }
    const El = jt(["variadicplaceholder", "namedargument", "nullkeyword", "identifier", "parameter", "variable", "variadic", "boolean", "literal", "number", "string", "clone", "cast"]), ml = jt(["array"]), qr = jt(["nullsafepropertylookup", "propertylookup", "staticlookup", "offsetlookup", "call", "new"]), yl = jt(["arrowfunc"]);
    function Jr(t) {
      const e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      return qr(t) && e.push(t), t.what ? Jr(t.what, e) : e;
    }
    function Zr(t) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      if (e <= 0) return false;
      const s = (i) => Zr(i, e - 1);
      if (El(t)) return true;
      if (ml(t)) return t.items.every((i) => i === null || s(i));
      if (qr(t)) {
        const i = Jr(t);
        return i.unshift(), i.length <= e && i.every((n) => M(n) ? s(n.offset) : n.arguments.every(s));
      }
      return !!yl(t) && t.arguments.length <= e && t.arguments.every(s);
    }
    const { addLeadingComment: z, addDanglingComment: V, addTrailingComment: K, skipNewline: Al, hasNewline: zt, hasNewlineInRange: gl, getNextNonSpaceNonCommentCharacterIndex: It, isNextLineEmpty: Nl, isPreviousLineEmpty: Ll } = B.util, { join: to, indent: bl, hardline: J, cursor: eo, lineSuffix: so, breakParent: Il } = B.doc.builders;
    function Kt(t, e) {
      const { children: s } = t;
      s.length === 0 ? V(t, e) : z(s[0], e);
    }
    function pe(t, e) {
      t.kind === "block" ? Kt(t, e) : z(t, e);
    }
    function io(t, e, s, i, n) {
      const r = It(t, S(n)), a = t.charAt(r);
      return e && e.kind === "identifier" && s && (s.kind === "function" || s.kind === "method") && a === ")" ? (K(s, n), true) : !(!s || s.kind !== "function" && s.kind !== "method" || !i || i.kind !== "block") && (Kt(i, n), true);
    }
    function de(t, e, s, i, n) {
      if (!s || s.kind !== "if" || !i) return false;
      const r = It(t, S(n));
      return t.charAt(r) === ")" ? (K(e, n), true) : e === s.body && i === s.alternate ? (V(s, n), true) : i.kind === "if" ? (pe(i.body, n), true) : s.body === i && (z(i, n), true);
    }
    function fe(t, e, s) {
      var _a2;
      if (t && ["class", "interface", "trait"].includes(t.kind)) {
        if ((_a2 = t.__parent_new_arguments) == null ? void 0 : _a2.includes(e)) return false;
        if (e && t.extends) {
          if (Array.isArray(t.extends)) {
            if (t.extends.some((i) => {
              if (e && e === i) return V(e, s), true;
            })) return true;
          } else if (e === t.extends) return V(e, s), true;
        }
        if (e && t.implements && t.implements.some((i) => {
          if (e && e === i) return V(e, s), true;
        })) return true;
        if (!(t.body && t.body.length > 0)) return V(t, s), true;
      }
      return !!(e && e.kind === "class" && e.isAnonymous && e.leadingComments && s.kind === "commentblock");
    }
    function ke(t, e, s, i) {
      if (e && (e.kind === "function" || e.kind === "method")) {
        let n = 0;
        for (let o = 0; o < e.arguments.length; o++) n = S(e.arguments[o]) > n ? S(e.arguments[o]) : n;
        const r = e.body && G(i) > n && S(i) < G(e.body), a = It(t, S(i));
        if (e.type && r && t.charAt(a) !== ")") return S(i) < G(e.type) ? (V(e.type, i), true) : (K(e.type, i), true);
      }
      return false;
    }
    function Te(t, e, s, i, n) {
      return !(!s || !["function", "method", "parameter"].includes(s.kind)) && e.kind === "typereference" && i.kind === "identifier" && (K(e, n), true);
    }
    function no(t, e) {
      return !(!t || !["label", "goto"].includes(t.kind)) && (K(t, e), true);
    }
    function xe(t, e, s, i) {
      return s && s.kind === "inline" ? (s.leadingComments || (s.leadingComments = []), s.leadingComments.includes(i) || s.leadingComments.push(i), true) : !(t || s || !e || e.kind !== "inline") && (V(e, i), true);
    }
    function ro(t, e, s) {
      return !(!t || t.kind !== "try" || !e) && (e.kind === "block" ? (Kt(e, s), true) : e.kind === "try" ? (pe(e.always, s), true) : e.kind === "catch" && (pe(e.body, s), true));
    }
    function oo(t, e, s, i) {
      return s || e || !t || t.kind !== "namespace" || t.withBrackets ? !(e || !t || t.kind !== "namespace" || t.withBrackets) && (V(t, i), true) : (K(t, i), true);
    }
    function ho(t, e, s, i) {
      return !(!t || t.kind !== "declare") && (!e || e.kind !== "noop") && (s && t.directives[0] !== s ? !(!s || !e) && (z(s, i), true) : (t.mode === "none" ? K(t, i) : V(t, i), true));
    }
    function Ee(t, e, s, i, n) {
      if (!s || s.kind !== "while" || !i) return false;
      const r = It(t, S(n));
      return t.charAt(r) === ")" ? (K(e, n), true) : i.kind === "block" && (Kt(i, n), true);
    }
    function me(t, e) {
      return t.node.printed = true, e.printer.printComment(t, e);
    }
    function R(t, e, s, i) {
      const n = [], r = t.getValue();
      return r && r.comments ? (t.each(() => {
        const a = t.node;
        !a || a.leading || a.trailing || i && !i(a) || n.push(me(t, e));
      }, "comments"), n.length === 0 ? "" : s ? to(J, n) : bl([J, to(J, n)])) : "";
    }
    function Ct(t) {
      return t.comments && t.comments.some((e) => e.leading);
    }
    function St(t) {
      return t.comments && t.comments.some((e) => e.trailing);
    }
    function ct(t, e) {
      const s = [];
      return t.forEach((i, n, r) => {
        i.printed = true;
        const a = r.length === n + 1;
        s.push(i.value), a || s.push(J), Nl(e.originalText, S(i)) && !a && s.push(J);
      }), s;
    }
    function ye(t) {
      return t.kind === "commentblock";
    }
    function ao(t, e, s) {
      const { node: i } = t;
      return i && i === e.cursorNode ? [eo, s, eo] : s;
    }
    function Ae(t, e, s, i) {
      const { node: n } = t, r = e(t), a = n && n.comments;
      if (!a || a.length === 0) return ao(t, s, r);
      const o = [], c = ["", r];
      return t.each((l) => {
        let { node: h } = l;
        const { leading: u, trailing: p } = h;
        if (u) {
          const d = function(k, T, y) {
            const E = me(k, y);
            if (!E) return "";
            const N = k.node;
            return y.printer.isBlockComment && y.printer.isBlockComment(N) ? [E, zt(y.originalText, S(N)) ? J : " "] : [E, J];
          }(t, 0, s);
          if (!d) return;
          o.push(d);
          const _ = s.originalText;
          zt(_, Al(_, S(h))) && o.push(J);
        } else p && c.push(function(d, _, k) {
          const T = me(d, k);
          if (!T) return "";
          const y = d.node, E = k.printer.isBlockComment && k.printer.isBlockComment(y);
          if (zt(k.originalText, G(y), { backwards: true })) {
            const N = Ll(k.originalText, G(y));
            return so([J, N ? J : "", T]);
          }
          return E ? [" ", T] : [so([" ", T]), E ? "" : Il];
        }(t, 0, s));
      }, "comments"), ao(t, s, o.concat(c));
    }
    function lo(t, e) {
      const { parent: s } = t;
      if (!s) return false;
      const { key: i, node: n } = t;
      if (["program", "expressionstatement", "namespace", "declare", "block", "include", "print", "return", "echo"].includes(s.kind)) return false;
      switch (n.kind) {
        case "pre":
        case "post":
          if (s.kind === "unary") return n.kind === "pre" && (n.type === "+" && s.type === "+" || n.type === "-" && s.type === "-");
        case "unary":
          switch (s.kind) {
            case "unary":
              return n.type === s.type && (n.type === "+" || n.type === "-");
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
            case "call":
              return i === "what";
            case "bin":
              return s.type === "**" && i === "left";
            default:
              return false;
          }
        case "bin":
          switch (s.kind) {
            case "assign":
            case "retif":
              return ["and", "xor", "or"].includes(n.type);
            case "silent":
            case "cast":
              return n.parenthesizedExpression;
            case "pre":
            case "post":
            case "unary":
              return true;
            case "call":
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
              return i === "what";
            case "bin": {
              const a = s.type, o = Qt(a), c = n.type, l = Qt(c);
              return o > l || a === "||" && c === "&&" || o === l && i === "right" || o === l && !ae(a, c) || (o < l && c === "%" ? a === "+" || a === "-" : !(!he[r = a] && r !== "|" && r !== "^" && r !== "&"));
            }
            default:
              return false;
          }
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
          return s.kind === "call" && i === "what" && n.parenthesizedExpression;
        case "clone":
        case "new": {
          const a = n.kind === "clone" || n.kind === "new" && e.phpVersion < 8.4;
          switch (s.kind) {
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
            case "call":
              return i === "what" && a;
            default:
              return false;
          }
        }
        case "yield":
          switch (s.kind) {
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
            case "call":
              return i === "what";
            case "retif":
              return i === "test";
            default:
              return !(!n.key && !n.value);
          }
        case "assign":
          return (s.kind !== "for" || !s.init.includes(n) && !s.increment.includes(n)) && s.kind !== "assign" && s.kind !== "static" && !["if", "do", "while", "foreach", "switch"].includes(s.kind) && s.kind !== "silent" && s.kind !== "call";
        case "retif":
          switch (s.kind) {
            case "cast":
              return true;
            case "unary":
            case "bin":
            case "retif":
              return !(i === "test" && !s.trueExpr);
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
            case "call":
              return i === "what";
            default:
              return false;
          }
        case "closure":
          switch (s.kind) {
            case "call":
              return i === "what";
            case "propertylookup":
            case "nullsafepropertylookup":
              return true;
            default:
              return false;
          }
        case "silence":
        case "cast":
          return n.parenthesizedExpression;
        case "string":
        case "array":
          switch (s.kind) {
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
            case "offsetlookup":
            case "call":
              return (!["string", "array"].includes(n.kind) || s.kind !== "offsetlookup") && i === "what";
            default:
              return false;
          }
        case "print":
        case "include":
          return s.kind === "bin";
      }
      var r;
      return false;
    }
    const { breakParent: co, join: w, line: I, lineSuffix: Cl, group: x, conditionalGroup: kt, indent: m, dedent: Sl, ifBreak: ut, hardline: f, softline: L, literalline: Tt, align: Ol, dedentToRoot: Rl } = B.doc.builders, { willBreak: at } = B.doc.utils, { isNextLineEmptyAfterIndex: vl, hasNewline: wl, hasNewlineInRange: uo, getNextNonSpaceNonCommentCharacterIndex: Dl, isNextLineEmpty: _t, isPreviousLineEmpty: Ul } = B.util;
    function Ot(t, e) {
      return !!t.trailingCommaPHP && t.phpVersion >= e;
    }
    function ge(t) {
      return t.braceStyle !== "1tbs";
    }
    function Ne(t, e, s) {
      return [arguments.length > 3 && arguments[3] !== void 0 && arguments[3] ? "?" : "", "->", s("offset")];
    }
    function _o(t, e, s) {
      return Ne(t, e, s, true);
    }
    function po(t, e, s) {
      const { node: i } = t, n = !["variable", "identifier"].includes(i.offset.kind);
      return ["::", n ? "{" : "", s("offset"), n ? "}" : ""];
    }
    function fo(t, e, s) {
      const { node: i } = t, n = i.offset && i.offset.kind === "number" || _e(t, "encapsed");
      return ["[", i.offset ? x([m([n ? "" : L, s("offset")]), n ? "" : L]) : "", "]"];
    }
    function ko(t) {
      return t.kind === "array" && (t.items.length > 0 || t.comments) || t.kind === "function" || t.kind === "method" || t.kind === "closure";
    }
    function Z(t, e, s) {
      let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "arguments";
      const n = t.node[i];
      if (n.length === 0) return ["(", R(t, e, true), ")"];
      let r = false, a = false;
      const o = t.map((d) => {
        let { node: _, isLast: k, isFirst: T } = d;
        const y = [s()];
        return k || (_t(e.originalText, S(_)) ? (T && (a = true), r = true, y.push(",", f, f)) : y.push(",", I)), y;
      }, i), { node: c } = t, l = j(n), h = Ot(e, 7.3) && ["call", "new", "unset", "isset"].includes(c.kind) || Ot(e, 8) && ["function", "closure", "method", "arrowfunc", "attribute"].includes(c.kind) ? m([l && zr(l) ? f : "", ","]) : "", u = function(d) {
        if (d.length !== 2) return false;
        const [_, k] = d;
        return !(_.comments && _.comments.length || _.kind !== "function" && _.kind !== "method" && _.kind !== "closure" || k.kind === "retif" || ko(k));
      }(n), p = function(d) {
        const _ = j(d), k = (T = d).length > 1 ? T[T.length - 2] : null;
        var T;
        return !Ct(_) && !St(_) && ko(_) && (!k || k.kind !== _.kind);
      }(n);
      if (u || p) {
        const d = (u ? o.slice(1).some(at) : o.slice(0, -1).some(at)) || r;
        let _;
        t.each((y) => {
          let { isLast: E, isFirst: N } = y;
          u && N && (_ = [s([], { expandFirstArg: true }), o.length > 1 ? "," : "", a ? f : I, a ? f : "", o.slice(1)]), p && E && (_ = [...o.slice(0, -1), s([], { expandLastArg: true })]);
        }, i);
        const k = o.some(at), T = ["(", ..._, ")"];
        return [k ? co : "", kt([k ? ut(x(["(", m([I, ...o]), h, I, ")"], { shouldBreak: true }), T) : T, u ? ["(", x(_[0], { shouldBreak: true }), ..._.slice(1), ")"] : ["(", ...o.slice(0, -1), x(j(_), { shouldBreak: true }), ")"], x(["(", m([I, ...o]), ut(h), I, ")"], { shouldBreak: true })], { shouldBreak: d })];
      }
      return x(["(", m([L, ...o]), ut(h), L, ")"], { shouldBreak: o.some(at) || r });
    }
    function To(t) {
      return t.kind === "array" && t.items.length !== 0;
    }
    function Rt(t) {
      return t.right.kind === "array" && t.right.items.length !== 0;
    }
    function xo(t, e, s, i, n) {
      let r = [];
      const { node: a } = t;
      if (a.kind === "bin") {
        ae(a.type, a.left.type) ? r = r.concat(t.call(() => xo(t, e, s, true, n), "left")) : r.push(e("left"));
        const o = Rt(a) ? [a.type, " ", e("right")] : [a.type, I, e("right")], { parent: c } = t, l = !(n && ["||", "&&"].includes(a.type)) && ft(c) !== ft(a) && ft(a.left) !== ft(a) && ft(a.right) !== ft(a), h = le(a.left) || a.left.kind === "bin" && le(a.left.right);
        r.push(h ? "" : " ", l ? x(o) : o), i && a.comments && (r = Ae(t, () => r, s));
      } else r.push(e());
      return r;
    }
    function Eo(t, e, s) {
      const { node: i } = t;
      switch (i.kind) {
        case "propertylookup":
          return Ne(t, e, s);
        case "nullsafepropertylookup":
          return _o(t, e, s);
        case "staticlookup":
          return po(t, 0, s);
        case "offsetlookup":
          return fo(t, 0, s);
        default:
          throw new Error(`Have not implemented lookup kind ${i.kind} yet.`);
      }
    }
    function mo(t) {
      let { opening: e = true } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (t.type === "heredoc") return e ? `<<<${t.label}` : t.label;
      const s = { string: '"', shell: "`" };
      if (s[t.type]) return s[t.type];
      throw new Error(`Unimplemented encapsed type ${t.type}`);
    }
    function Pl(t, e, s) {
      const i = [];
      let n = [];
      return t.each((r) => {
        let { node: a } = r;
        i.push(n), i.push(x(s())), n = [",", I], a && _t(e.originalText, S(a)) && n.push(L);
      }, "items"), i;
    }
    function vt(t, e, s) {
      let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "children";
      const { node: n, parent: r } = t;
      let a = -1;
      const o = [], c = [];
      t.map(() => {
        const { node: h, next: u, isFirst: p, isLast: d, index: _ } = t, k = h.kind === "inline", T = s(), y = !d && !k && (u && u.kind === "case" ? !bt(t) : u && u.kind !== "inline");
        let E = [T, y ? f : "", y && _t(e.originalText, S(h)) ? f : ""];
        const N = n.kind === "block" && r && ["function", "closure", "method", "try", "catch"].includes(r.kind);
        let g = N && p ? "" : " ";
        if (k || !k && d && a >= 0) {
          const Q = a;
          if (k && (a = _), k && !p || !k && d) {
            const X = (k ? Q : a) + 1, Y = d && !k ? _ + 1 : _, tt = t.siblings[k ? Q : a], xt = tt ? function(Et) {
              const Ut = Et.split(`
`).pop();
              return Ut.length - Ut.trimLeft().length + 1;
            }(tt.raw) : "", wt = Y - X > 1, Zt = wt ? N && !tt || ce(n) && X === 0 ? "" : f : "", Dt = wt && h.kind !== "halt" ? N && d ? "" : f : "";
            wt && (g = ""), c.push({ start: X, end: Y, alignment: xt, before: Zt, after: Dt });
          }
        }
        if (k) {
          const Q = u && u.kind === "echo" && u.shortForm ? "<?=" : "<?php", X = h.leadingComments && h.leadingComments.length ? [p && n.kind !== "namespace" && !N ? "<?php" : "", n.kind !== "namespace" && N ? "" : f, ct(h.leadingComments, e), f, "?>"] : ce(n) && p && n.kind !== "namespace" ? "" : [g, "?>"], Y = t.getNode(_ + 1), tt = Y && Y.children && Y.children.length;
          E = [X, E, h.comments && h.comments.length ? [Q, f, tt ? ct(h.comments, e) : "", f] : ce(n) && d ? "" : [Q, " "]];
        }
        o.push(E);
      }, i);
      const l = function(h, u) {
        if (u.length === 0) return h;
        let p = 0;
        return u.reduce((d, _) => {
          const { start: k, end: T, alignment: y, before: E, after: N } = _, g = [E || "", ...h.slice(k, T), N || ""], Q = d.concat(h.slice(p, k), y ? Rl(x(Ol(new Array(y).join(" "), g))) : x(g), T === h.length - 1 ? h.slice(T) : "");
          return p = T, Q;
        }, []);
      }(o, c);
      if (n.kind === "program" && !n.extra.parseAsEval) {
        const h = [], [u] = n.children;
        if (!u || u.kind !== "inline") {
          const p = e.originalText.trim().match(/^<\?(php|=)(\s+)?\S/), d = [p && p[2] && p[2].includes(`
`) ? [f, p[2].split(`
`).length > 2 ? f : ""] : " ", n.comments ? ct(n.comments, e) : ""], _ = u && u.kind === "echo" && u.shortForm;
          h.push([_ ? "<?=" : "<?php", d]);
        }
        if (h.push(l), /\?>\n?$/.test(e.originalText)) {
          const p = j(n.children), d = p ? [uo(e.originalText.trimEnd(), S(p), S(n)) ? p.kind === "inline" && p.comments && p.comments.length ? "" : f : " ", _t(e.originalText, S(p)) ? f : ""] : n.comments ? f : "";
          h.push(Cl([d, "?>"]));
        }
        return h;
      }
      return l;
    }
    function yo(t, e, s, i) {
      return t.map((n) => {
        let { node: r, isLast: a } = n;
        const o = [];
        return o.push(s()), a || (o.push(f), _t(e.originalText, S(r)) && o.push(f)), o;
      }, i);
    }
    function $(t, e, s) {
      let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "extends", n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : " ", r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : " ";
      const a = t.node[i], o = W(a) ? [f, t.call(() => R(t, e, true), i), f] : n, c = Array.isArray(a) ? x(w(",", t.map((l) => {
        let { node: h } = l;
        const u = s();
        return W(h) ? [f, R(t, e, true), f, u] : [r, u];
      }, i))) : [r, s(i)];
      return m([o, i, at(o) ? m(c) : c]);
    }
    function lt(t, e, s) {
      let { inline: i = false } = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const n = [];
      return t.node.attrGroups ? (t.each(() => {
        const r = ["#["];
        !i && n.length > 0 && n.push(f), r.push(L), t.each(() => {
          const a = t.node;
          r.length > 2 && r.push(",", I);
          const o = [a.name];
          a.args.length > 0 && o.push(Z(t, e, s, "args")), r.push(x(o));
        }, "attrs"), n.push(x([m(r), ut(Ot(e, 8) ? "," : ""), L, "]", i ? ut(L, " ") : ""]));
      }, "attrGroups"), n.length === 0 ? [] : [...n, i ? "" : f]) : [];
    }
    function rt(t, e, s) {
      let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "body";
      const { node: n } = t;
      if (!n[i]) return ";";
      const r = s(i);
      return [n.shortForm ? ":" : " {", m(n[i].kind !== "block" || n[i].children && n[i].children.length > 0 || n[i].comments && n[i].comments.length > 0 ? [kl(t) ? n.kind === "switch" ? " " : "" : f, r] : ""), n.kind === "if" && i === "body" ? "" : [Tl(t) ? f : "", n.shortForm ? ["end", n.kind, ";"] : "}"]];
    }
    function Xt(t, e, s, i, n, r, a) {
      if (!i) return e;
      const o = qt(t, i, n, r, a);
      return x([e, s, o]);
    }
    function Ao(t) {
      return !!M(t) && (!(t.what.kind !== "variable" && !ue(t.what)) || Ao(t.what));
    }
    function qt(t, e, s, i, n) {
      const r = i ? "&" : "";
      if (function(o, c) {
        return c.comments && c.comments.some((l) => l.leading && zt(o, S(l)));
      }(n.originalText, e)) return m([f, r, s]);
      const a = e.kind === "cast" ? e.expr : e;
      return a.kind === "bin" && !Rt(a) || a.kind === "retif" && (!a.trueExpr && !To(a.falseExpr) || a.test.kind === "bin" && !Rt(a.test)) || (t.kind === "variable" || t.kind === "string" || M(t)) && (a.kind === "string" && !go(a) || Ao(a)) ? x(m([I, r, s])) : [" ", r, s];
    }
    function go(t) {
      return t.raw.includes(`
`);
    }
    function Jt(t, e) {
      return (t.kind === "string" || t.kind === "encapsed" && (t.type === "string" || t.type === "shell")) && go(t) && !wl(e, G(t), { backwards: true });
    }
    function No(t, e, s) {
      return x(t.map((i) => {
        let { isFirst: n } = i;
        return n ? [e()] : [s, e()];
      }, "types"));
    }
    const Fl = /* @__PURE__ */ new Set(["loc", "range", "raw", "comments", "leadingComments", "trailingComments", "parenthesizedExpression", "parent", "prev", "start", "end", "tokens", "errors", "extra"]);
    function Lo(t, e) {
      if (t.kind === "string" && delete e.isDoubleQuote, ["array", "list"].includes(t.kind) && delete e.shortForm, t.kind === "inline") {
        if (t.value.includes("___PSEUDO_INLINE_PLACEHOLDER___")) return null;
        e.value = e.value.replace(/\n/g, "");
      }
      if ((t.kind === "continue" || t.kind === "break") && t.level) {
        const { level: s } = e;
        s.kind === "number" && (e.level = s.value === "1" ? null : s);
      }
      if (t.kind === "block" && t.children.length === 1 && t.children[0].kind === "block") for (; e.children[0].kind === "block"; ) e.children = e.children[0].children;
      if (t.kind === "number" && (e.value = Wr(t.value)), ["foreach", "for", "if", "while", "do"].includes(t.kind) && (t.body && t.body.kind !== "block" ? e.body = { kind: "block", children: [e.body] } : e.body = e.body ? e.body : null, t.alternate && t.alternate.kind !== "block" ? e.alternate = { kind: "block", children: [e.alternate] } : e.alternate = e.alternate ? e.alternate : null), t.kind === "usegroup" && typeof t.name == "string" && (e.name = e.name.replace(/^\\/, "")), t.kind === "useitem" && (e.name = e.name.replace(/^\\/, "")), t.kind === "method" && t.name.kind === "identifier" && (e.name.name = Xr(e.name.name)), t.kind === "noop") return null;
    }
    Lo.ignoredProperties = Fl;
    const bo = /@prettier|@format/, Io = /* @__PURE__ */ function(t) {
      const e = /* @__PURE__ */ new Map();
      return (s) => (e.has(s) || e.set(s, t(s)), e.get(s));
    }((t) => {
      const e = Qr(t), [s] = e.children, [i] = e.comments.filter((n) => n.kind === "commentblock");
      if (s && i && i.loc.start.line < s.loc.start.line) return i;
    }), { join: Ml, hardline: Bl } = B.doc.builders;
    function Co(t, e) {
      let { extend: s, override: i } = e;
      const n = {};
      for (const r in t) n[r === "languageId" ? "linguistLanguageId" : r] = t[r];
      if (s) for (const r in s) n[r] = (n[r] || []).concat(s[r]);
      for (const r in i) n[r] = i[r];
      return n;
    }
    const Hl = [Co({ name: "PHP", type: "programming", color: "#4F5D95", extensions: [".php", ".aw", ".ctp", ".fcgi", ".inc", ".php3", ".php4", ".php5", ".phps", ".phpt"], tmScope: "text.html.php", aceMode: "php", languageId: 272, aliases: ["inc"], codemirrorMode: "php", codemirrorMimeType: "application/x-httpd-php", interpreters: ["php"], filenames: [".php", ".php_cs", ".php_cs.dist", "Phakefile"] }, { override: { parsers: ["php"], vscodeLanguageIds: ["php"] } }), Co({ name: "HTML+PHP", type: "markup", color: "#4f5d95", extensions: [".phtml"], tmScope: "text.html.php", aceMode: "php", languageId: 151, codemirrorMode: "php", codemirrorMimeType: "application/x-httpd-php", group: "HTML" }, { override: { parsers: ["php"], vscodeLanguageIds: ["php"] } })], Gl = { php: { parse: Qr, astFormat: "php", locStart: G, locEnd: S, hasPragma: function(t) {
      if (!bo.test(t)) return false;
      const e = Io(t);
      if (e) {
        const { value: s } = e;
        return bo.test(s);
      }
      return false;
    } } }, Vl = /* @__PURE__ */ new Set(["kind", "loc", "errors", "extra", "comments", "leadingComments", "enclosingNode", "precedingNode", "followingNode"]), Ql = { php: { print: function(t, e, s) {
      const { node: i } = t;
      if (typeof i == "string") return i;
      const n = function(o, c, l) {
        var _a2;
        const { node: h } = o;
        switch (h.kind) {
          case "program":
            return x([vt(o, c, l), R(o, c, true, (u) => !u.printed)]);
          case "expressionstatement":
            return l("expression");
          case "block":
            return [vt(o, c, l), R(o, c, true)];
          case "declare": {
            const u = (p) => w(", ", p.map(l, "directives"));
            return ["block", "short"].includes(h.mode) ? ["declare(", u(o), ")", h.mode === "block" ? " {" : ":", h.children.length > 0 ? m([f, vt(o, c, l)]) : "", R(o, c), f, h.mode === "block" ? "}" : "enddeclare;"] : ["declare(", u(o), ")", ((_a2 = o.next) == null ? void 0 : _a2.kind) === "inline" ? "" : ";"];
          }
          case "declaredirective":
            return [l("key"), "=", l("value")];
          case "namespace":
            return ["namespace ", h.name && typeof h.name == "string" ? [h.name, h.withBrackets ? " " : ""] : "", h.withBrackets ? "{" : ";", W(h) ? [" ", R(o, c, true)] : "", h.children.length > 0 ? h.withBrackets ? m([f, vt(o, c, l)]) : [h.children[0].kind === "inline" ? "" : [f, xl(c.originalText, h) ? f : ""], vt(o, c, l)] : "", h.withBrackets ? [f, "}"] : ""];
          case "usegroup":
            return x(["use ", h.type ? [h.type, " "] : "", m([h.name ? [jr(h.name), "\\{", L] : "", w([",", I], o.map(l, "items"))]), h.name ? [ut(Ot(c, 7.2) ? "," : ""), L, "}"] : ""]);
          case "useitem":
            return [h.type ? [h.type, " "] : "", jr(h.name), W(h) ? [" ", R(o, c, true)] : "", h.alias ? [" as ", l("alias")] : ""];
          case "class":
          case "enum":
          case "interface":
          case "trait":
            return function(u, p, d) {
              const { node: _ } = u, k = _.kind === "class" && _.isAnonymous, T = lt(u, p, d, { inline: k }), y = k ? [] : [...T];
              _.isFinal && y.push("final "), _.isAbstract && y.push("abstract "), _.isReadonly && y.push("readonly "), y.push(k ? "" : _.kind), _.name && y.push(" ", d("name")), _.kind === "enum" && _.valueType && y.push(": ", d("valueType")), _.extends && _.implements ? y.push(kt([[$(u, p, d, "extends"), $(u, p, d, "implements")], [$(u, p, d, "extends"), $(u, p, d, "implements", " ", f)], [$(u, p, d, "extends", f, " "), $(u, p, d, "implements", f, _.implements.length > 1 ? f : " ")]], { shouldBreak: W(_.extends) })) : (_.extends && y.push(kt([$(u, p, d, "extends"), $(u, p, d, "extends", " ", f), $(u, p, d, "extends", f, _.extends.length > 1 ? f : " ")])), _.implements && y.push(kt([$(u, p, d, "implements"), $(u, p, d, "implements", " ", f), $(u, p, d, "implements", f, _.implements.length > 1 ? f : " ")])));
              const E = _.body && _.body.length === 0 && !W(_), N = x([x(y), ge(p) && !E ? k ? I : f : " "]), g = ["{", m([E ? "" : f, yo(u, p, d, "body")]), R(u, p, true), E ? "" : f, "}"];
              return [N, g];
            }(o, c, l);
          case "traitprecedence":
            return [l("trait"), "::", l("method"), " insteadof ", w(", ", o.map(l, "instead"))];
          case "traitalias":
            return [h.trait ? [l("trait"), "::"] : "", h.method ? l("method") : "", " as ", w(" ", [...h.visibility ? [h.visibility] : [], ...h.as ? [l("as")] : []])];
          case "traituse":
            return x(["use ", m(x(w([",", I], o.map(l, "traits")))), h.adaptations ? [" {", h.adaptations.length > 0 ? [m([f, yo(o, c, l, "adaptations")]), f] : W(h) ? [I, R(o, c, true), I] : "", "}"] : ""]);
          case "function":
          case "closure":
          case "method":
            return function(u, p, d) {
              const { node: _ } = u, k = lt(u, p, d, { inline: _.kind === "closure" }), T = [];
              _.isFinal && T.push("final "), _.isAbstract && T.push("abstract "), _.visibility && T.push(_.visibility, " "), _.isStatic && T.push("static "), T.push("function "), _.byref && T.push("&"), _.name && T.push(d("name")), T.push(Z(u, p, d)), _.uses && _.uses.length > 0 && T.push(x([" use ", Z(u, p, d, "uses")])), _.type && T.push([": ", W(_.type) ? [u.call(() => R(u, p, true), "type"), " "] : "", _.nullable ? "?" : "", d("type")]);
              const y = T;
              if (!_.body) return [...k, y];
              const E = ["{", m([$t(u) ? "" : f, d("body")]), $t(u) ? "" : f, "}"];
              return _.kind === "closure" ? [...k, y, " ", E] : _.arguments.length === 0 ? [...k, y, ge(p) && !$t(u) ? f : " ", E] : T.some(at) ? [...k, y, " ", E] : [...k, kt([[y, ge(p) && !$t(u) ? f : " ", E], [y, " ", E]])];
            }(o, c, l);
          case "arrowfunc":
            return [h.parenthesizedExpression ? "(" : "", ...lt(o, c, l, { inline: true }), h.isStatic ? "static " : "", "fn", Z(o, c, l), h.type ? [": ", h.nullable ? "?" : "", l("type")] : "", " => ", l("body"), h.parenthesizedExpression ? ")" : ""];
          case "parameter": {
            let u = "";
            h.flags === 1 ? u = "public " : h.flags === 2 ? u = "protected " : h.flags === 4 && (u = "private ");
            const p = [...lt(o, c, l, { inline: true }), u, h.readonly ? "readonly " : "", h.nullable ? "?" : "", h.type ? [l("type"), " "] : "", h.byref ? "&" : "", h.variadic ? "..." : "", "$", l("name")];
            return h.value ? x([p, W(h) ? " " : "", R(o, c, true), " =", qt(h.name, h.value, l("value"), false, c)]) : p;
          }
          case "variadic":
            return ["...", l("what")];
          case "property":
            return x([h.readonly ? "readonly " : "", h.type ? [h.nullable ? "?" : "", l("type"), " "] : "", "$", l("name"), h.value ? [" =", qt(h.name, h.value, l("value"), false, c)] : ""]);
          case "propertystatement": {
            const u = [];
            o.each(() => {
              u.push(...lt(o, c, l));
            }, "properties");
            const p = o.map(l, "properties"), d = h.properties.some((T) => T.value);
            let _;
            p.length !== 1 || h.properties[0].comments ? p.length > 0 && (_ = m(p[0])) : [_] = p;
            const k = h.visibility || h.visibility === null;
            return x([...u, k ? [h.visibility === null ? "var" : h.visibility, ""] : "", h.isStatic ? [k ? " " : "", "static"] : "", _ ? [" ", _] : "", m(p.slice(1).map((T) => [",", d ? f : I, T]))]);
          }
          case "if": {
            const u = [], p = rt(o, c, l, "body"), d = x(["if (", x([m([L, l("test")]), L]), ")", p]);
            if (u.push(d, bt(o) || !h.body ? "" : f), h.alternate) {
              u.push(h.shortForm ? "" : "} ");
              const _ = St(h.body) && h.body.comments.some((T) => T.trailing && !ye(T)) || function(T) {
                if (!T.comments) return false;
                const y = j(T.comments.filter((E) => !E.leading && !E.trailing));
                return y && !ye(y);
              }(h), k = !_;
              u.push(k ? "" : f), W(h) && u.push(_t(c.originalText, S(h.body)) ? f : "", R(o, c, true), _ ? f : " "), u.push("else", x(h.alternate.kind === "if" ? l("alternate") : rt(o, c, l, "alternate")));
            } else u.push(h.body ? h.shortForm ? "endif;" : "}" : "");
            return u;
          }
          case "do":
            return ["do", rt(o, c, l, "body"), " while (", x([m([L, l("test")]), L]), ")"];
          case "while":
          case "switch":
            return x([h.kind, " (", x([m([L, l("test")]), L]), ")", rt(o, c, l, "body")]);
          case "for": {
            const u = rt(o, c, l, "body"), p = R(o, c, true), d = p ? [p, L] : "";
            return h.init.length || h.test.length || h.increment.length ? [d, x(["for (", x([m([L, x(w([",", I], o.map(l, "init"))), ";", I, x(w([",", I], o.map(l, "test"))), ";", I, x(w([",", I], o.map(l, "increment")))]), L]), ")", u])] : [d, x(["for (;;)", u])];
          }
          case "foreach": {
            const u = rt(o, c, l, "body"), p = R(o, c, true);
            return [p ? [p, L] : "", x(["foreach (", x([m([L, l("source"), I, "as ", x(h.key ? m(w([" =>", I], [l("key"), l("value")])) : l("value"))]), L]), ")", u])];
          }
          case "try": {
            const u = [];
            return u.push("try", rt(o, c, l, "body")), h.catches && u.push(o.map(l, "catches")), h.always && u.push(" finally", rt(o, c, l, "always")), u;
          }
          case "catch":
            return [" catch", h.what ? [" (", w(" | ", o.map(l, "what")), h.variable ? [" ", l("variable")] : "", ")"] : "", rt(o, c, l, "body")];
          case "case":
            return [h.test ? ["case ", h.test.comments ? m(l("test")) : l("test"), ":"] : "default:", h.body && h.body.children && h.body.children.length ? m([bt(o) ? "" : f, l("body")]) : ""];
          case "break":
          case "continue":
            return h.level && h.level.kind === "number" && h.level.value !== "1" ? [`${h.kind} `, l("level")] : h.kind;
          case "call":
            return h.arguments.length === 1 && Jt(h.arguments[0], c.originalText) ? [l("what"), "(", w(", ", o.map(l, "arguments")), ")"] : M(h.what) ? function(u, p, d) {
              const _ = [];
              function k(A) {
                const { originalText: O } = p, D = Dl(O, S(A));
                return O.charAt(D) === ")" ? vl(O, D + 1, p) : _t(O, S(A));
              }
              function T(A) {
                const { node: O } = A;
                if (O.kind !== "call" || !M(O.what) && O.what.kind !== "call") if (M(O)) {
                  let D = null;
                  D = O.kind === "propertylookup" ? Ne(A, p, d) : O.kind === "nullsafepropertylookup" ? _o(A, p, d) : O.kind === "staticlookup" ? po(A, p, d) : fo(A, p, d), _.unshift({ node: O, needsParens: lo(A, p), printed: Ae(A, () => D, p) }), A.call((Pt) => T(Pt), "what");
                } else _.unshift({ node: O, printed: d() });
                else _.unshift({ node: O, printed: [Ae(A, () => Z(A, p, d), p), k(O) ? f : ""] }), A.call((D) => T(D), "what");
              }
              const { node: y } = u;
              _.unshift({ node: y, printed: Z(u, p, d) }), u.call((A) => T(A), "what");
              for (let A = 0; A < _.length; ++A) _[A].node.kind === "call" && _[A - 1] && ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(_[A - 1].node.kind) && _[A - 1].needsParens && (_[0].printed = ["(", _[0].printed], _[A - 1].printed = [_[A - 1].printed, ")"]);
              const E = [];
              let N = [_[0]], g = 1;
              for (; g < _.length && (_[g].node.kind === "call" || M(_[g].node) && _[g].node.offset && _[g].node.offset.kind === "number"); ++g) N.push(_[g]);
              if (_[0].node.kind !== "call") for (; g + 1 < _.length && M(_[g].node) && M(_[g + 1].node); ++g) N.push(_[g]);
              E.push(N), N = [];
              let Q = false;
              for (; g < _.length; ++g) {
                if (Q && M(_[g].node)) {
                  if (_[g].node.kind === "offsetlookup" && _[g].node.offset && _[g].node.offset.kind === "number") {
                    N.push(_[g]);
                    continue;
                  }
                  E.push(N), N = [], Q = false;
                }
                _[g].node.kind === "call" && (Q = true), N.push(_[g]), _[g].node.comments && St(_[g].node) && (E.push(N), N = [], Q = false);
              }
              N.length > 0 && E.push(N);
              function X(A) {
                const O = A[1].length && A[1][0].node.kind === "offsetlookup";
                if (A[0].length === 1) {
                  const mt = A[0][0].node;
                  return mt.kind === "variable" && (mt.name === "this" || Y && D(mt.name)) || ue(mt);
                }
                function D(mt) {
                  return mt.length < p.tabWidth;
                }
                const Pt = j(A[0]).node;
                return M(Pt) && (Pt.offset.kind === "identifier" || Pt.offset.kind === "variable") && O;
              }
              const Y = u.parent.kind === "expressionstatement", tt = E.length >= 2 && !E[1][0].node.comments && X(E);
              function xt(A) {
                const O = [];
                for (let D = 0; D < A.length; D++) A[D + 1] && A[D + 1].needsParens ? (O.push("(", A[D].printed, A[D + 1].printed, ")"), D++) : O.push(A[D].printed);
                return O;
              }
              function wt(A) {
                return A.length === 0 ? "" : m(x([f, w(f, A.map(xt))]));
              }
              const Zt = E.map(xt), Dt = Zt, Et = tt ? 3 : 2, Ut = E.slice(0, Et).flat(), So = Ut.slice(1, -1).some((A) => Ct(A.node)) || Ut.slice(0, -1).some((A) => St(A.node)) || E[Et] && Ct(E[Et][0].node), Yl = _e(u, "encapsed");
              if (E.length <= Et && !So || Yl) return x(Dt);
              const Oo = j(tt ? E.slice(1, 2)[0] : E[0]).node, Ro = Oo.kind !== "call" && k(Oo), vo = [xt(E[0]), tt ? E.slice(1, 2).map(xt) : "", Ro ? f : "", wt(E.slice(tt ? 2 : 1))], wo = _.filter((A) => A.node.kind === "call");
              return So || wo.length > 2 && wo.some((A) => !A.node.arguments.every((O) => Zr(O))) || Zt.slice(0, -1).some(at) ? x(vo) : [at(Dt) || Ro ? co : "", kt([Dt, vo])];
            }(o, c, l) : [l("what"), Z(o, c, l)];
          case "new": {
            const u = h.what && h.what.kind === "class" && h.what.isAnonymous;
            if (!u && h.arguments.length === 1 && Jt(h.arguments[0], c.originalText)) return ["new ", ...o.call(lt, "what"), l("what"), "(", w(", ", o.map(l, "arguments")), ")"];
            const p = [];
            if (p.push("new "), u) p.push(h.what.leadingComments && h.what.leadingComments[0].kind === "commentblock" ? [ct(h.what.leadingComments, c), " "] : "", ...o.call(() => lt(o, c, l, { inline: true }), "what"), "class", h.arguments.length > 0 ? [" ", Z(o, c, l)] : "", x(l("what")));
            else {
              const d = ["call", "offsetlookup"].includes(h.what.kind), _ = [d ? "(" : "", l("what"), d ? ")" : "", Z(o, c, l)];
              p.push(Ct(h.what) ? m(_) : _);
            }
            return p;
          }
          case "clone":
            return ["clone ", h.what.comments ? m(l("what")) : l("what")];
          case "propertylookup":
          case "nullsafepropertylookup":
          case "staticlookup":
          case "offsetlookup": {
            const { parent: u } = o;
            let p, d = 0;
            do
              p = o.getParentNode(d), d++;
            while (p && M(p));
            const _ = _e(o, "encapsed") || p && (p.kind === "new" || p.kind === "assign" && p.left.kind !== "variable") || h.kind === "offsetlookup" || (ue(h.what) || h.what.kind === "variable") && ["identifier", "variable", "encapsedpart"].includes(h.offset.kind) && u && !M(u);
            return [l("what"), _ ? Eo(o, c, l) : x(m([L, Eo(o, c, l)]))];
          }
          case "exit":
            return x([h.useDie ? "die" : "exit", "(", h.expression ? Jt(h.expression, c.originalText) ? l("expression") : [m([L, l("expression")]), L] : R(o, c), ")"]);
          case "global":
            return x(["global ", m(w([",", I], o.map(l, "items")))]);
          case "include":
            return [h.require ? "require" : "include", h.once ? "_once" : "", " ", h.target.comments ? m(l("target")) : l("target")];
          case "label":
            return [l("name"), ":"];
          case "goto":
            return ["goto ", l("label")];
          case "throw":
            return ["throw ", h.what.comments ? m(l("what")) : l("what")];
          case "silent":
            return ["@", l("expr")];
          case "halt":
            return [W(h) ? [R(o, c, true), f] : "", "__halt_compiler();", h.after];
          case "eval":
            return x(["eval(", Jt(h.source, c.originalText) ? l("source") : [m([L, l("source")]), L], ")"]);
          case "echo": {
            const u = o.map(l, "expressions");
            let p;
            return u.length !== 1 || h.expressions[0].comments ? u.length > 0 && (p = le(h.expressions[0]) || h.expressions[0].comments ? m(u[0]) : Sl(u[0])) : [p] = u, x([h.shortForm ? "" : "echo ", p || "", m(u.slice(1).map((d) => [",", I, d]))]);
          }
          case "print":
            return ["print ", h.expression.comments ? m(l("expression")) : l("expression")];
          case "return": {
            const u = [];
            if (u.push("return"), h.expr) {
              const p = l("expr");
              u.push(" ", h.expr.comments ? m(p) : p);
            }
            return W(h) && u.push(" ", R(o, c, true)), u;
          }
          case "isset":
          case "unset":
            return x([h.kind, Z(o, c, l, "variables")]);
          case "empty":
            return x(["empty(", m([L, l("expression")]), L, ")"]);
          case "variable": {
            const { parent: u, grandparent: p } = o, d = u.kind === "assign" ? "" : h.byref ? "&" : "", _ = u.kind === "encapsedpart" && u.syntax === "simple" && u.curly || p && u.kind === "offsetlookup" && p.kind === "encapsedpart" && p.syntax === "simple" && p.curly ? "" : "$", k = h.curly ? "{" : "", T = h.curly ? "}" : "";
            return [d, _, k, l("name"), T];
          }
          case "constantstatement":
          case "classconstant": {
            const u = lt(o, c, l), p = o.map(l, "constants");
            let d;
            return p.length !== 1 || h.constants[0].comments ? p.length > 0 && (d = m(p[0])) : [d] = p, x([...u, h.final ? "final " : "", h.visibility ? [h.visibility, " "] : "", "const", h.type ? [h.nullable ? " ?" : " ", l("type")] : "", d ? [" ", d] : "", m(p.slice(1).map((_) => [",", f, _]))]);
          }
          case "constant":
            return Xt(h.name, l("name"), " =", h.value, l("value"), false, c);
          case "static": {
            const u = o.map(l, "variables"), p = h.variables.some((_) => _.defaultValue);
            let d;
            return u.length !== 1 || h.variables[0].comments ? u.length > 0 && (d = m(u[0])) : [d] = u, x(["static", d ? [" ", d] : "", m(u.slice(1).map((_) => [",", p ? f : I, _]))]);
          }
          case "staticvariable":
            return Xt(h.variable, l("variable"), " =", h.defaultValue, l("defaultValue"), false, c);
          case "list":
          case "array": {
            const u = h.kind === "array" && c.phpVersion >= 5.4 || h.kind === "list" && (h.shortForm || c.phpVersion >= 7.1), p = u ? "[" : [h.kind, "("], d = u ? "]" : ")";
            if (h.items.length === 0) return W(h) ? x([p, R(o, c), L, d]) : [p, d];
            const _ = j(h.items), k = _ && _.kind === "noop", [T] = h.items.filter((E) => E.kind !== "noop").sort((E, N) => G(E) - G(N)), y = !(!T || !T.key) && T && uo(c.originalText, G(h), G(T));
            return x([p, m([L, Pl(o, c, l)]), k ? "," : "", ut(!k && Ot(c, 5) ? [_ && zr(_) ? f : "", ","] : ""), R(o, c, true), L, d], { shouldBreak: y });
          }
          case "entry": {
            const u = h.byRef ? "&" : "", p = h.unpack ? "..." : "";
            return h.key ? Xt(h.key, l("key"), " =>", h.value, l("value"), u, c) : [u, p, l("value")];
          }
          case "yield": {
            const u = [h.key ? [l("key"), " => "] : "", l("value")];
            return ["yield", h.key || h.value ? " " : "", h.value && h.value.comments ? m(u) : u];
          }
          case "yieldfrom":
            return ["yield from ", h.value.comments ? m(l("value")) : l("value")];
          case "unary":
            return [h.type, l("what")];
          case "pre":
            return [h.type + h.type, l("what")];
          case "post":
            return [l("what"), h.type + h.type];
          case "cast":
            return ["(", h.type, ") ", h.expr.comments ? m(l("expr")) : l("expr")];
          case "assignref":
          case "assign": {
            const u = h.kind === "assignref";
            return Xt(h.left, l("left"), [" ", u ? "=" : h.operator], h.right, l("right"), u, c);
          }
          case "bin": {
            const { parent: u, grandparent: p } = o, d = h !== u.body && (u.kind === "if" || u.kind === "while" || u.kind === "switch" || u.kind === "do"), _ = xo(o, l, c, false, d);
            if (d) return _;
            if (u.kind === "unary" || M(u) && u.kind !== "offsetlookup") return x([m([L, ..._]), L]);
            const k = h !== u.body && u.kind === "for" || u.kind === "retif" && p && p.kind !== "return", T = ["assign", "property", "constant", "staticvariable", "entry"].includes(u.kind), y = h.left.kind === "bin" && ae(h.type, h.left.type);
            if (k || Rt(h) && !y || !Rt(h) && T) return x(_);
            const E = _.slice(1);
            return x([_.length > 0 ? _[0] : "", m(E)]);
          }
          case "retif": {
            const u = [], { parent: p } = o;
            let d, _ = 0;
            do
              d = o.getParentNode(_), _++;
            while (d && d.kind === "retif");
            const k = d || p, T = h.falseExpr.kind === "bin" ? m(l("falseExpr")) : l("falseExpr"), y = [h.trueExpr ? I : " ", "?", h.trueExpr ? [" ", h.trueExpr.kind === "bin" ? m(l("trueExpr")) : l("trueExpr"), I] : "", ":", h.trueExpr ? [" ", T] : [To(h.falseExpr) ? " " : I, T]];
            u.push(y);
            const E = (Y) => p === k ? x(Y) : Y, N = o.grandparent, g = p.kind === "cast" && N ? N : p, Q = ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(g.kind), X = l("test");
            if (!h.trueExpr) {
              const Y = [X, g.kind === "bin" || ["print", "echo", "return", "include"].includes(k.kind) ? m(u) : u];
              return g.kind === "call" && g.what === h || g.kind === "unary" || M(g) && g.kind !== "offsetlookup" ? x([m([L, Y]), L]) : E(Y);
            }
            return E([h.test.kind === "retif" ? m(X) : X, m(u), Q ? L : ""]);
          }
          case "boolean":
            return h.value ? "true" : "false";
          case "number":
            return Wr(h.value);
          case "string": {
            const { parent: u } = o;
            if (u.kind === "encapsedpart") {
              const _ = o.grandparent;
              let k = 0;
              const T = c.phpVersion >= 7.3;
              let y = Tt;
              if (_.type === "heredoc") {
                y = T ? f : Tt;
                const E = _.raw.split(`
`);
                k = E[E.length - 1].search(/\S/), k === -1 && (k = E[E.length - 2].search(/\S/));
              }
              return w(y, h.raw.split(`
`).map((E, N) => N > 0 || h.loc.start.column === 0 ? E.substring(k) : E));
            }
            const p = function(_, k) {
              if (_.isDoubleQuote === k.singleQuote) {
                const T = _.raw.slice(_.raw[0] === "b" ? 2 : 1, -1).match(/\\([$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})|\r?\n|'|"|\$/);
                return _.isDoubleQuote ? T : !T;
              }
              return _.isDoubleQuote;
            }(h, c) ? '"' : "'";
            let d = h.raw;
            return h.raw[0] === "b" && (d = d.slice(1)), ['"', "'"].includes(d[0]) && (d = d.substr(1)), ['"', "'"].includes(d[d.length - 1]) && (d = d.substr(0, d.length - 1)), [h.raw[0] === "b" ? "b" : "", p, w(Tt, d.split(`
`)), p];
          }
          case "intersectiontype":
            return No(o, l, "&");
          case "uniontype":
            return No(o, l, "|");
          case "encapsedpart": {
            const u = h.syntax === "simple" && h.curly || h.syntax === "complex" ? [h.curly ? "$" : "", "{"] : "", p = h.syntax === "simple" && h.curly || h.syntax === "complex" ? "}" : "";
            return [u, l("expression"), p];
          }
          case "encapsed":
            switch (h.type) {
              case "string":
              case "shell":
              case "heredoc": {
                const u = c.phpVersion >= 7.3 ? f : Tt;
                return [mo(h), h.type === "heredoc" ? u : "", ...o.map(l, "value"), mo(h, { opening: false }), h.type === "heredoc" && Wt(o) ? f : ""];
              }
              default:
                throw new Error(`Have not implemented kind ${h.type} yet.`);
            }
          case "inline":
            return w(Tt, h.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split(`
`));
          case "magic":
            return h.value;
          case "nowdoc": {
            const u = c.phpVersion >= 7.3 ? f : Tt;
            return ["<<<'", h.label, "'", u, w(u, h.value.split(`
`)), u, h.label, Wt(o) ? f : ""];
          }
          case "name":
            return [h.resolution === "rn" ? "namespace\\" : "", h.name];
          case "literal":
            return l("value");
          case "parentreference":
            return "parent";
          case "selfreference":
            return "self";
          case "staticreference":
            return "static";
          case "typereference":
            return h.name;
          case "nullkeyword":
            return "null";
          case "identifier": {
            const { parent: u } = o;
            return u.kind === "method" && (h.name = Xr(h.name)), l("name");
          }
          case "match": {
            const u = o.map(() => {
              const p = o.node, d = Ct(p) ? [ct(p.leadingComments, c), f] : [], _ = !o.isLast || c.trailingCommaPHP ? "," : "", k = St(p) ? [" ", ct(p.comments.filter((N) => N.trailing), c)] : [], T = p.conds === null ? "default" : o.map((N) => {
                let { isFirst: g } = N;
                return [",", I, l()].slice(g ? 2 : 0);
              }, "conds"), y = l("body"), E = !o.isFirst && Ul(c.originalText, G(p)) ? f : "";
              return ["", f, E, ...d, x([x([T, m(I)]), "=> ", y, _, ...k])].slice(o.isFirst ? 1 : 0);
            }, "arms");
            return x(["match (", x([m([L, l("cond")]), L]), ") {", x(m([...u])), " ", L, "}"]);
          }
          case "noop":
            return h.comments ? ct(h.comments, c) : "";
          case "namedargument":
            return [h.name, ": ", l("value")];
          case "enumcase":
            return x(["case ", l("name"), h.value ? [" =", qt(h.name, h.value, l("value"), false, c)] : ""]);
          case "variadicplaceholder":
            return "...";
          default:
            throw new Error(`Have not implemented kind '${h.kind}' yet.`);
        }
      }(t, e, s), r = [], a = lo(t, e);
      return a && r.unshift("("), r.push(n), a && r.push(")"), function(o) {
        const { node: c, parent: l } = o;
        if (!l) return false;
        if (["for", "foreach", "while", "do", "if", "switch"].includes(l.kind) && c.kind !== "block" && c.kind !== "if" && (l.body === c || l.alternate === c)) return true;
        if (!function(h) {
          return ["block", "program", "namespace", "class", "enum", "interface", "trait", "traituse", "declare"].includes(h.kind);
        }(l) || c.kind === "echo" && c.shortForm) return false;
        if (c.kind === "traituse") return !c.adaptations;
        if (c.kind === "method" && c.isAbstract) return true;
        if (c.kind === "method") {
          const { parent: h } = o;
          if (h && h.kind === "interface") return true;
        }
        return ["expressionstatement", "do", "usegroup", "classconstant", "propertystatement", "traitprecedence", "traitalias", "goto", "constantstatement", "enumcase", "global", "static", "echo", "unset", "return", "break", "continue", "throw"].includes(c.kind);
      }(t) && r.push(";"), function(o) {
        const { node: c } = o, l = c.kind === "program", h = c.children && j(c.children);
        if (!l || h && ["halt", "inline"].includes(h.kind)) return false;
        if (h && (h.kind === "declare" || h.kind === "namespace")) {
          const u = h.children.length > 0 && j(h.children);
          if (u && ["halt", "inline"].includes(u.kind)) return false;
        }
        return true;
      }(t) && r.push(f), r;
    }, getVisitorKeys: function(t, e) {
      return Object.keys(t).filter((s) => !e.has(s) && !Vl.has(s));
    }, insertPragma: function(t) {
      const e = Io(t);
      if (e) {
        const { start: { offset: i }, end: { offset: n } } = e.loc, r = t.substring(0, i), a = t.substring(n);
        return `${r}${function(o) {
          let c = o.split(`
`);
          if (c.length === 1) {
            const [, h] = /\/*\*\*(.*)\*\//.exec(c[0]);
            c = ["/**", ` * ${h.trim()}`, " */"];
          }
          const l = c.findIndex((h) => /@\S/.test(h)) || 1;
          return c.splice(l, 0, " * @format"), c.join(`
`);
        }(e.value)}${a}`;
      }
      return t.startsWith("<?php") ? `${t.substring(0, 5)}
/** 
 * @format 
 */
${t.substring(5)}` : t;
    }, massageAstNode: Lo, getCommentChildNodes: function(t) {
      if (t.kind === "new" && t.what.kind === "class") return t.what.__parent_new_arguments = [...t.arguments], [t.what];
    }, canAttachComment: function(t) {
      return t.kind && t.kind !== "commentblock" && t.kind !== "commentline";
    }, isBlockComment: ye, handleComments: { ownLine: function(t, e, s) {
      const { precedingNode: i, enclosingNode: n, followingNode: r } = t;
      return io(e, i, n, r, t) || function(a, o, c) {
        return a && M(a) && o && ["identifier", "variable", "encapsed"].includes(o.kind) ? (z(a, c), true) : false;
      }(n, r, t) || de(e, i, n, r, t) || Ee(e, i, n, r, t) || ro(n, r, t) || fe(n, r, t) || Te(e, i, n, r, t) || ke(e, n, r, t) || function(a, o, c, l) {
        return !c && a && (a.kind === "for" || a.kind === "foreach") ? (a.body && a.body.kind !== "block" ? z(c, l) : z(a, l), true) : false;
      }(n, 0, r, t) || xe(n, i, r, t) || ho(n, i, r, t);
    }, endOfLine: function(t, e, s) {
      const { precedingNode: i, enclosingNode: n, followingNode: r } = t;
      return function(a, o, c, l, h) {
        return !o && !l && c && c.kind === "array" ? (K(c, h), true) : false;
      }(0, i, n, r, t) || function(a, o, c, l, h) {
        return c && c.kind === "return" && !c.expr ? (K(c, h), true) : false;
      }(0, 0, n, 0, t) || io(e, i, n, r, t) || function(a, o, c, l, h) {
        const u = o && !gl(h, S(o), G(l));
        return (!o || !u) && a && a.kind === "retif" && c ? (z(c, l), true) : false;
      }(n, i, r, t, e) || de(e, i, n, r, t) || Ee(e, i, n, r, t) || ro(n, r, t) || fe(n, r, t) || Te(e, i, n, r, t) || ke(e, n, r, t) || function(a, o) {
        return a && a.kind === "entry" ? (z(a, o), true) : false;
      }(n, t) || function(a, o, c) {
        return o && o.kind === "call" && a && o.what === a && o.arguments.length > 0 ? (z(o.arguments[0], c), true) : false;
      }(i, n, t) || function(a, o, c) {
        if (a && a.kind === "assign" && o) {
          const l = a.loc.start.offset + a.loc.source.indexOf("=");
          if (c.loc.start.offset > l) return z(o, c), true;
        }
        return false;
      }(n, r, t) || xe(n, i, r, t) || oo(n, i, r, t) || ho(n, i, r, t) || no(n, t);
    }, remaining: function(t, e, s) {
      const { precedingNode: i, enclosingNode: n, followingNode: r } = t;
      return de(e, i, n, r, t) || Ee(e, i, n, r, t) || function(a, o, c) {
        const l = It(a, S(c));
        return a.charAt(l) !== ")" ? false : o && (o.kind === "function" || o.kind === "closure" || o.kind === "method" || o.kind === "call" || o.kind === "new") && o.arguments.length === 0 ? (V(o, c), true) : false;
      }(e, n, t) || fe(n, r, t) || function(a, o, c) {
        return a && a.kind === "traituse" && a.adaptations && !a.adaptations.length ? (V(a, c), true) : false;
      }(n, 0, t) || Te(e, i, n, r, t) || ke(e, n, r, t) || no(n, t) || function(a, o, c, l) {
        return o && o.kind === "halt" ? (V(o, l), true) : a && a.kind === "halt" ? (V(a, l), true) : false;
      }(i, n, 0, t) || function(a, o) {
        return a && (a.kind === "continue" || a.kind === "break") && !a.label ? (K(a, o), true) : false;
      }(n, t) || xe(n, i, r, t) || oo(n, i, r, t);
    } }, willPrintOwnComments(t) {
      const { node: e } = t;
      return e && e.kind === "noop";
    }, printComment(t) {
      const e = t.node;
      switch (e.kind) {
        case "commentblock": {
          if (!e.value.includes(`
`)) return e.value;
          const s = e.value.split(`
`);
          return s.slice(1, s.length - 1).every((i) => i.trim()[0] === "*") ? Ml(Bl, s.map((i, n) => (n > 0 ? " " : "") + (n < s.length - 1 ? i.trim() : i.trimLeft()))) : e.value;
        }
        case "commentline":
          return e.value.trimRight();
        default:
          throw new Error(`Not a comment: ${JSON.stringify(e)}`);
      }
    }, hasPrettierIgnore(t) {
      const e = (n) => n.value.includes("prettier-ignore") && !n.value.includes("prettier-ignore-start") && !n.value.includes("prettier-ignore-end"), { node: s, parent: i } = t;
      return s && s.kind !== "classconstant" && s.comments && s.comments.length > 0 && s.comments.some(e) || s && s.kind === "constant" && i && i.kind === "classconstant" && i.comments && i.comments.length > 0 && i.comments.some(e);
    } } };
    q.defaultOptions = { tabWidth: 4 }, q.languages = Hl, q.options = ul, q.parsers = Gl, q.printers = Ql;
  });
})(Le, Le.exports);
var Uo = Le.exports;
const ql = $l(Uo), oc = Kl({ __proto__: null, default: ql }, [Uo]);
export {
  oc as s
};
