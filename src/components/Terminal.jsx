import React, { useEffect, useRef, useState, useCallback } from 'react';
import  TerminalOutput  from './TerminalOutput.jsx';
import commands from '../assets/commands.js';

const Terminal = () => {
  const [history, setHistory] = useState([{ command: 'welcome', done: true }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]); // stores previous commands
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1); // -1 means not navigating

  // Add ref for scroll container
  const terminalRef = useRef(null);

  // Stable scroll-to-bottom function
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

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
    setCmdHistory((prev) => (cmd && (prev[prev.length-1] !== cmd) ? [...prev, cmd] : prev));
    setCmdHistoryIndex(-1);
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

  // Keyboard navigation for input
  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      // Auto-complete command (like Tab in terminal)
      const available = Object.keys(commands);
      if (input) {
        const matches = available.filter(cmd => cmd.startsWith(input));
        if (matches.length > 0) {
          setInput(matches[0]);
        }
      }
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const newIndex = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
        setCmdHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex] || '');
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (cmdHistory.length > 0 && cmdHistoryIndex !== -1) {
        const newIndex = cmdHistoryIndex + 1;
        if (newIndex < cmdHistory.length) {
          setCmdHistoryIndex(newIndex);
          setInput(cmdHistory[newIndex] || '');
        } else {
          setCmdHistoryIndex(-1);
          setInput('');
        }
      }
      e.preventDefault();
    }
  };

  return (
    <div ref={terminalRef} className="p-4 pb-8 h-full overflow-y-auto text-sm">
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
              onUpdate={scrollToBottom}
            />
          )}
        </div>
      ))}

      { (
        <form className='overflow-y-visible' onSubmit={handleCommand}>
          <span className="text-[#3fb950]">ayush@prajapat:~$ </span>
          <input
            className="bg-transparent border-none outline-none text-[#539bf5]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
        </form>
      )}
    </div>
  );
};

export default Terminal;