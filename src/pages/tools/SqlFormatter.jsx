import React from 'react'
import CodeFormatter from './CodeFormatter'

const SqlFormatter = () => {
    return (
        <CodeFormatter
            initialLanguage="sql"
            seoTitle="SQL Formatter - Prettify SQL Queries"
            seoDescription="Format SQL queries online. Specific support for MySQL, PostgreSQL, and SQL Server syntax. Beautify complex queries instantly."

            aboutTitle="About SQL Formatter"
            aboutContent="Optimize your database workflow with our **SQL Formatter**. Turn unreadable query strings into structured, easy-to-read SQL."
        />
    )
}

export default SqlFormatter
