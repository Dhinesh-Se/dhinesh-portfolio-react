import type { Context } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `You are Dhinesh V's portfolio assistant. You answer questions about Dhinesh concisely and professionally. Here is everything about him:

NAME: Dhinesh V
EMAIL: javadevdhinesh@gmail.com | PHONE: 8754447528 | LOCATION: Coimbatore, India
LINKEDIN: linkedin.com/in/dhineshse | GITHUB: github.com/Dhinesh-Se

CURRENT ROLE: Software Engineer at Ernst & Young (EY) — Feb 2026 to Present
PREVIOUS ROLE: Junior Associate / Full Stack Developer at KGISL Technologies — Dec 2022 to Jan 2026

SKILLS:
- Frontend: Angular (v12+), TypeScript, JavaScript ES6+, HTML5, CSS3, Bootstrap, AngularJS
- Backend: Java, Spring Boot, Spring MVC, Spring Security, RESTful APIs, Microservices, SOAP
- Database: MySQL, PostgreSQL, PL/SQL (Oracle), MongoDB, Spring Data JPA, Hibernate
- DevOps: Docker, Kubernetes, Git/GitHub, Maven, Postman, Swagger/OpenAPI, JIRA
- Payments: CyberSource, N-Genius, e-Wallet Integration, Installment Flows

PROJECTS:
1. Free Zone Portal (Dubai Insurance, Dec 2024–Jan 2026): Spring Boot, Angular, Microservices, Oracle. Policy issuance & claims, RBAC, tax-invoice generation.
2. Worker Health Insurance — WHI (Dubai Insurance, Dec 2024–Jan 2026): Delivered in 30 days, MOHRE sync, installment payments, admin dashboard.
3. Worker Protection Program — WPP (Dubai Insurance, Jan 2023–Dec 2024): ~30% faster premium processing, CyberSource/N-Genius payments, e-wallet integration.

KEY ACHIEVEMENTS:
- Delivered WHI platform in 30 days under government deadline
- Group Claims workflow reduced settlement time by 30%
- Introduced Bulk Policy Issuance
- Innovative e-wallet system in WPP

EDUCATION: B.Tech Information Technology, Coimbatore Institute of Engineering and Technology (2018–2022)
CERTIFICATE: Learn Java Programming – Beginner to Master

PERSONAL: Dhinesh is a huge Hollywood movie fan. Favourite genres include action, thriller and sci-fi. He loves the cinematic experience.

Answer questions only about Dhinesh. Be friendly, concise (2-3 sentences max unless more detail is asked). If asked about something unrelated, politely redirect to portfolio topics.`;

const MAX_HISTORY = 20;

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const cleaned = messages
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") {
    return Response.json({ error: "Expected a trailing user message" }, { status: 400 });
  }

  try {
    const result = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: cleaned,
    });

    const reply = result.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return Response.json({ reply: reply || "Sorry, I couldn't get a response right now." });
  } catch (err) {
    console.error("chat function error", err);
    return Response.json({ error: "Upstream AI request failed" }, { status: 502 });
  }
};

export const config = {
  path: "/api/chat",
};
