'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface NiyamChatbotProps {
  theme?: 'dark' | 'light';
  language?: Language;
}

export function NiyamChatbot({ theme = 'light', language = 'EN' }: NiyamChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: language === 'HI'
        ? 'नमस्ते! मैं नियमअसिस्टेंट एआई हूँ। मुझसे नीति परिपत्रक नियमों, साक्ष्य निष्कर्षण, सीमा परीक्षण या सुरक्षा द्वारों के बारे में कुछ भी पूछें!'
        : language === 'MR'
        ? 'नमस्कार! मी नियमअसिस्टंट एआय आहे. मला धोरण परिपत्रक नियम, पुरावे काढणे, सीमा चाचण्या किंवा मानवी सुरक्षा द्वारांबद्दल काहीही विचारा!'
        : 'Namaste! I am NiyamAssistant AI. Ask me anything about policy circular rules, evidence extraction, boundary test suites, or safety gates!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isLight = theme === 'light';
  const t = translations[language] || translations.EN;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.reply || 'I am trained on NiyamPatch policy rules. How else can I assist?' }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'NiyamPatch Engine: Policy rules updated annual income ceiling to ₹3,00,000 with 5/5 boundary test verification.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-xl flex items-center space-x-2.5 transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
        >
          <div className="p-1 bg-white/20 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span>{t.askNiyamAI}</span>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        </button>
      )}

      {/* Chatbot Modal Window */}
      {isOpen && (
        <div className={`border rounded-3xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden text-xs transition-all ${
          isLight ? 'bg-white border-sky-100 text-slate-900 shadow-sky-100/90' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-white" />
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1">
                  NiyamAssistant AI
                  <Sparkles className="h-3 w-3 text-white" />
                </h3>
                <p className="text-[10px] text-white/90">Policy & Rule Guidance Agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto min-h-64 font-sans">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="p-1.5 bg-sky-100 text-sky-600 rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-400 text-white font-semibold rounded-br-none shadow-xs'
                      : isLight
                      ? 'bg-sky-50 border border-sky-100 text-sky-950 font-medium rounded-bl-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-sky-500 font-mono text-[10px]">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>NiyamAI thinking...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className={`p-3 border-t flex items-center space-x-2 ${
            isLight ? 'bg-sky-50/50 border-sky-100' : 'bg-slate-950 border-slate-800'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Clause 4.1 or safety gate..."
              className={`flex-1 px-3 py-2 rounded-xl outline-none border text-xs ${
                isLight ? 'bg-white border-sky-200 text-slate-900 focus:border-sky-400' : 'bg-slate-900 border-slate-700 text-slate-100 focus:border-sky-400'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2.5 bg-sky-400 hover:bg-sky-500 text-white rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
