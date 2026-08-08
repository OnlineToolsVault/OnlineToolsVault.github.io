const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/plugin-DxVXZRxb.js","assets/index-BtmU1OS0.js","assets/index-Cv0roaG_.css","assets/doc-DG-4VZqw.js","assets/standalone-EMzlrZmA.js","assets/standalone-CihvUZad.js","assets/___vite-browser-external_commonjs-proxy-CWywmtvW.js","assets/__vite-browser-external-Dk_eJUSQ.js","assets/index-inthKT9q.js","assets/index-DmpVLzeI.js"])))=>i.map(i=>d[i]);
import { r as f, j as e, _ as d, __tla as __tla_0 } from "./index-BtmU1OS0.js";
import { R as N } from "./RelatedTools-GVPazTWJ.js";
import { T as q } from "./ToolLayout-CgcEif7J.js";
import { F as C } from "./monacoLoader-DZKWO0B6.js";
import { U as D } from "./upload-PxpkBjYu.js";
import { C as B } from "./check-G7hwFc4v.js";
import { C as $ } from "./copy-BC22e6PQ.js";
import { T as H } from "./trash-2-Dg-IhPxN.js";
import { A as J } from "./alert-circle-OenrUIar.js";
import { b as V } from "./tools-DOXC7sEs.js";
import { Z as z } from "./zap-DZ5cj3rv.js";
import { S as Q } from "./shield-C_IpXjfc.js";
let ge;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const X = () => d(() => import("./standalone-CihvUZad.js").then((i) => i.s), []), Y = (i, l = 4) => {
    const c = [];
    let s = "", p = 0, r = 0;
    const h = (o, n = 0) => {
      const g = o.trim();
      g && c.push(" ".repeat(Math.max(0, p + n) * l) + g);
    };
    for (; r < i.length; ) {
      const o = i[r];
      if (o === '"' || o === "'" || o === "`") {
        const n = o;
        for (s += o, r++; r < i.length; ) {
          if (s += i[r], i[r] === "\\") {
            s += i[r + 1] ?? "", r += 2;
            continue;
          }
          if (i[r] === n) {
            r++;
            break;
          }
          r++;
        }
        continue;
      }
      if (o === "/" && i[r + 1] === "/") {
        const n = i.indexOf(`
`, r);
        s += i.slice(r, n === -1 ? i.length : n), r = n === -1 ? i.length : n;
        continue;
      }
      if (o === "/" && i[r + 1] === "*") {
        const n = i.indexOf("*/", r);
        s += i.slice(r, n === -1 ? i.length : n + 2), r = n === -1 ? i.length : n + 2;
        continue;
      }
      if (o === "{") {
        h(s.trimEnd() + " {"), s = "", p++, r++;
        continue;
      }
      if (o === "}") {
        for (h(s), s = "", p--, h("}"), r++; i[r] === ";" || i[r] === ","; ) c[c.length - 1] += i[r], r++;
        continue;
      }
      if (o === ";") {
        h(s.trimEnd() + ";"), s = "", r++;
        continue;
      }
      if (o === `
`) {
        h(s), s = "", r++;
        continue;
      }
      if (/\s/.test(o)) {
        s && !/\s$/.test(s) && (s += " "), r++;
        continue;
      }
      s += o, r++;
    }
    return h(s), c.join(`
`) + `
`;
  }, G = (i) => {
    let l = 0, c = "";
    for (const s of i.split(`
`)) {
      const p = s.trim();
      p && (/^(elif|else|except|finally)/.test(p) && l > 0 && l--, c += "    ".repeat(l) + p + `
`, p.endsWith(":") && l++);
    }
    return c;
  };
  let k = null;
  let K, x, P, Z, ee, te, ae;
  K = async (i) => {
    try {
      if (!k) {
        const l = await d(() => import("./ruff_wasm-DnDFgzAn.js"), []);
        await l.default(), k = new l.Workspace(l.Workspace.defaultSettings());
      }
      return k.format(i);
    } catch (l) {
      return console.warn("Ruff unavailable, using the built-in Python indenter:", l), G(i);
    }
  };
  x = {
    html: '<!DOCTYPE html><html><head><title>Unformatted HTML</title><style>body{font-family:sans-serif;}</style></head><body><div id="main"><header><h1>Welcome</h1></header><nav><ul><li><a href="#">Home</a></li><li><a href="#">About</a></li></ul></nav><main><article><h2>Article Title</h2><p>This is a paragraph with <b>bold</b> text.</p></article></main><footer><p>&copy; 2024</p></footer></div></body></html>',
    xml: '<?xml version="1.0" encoding="UTF-8"?><library><book id="1"><title>Clean Code</title><author>Robert C. Martin</author><price currency="USD">45.00</price><tags><tag>programming</tag><tag>software</tag></tags></book><book id="2"><title>The Pragmatic Programmer</title><authors><author>Andrew Hunt</author><author>David Thomas</author></authors></book></library>',
    css: "body{margin:0;padding:0;font-family:sans-serif}.container{max-width:1200px;margin:0 auto;display:flex}header{background:#333;color:#fff;padding:1rem}nav ul{list-style:none;padding:0}nav li{display:inline-block;margin-right:1rem}.btn{background:blue;color:white;border:none;padding:10px 20px;border-radius:5px}.btn:hover{background:darkblue}",
    javascript: "function calculateTotal(items){let total=0;for(let i=0;i<items.length;i++){const item=items[i];if(item.active){total+=item.price*item.quantity;}}return total;}const cart=[{id:1,price:10,quantity:2,active:true},{id:2,price:5,quantity:1,active:false}];console.log(calculateTotal(cart));",
    typescript: "interface User {id: number;username: string;email: string;isActive: boolean;}class UserService {private users: User[] = [];constructor() {this.users = [];}addUser(user: User): void {this.users.push(user);}getUser(id: number): User | undefined {return this.users.find(u => u.id === id);}}const service = new UserService();service.addUser({id: 1, username: 'admin', email: 'admin@example.com', isActive: true});",
    json: '{"user":{"id":123,"name":"John Doe","roles":["admin","editor"],"settings":{"theme":"dark","notifications":true},"history":[{"login":"2023-01-01","ip":"192.168.1.1"},{"login":"2023-01-02","ip":"192.168.1.2"}]},"status":"active","meta":{"version":"1.0","created_at":"2023-12-25T10:00:00Z"}}',
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80`,
    markdown: `# Unformatted Markdown
This is a paragraph with **bold** and *italic* text.

## List Item
* Item 1
*    Item 2
* Item 3

[Link Text](https://example.com)

> Blockquote text here.`,
    sql: "SELECT u.id, u.username, count(o.id) as order_count, sum(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2023-01-01' AND u.status = 'active' GROUP BY u.id, u.username HAVING count(o.id) > 5 ORDER BY total_spent DESC LIMIT 10;",
    java: 'package com.example;import java.util.ArrayList;import java.util.List;public class TaskManager {private List<String> tasks;public TaskManager(){this.tasks=new ArrayList<>();}public void addTask(String task){if(task!=null&&!task.isEmpty()){this.tasks.add(task);System.out.println("Task added: "+task);}}public static void main(String[] args){TaskManager tm=new TaskManager();tm.addTask("Fix formatting");}}',
    kotlin: `data class User(val id: Int, val name: String)
fun main() { val users = listOf(User(1, "Alice"), User(2, "Bob"))
users.filter { it.id > 1 }.forEach { println("User: \${it.name}") } }`,
    php: `<?php function connectDB($host,$user,$pass){$conn=new mysqli($host,$user,$pass);if($conn->connect_error){die("Connection failed: ".$conn->connect_error);}return $conn;}$db=connectDB('localhost','root','secret');$sql="SELECT * FROM users";$result=$db->query($sql);while($row=$result->fetch_assoc()){echo "User: ".$row['username']."<br>";}?>`,
    c: `#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
int i; for(i=0; i<10; i++) {
if(i%2==0){printf("%d is even\\n",i);}
else{printf("%d is odd\\n",i);}
} return 0; }`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;
class Sorter { public: void sortVector(vector<int>& v) { sort(v.begin(), v.end()); } };
int main() { vector<int> nums = {5, 2, 9, 1, 5, 6}; Sorter s; s.sortVector(nums);
for(int n : nums) { cout << n << " "; } return 0; }`,
    csharp: 'using System;using System.Collections.Generic;using System.Linq;namespace App{public class Program{public static void Main(string[] args){var numbers=new List<int>{1,2,3,4,5,6,7,8,9,10};var evenNumbers=numbers.Where(n=>n%2==0).ToList();foreach(var num in evenNumbers){Console.WriteLine($"Even: {num}");}}}}',
    objectivec: `#import <Foundation/Foundation.h>
int main(int argc, const char * argv[]) { @autoreleasepool {
NSArray *fruits = @[@"Apple", @"Banana", @"Orange"]; [fruits enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
NSLog(@"Fruit at index %lu is %@", (unsigned long)idx, obj); }]; } return 0; }`,
    swift: `import Foundation
struct User { var name: String; var age: Int }
let users = [User(name: "Alice", age: 25), User(name: "Bob", age: 30)]
for user in users { if user.age >= 18 { print("\\(user.name) is an adult") } else { print("\\(user.name) is a minor") } }`,
    python: `def calculate_fibonacci(n):
    if n <= 1: return n
    else:
        return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
def main():
    terms = 10; print("Fibonacci sequence:")
    for i in range(terms):
      print(calculate_fibonacci(i), end=" ")
if __name__ == "__main__": main()`,
    protobuf: 'syntax = "proto3"; package tutorial; message Person { string name = 1; int32 id = 2; string email = 3; enum PhoneType { MOBILE = 0; HOME = 1; WORK = 2; } message PhoneNumber { string number = 1; PhoneType type = 2; } repeated PhoneNumber phones = 4; } message AddressBook { repeated Person people = 1; }'
  };
  P = {
    html: "html",
    xml: "xml",
    css: "css",
    javascript: "javascript",
    typescript: "typescript",
    json: "json",
    yaml: "yaml",
    markdown: "markdown",
    sql: "sql",
    java: "java",
    kotlin: "kotlin",
    php: "php",
    c: "c",
    cpp: "cpp",
    csharp: "csharp",
    objectivec: "objective-c",
    swift: "swift",
    python: "python",
    protobuf: "proto"
  };
  ge = ({ initialLanguage: i = "html", seoTitle: l = "Code Formatter - Free Online Multi-Language Beautifier", seoDescription: c = "Free online code formatter. Support for C, C++, Java, Python, SQL, XML, JSON, and more. Beautify your code instantly.", aboutTitle: s, aboutContent: p = Z, aboutExtra: r = ee, features: h = te, faqs: o = ae }) => {
    const [n, g] = f.useState(x[i] || x.html), [b, A] = f.useState(i), [_, j] = f.useState(""), [T, y] = f.useState(null), [S, L] = f.useState(false), w = f.useRef(null);
    f.useEffect(() => {
      const t = setTimeout(() => {
        R();
      }, 800);
      return () => clearTimeout(t);
    }, [
      n,
      b
    ]);
    const E = (t) => !t || typeof t != "string" ? t : t.split(/(\*\*.*?\*\*)/g).map((a, u) => a.startsWith("**") && a.endsWith("**") ? e.jsx("strong", {
      children: a.slice(2, -2)
    }, u) : a), m = async (t, a, u) => {
      const [{ format: v }, F] = await Promise.all([
        X(),
        u()
      ]);
      return v(t, {
        ...a,
        plugins: F
      });
    }, O = {
      html: (t) => m(t, {
        parser: "html",
        printWidth: 80,
        tabWidth: 2
      }, async () => [
        await d(() => import("./html-DTtvNzPs.js"), [])
      ]),
      xml: (t) => m(t, {
        parser: "xml",
        printWidth: 80,
        tabWidth: 2,
        xmlWhitespaceSensitivity: "ignore"
      }, async () => {
        const a = await d(() => import("./plugin-DxVXZRxb.js"), __vite__mapDeps([0,1,2,3]));
        return [
          a.default || a
        ];
      }),
      css: (t) => m(t, {
        parser: "css",
        printWidth: 80,
        tabWidth: 2
      }, async () => [
        await d(() => import("./postcss-BsaTSOVa.js"), [])
      ]),
      javascript: (t) => m(t, {
        parser: "babel",
        semi: true,
        singleQuote: true
      }, async () => [
        await d(() => import("./babel-CVHrVmVJ.js"), []),
        await d(() => import("./estree-BOE5AzoZ.js"), [])
      ]),
      typescript: (t) => m(t, {
        parser: "babel-ts",
        semi: true,
        singleQuote: true
      }, async () => [
        await d(() => import("./babel-CVHrVmVJ.js"), []),
        await d(() => import("./estree-BOE5AzoZ.js"), [])
      ]),
      json: (t) => m(t, {
        parser: "json"
      }, async () => [
        await d(() => import("./babel-CVHrVmVJ.js"), []),
        await d(() => import("./estree-BOE5AzoZ.js"), [])
      ]),
      yaml: (t) => m(t, {
        parser: "yaml"
      }, async () => [
        await d(() => import("./yaml-B221jnj0.js"), [])
      ]),
      markdown: (t) => m(t, {
        parser: "markdown",
        printWidth: 80
      }, async () => [
        await d(() => import("./markdown-BzC0BSER.js"), [])
      ]),
      php: (t) => m(t, {
        parser: "php"
      }, async () => {
        const a = await d(() => import("./standalone-EMzlrZmA.js").then((u) => u.s), __vite__mapDeps([4,1,2,5,6,7]));
        return [
          a.default || a
        ];
      }),
      java: (t) => m(t, {
        parser: "java",
        tabWidth: 4
      }, async () => {
        const a = await d(() => import("./index-inthKT9q.js"), __vite__mapDeps([8,1,2,5,3]));
        return [
          a.default || a
        ];
      }),
      sql: async (t) => {
        const { format: a } = await d(async () => {
          const { format: u } = await import("./index-DmpVLzeI.js");
          return {
            format: u
          };
        }, __vite__mapDeps([9,1,2]));
        return a(t, {
          language: "sql",
          keywordCase: "upper",
          tabWidth: 2
        });
      },
      python: (t) => K(t)
    }, R = async () => {
      if (!n.trim()) {
        j(""), y(null);
        return;
      }
      try {
        y(null);
        const t = O[b], a = t ? await t(n) : Y(n);
        j(a);
      } catch (t) {
        y(t.message || "Formatting failed.");
      }
    }, W = () => {
      !_ && !n || (navigator.clipboard.writeText(_ || n), L(true), setTimeout(() => L(false), 2e3));
    }, I = () => {
      g(""), j(""), y(null), w.current && (w.current.value = "");
    }, M = (t) => {
      const a = t.target.files[0];
      if (!a) return;
      const u = new FileReader();
      u.onload = (v) => {
        g(v.target.result), y(null);
      }, u.readAsText(a);
    }, U = (t) => {
      const a = t.target.value;
      A(a), y(null), (n.trim() === "" || Object.values(x).some((v) => v === n)) && x[a] && g(x[a]);
    };
    return e.jsxs(q, {
      title: l.split(" - ")[0],
      description: c,
      seoTitle: l,
      seoDescription: c,
      faqs: o,
      children: [
        e.jsxs("div", {
          className: "tool-workspace",
          style: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column"
          },
          children: [
            e.jsxs("div", {
              style: {
                background: "var(--card)",
                borderRadius: "1rem",
                border: "1px solid var(--border)",
                padding: "1rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden"
              },
              children: [
                e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    alignItems: "center"
                  },
                  children: [
                    e.jsx("div", {
                      className: "select-wrapper",
                      children: e.jsxs("select", {
                        id: "language-select",
                        "aria-label": "Source language",
                        value: b,
                        onChange: U,
                        style: {
                          padding: "0.5rem 2rem 0.5rem 1rem",
                          borderRadius: "0.5rem",
                          border: "1px solid var(--border)",
                          background: "white",
                          fontSize: "1rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          minWidth: "150px"
                        },
                        children: [
                          e.jsxs("optgroup", {
                            label: "Web",
                            children: [
                              e.jsx("option", {
                                value: "html",
                                children: "HTML"
                              }),
                              e.jsx("option", {
                                value: "css",
                                children: "CSS"
                              }),
                              e.jsx("option", {
                                value: "javascript",
                                children: "JavaScript"
                              }),
                              e.jsx("option", {
                                value: "typescript",
                                children: "TypeScript"
                              }),
                              e.jsx("option", {
                                value: "json",
                                children: "JSON"
                              }),
                              e.jsx("option", {
                                value: "xml",
                                children: "XML"
                              }),
                              e.jsx("option", {
                                value: "php",
                                children: "PHP"
                              })
                            ]
                          }),
                          e.jsxs("optgroup", {
                            label: "Programming",
                            children: [
                              e.jsx("option", {
                                value: "c",
                                children: "C"
                              }),
                              e.jsx("option", {
                                value: "cpp",
                                children: "C++"
                              }),
                              e.jsx("option", {
                                value: "csharp",
                                children: "C#"
                              }),
                              e.jsx("option", {
                                value: "java",
                                children: "Java"
                              }),
                              e.jsx("option", {
                                value: "kotlin",
                                children: "Kotlin"
                              }),
                              e.jsx("option", {
                                value: "objectivec",
                                children: "Objective-C"
                              }),
                              e.jsx("option", {
                                value: "python",
                                children: "Python"
                              }),
                              e.jsx("option", {
                                value: "swift",
                                children: "Swift"
                              })
                            ]
                          }),
                          e.jsxs("optgroup", {
                            label: "Data & Config",
                            children: [
                              e.jsx("option", {
                                value: "sql",
                                children: "SQL"
                              }),
                              e.jsx("option", {
                                value: "yaml",
                                children: "YAML"
                              }),
                              e.jsx("option", {
                                value: "markdown",
                                children: "Markdown"
                              }),
                              e.jsx("option", {
                                value: "protobuf",
                                children: "Protobuf"
                              })
                            ]
                          })
                        ]
                      })
                    }),
                    e.jsx("input", {
                      id: "code-file-upload",
                      type: "file",
                      "aria-label": "Load a code file",
                      ref: w,
                      style: {
                        display: "none"
                      },
                      onChange: M
                    }),
                    e.jsxs("button", {
                      id: "upload-btn",
                      onClick: () => w.current.click(),
                      className: "btn-secondary",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--border)",
                        background: "white",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(D, {
                          size: 16
                        }),
                        " Load File"
                      ]
                    }),
                    e.jsxs("div", {
                      style: {
                        marginLeft: "auto",
                        display: "flex",
                        gap: "0.5rem"
                      },
                      children: [
                        e.jsxs("button", {
                          id: "copy-btn",
                          onClick: W,
                          className: "btn-secondary",
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border)",
                            background: "white",
                            cursor: "pointer"
                          },
                          children: [
                            S ? e.jsx(B, {
                              size: 16,
                              color: "#22c55e"
                            }) : e.jsx($, {
                              size: 16
                            }),
                            S ? "Copied" : "Copy"
                          ]
                        }),
                        e.jsxs("button", {
                          id: "clear-btn",
                          onClick: I,
                          className: "btn-secondary",
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #ef4444",
                            color: "#ef4444",
                            background: "#fef2f2",
                            cursor: "pointer"
                          },
                          children: [
                            e.jsx(H, {
                              size: 16
                            }),
                            " Clear"
                          ]
                        })
                      ]
                    })
                  ]
                }),
                T && e.jsxs("div", {
                  style: {
                    background: "#fef2f2",
                    color: "#ef4444",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  },
                  children: [
                    e.jsx(J, {
                      size: 16
                    }),
                    " ",
                    T
                  ]
                }),
                e.jsxs("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    flex: 1,
                    minHeight: "600px",
                    width: "100%",
                    maxWidth: "100%"
                  },
                  children: [
                    e.jsx("div", {
                      id: "editor-input-container",
                      style: {
                        border: "1px solid var(--border)",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        width: "100%",
                        maxWidth: "100%"
                      },
                      children: e.jsx(C, {
                        height: "100%",
                        language: P[b] || "plaintext",
                        theme: "light",
                        value: n,
                        onChange: (t) => g(t || ""),
                        options: {
                          ariaLabel: "Code input",
                          minimap: {
                            enabled: false
                          },
                          fontSize: 14,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          wordWrap: "on"
                        }
                      })
                    }),
                    e.jsx("div", {
                      id: "editor-output-container",
                      style: {
                        border: "1px solid var(--border)",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        background: "#f8fafc",
                        width: "100%",
                        maxWidth: "100%"
                      },
                      children: e.jsx(C, {
                        height: "100%",
                        language: P[b] || "plaintext",
                        theme: "light",
                        value: _,
                        options: {
                          ariaLabel: "Formatted code output",
                          readOnly: true,
                          minimap: {
                            enabled: false
                          },
                          fontSize: 14,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          wordWrap: "on"
                        }
                      })
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "tool-content",
              style: {
                marginTop: "4rem"
              },
              children: [
                e.jsx(N, {}),
                e.jsxs("div", {
                  className: "about-section",
                  style: {
                    background: "var(--bg-card)",
                    padding: "2rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    marginBottom: "2rem"
                  },
                  children: [
                    e.jsx("h2", {
                      style: {
                        fontSize: "1.8rem",
                        marginBottom: "1.5rem"
                      },
                      children: s || `About ${l.split(" - ")[0]}`
                    }),
                    e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: E(p || c)
                    }),
                    r.map((t, a) => e.jsx("p", {
                      style: {
                        lineHeight: "1.6",
                        color: "var(--text-secondary)",
                        marginBottom: "1rem"
                      },
                      children: E(t)
                    }, a))
                  ]
                }),
                e.jsx("div", {
                  className: "features-section",
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem"
                  },
                  children: h.map((t, a) => e.jsxs("div", {
                    className: "feature-card",
                    style: {
                      padding: "1.5rem",
                      borderRadius: "1rem",
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)"
                    },
                    children: [
                      e.jsx("div", {
                        style: {
                          width: "48px",
                          height: "48px",
                          background: "var(--primary-light)",
                          borderRadius: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1rem"
                        },
                        children: a === 0 ? e.jsx(V, {
                          color: "var(--primary)",
                          size: 24
                        }) : a === 1 ? e.jsx(z, {
                          color: "var(--primary)",
                          size: 24
                        }) : e.jsx(Q, {
                          color: "var(--primary)",
                          size: 24
                        })
                      }),
                      e.jsx("h3", {
                        style: {
                          fontSize: "1.25rem",
                          marginBottom: "0.5rem"
                        },
                        children: t.title
                      }),
                      e.jsx("p", {
                        style: {
                          color: "var(--text-secondary)"
                        },
                        children: t.desc
                      })
                    ]
                  }, a))
                })
              ]
            })
          ]
        }),
        e.jsx("style", {
          children: `
                @media (max-width: 768px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    .container { height: auto !important; }
                    .container > div { height: 600px; }
                    #editor-input-container, #editor-output-container {
                        min-height: 400px;
                        width: 100% !important;
                        max-width: 100vw !important;
                    }
                }
            `
        })
      ]
    });
  };
  Z = "The language picker offers nineteen entries, and each one is routed to the printer that language actually deserves rather than to a single generic indenter. **Prettier** parses HTML, CSS, JavaScript, TypeScript, JSON, XML, YAML, Markdown, PHP and Java. SQL goes through **sql-formatter**. Python is reformatted by **Ruff** compiled to WebAssembly, which produces the same output as Black. All of it is JavaScript and WASM running inside this tab: the code you paste is never uploaded, and the page keeps working if you go offline after it has loaded.";
  ee = [
    "Seven languages have no browser-capable parser here \u2014 C, C++, C#, Kotlin, Objective-C, Swift and Protobuf. Those fall back to a built-in brace indenter that walks the source character by character, breaks a line at every {, } and ;, and indents four spaces per nesting level. String literals and comments are copied through verbatim so a semicolon inside a string cannot trigger a spurious break. It makes minified or single-line input readable, but it is a layout pass, not a syntax check: it will indent code that does not compile, and it can mis-handle constructs that depend on staying on one line, such as a C macro continued with a backslash.",
    "Parser bundles load on demand. Prettier plus every plugin is several megabytes, so the page ships none of it up front and fetches only the bundle for the language you select. The first format in a new language pauses while that bundle downloads; every format after it is instant. Output refreshes 800 milliseconds after you stop typing, so you can edit the left pane and watch the right pane settle rather than hunting for a Format button.",
    "When a parser rejects the input, the message it produced is shown above the editors instead of a generic failure. Prettier reports a line and column, which makes this a serviceable syntax checker: if a JSON document or a Java class refuses to format, the position in the error is usually the real mistake. Switching languages swaps in that language\u2019s sample snippet only while the editor still holds a sample or is empty, so pasted work is never silently replaced."
  ];
  te = [
    {
      title: "Nineteen Languages, Real Grammars",
      desc: "Twelve of them are re-printed from a parsed syntax tree, so nesting, comments and string contents survive the round trip exactly. The remaining seven use a brace-and-semicolon indenter that still handles minified input."
    },
    {
      title: "Nothing Loads Until You Ask",
      desc: "Choose SQL and the page fetches sql-formatter; choose Python and it fetches the Ruff WebAssembly build. No other parser is downloaded, which keeps the first paint fast on a page that could otherwise ship megabytes."
    },
    {
      title: "Source Never Leaves The Tab",
      desc: "Editors, parsers and the clipboard copy all run locally. There is no upload step and no server round trip, so proprietary source, production queries and API payloads stay on your machine."
    }
  ];
  ae = [
    {
      question: "Which languages get a real parser, and which get the fallback?",
      answer: "Prettier parses HTML, CSS, JavaScript, TypeScript, JSON, XML, YAML, Markdown, PHP and Java. SQL is handled by sql-formatter and Python by Ruff compiled to WebAssembly. C, C++, C#, Kotlin, Objective-C, Swift and Protobuf go through the built-in brace indenter, which adds four spaces per nesting level and leaves strings and comments untouched."
    },
    {
      question: "Can formatting change what my code does?",
      answer: "For the parser-backed languages, no: the code is re-printed from a syntax tree, so quote style, line breaks and indentation change but behaviour does not. The brace fallback is the exception. It treats braces and semicolons as layout boundaries, so anything that relies on staying on a single line can be broken apart. Read the diff before committing output that came from a fallback language."
    },
    {
      question: "Why did the first format take a few seconds?",
      answer: "That was the parser bundle downloading. Prettier and its plugins are large, so nothing is fetched until you pick a language and format once. The bundle is then cached by the browser and every subsequent format in that language is immediate. On a slow connection the very first run can take several seconds; the editors stay usable while it loads."
    },
    {
      question: "Will it un-minify a bundled JavaScript file?",
      answer: "It will re-break and re-indent it, because every path rebuilds the line structure instead of tidying the newlines already there. What it cannot do is reverse minification: mangled identifiers such as a, b and n stay mangled, inlined helpers stay inlined, and dead code that the minifier folded away is simply gone. Use a source map if you need the original."
    },
    {
      question: "What style settings are applied?",
      answer: "HTML, CSS and XML print at an 80-column width with two-space indentation. JavaScript and TypeScript use single quotes and always add semicolons. SQL uppercases keywords and indents two spaces. Python uses Ruff defaults. The brace fallback uses four spaces. There is no options panel, so if your team enforces a different style, treat this as a reading aid and run your own Prettier or gofmt config before you commit."
    },
    {
      question: "When should I use a single-language page instead of this one?",
      answer: "When you want the caveats that apply to your language spelled out. The dedicated HTML, CSS, JavaScript, SQL, XML and JSON pages open on that language and document its specific failure modes \u2014 which SQL dialects the parser rejects, why embedded CSS inside an HTML page is not reformatted, what happens to mixed-content XML. This page is the right one when you are moving between languages in a single session, or when the language you need has no page of its own."
    },
    {
      question: "Is there a file size limit on Load File?",
      answer: "No hard cap is coded in, but the file is read as UTF-8 text into memory and handed to the Monaco editor and the parser, so multi-megabyte files feel sluggish and very large ones can stall the tab. Binary files and text saved in a legacy single-byte encoding arrive with replacement characters; re-save them as UTF-8 first."
    }
  ];
});
export {
  __tla,
  ge as default
};
