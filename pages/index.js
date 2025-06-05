import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setPlaying(null);
    if (!query.trim()) return;
    try {
      const { data } = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(data.items || []);
    } catch {
      setResults([]);
      alert("Error fetching results.");
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#18181b", color: "#fff", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>
        PK MUSIC DOWNLOADER
      </h1>
      <form onSubmit={search} style={{ display: "flex", maxWidth: 600, marginBottom: 32 }}>
        <input
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "0.5rem 0 0 0.5rem",
            border: "none",
            color: "#222",
            fontSize: "1.1rem",
          }}
          placeholder="Search for a song or artist..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "0.5rem 1.5rem",
            border: "none",
            borderRadius: "0 0.5rem 0.5rem 0",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 700 }}>
        {results.map((item) => (
          <div key={item.id.videoId} style={{
            display: "flex",
            alignItems: "center",
            background: "#27272a",
            borderRadius: 12,
            padding: 18,
            boxShadow: "0 1px 6px #0002"
          }}>
            <img src={item.snippet.thumbnails.default.url} alt=""
              style={{ width: 64, height: 64, borderRadius: 8, marginRight: 20 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{item.snippet.title}</div>
              <div style={{ fontSize: 14, color: "#a3a3a3" }}>{item.snippet.channelTitle}</div>
            </div>
            <button
              style={{
                background: "#22c55e",
                color: "#fff",
                padding: "0.5rem 1.1rem",
                border: "none",
                borderRadius: 6,
                fontWeight: "bold",
                marginRight: 10,
                cursor: "pointer"
              }}
              onClick={() => setPlaying(item.id.videoId)}
            >
              Play
            </button>
            <a
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "0.5rem 1.1rem",
                borderRadius: 6,
                fontWeight: "bold",
                textDecoration: "none"
              }}
              href={`/api/download?id=${item.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        ))}
      </div>
      {playing && (
        <div style={{
          position: "fixed",
          zIndex: 20,
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          width: 360,
          background: "#18181b",
          border: "2px solid #2563eb",
          borderRadius: 16,
          boxShadow: "0 8px 24px #0004",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <iframe
            width="320"
            height="80"
            src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
            title="Music preview"
            allow="autoplay"
            style={{ borderRadius: 12, marginBottom: 10 }}
          />
          <button
            onClick={() => setPlaying(null)}
            style={{
              background: "#ef4444",
              color: "#fff",
              padding: "0.25rem 1.2rem",
              border: "none",
              borderRadius: 6,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
                 }
