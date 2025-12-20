
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import Editor from '@monaco-editor/react'
import { format } from 'prettier/standalone'
import * as prettierPluginHtml from 'prettier/plugins/html'
import * as prettierPluginCss from 'prettier/plugins/postcss'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettierPluginYaml from 'prettier/plugins/yaml'
import * as prettierPluginXml from '@prettier/plugin-xml'
import * as prettierPluginSql from 'prettier-plugin-sql'
import * as prettierPluginPhp from '@prettier/plugin-php/standalone'
// import initRuff, { format as formatPython } from '@astral-sh/ruff-wasm-web' (Startup failed)
import { Copy, Trash2, Code, Check, AlertCircle, Upload } from 'lucide-react'

// Simple fallback formatter for C-like languages and others not fully supported by Prettier in browser
const basicFormatter = (code, type = 'c-style') => {
    // SQL Formatter (Regex based)
    if (type === 'sql') {
        return code
            .replace(/\s+/g, ' ')
            .replace(/\s*([,;])\s*/g, '$1\n')
            .replace(/\s*\(\s*/g, ' (')
            .replace(/\s*\)\s*/g, ') ')
            .replace(/\b(SELECT|FROM|WHERE|AND|OR|((LEFT|RIGHT|INNER|OUTER|CROSS)\s+)?JOIN|ON|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT|INSERT\s+INTO|VALUES|UPDATE|SET|DELETE|CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE)\b/gi, match => `\n${match.toUpperCase()}`)
            .trim()
    }

    const lines = code.split('\n').map(l => l.trim()).filter(l => l)
    let indentLevel = 0
    const indentSize = 4
    let formatted = ''

    if (type === 'python') {
        // Python Indentation Heuristic
        lines.forEach((line) => {
            const isStructuralDedent = /^(elif|else|except|finally)/.test(line);
            if (isStructuralDedent && indentLevel > 0) indentLevel--;
            formatted += ' '.repeat(indentLevel * indentSize) + line + '\n';
            if (line.endsWith(':')) indentLevel++;
        });
        return formatted;
    }

    lines.forEach(line => {
        if (line.startsWith('}') || line.startsWith(']') || line.startsWith(')')) {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        formatted += ' '.repeat(indentLevel * indentSize) + line + '\n'

        if (line.endsWith('{') || line.endsWith('[') || line.endsWith('(')) {
            indentLevel++
        }
    })
    return formatted
}

const EXAMPLES = {
    html: `<!DOCTYPE html><html><head><title>Unformatted HTML</title><style>body{font-family:sans-serif;}</style></head><body><div id="main"><header><h1>Welcome</h1></header><nav><ul><li><a href="#">Home</a></li><li><a href="#">About</a></li></ul></nav><main><article><h2>Article Title</h2><p>This is a paragraph with <b>bold</b> text.</p></article></main><footer><p>&copy; 2024</p></footer></div></body></html>`,
    xml: `<?xml version="1.0" encoding="UTF-8"?><library><book id="1"><title>Clean Code</title><author>Robert C. Martin</author><price currency="USD">45.00</price><tags><tag>programming</tag><tag>software</tag></tags></book><book id="2"><title>The Pragmatic Programmer</title><authors><author>Andrew Hunt</author><author>David Thomas</author></authors></book></library>`,
    css: `body{margin:0;padding:0;font-family:sans-serif}.container{max-width:1200px;margin:0 auto;display:flex}header{background:#333;color:#fff;padding:1rem}nav ul{list-style:none;padding:0}nav li{display:inline-block;margin-right:1rem}.btn{background:blue;color:white;border:none;padding:10px 20px;border-radius:5px}.btn:hover{background:darkblue}`,
    javascript: `function calculateTotal(items){let total=0;for(let i=0;i<items.length;i++){const item=items[i];if(item.active){total+=item.price*item.quantity;}}return total;}const cart=[{id:1,price:10,quantity:2,active:true},{id:2,price:5,quantity:1,active:false}];console.log(calculateTotal(cart));`,
    typescript: `interface User {id: number;username: string;email: string;isActive: boolean;}class UserService {private users: User[] = [];constructor() {this.users = [];}addUser(user: User): void {this.users.push(user);}getUser(id: number): User | undefined {return this.users.find(u => u.id === id);}}const service = new UserService();service.addUser({id: 1, username: 'admin', email: 'admin@example.com', isActive: true});`,
    json: `{"user":{"id":123,"name":"John Doe","roles":["admin","editor"],"settings":{"theme":"dark","notifications":true},"history":[{"login":"2023-01-01","ip":"192.168.1.1"},{"login":"2023-01-02","ip":"192.168.1.2"}]},"status":"active","meta":{"version":"1.0","created_at":"2023-12-25T10:00:00Z"}}`,
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
    sql: `SELECT u.id, u.username, count(o.id) as order_count, sum(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2023-01-01' AND u.status = 'active' GROUP BY u.id, u.username HAVING count(o.id) > 5 ORDER BY total_spent DESC LIMIT 10;`,
    java: `package com.example;import java.util.ArrayList;import java.util.List;public class TaskManager {private List<String> tasks;public TaskManager(){this.tasks=new ArrayList<>();}public void addTask(String task){if(task!=null&&!task.isEmpty()){this.tasks.add(task);System.out.println("Task added: "+task);}}public static void main(String[] args){TaskManager tm=new TaskManager();tm.addTask("Fix formatting");}}`,
    kotlin: `data class User(val id: Int, val name: String)
fun main() { val users = listOf(User(1, "Alice"), User(2, "Bob"))
users.filter { it.id > 1 }.forEach { println("User: \${it.name}") } }`,
    php: `<?php function connectDB($host,$user,$pass){$conn=new mysqli($host,$user,$pass);if($conn->connect_error){die("Connection failed: ".$conn->connect_error);}return $conn;}$db=connectDB('localhost','root','secret');$sql="SELECT * FROM users";$result=$db->query($sql);while($row=$result->fetch_assoc()){echo "User: ".$row['username']."<br>";}?>`,
    c: `#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
int i; for(i=0; i<10; i++) {
if(i%2==0){printf("%d is even\n",i);}
else{printf("%d is odd\n",i);}
} return 0; }`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
class Sorter { public: void sortVector(vector<int>& v) { sort(v.begin(), v.end()); } };
int main() { vector<int> nums = {5, 2, 9, 1, 5, 6}; Sorter s; s.sortVector(nums);
for(int n : nums) { cout << n << " "; } return 0; }`,
    csharp: `using System;using System.Collections.Generic;using System.Linq;namespace App{public class Program{public static void Main(string[] args){var numbers=new List<int>{1,2,3,4,5,6,7,8,9,10};var evenNumbers=numbers.Where(n=>n%2==0).ToList();foreach(var num in evenNumbers){Console.WriteLine($"Even: {num}");}}}}`,
    objectivec: `#import <Foundation/Foundation.h>
int main(int argc, const char * argv[]) { @autoreleasepool {
NSArray *fruits = @[@"Apple", @"Banana", @"Orange"]; [fruits enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
NSLog(@"Fruit at index %lu is %@", (unsigned long)idx, obj); }]; } return 0; }`,
    swift: `import Foundation
struct User { var name: String; var age: Int }
let users = [User(name: "Alice", age: 25), User(name: "Bob", age: 30)]
for user in users { if user.age >= 18 { print("\(user.name) is an adult") } else { print("\(user.name) is a minor") } }`,
    python: `def calculate_fibonacci(n):
    if n <= 1: return n
    else:
        return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
def main():
    terms = 10; print("Fibonacci sequence:")
    for i in range(terms):
      print(calculate_fibonacci(i), end=" ")
if __name__ == "__main__": main()`,
    protobuf: `syntax = "proto3"; package tutorial; message Person { string name = 1; int32 id = 2; string email = 3; enum PhoneType { MOBILE = 0; HOME = 1; WORK = 2; } message PhoneNumber { string number = 1; PhoneType type = 2; } repeated PhoneNumber phones = 4; } message AddressBook { repeated Person people = 1; }`,
}

const MONACO_LANG_MAP = {
    html: 'html',
    xml: 'xml',
    css: 'css',
    javascript: 'javascript',
    typescript: 'typescript',
    json: 'json',
    yaml: 'yaml',
    markdown: 'markdown',
    sql: 'sql',
    java: 'java',
    kotlin: 'kotlin',
    php: 'php',
    c: 'c',
    cpp: 'cpp',
    csharp: 'csharp',
    objectivec: 'objective-c',
    swift: 'swift',
    python: 'python',
    protobuf: 'proto',
}

const CodeFormatter = () => {
    const [code, setCode] = useState(EXAMPLES['html'])
    const [language, setLanguage] = useState('html')
    const [formatted, setFormatted] = useState('')
    const [error, setError] = useState(null)
    const [copied, setCopied] = useState(false)
    const fileInputRef = useRef(null)

    // Ruff WASM init removed due to build issues

    // Debounce timer logic
    useEffect(() => {
        const timer = setTimeout(() => {
            handleFormat()
        }, 800) // Auto-format 800ms after typing stops

        return () => clearTimeout(timer)
    }, [code, language])

    const handleFormat = async () => {
        try {
            setError(null)
            let result = ''

            switch (language) {
                case 'html': result = await format(code, { parser: 'html', plugins: [prettierPluginHtml], printWidth: 80, tabWidth: 2 }); break
                case 'xml': result = await format(code, { parser: 'xml', plugins: [prettierPluginXml], printWidth: 80, tabWidth: 2 }); break
                case 'css': result = await format(code, { parser: 'css', plugins: [prettierPluginCss], printWidth: 80, tabWidth: 2 }); break
                case 'javascript': result = await format(code, { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree], semi: true, singleQuote: true }); break
                case 'json': result = await format(code, { parser: 'json', plugins: [prettierPluginBabel, prettierPluginEstree] }); break
                case 'yaml': result = await format(code, { parser: 'yaml', plugins: [prettierPluginYaml] }); break
                case 'sql': result = basicFormatter(code, 'sql'); break
                case 'php': result = await format(code, { parser: 'php', plugins: [prettierPluginPhp] }); break
                case 'python':
                    result = basicFormatter(code, 'python')
                    break

                // Fallback for languages without robust WASM prettier plugins
                case 'c':
                case 'cpp':
                case 'csharp':
                case 'objectivec':
                case 'swift':
                case 'java':
                case 'kotlin':
                case 'protobuf':
                    result = basicFormatter(code, 'c-style')
                    break
                default:
                    result = code // No-op
            }

            setFormatted(result)
        } catch (err) {
            // console.error(err) // Suppress noisy errors during typing
            setError(err.message || 'Formatting failed.')
            // Keep old formatted code or clear? keeping old might be better effectively
            // setFormatted('') 
        }
    }

    const handleCopy = () => {
        if (!formatted && !code) return
        navigator.clipboard.writeText(formatted || code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setCode('')
        setFormatted('')
        setError(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            setCode(e.target.result)
            setError(null)
        }
        reader.readAsText(file)
    }

    const handleLanguageChange = (e) => {
        const lang = e.target.value
        setLanguage(lang)
        if (EXAMPLES[lang]) {
            setCode(EXAMPLES[lang])
            setError(null)
        }
    }

    return (
        <>
            <Helmet>
                <title>Code Formatter - Free Online Multi-Language Beautifier</title>
                <meta name="description" content="Free online code formatter. Support for C, C++, Java, Python, SQL, XML, JSON, and more. Beautify your code instantly with syntax highlighting and line numbers." />
            </Helmet>

            <div className="container" style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Code Formatter</h1>
                    <p style={{ color: '#64748b', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        Instantly format and beautify your code with our <strong>Free Online Code Formatter</strong>.
                        Supports <strong>15+ languages</strong> including Python, JavaScript, Java, C++, SQL, XML, and JSON.
                        Features intelligent syntax highlighting, auto-indentation, and error detection - <strong>no installation required</strong>.
                    </p>
                </header>

                <div style={{
                    background: 'var(--card)',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)',
                    padding: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="select-wrapper">
                            <select
                                value={language}
                                onChange={handleLanguageChange}
                                style={{
                                    padding: '0.5rem 2rem 0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    background: 'white',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    minWidth: '150px'
                                }}
                            >
                                <optgroup label="Web">
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="json">JSON</option>
                                    <option value="xml">XML</option>
                                    <option value="php">PHP</option>
                                </optgroup>
                                <optgroup label="Programming">
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="csharp">C#</option>
                                    <option value="java">Java</option>
                                    <option value="kotlin">Kotlin</option>
                                    <option value="objectivec">Objective-C</option>
                                    <option value="python">Python</option>
                                    <option value="swift">Swift</option>
                                </optgroup>
                                <optgroup label="Data & Config">
                                    <option value="sql">SQL</option>
                                    <option value="yaml">YAML</option>
                                    <option value="protobuf">Protobuf</option>
                                </optgroup>
                            </select>
                        </div>

                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                        <button onClick={() => fileInputRef.current.click()} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                            <Upload size={16} /> Load File
                        </button>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                            <button onClick={handleCopy} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                                {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                            <button onClick={handleClear} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ef4444', color: '#ef4444', background: '#fef2f2', cursor: 'pointer' }}>
                                <Trash2 size={16} /> Clear
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginBottom: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, minHeight: 0 }}>
                        {/* Editor Input */}
                        <div style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                            <Editor
                                height="100%"
                                language={MONACO_LANG_MAP[language] || 'plaintext'}
                                theme="light"
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: 'on'
                                }}
                            />
                        </div>

                        {/* Editor Output (Read Only) */}
                        <div style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', background: '#f8fafc' }}>
                            <Editor
                                height="100%"
                                language={MONACO_LANG_MAP[language] || 'plaintext'}
                                theme="light"
                                value={formatted}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: 'on'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    .container { height: auto !important; }
                    .container > div { height: 800px; }
                }
            `}</style>
        </>
    )
}

export default CodeFormatter
