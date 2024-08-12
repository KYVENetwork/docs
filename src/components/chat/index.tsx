import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { Skeleton } from "./Skeleton";
import Link from "../../../static/img/homepage/link.svg";

export interface Identifiers {
  thread_id: string;
  question_answer_id: string;
}

export interface Message {
  sources?: {
    source_url: string;
    title: string;
  }[];
  content: string;
  finished: boolean;
  bot: boolean;
}

const Chat = ({ big }: { big?: boolean }) => {
  const [focus, setFocus] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [identifiers, setIdentifiers] = useState<Identifiers>();
  const [answer, setAnswer] = useState<Message>({
    content: "",
    finished: false,
    bot: true,
  });
  const [generating, setGenerating] = useState(false);

  const [question, setQuestion] = useState("");

  const process_stream = async (response: Response) => {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");
    const delimiter = "\u241E";
    const delimiterBytes = new TextEncoder().encode(delimiter);
    let buffer = new Uint8Array();

    const findDelimiterIndex = (arr) => {
      for (let i = 0; i < arr.length - delimiterBytes.length + 1; i++) {
        let found = true;
        for (let j = 0; j < delimiterBytes.length; j++) {
          if (arr[i + j] !== delimiterBytes[j]) {
            found = false;
            break;
          }
        }
        if (found) {
          return i;
        }
      }
      return -1;
    };

    let result;
    while (true) {
      result = await reader.read();
      if (result.done) break;
      buffer = new Uint8Array([...buffer, ...result.value]);
      let delimiterIndex;
      while ((delimiterIndex = findDelimiterIndex(buffer)) !== -1) {
        const chunkBytes = buffer.slice(0, delimiterIndex);
        const chunkText = decoder.decode(chunkBytes);
        buffer = buffer.slice(delimiterIndex + delimiterBytes.length);
        let chunk = JSON.parse(chunkText);

        if (chunk.chunk.type === "relevant_sources") {
          answer.finished = chunk.chunk.stream_end;
          setAnswer((p) => {
            return {
              content: p.content,
              bot: true,
              finished: chunk.chunk.stream_end,
              sources: chunk.chunk.content.relevant_sources,
            };
          });
        } else if (chunk.chunk.type === "partial_answer") {
          setAnswer((p) => {
            return {
              content: p.content + chunk.chunk.content.text,
              bot: true,
              finished: chunk.chunk.stream_end,
              sources: p.sources,
            };
          });
        } else if (chunk.chunk.type === "identifiers") {
          answer.finished = chunk.chunk.stream_end;
          setIdentifiers(chunk.chunk.content);
        } else if (chunk.chunk.type === "error") {
          setAnswer((p) => {
            return {
              content: chunk.chunk.content.reason,
              bot: true,
              finished: chunk.chunk.stream_end,
              sources: p.sources,
            };
          });
          break;
        }
      }
    }
  };

  const askQuestion = async (question: string) => {
    if (question == null || question === "" || generating) return;
    setFocus(true);
    try {
      setMessages([
        ...messages,
        {
          content: question,
          bot: false,
          finished: true,
        },
      ]);
      setQuestion("");
      setGenerating(true);

      let response: Response;

      if (identifiers) {
        response = await fetch(
          `https://cache.kyve.network/kapaai/query/v1/thread/${identifiers.thread_id}/stream?` +
            new URLSearchParams({
              query: question,
              thread_id: identifiers.thread_id,
            }),
          {
            method: "GET",
          }
        );
      } else {
        response = await fetch(
          `https://cache.kyve.network/kapaai/query/v1/stream?` +
            new URLSearchParams({
              query: question,
            }),
          {
            method: "GET",
          }
        );
      }

      if (response.status === 200) {
        await process_stream(response);
      } else {
        const message = await response.text();
        console.error("Error fetching data:", message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGenerating(false);
      setAnswer((p) => {
        return {
          content: p.content,
          bot: true,
          finished: true,
          sources: p.sources,
        };
      });
    }
  };

  useEffect(() => {
    if (answer.finished) {
      setMessages([...messages, answer]);
      setAnswer({
        sources: [],
        content: "",
        finished: false,
        bot: true,
      });
    }
  }, [answer]);

  const SUGGESTIONS = [
    {
      title: "What is $KYVE? ELI5",
      emoji: "👶",
    },
    {
      title: "How to participate?",
      emoji: "🙋‍♂️",
    },
    {
      title: "What is trustless data?",
      emoji: "🔎",
    },
    {
      title: "How to use KSYNC?",
      emoji: "🚰",
    },
  ];

  const RenderGenerating = () => {
    if (!generating) return <></>;
    if (answer.content === "") {
      return <Skeleton />;
    }
    return <MessageBox message={answer} />;
  };

  return (
    <div
      className={
        "bg-surfaceContainer p-4 rounded-xl mx-auto transition-all " + (focus || big ? "w-full" : "w-full md:w-2/3")
      }
    >
      <div className="text-center font-bold text-3xl mb-6">
        Ask anything about KYVE
      </div>
      <div className="border-wrap rounded-xl w-full">
        <div className="w-full rounded-xl root-background">
          <div className="flex flex-col p-4 w-full rounded-xl bg-surface border border-outline-variant border-solid">
            {!big && (
              <div className="text-right text-primary">
                <Link
                  onClick={() => setFocus(!focus)}
                  className="cursor-pointer"
                />
              </div>
            )}
            <div className="max-h-[60dvh] overflow-auto flex flex-col-reverse no-scrollbar messages">
              <RenderGenerating />
              {messages
                .slice()
                .reverse()
                .map((x) => (
                  <MessageBox message={x} key={x.content} />
                ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                askQuestion(question);
              }}
            >
              <div className="flex w-full border border-outline-variant border-solid p-2 mt-2 rounded-lg">
                <input
                  className="outline-none border-none bg-transparent text-lg w-full"
                  placeholder="Ask me anything..."
                  value={question}
                  disabled={generating}
                  onChange={(x) => setQuestion(x.target.value)}
                />
                <button
                  className="ml-auto bg-primary text-on-primary font-bold w-24 rounded-full outline-none border-none disabled:opacity-50 transition-all"
                  type="submit"
                  disabled={generating || question === ""}
                >
                  Ask
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 max-md:grid-cols-1">
        {SUGGESTIONS.map((s, i) => (
          <div
            key={s.title + i}
            className="dark:bg-black dark:bg-opacity-25 dark:border-none rounded-xl p-1 cursor-pointer select-none slideIn border border-solid border-black border-opacity-20 h-10 flex items-center"
            style={{
              animationDelay: (i + 5) * 100 + "ms",
            }}
            onClick={() => {
              askQuestion(s.title);
            }}
          >
            <span className="p-1">{s.emoji}</span> {s.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
