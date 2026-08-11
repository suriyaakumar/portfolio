
const btn = document.getElementById("share-btn");
const fallback = document.getElementById("share-fallback");
const shareStatus = document.getElementById("share-status");
const url = window.location.href;
const title = document.title;

(document.getElementById("share-x") as HTMLAnchorElement).href =
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
(document.getElementById("share-linkedin") as HTMLAnchorElement).href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

btn?.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({ title, url });
        } catch {
            // user cancelled the share sheet — do nothing
        }
    } else {
        fallback?.removeAttribute("hidden");
    }
});

document.getElementById("share-copy")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(url);
    if (shareStatus) {
        shareStatus.textContent = "COPIED";
        setTimeout(() => (shareStatus.textContent = ""), 2000);
    }
});