"use client";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  const [message, setMesage] = useState(
    'Here are examples of how to sum two numbers in Python, JavaScript, and Go:\n\n### Python\n```python\ndef sum_two_numbers(a, b):\n    return a + b\n\n# Example usage\nresult = sum_two_numbers(3, 5)\nprint("The sum is:", result)\n```\n\n### JavaScript\n```javascript\nfunction sumTwoNumbers(a, b) {\n    return a + b;\n}\n\n// Example usage\nlet result = sumTwoNumbers(3, 5);\nconsole.log("The sum is:", result);\n```\n\n### Go\n```go\npackage main\n\nimport "fmt"\n\nfunc sumTwoNumbers(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    result := sumTwoNumbers(3, 5)\n    fmt.Println("The sum is:", result)\n}\n```\n\nThese snippets define a function in each language that takes two numbers as arguments and returns their sum. The example usage demonstrates how to call the function and print the result.'
  );
  return (
    <>
      <div className=" flex items-center justify-center flex-col bg-red-300 ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mt-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mt-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium mt-2">{children}</h3>
            ),
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            ul: ({ children }) => (
              <ul className="list-disc pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300">
                {children}
              </blockquote>
            ),
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </>
  );
}

