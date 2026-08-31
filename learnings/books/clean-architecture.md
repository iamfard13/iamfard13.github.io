---
title: Clean Architecture
chapter: Chapter 2 – A Tale of Two Values
author: Robert C. Martin
date: September 1, 2026
---

## 📖 Overview

Software architecture is about making the system easy to understand, develop, test, and deploy. This chapter explores the two essential values that every software system must deliver: **behavior** and **structure**.

### 1️⃣ Behavior

Behavior is what the system does – the features, the functionality. It's the reason users pay for the software. But behavior is **expendable**. If you can't change the behavior easily, the system becomes rigid and hard to maintain.

### 2️⃣ Structure

Structure is how the system is organized. It's the architecture – the arrangement of components, modules, and layers. Good structure makes behavior easy to change. Without good structure, every change becomes costly and risky.

### The Dilemma

Managers often prioritize behavior over structure. They ask: "Why spend time on architecture when we can deliver features?" The answer: **Architecture is the foundation that enables delivering features sustainably.**

### The Trade-off

- If you focus only on behavior, you may ship quickly at first, but eventually technical debt will slow you down.
- If you focus only on structure, you may over-engineer and deliver nothing useful.

The goal is to balance both, but **structure is the long‑term investment**.

### Key Takeaway

> "The architecture of a software system is the shape given to that system by those who build it. The shape is the result of the decisions made by the architects."

---