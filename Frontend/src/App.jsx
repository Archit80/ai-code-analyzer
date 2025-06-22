import { useRef, useState, useEffect } from "react";
import "./App.css";
import prism from "prismjs";
import "prismjs/themes/prism.css";
// import 'prismjs/components/prism-jsx'
import { Textarea } from "@/components/ui/textarea";
import Editor from "react-simple-code-editor";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // or any highlight.js theme you like
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const markdownResponse = `
# 🧠 AI Code Review Summary

---

## 🔍 **Issues Found**

### 1. ***Unused Variable***
\`\`\`js
const foo = 42;
\`\`\`
- \`foo\` is declared but never used.
- Dead code hurts readability and bundle size.  
🛠 **Fix:** Remove it if unnecessary.

---

### 2. ***Missing Semicolon***
\`\`\`js
console.log("Hello world")
\`\`\`
- Semicolons are optional in JS but recommended.  
🔧 **Fix:**
\`\`\`js
console.log("Hello world");
\`\`\`

---

## ✅ **Suggestions**

- ✔ Use \`const\` for variables that don't change.
- ✔ Avoid \`var\` like your code depends on it (because it does).
- ✔ Add comments for complex logic.
- ✔ Use \`===\` instead of \`==\` for strict comparison.

---

## 🧼 **Cleaned Up Code**
\`\`\`js
const message = "Hello world";

function greet() {
  console.log(message);
}

greet();
\`\`\`

---

> 💡 ***Pro Tip:***  
> Use \`whitespace-pre-wrap\` in your CSS if you're rendering this Markdown in React, so line breaks are respected.

---

### 💬 *Need help with more code?*  
Just toss it here like spaghetti on a wall 🍝. Let's debug it together.
`;

function App() {
  // const [count, setCount] = useState(0)
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [uselessFact, setUselessFact] = useState("");
  const [factProgress, setFactProgress] = useState(0);
  const progressRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch(
          "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
        );
        const data = await res.json();
        setUselessFact(data.text);
      } catch (err) {
        setUselessFact(
          "🤖 Couldn't find a useless fact. So here's one: console.log is your best friend."
        );
      }
      progressRef.current = 0;
      setFactProgress(0);

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        progressRef.current += 1;
        setFactProgress(progressRef.current);
        if (progressRef.current >= 150) {
          fetchFact();
        }
      }, 100);
    };

    fetchFact(); // initial call

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const analyzeCode = async () => {
    setIsLoading(true);
    const response = await axios.post("http://localhost:3000/ai/get-res", {
      code,
    });
    setIsLoading(false);
    if (response.status !== 200) {
      console.error("Error fetching data:", response.statusText);
      return;
    }
    setReview(response.data);
    // console.log(response.data);
  };

  return (
    <>
      <main className=" bg-grid flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background p-4  overflow-auto">
        <h1 className="text-5xl font-heading mt-4 md:mt-0">AI Code Analyzer</h1>

        <div className="flex w-full h-full gap-4 text-black flex-col md:flex-row">
          <div className="max-h-[88vh] min-h-[300px] w-full md:w-1/2 relative rounded-base border-[2px] border-border bg-[#FFE0E3] p-2 shadow-[4px_3px_0px_0px_var(--border)] h-1/2 md:h-full">
            <div className="flex-1 min-h-[200px] max-h-[82vh] overflow-auto">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  prism.highlight(
                    code,
                    prism.languages.javascript,
                    "javascript"
                  )
                }
                padding={12}
                className="w-full min-h-[200px] font-mono font-semibold text-md text-foreground selection:bg-main selection:text-main-foreground outline-none border-none whitespace-pre focus:border-none focus:outline-none bg-transparent"
              />
            </div>
            <Button
              className="z-100 text-md absolute right-4 bottom-4"
              onClick={analyzeCode}
              disabled={!code}
            >
              Analyse My Code
            </Button>
          </div>

          <Card className="w-full md:w-1/2 h-full max-h-[88vh] min-h-[300px] bg-white ">
            <CardContent className="-mt-4 h-full">
              <div
                className={`flex flex-col gap-6 h-full min-h-[300px] items-center justify-center ${
                  isLoading ? "overflow-hidden" : "overflow-auto"
                }`}
              >
                {!review && (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm max-w-xl">
                      <p className="mb-0 text-base text-gray-700 font-medium text-center">
                        {uselessFact}
                      </p>
                    </div>
                    <span className="mt-2 text-xs text-gray-400 italic text-center">
                      Next fact in {Math.ceil((150 - factProgress) / 10)}s
                    </span>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <span className="text-2xl font-bold animate-pulse text-main mb-2">
                      Here comes the moment of truth...
                    </span>
                    <div className="w-12 h-12 border-4 border-main border-t-transparent rounded-full animate-spin mt-4"></div>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none w-full h-full overflow-auto">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {review}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export default App;
