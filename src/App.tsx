/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Terminal, 
  Mic, 
  Monitor, 
  Keyboard, 
  Globe, 
  Copy, 
  Check, 
  Download, 
  Cpu, 
  Play,
  Settings,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-8 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-400" />
          <span className="text-xs font-mono text-zinc-400">{title}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors text-zinc-400 hover:text-white"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto text-sm font-mono text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function App() {
  const pythonCode = `import speech_recognition as sr
import pyttsx3
import pyautogui
import webbrowser
import os
import time
import random

# Initialize Text-to-Speech engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)  # Set voice (usually 0 is male, 1 is female)
engine.setProperty('rate', 170)           # Speed of speech

def speak(text):
    """Function to make the assistant speak"""
    print(f"Assistant: {text}")
    engine.say(text)
    engine.runAndWait()

def get_response(action, target=""):
    """Returns a natural-sounding random response for a given action"""
    responses = {
        "open": [
            f"Sure, opening {target} now.",
            f"Launching {target} for you.",
            f"Alright, I'm opening {target}.",
            f"Right away! Opening {target}."
        ],
        "search": [
            f"Searching Google for {target}.",
            f"Looking up {target} on the web.",
            f"Let me find that for you. Searching for {target}.",
            f"One moment, searching for {target}."
        ],
        "type": [
            f"Typing {target} for you.",
            f"Alright, I'll type that out.",
            f"Got it. Typing: {target}",
            f"Starting to type {target} now."
        ],
        "stop": [
            "Goodbye! Have a wonderful day.",
            "Shutting down. See you later!",
            "Alright, stopping the assistant. Take care!",
            "Goodbye! I'm here if you need me again."
        ]
    }
    
    if action in responses:
        return random.choice(responses[action])
    return f"Executing {action} {target}"

def take_command():
    """Function to listen to microphone and return text"""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("\\nListening...")
        recognizer.pause_threshold = 1
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        query = recognizer.recognize_google(audio, language='en-in')
        print(f"User said: {query}\\n")
    except Exception as e:
        print("Could not understand, please say that again...")
        return "None"
    return query.lower()

def execute_command(query):
    """Logic to handle various commands"""
    
    # 1. Open Websites
    if 'open youtube' in query:
        speak(get_response("open", "YouTube"))
        webbrowser.open("https://www.youtube.com")

    elif 'open google' in query:
        speak(get_response("open", "Google"))
        webbrowser.open("https://www.google.com")

    # 2. Search Google
    elif 'search' in query:
        search_query = query.replace("search", "").strip()
        speak(get_response("search", search_query))
        webbrowser.open(f"https://www.google.com/search?q={search_query}")

    # 3. Open System Applications
    elif 'open notepad' in query:
        speak(get_response("open", "Notepad"))
        os.system("notepad")

    elif 'open calculator' in query:
        speak(get_response("open", "Calculator"))
        os.system("calc")

    elif 'open chrome' in query:
        speak(get_response("open", "Google Chrome"))
        # Note: Path might vary based on your Windows installation
        os.startfile("C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe")

    # 4. Keyboard Control (Typing)
    elif 'type' in query:
        text_to_type = query.replace("type", "").strip()
        speak(get_response("type", text_to_type))
        time.sleep(2) # Give user time to click where they want to type
        pyautogui.write(text_to_type, interval=0.1)

    # 5. Stop the Assistant
    elif 'stop assistant' in query:
        speak(get_response("stop"))
        exit()

# Main Loop
if __name__ == "__main__":
    speak("Hello! I am your AI Assistant. How can I help you today?")
    
    while True:
        command = take_command()
        
        if command != "none":
            execute_command(command)
`;

  const setupSteps = [
    {
      title: "Install Python",
      desc: "Download and install Python from python.org. Ensure 'Add Python to PATH' is checked.",
      icon: <Cpu size={20} />
    },
    {
      title: "Install Libraries",
      desc: "Open terminal/cmd and run: pip install SpeechRecognition pyttsx3 pyautogui PyAudio",
      icon: <Settings size={20} />
    },
    {
      title: "Microphone Access",
      desc: "Ensure your microphone is connected and set as the default recording device.",
      icon: <Mic size={20} />
    },
    {
      title: "Run Script",
      desc: "Save the code as 'assistant.py' and run it using: python assistant.py",
      icon: <Play size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header / Hero */}
      <header className="relative border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <ShieldCheck size={14} />
              <span>Windows Automation Suite</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Python AI <br />
              Assistant
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
              A powerful, voice-activated automation script for Windows. Control your browser, 
              launch apps, and automate typing with simple speech commands.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#code" 
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
              >
                <Download size={18} />
                Get Source Code
              </a>
              <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                <Play size={18} />
                View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Setup & Guide */}
          <div className="lg:col-span-5 space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Settings className="text-emerald-400" />
                Setup Instructions
              </h2>
              <div className="space-y-6">
                {setupSteps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Keyboard className="text-emerald-400" />
                Command Reference
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: "open chrome", action: "Launches Google Chrome" },
                  { cmd: "open youtube", action: "Opens YouTube in browser" },
                  { cmd: "search [query]", action: "Searches Google for query" },
                  { cmd: "open notepad", action: "Opens Windows Notepad" },
                  { cmd: "type [text]", action: "Automates keyboard typing" },
                  { cmd: "stop assistant", action: "Terminates the script" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                    <code className="text-emerald-400 text-sm font-mono">"{item.cmd}"</code>
                    <span className="text-zinc-500 text-xs">{item.action}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-sm text-zinc-400 italic">
                "This assistant uses the Google Speech Recognition API, which requires an active internet connection for high accuracy."
              </p>
            </div>
          </div>

          {/* Right Side: Code Display */}
          <div className="lg:col-span-7" id="code">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Terminal className="text-emerald-400" />
                  Source Code
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
              </div>
              
              <CodeBlock title="assistant.py" code={pythonCode} />
              
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Need more features?</h4>
                  <p className="text-zinc-400 text-sm">
                    You can extend this by adding <code className="text-emerald-400">os.startfile</code> for custom apps 
                    or <code className="text-emerald-400">pyautogui.click()</code> for mouse control.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-zinc-900 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="text-emerald-500" size={24} />
            <span className="font-bold tracking-tight">PYTHON AI ASSISTANT</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 Python Automation Tools. Open Source MIT License.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Globe size={20} /></a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Terminal size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
