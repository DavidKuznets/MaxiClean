/**
 * Утиліта для діагностики проблем з з'єднанням до бекенду
 */

export const testBackendConnection = async () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  console.log("\n========== ДІАГНОСТИКА БЕКЕНДУ ==========\n");
  console.log(`🔗 URL бекенду: ${apiUrl}`);

  try {
    // Тест 1: Простий GET запит до корня
    console.log("\n1️⃣  Тест базового з'єднання...");
    const pingResponse = await fetch(`${apiUrl}/`, {
      method: "GET",
    }).catch(
      (err) =>
        new Response(null, {
          status: 0,
          statusText: `Помилка: ${err.message}`,
        }),
    );

    if (pingResponse.status === 0) {
      console.error(`❌ ПОМИЛКА З'ЄДНАННЯ: Не можу досягти ${apiUrl}`);
      console.error("▸ Переконайтеся, що бекенд сервер запущений");
      console.error("▸ Витипуйте: cd backend && python manage.py runserver");
      return false;
    }

    console.log(`✅ Сервер доступний (статус: ${pingResponse.status})`);

    // Тест 2: OPTIONS запит для перевірки CORS
    console.log("\n2️⃣  Тест CORS преф-запиту...");
    const corsResponse = await fetch(`${apiUrl}/api/v1/callbacks/`, {
      method: "OPTIONS",
      headers: {
        Origin: window.location.origin,
        "Access-Control-Request-Method": "POST",
      },
    });

    const corsHeaders = {
      allowOrigin: corsResponse.headers.get("Access-Control-Allow-Origin"),
      allowMethods: corsResponse.headers.get("Access-Control-Allow-Methods"),
      allowCredentials: corsResponse.headers.get(
        "Access-Control-Allow-Credentials",
      ),
    };

    console.log("CORS Headers:", corsHeaders);

    if (!corsHeaders.allowOrigin) {
      console.warn("⚠️  ПОПЕРЕДЖЕННЯ: CORS заголовки не знайдені");
      console.warn("   Можливо, django-cors-headers не встановлений правильно");
    } else {
      console.log("✅ CORS налаштовані");
    }

    // Тест 3: Спроба отримати список callbacks
    console.log("\n3️⃣  Тест GET до /api/v1/callbacks/...");
    const getResponse = await fetch(`${apiUrl}/api/v1/callbacks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`✅ GET запит повернув статус: ${getResponse.status}`);

    // Тест 4: Спроба відправити пустий POST
    console.log("\n4️⃣  Тест POST з мінімальними даними...");
    const postResponse = await fetch(`${apiUrl}/api/v1/callbacks/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=test",
      },
      body: new FormData(),
    });

    console.log(`✅ POST запит повернув статус: ${postResponse.status}`);

    if (!postResponse.ok) {
      const errorData = await postResponse.json().catch(() => ({
        detail: "Не можу прочитати помилку",
      }));
      console.error("Помилка відповіді:", errorData);
    }

    console.log("\n✅ ДІАГНОСТИКА ЗАВЕРШЕНА\n");
    return true;
  } catch (err) {
    console.error("\n❌ КРИТИЧНА ПОМИЛКА:", err);
    return false;
  }
};

// Автоматичний запуск при розробці
if (import.meta.env.DEV && typeof window !== "undefined") {
  // @ts-expect-error window object does not have __testBackend property defined
  window.__testBackend = testBackendConnection;
  console.log("🧪 Для тестування бекенду введіть у консолі: __testBackend()");
}
