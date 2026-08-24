---
title: Configuring LLM APIs
date: 2026-08-24
type: post
---

```yaml
- Kimi-Code:
    api:
      - type: openai
        baseUrl: https://api.kimi.com/coding/v1
      - type: anthropic
        baseUrl: https://api.kimi.com/coding/
    models:
      - id: k3
        name: "Kimi K3 (1M)"
        toolCalling: true
        vision: true
        maxInputTokens: 1048576
        maxOutputTokens: 32000
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: k3-256k
        name: "Kimi K3 (256K)"
        toolCalling: true
        vision: true
        maxInputTokens: 256000
        maxOutputTokens: 32000
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: kimi-for-coding
        name: "Kimi K2.7 Code"
        toolCalling: true
        vision: true
        maxInputTokens: 256000
        maxOutputTokens: 32000
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: kimi-for-coding-highspeed
        name: "Kimi K2.7 Code HighSpeed"
        toolCalling: true
        vision: true
        maxInputTokens: 256000
        maxOutputTokens: 32000
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
- DeepSeek:
    api:
      - type: openai
        baseUrl: https://api.deepseek.com
      - type: openai-chat-completions
        baseUrl: https://api.deepseek.com/chat/completions
      - type: openai-responses
        baseUrl: https://api.deepseek.com/responses
      - type: anthropic
        baseUrl: https://api.deepseek.com/anthropic
    models:
      - id: deepseek-v4-pro
        name: "DeepSeek V4 Pro"
        toolCalling: true
        vision: false
        maxInputTokens: 1048576
        maxOutputTokens: 393216
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 1
      - id: deepseek-v4-flash
        name: "DeepSeek V4 Flash"
        toolCalling: true
        vision: false
        maxInputTokens: 1048576
        maxOutputTokens: 393216
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 1
      - id: deepseek-v4-flash-vision-exp
        name: "DeepSeek V4 Flash Vision (Exp)"
        toolCalling: true
        vision: true
        maxInputTokens: 1048576
        maxOutputTokens: 393216
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 1
- Xiaomi-MiMo:
    api:
      - type: openai
        baseUrl: https://api.xiaomimimo.com/v1
      - type: anthropic
        baseUrl: https://api.xiaomimimo.com/anthropic
    models:
      - id: mimo-v2.5-pro
        name: "MiMo V2.5 Pro"
        toolCalling: true
        vision: false
        maxInputTokens: 1048576
        maxOutputTokens: 131072
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: mimo-v2.5
        name: "MiMo V2.5"
        toolCalling: true
        vision: true
        maxInputTokens: 1048576
        maxOutputTokens: 131072
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: mimo-v2.5-asr
        name: "MiMo V2.5 ASR"
        toolCalling: false
        vision: false
        maxInputTokens: 8192
        maxOutputTokens: 2048
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: mimo-v2.5-tts
        name: "MiMo V2.5 TTS"
        toolCalling: false
        vision: false
        maxInputTokens: 8192
        maxOutputTokens: 8192
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: mimo-v2.5-tts-voiceclone
        name: "MiMo V2.5 TTS VoiceClone"
        toolCalling: false
        vision: false
        maxInputTokens: 8192
        maxOutputTokens: 8192
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
      - id: mimo-v2.5-tts-voicedesign
        name: "MiMo V2.5 TTS VoiceDesign"
        toolCalling: false
        vision: false
        maxInputTokens: 8192
        maxOutputTokens: 8192
        streaming: true
        modelOptions:
          temperature: 1
          top_p: 0.95
```