import React, { useEffect, useRef, useState } from 'react';
import  TerminalOutput  from './TerminalOutput.jsx';
import commands from '../assets/commands.js';

const Terminal = () => {
  const [history, setHistory] = useState([{ command: 'welcome', done: true }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { command: cmd, done: false }]);
      setIsTyping(true);
    }

    setInput('');
  };

  const updateLineDone = (index) => {
    setHistory((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: true } : item
      )
    );
    setIsTyping(false);
  };

  return (
    <div className="p-4 h-full overflow-y-auto text-sm">
      <div className="text-[#adbac7] hidden md:block mb-2 flex flex-wrap gap-2 border-b border-[#444c56]">
        {"help about projects skills experience contact education certifications clear"
          .split(" ")
          .map((cmd, i) => (
            <span key={i}>| {cmd} </span>
          ))}
        |
      </div>

      {history.map((entry, index) => (
        <div key={index} className="mb-2">
          <div className="text-[#3fb950]">
            ayush@prajapat:~$ <span className="text-[#539bf5]">{entry.command}</span>
          </div>
          {entry.command === 'welcome' ? (
            <div className="whitespace-pre-line text-white mt-1">
              {commands['welcome'].join('\n')}
            </div>
          ) : (
            <TerminalOutput
              lines={commands[entry.command] || ['Command not found. Type "help" for available commands.']}
              onComplete={() => updateLineDone(index)}
            />
          )}
        </div>
      ))}

      {!isTyping && (
        <form onSubmit={handleCommand}>
          <span className="text-[#3fb950]">ayush@portfolio:~$ </span>
          <input
            className="bg-transparent border-none outline-none text-[#539bf5]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default Terminal;