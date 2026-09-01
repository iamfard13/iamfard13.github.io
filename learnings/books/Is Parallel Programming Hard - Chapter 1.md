---
title: Is Parallel Programming Hard, And, If So, What Can You Do About It?
chapter: Chapter 1 – Introduction
author: Paul E. McKenney
date: August 29, 2026
---

## 📝 Summary

Parallel programming is not simply about running multiple tasks at the same time. The real challenge is designing the program so that multiple threads can work efficiently without constantly interfering with each other.

### 1️⃣ Parallelism ≠ Automatically Better Performance

Adding more threads does not necessarily make a program faster. Threads may spend time waiting for resources, communicating with each other, or synchronizing their work.

### 2️⃣ Communication Is Expensive

When threads need to frequently exchange data or coordinate with each other, the communication overhead can reduce the benefits of parallelism.

### 3️⃣ Resource Partitioning

Divide resources/data between threads:
- Thread A → Partition A
- Thread B → Partition B
- Thread C → Partition C

This reduces the amount of sharing between threads.

### 4️⃣ Less Sharing → Less Synchronization

When threads mostly work on their own data, fewer locks and synchronization mechanisms are needed.

### 5️⃣ Smaller State Space → Easier Reasoning

With many threads interacting with shared resources, there can be many possible execution orders and interactions. Partitioning the work can reduce the number of situations developers need to consider.

### 6️⃣ Hardware Matters Too

Performance also depends on the hardware architecture. Where a thread runs, where its data is located, CPU caches, memory access, and communication between CPU components can all affect performance.