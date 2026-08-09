// src/scripts/github-repos.ts
// Fills pre-existing slot elements via textContent only — never
// builds or injects HTML. Cache is revalidated weekly, independent
// of deploys: if a visitor's cached copy is under a week old, it's
// shown with zero network request; otherwise a fresh fetch runs.

interface Repo {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    html_url: string;
    updated_at: string;
    created_at: string;
    topics: string[];
    open_issues_count: number;
    license: { name: string } | null;
  }
  
  interface CachePayload {
    repos: Repo[];
    fetched_at: number;
  }
  
  const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  }
  
  function formatSyncTime(ms: number) {
    return new Date(ms).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  }
  
  function setText(id: string, text: string) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  
  function show(id: string) {
    const el = document.getElementById(id);
    if (el) el.style.display = "";
  }
  
  function hide(id: string) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }
  
  function fillSlot(i: number, repo: Repo) {
    const nameLink = document.getElementById(`slot-${i}-name`) as HTMLAnchorElement | null;
    if (nameLink) {
      nameLink.textContent = repo.name;
      nameLink.href = repo.html_url;
    }
  
    setText(`slot-${i}-stars`, repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : "");
  
    const topicsEl = document.getElementById(`slot-${i}-topics`);
    if (topicsEl) {
      while (topicsEl.firstChild) topicsEl.removeChild(topicsEl.firstChild);
      repo.topics.forEach((topic) => {
        const span = document.createElement("span");
        span.textContent = topic;
        topicsEl.appendChild(span);
      });
    }
  
    if (repo.language) {
      setText(`slot-${i}-lang`, repo.language);
      show(`slot-${i}-lang-field`);
    } else {
      hide(`slot-${i}-lang-field`);
    }
  
    setText(`slot-${i}-created`, formatDate(repo.created_at));
    setText(`slot-${i}-updated`, formatDate(repo.updated_at));
  
    if (repo.license) {
      setText(`slot-${i}-license`, repo.license.name);
      show(`slot-${i}-license-field`);
    } else {
      hide(`slot-${i}-license-field`);
    }
  
    if (repo.open_issues_count > 0) {
      setText(`slot-${i}-issues`, `${repo.open_issues_count} open`);
      show(`slot-${i}-issues-field`);
    } else {
      hide(`slot-${i}-issues-field`);
    }
  
    if (repo.description) {
      setText(`slot-${i}-note`, repo.description);
      show(`slot-${i}-note-field`);
    } else {
      hide(`slot-${i}-note-field`);
    }
  
    show(`slot-${i}`);
  }
  
  function renderRepos(repos: Repo[]) {
    repos.forEach((repo, i) => fillSlot(i, repo));
    for (let i = repos.length; i < 20; i++) {
      const el = document.getElementById(`slot-${i}`);
      if (!el) break;
      hide(`slot-${i}`);
    }
  }
  
  async function loadRepos() {
    const container = document.getElementById("github-repos");
    if (!container) return;
  
    const username = "suriyaakumar";
    const cacheKey = `gh-repos-cache:${username}`;
    const statusEl = document.getElementById("repos-status")!;
    const noticeEl = document.getElementById("repos-notice")!;
    const syncEl = document.getElementById("repos-sync")!;
  
    let cached: CachePayload | null = null;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch {
      // ignore corrupt/inaccessible cache
    }
  
    if (cached) {
      renderRepos(cached.repos);
      syncEl.textContent = `Last synced: ${formatSyncTime(cached.fetched_at)}`;
      statusEl.textContent = `${cached.repos.length} SHOWN`;
  
      const isFresh = Date.now() - cached.fetched_at < CACHE_TTL_MS;
      if (isFresh) return; // under a week old — done, no network request
    }
  
    // Cache missing or older than a week — fetch fresh data.
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  
      const all = await res.json();
      const repos: Repo[] = all
        .filter((r: any) => !r.fork)
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((r: any) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          html_url: r.html_url,
          updated_at: r.updated_at,
        }));
  
      const payload: CachePayload = { repos, fetched_at: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(payload));
  
      renderRepos(repos);
      statusEl.textContent = `${repos.length} SHOWN`;
      syncEl.textContent = `Last synced: ${formatSyncTime(payload.fetched_at)}`;
      noticeEl.textContent = "";
    } catch {
      if (cached) {
        statusEl.textContent = "CACHED";
        noticeEl.textContent = "Couldn't refresh — showing last known data.";
      } else {
        statusEl.textContent = "ERR";
        noticeEl.textContent = "Couldn't load repository data.";
      }
    }
  }
  
  loadRepos();