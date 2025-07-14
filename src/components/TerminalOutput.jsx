import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const isHTMLLine = (line) =>
  line.includes('<a ') || line.includes('<strong') || line.includes('<br') || line.includes('&nbsp;');

const TerminalOutput = ({ lines, onComplete }) => {
  const [renderedLines, setRenderedLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentIndex >= lines.length || isTyping) return;

    const currentLine = lines[currentIndex];

    if (isHTMLLine(currentLine)) {
      setRenderedLines((prev) => [
        ...prev,
        { type: 'html', content: currentLine },
      ]);

      const isLast = currentIndex + 1 === lines.length;
      setCurrentIndex((prev) => prev + 1);

      if (isLast) {
        onComplete?.(); // ✅ ensure completion if last line is HTML
      }
    } else {
      setIsTyping(true);
    }
  }, [currentIndex, isTyping, lines]);

  const handleTypeDone = () => {
    const typedLine = lines[currentIndex];

    setRenderedLines((prev) => [
      ...prev,
      { type: 'text', content: typedLine },
    ]);

    const isLast = currentIndex + 1 === lines.length;

    setCurrentIndex((prev) => prev + 1);
    setIsTyping(false);

    if (isLast) {
      onComplete?.(); // ✅ ensure completion if last line is text
    }
  };

  return (
    <div className="mt-1 font-mono text-white space-y-1 leading-relaxed">
      {renderedLines.map((line, i) =>
        line.type === 'html' ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: line.content }} />
        ) : (
          <div key={i}>{line.content}</div>
        )
      )}

      {isTyping && currentIndex < lines.length && (
        <TypeAnimation
          key={currentIndex}
          sequence={[lines[currentIndex], handleTypeDone]}
          speed={90}
          wrapper="div"
          cursor={false}
          className="whitespace-pre-line"
        />
      )}
    </div>
  );
};

export default TerminalOutput;
