import { useEffect, useRef, useState } from 'react';
import '../styles/tokens.css'
import '../styles/askarchive.css';

const secret = import.meta.env.PUBLIC_APP_SECRET;
const endpoint = import.meta.env.PUBLIC_RAG_ENDPOINT;

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

    setHistory((prev) => [
      ...prev,
      { id, question: currentQuestion, answer: '', sources: [], status: 'loading' }
    ]);

    // Call your API or logic to get the answer based on the question
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Secret': secret
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      setHistory((prev) => prev.map((exchange) =>
        exchange.id === id
          ? { ...exchange, answer: data.answer, sources: data.sources, status: 'done' }
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
      <div className="ask-history">
        {history.map((exchange) => (
          <div key={exchange.id} className="exchange">
            <div className="question">
               {exchange.question}
            </div>
            {exchange.status === 'loading' && <div className="answer">Loading...</div>}
            {exchange.status === 'error' && <div className="answer">Error: {exchange.error}</div>}
            {exchange.status === 'done' && (
              <div className="answer">
                <strong>A:</strong> {exchange.answer}
                {exchange.sources.length > 0 && (
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
        <div ref={historyEndRef} />
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
