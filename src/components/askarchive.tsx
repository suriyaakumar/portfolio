import { useEffect, useRef, useState } from 'react';
import '../styles/tokens.css'
import '../styles/askarchive.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Source = {
  title: string;
  score: number;
};

type Exchange = {
  id: string;
  question: string;
  answer: string;
  sources: Source[];
  status: 'loading' | 'done' | 'error';
  error?: string;
};

export default function AskArchive() {
  const [history, setHistory] = useState<Exchange[]>([]);
  const [question, setQuestion] = useState('');
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    const id = crypto.randomUUID();
    const currentQuestion = question;
    setQuestion('');

    const priorTurns = history
      .filter((ex) => ex.status === 'done')
      .slice(-4)
      .map((ex) => ({ question: ex.question, answer: ex.answer }));

    setHistory((prev) => [
      ...prev,
      { id, question: currentQuestion, answer: '', sources: [], status: 'loading' }
    ]);

    // Call your API or logic to get the answer based on the question
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentQuestion, history: priorTurns }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      setHistory((prev) => prev.map((exchange) =>
        exchange.id === id
          ? { ...exchange, answer: data.answer ?? '', sources: Array.isArray(data.sources) ? data.sources : [], status: 'done' }
          : exchange
      ));
    }
    catch (err) {
      setHistory((prev) => prev.map((exchange) =>
        exchange.id === id
          ? { ...exchange, answer: '', sources: [], status: 'error', error: 'Failed to get answer' }
          : exchange
      ));
    }
  };

  return (
    <div className="ask-archive">
      <div className={`ask-history${history.length === 0 ? ' ask-history-empty' : ''}`}>
        {history.length === 0 && (
          <section className="ask-welcome" aria-labelledby="ask-welcome-title">
            <span className="ask-welcome-label">[MEMORY]</span>
            <h1 id="ask-welcome-title">Ask the archive</h1>
            <p>Explore the ideas and themes in my writing.</p>
            <ul>
              <li>Ask about a topic, an idea, or a specific post.</li>
              <li>Follow-up questions can use the recent conversation for context.</li>
            </ul>
            <p className="ask-welcome-note">
              MEMORY only answers from the writing archive.
              AI-generated answers can still be incomplete or inaccurate.
              Check the original posts in <a href="/heart">the writing archive</a>.
            </p>
          </section>
        )}
        {history.map((exchange) => (
          <div key={exchange.id} className="exchange">
            <div className="question">
               {exchange.question}
            </div>
            {exchange.status === 'loading' && <div className="answer">Loading...</div>}
            {exchange.status === 'error' && <div className="answer">Error: {exchange.error}</div>}
            {exchange.status === 'done' && (
              <div className="answer">
                <strong>A:</strong>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {exchange.answer}
                </ReactMarkdown>
                {Array.isArray(exchange.sources) && exchange.sources.length > 0 && (
                  <div className="sources">
                    <strong>Sources:</strong>
                    <ul>
                      {exchange.sources.map((source, index) => (
                        <li key={index}>
                          {source.title} (Score: {source.score})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {history.length > 0 && <div ref={historyEndRef} />}
      </div>
      <form onSubmit={handleSubmit} className="ask-input-row">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
