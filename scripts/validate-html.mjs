#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const fileArg = process.argv[2];

if (!fileArg) {
  console.error("用法：node scripts/validate-html.mjs path/to/index.html");
  process.exit(2);
}

const filePath = resolve(fileArg);
const html = await readFile(filePath, "utf8");
const errors = [];
const warnings = [];

const checks = [
  [/^<!doctype html>/i.test(html.trimStart()), "缺少 HTML DOCTYPE"],
  [/<html\b[^>]*\blang=["'][^"']+["']/i.test(html), "<html> 缺少 lang 属性"],
  [/<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']+["']/i.test(html), "缺少响应式 viewport meta"],
  [/<title>\s*[^<\s][^<]*<\/title>/i.test(html), "<title> 缺失或为空"],
  [/<main\b/i.test(html), "缺少 <main> 地标"],
  [/<h1\b/i.test(html), "缺少主 <h1>"],
];

for (const [passed, message] of checks) {
  if (!passed) errors.push(message);
}

const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count > 1) errors.push(`Expected one <h1>, found ${h1Count}`);

if (/<meta\b[^>]*name=["']description["'][^>]*content=["']\s*["']/i.test(html)) {
  errors.push("meta description 为空");
}

const placeholderMatches = [...html.matchAll(/\{\{[^}]+\}\}/g)].map((match) => match[0]);
if (placeholderMatches.length) {
  errors.push(`未替换的占位符： ${[...new Set(placeholderMatches)].join(", ")}`);
}

const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
for (const tag of imgTags) {
  if (!/\balt=/.test(tag)) errors.push(`图片缺少 alt 属性： ${tag.slice(0, 140)}`);
}

const anchorTags = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
for (const tag of anchorTags) {
  const isExternal = /\bhref=["']https?:\/\//i.test(tag);
  const opensNewTab = /\btarget=["']_blank["']/i.test(tag);
  const hasSafeRel = /\brel=["'][^"']*(noopener|noreferrer)[^"']*["']/i.test(tag);
  if (isExternal && opensNewTab && !hasSafeRel) {
    errors.push(`外部新窗口链接缺少安全 rel 属性： ${tag.slice(0, 180)}`);
  }
  if (/\bhref=["']#["']/i.test(tag)) {
    warnings.push(`发现占位锚点： ${tag.slice(0, 180)}`);
  }
}

if (!/<footer\b/i.test(html)) warnings.push("未发现 <footer> 地标");
if (!/prefers-reduced-motion/i.test(html)) warnings.push("未发现 prefers-reduced-motion 处理");
if (!/:focus|:focus-visible/i.test(html)) warnings.push("未发现可见焦点样式");
if (!/@media\b/i.test(html)) warnings.push("未发现响应式 media query");

console.log(`正在校验： ${filePath}`);
console.log(`图片数量： ${imgTags.length}`);
console.log(`链接数量： ${anchorTags.length}`);

for (const warning of warnings) console.warn(`警告： ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`错误： ${error}`);
  process.exit(1);
}

console.log("HTML 校验通过。");
