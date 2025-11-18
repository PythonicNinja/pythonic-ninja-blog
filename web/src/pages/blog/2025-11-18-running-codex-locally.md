---
layout: ../../layouts/PostLayout.astro
title: "Run Codex Locally with LM Studio"
subtitle: "Wire Codex to LM Studio so Qwen 2.5 Coder runs entirely on your machine."
tags: ["AI", "Codex", "LM Studio", "Local LLM"]
date: 2025-11-18
category: ai
image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1350&q=80"
seo:
  title: "Run Codex Locally with LM Studio"
  description: "Learn how to run the Codex CLI entirely on your local machine. This step-by-step guide shows you how to configure LM Studio with a powerful open-source coding model like Qwen 2.5 Coder and connect it to Codex for private, low-latency AI development."
  noindex: false
---

Want to use Codex with maximum privacy and control? Running it against a local model is the answer. By connecting Codex to a model like Qwen 2.5 Coder hosted by LM Studio on your own machine, you gain several advantages:

*   **Privacy:** Your code and prompts never leave your computer.
*   **Offline Capability:** Code anywhere, even without an internet connection.
*   **No Rate Limits:** You're not subject to API quotas or rate limits.
*   **Cost-Effective:** Avoid paying for API calls, especially during heavy development.
*   **Customization:** Easily experiment with different models and context settings.

This guide will walk you through the entire process, from installation to a fully functional local setup.

# 🤔 Problem

By default, Codex is configured to use cloud-based models. This is great for getting started quickly, but it's not ideal for all scenarios. If you're working with proprietary code or sensitive data, you need a solution that keeps everything on your local machine.

While powerful tools like LM Studio make it possible to run state-of-the-art coding models like `qwen/qwen2.5-coder-14b` locally, connecting them to Codex isn't a one-click process. You need to:

1.  Install and configure both Codex and LM Studio.
2.  Download a multi-gigabyte model.
3.  Manually configure context window settings.
4.  Tell Codex to talk to your local server instead of a remote API.

This guide solves that by providing a clear, step-by-step path.

# 🛠️ Solution

Follow this four-step loop to move Codex fully on-device.

## Prerequisites

Before starting, ensure your hardware can handle running a 14B parameter model locally:

*   **RAM:** At least 16GB of system RAM (32GB recommended).
*   **GPU (Optional but Recommended):** An NVIDIA GPU with 12GB+ VRAM (e.g., RTX 3060 12GB, 4070, or better) or an Apple Silicon Mac (M1/M2/M3 Pro or Max) for best performance.
*   **Storage:** ~15GB of free space for the model and software.

## 1. Install Codex CLI

First, get the Codex binary set up on your machine.

1.  Download the latest Codex release for macOS, Linux, or Windows from your private portal.
2.  Extract it into a folder on your `PATH`, for example `~/bin/codex`.
3.  Run `codex --version` to confirm the binary is executable.
4.  Run `codex auth login` if your organization requires an initial handshake (even for local usage, some versions validate the license key).

## 2. Install LM Studio

LM Studio is the easiest way to run local LLMs with an OpenAI-compatible server.

1.  Head to [lmstudio.ai](https://lmstudio.ai) and download the installer for your OS.
2.  Run the installer.
3.  Launch LM Studio. It will ask you to choose a folder to store models.
    *   **Tip:** Models are large (often 10GB+). Choose a location on a fast SSD to ensure models load quickly.

## 3. Configure LM Studio with Qwen 2.5 Coder 14B

We'll use Qwen 2.5 Coder 14B, widely considered the best open-weight coding model in its size class as of late 2025.

1.  **Search:** Click the magnifying glass icon in LM Studio and type `qwen 2.5 coder 14b`.
2.  **Download:** Look for the `qwen/qwen2.5-coder-14b-instruct` repository (usually on the right). Choose the **Q4_K_M** quantization level.
    *   *Why Q4_K_M?* It balances size (~9GB) and performance perfectly. Higher quantizations (Q6, Q8) offer diminishing returns for coding tasks while consuming significantly more RAM.
3.  **Load:** Navigate to the **Local Server** tab (the `<->` icon).
4.  **Select Model:** Use the dropdown at the very top to select the Qwen model you just downloaded.
5.  **Set Context:** In the right-hand sidebar, find **Context Length**. Set this to `8192` or `16384` if your hardware supports it. Coding tasks require seeing multiple files, so a larger context window is critical.
6.  **Start Server:** Click the green **Start Server** button.
    *   Verify it's running by checking the logs for: `Server listening on http://localhost:1234/v1`.

## 4. Point Codex at LM Studio

Now, we update Codex's configuration to ignore the cloud and talk to `localhost`.

1.  Locate your configuration file:
    *   **macOS/Linux:** `~/.codex/config.toml`
    *   **Windows:** `%USERPROFILE%\.config\codex\config.toml`
2.  Open the file in your favorite editor and add the following configuration:

```toml
# Set the default model and provider
model = "qwen/qwen2.5-coder-14b"
model_provider = "lmstudio"

# Define the LM Studio provider
[model_providers.lmstudio]
name = "LM Studio"
# The default LM Studio server address
base_url = "http://localhost:1234/v1"
# Tell Codex this endpoint behaves like OpenAI's chat API
wire_api = "chat"
# Retries help if the local model is busy processing a previous token
request_max_retries = 4
stream_max_retries = 10
# Important: Local generation can be slower than cloud.
# 5 minutes (300,000ms) prevents timeouts on long code blocks.
stream_idle_timeout_ms = 300000
```

3.  Save the file. Codex is now re-wired.

# 🧪 Example

Let's verify everything is working.

1.  **Check LM Studio:** Ensure the server is running in the LM Studio window.
2.  **Run a Command:** Open your terminal and ask Codex to write some code:

    ```bash
    codex "Write a Python function to parse a CSV file and return a dictionary of records."
    ```

3.  **Observe:**
    *   **Terminal:** You should see code streaming into your terminal.
    *   **LM Studio:** Watch the "Server Logs" area. You will see a `POST /v1/chat/completions` request, followed by streaming token generation.

If the response is coherent and pertains to CSV parsing, congratulations! You are running on local silicon.

# ❌ Troubleshooting

**"Connection Refused" Error**
*   Is LM Studio running?
*   Did you click "Start Server"?
*   Is the port `1234` correct? Check the port in LM Studio's server tab.

**Model Hallucinations / Gibberish**
*   Ensure you downloaded the **Instruct** version of Qwen 2.5 Coder, not the Base version. The Base version completes text but doesn't follow instructions well.

**Slow Generation**
*   If token generation is extremely slow (< 5 tokens/sec), your model might be offloading to system RAM instead of GPU VRAM. Try a smaller model (like `Qwen 2.5 Coder 7B`) or a lower quantization (Q3_K_S).

# 🚀 Take it further

Your local setup is ready, but you can optimize it for a true power-user workflow:

*   **Enable GPU Offload:** In LM Studio, ensure the "GPU Offload" slider is set to Max. This moves the entire model to VRAM for significantly faster generation.
*   **Local Tools:** If your Codex version supports tool use, enable "unsafe" mode to allow the local model to read files, run shell commands, and edit code directly. Since it's local, the security risk is contained to your user environment.
*   **Multi-Model Architecture:** Run two instances of LM Studio on different ports (e.g., `1234` and `1235`). Configure Codex to use a small model (7B) for quick chat and a large model (32B) for complex architecture planning.
*   **Backup:** Backup your `~/.config/codex` folder. It's the brain of your operation now.

# ✅ Done

That's it! You've successfully decoupled Codex from the cloud and are now running a powerful, private AI development environment right on your desktop. Enjoy the privacy, control, and freedom of local-first AI.
