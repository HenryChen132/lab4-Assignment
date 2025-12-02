let apiBase = import.meta.env.VITE_API_BASE;

if (!apiBase) {
  const isBrowser = typeof window !== "undefined";

  if (
    isBrowser &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    apiBase = "http://localhost:5000/api";
  } else {
    apiBase = "https://lab4-assignment-ytmg.onrender.com/api";
  }
}

export default apiBase;
