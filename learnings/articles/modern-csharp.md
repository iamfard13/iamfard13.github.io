---
title: Modern C# Features
chapter: A Tour of C# 10 and 11
date: August 31, 2026
author: Aliiiiii
---

## 🚀 What's New in C# 10 and 11

C# continues to evolve with each release. This article covers some of the most impactful features introduced in recent versions.

### 1️⃣ Record Structs

Records are now available for structs, providing value‑based equality and immutability.

```csharp
public record struct Point(int X, int Y);