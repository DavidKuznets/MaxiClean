export function getCookie(name: string): string | null {
  let cookieValue = null;

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

export async function ensureCsrfToken(apiBaseUrl: string): Promise<string> {
  const existing = getCookie("csrftoken");
  if (existing) {
    return existing;
  }

  const res = await fetch(`${apiBaseUrl}/api/v1/csrf/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Не вдалося отримати CSRF токен (${res.status})`);
  }

  const data = await res.json().catch(() => null);
  return data?.csrfToken || getCookie("csrftoken") || "";
}
