import express from "express"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const languageMap = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  ruby: "ruby",
  rb: "ruby",
  go: "go",
  rust: "rust",
  rs: "rust",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  html: "html",
  css: "css",
  bash: "bash",
  sh: "bash",
  sql: "sql",
}

router.post("/", async (req, res) => {
  try {
    let { language, code, input } = req.body

    if (!language || !code) {
      return res.status(400).json({ error: "Missing language or code" })
    }

    language = languageMap[language.toLowerCase()] || language.toLowerCase()

    const pistonUrl = process.env.PISTON_API || "https://emkc.org/api/v2/piston/execute"
    console.log("[v0] Executing code with language:", language)

    const payload = {
      language,
      version: "*",
      files: [{ content: code }],
    }

    if (input) {
      payload.stdin = input
    }

    const response = await axios.post(pistonUrl, payload, {
      timeout: 30000,
      headers: { "Content-Type": "application/json" },
    })

    const run = response.data?.run
    let output = run?.output || run?.stderr || ""

    if (!output && response.data?.compile) {
      output = response.data.compile.output || response.data.compile.stderr || ""
    }

    if (!output) {
      output = JSON.stringify(response.data)
    }

    console.log("[v0] Execution successful")
    res.json({ output: output || "Code executed successfully" })
  } catch (err) {
    console.error("[v0] Execute error:", err?.response?.data ?? err?.message)
    const errorMsg = err?.response?.data?.message || err?.message || "Execution failed"
    res.status(500).json({
      error: errorMsg,
      detail: process.env.NODE_ENV === "development" ? err?.message : undefined,
    })
  }
})

export default router
