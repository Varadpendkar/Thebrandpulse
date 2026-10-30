import os
from fastapi import APIRouter
from pydantic import BaseModel
import httpx

router = APIRouter()

class ChatRequest(BaseModel):
  message: str

SYSTEM_PROMPT = (
  "You are the BrandPulse assistant. Answer questions about our services in simple, "
  "non-technical business language. Services: AI Solutions, Digital Marketing, Product Building, "
  "ERP, CRM, Strategic Consulting. Always offer to book a call at the end. Never use jargon."
)

FALLBACK_KNOWLEDGE = {
  "ai": "Our AI Solutions automate repetitive manual work and qualify inbound sales leads around the clock so your team can focus on closing deals and high-value decisions. Would you like to book a call to see where AI creates immediate value for your business?",
  "marketing": "Our Digital Marketing builds predictable customer acquisition funnels that turn target attention into high-intent sales appointments and revenue. Shall we schedule a quick call to review your current acquisition roadmap?",
  "product": "Our Product Building service takes your concept to an interactive, working software product in 14 days, followed by full production hardening for scale and speed. Would you like to book a call with our builders?",
  "erp": "Our ERP Systems unify your inventory, accounting, logistics, and staff into one real-time operational dashboard so nothing falls through the cracks. Would you like to schedule a call to discuss your current operational setup?",
  "crm": "Our CRM Systems automate sales follow-ups, organize conversations across email and WhatsApp, and shorten your sales cycles to boost revenue. Can we set up a call to walk through your pipeline goals?",
  "consulting": "Our Strategic Consulting provides direct fractional technology leadership to audit code, reduce unnecessary software expenses, and protect your capital before big builds. Would you like to schedule an executive consultation?",
}

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
  user_text = payload.message.strip()
  anthropic_key = os.getenv("ANTHROPIC_API_KEY")

  # 1. If Anthropic API key is provided, attempt call to Claude (claude-3-5-sonnet-20241022 or claude-sonnet-4-6)
  if anthropic_key:
    try:
      async with httpx.AsyncClient(timeout=15.0) as client:
        res = await client.post(
          "https://api.anthropic.com/v1/messages",
          headers={
            "x-api-key": anthropic_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          },
          json={
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 400,
            "system": SYSTEM_PROMPT,
            "messages": [{"role": "user", "content": user_text}]
          }
        )
        if res.status_code == 200:
          data = res.json()
          bot_reply = data["content"][0]["text"]
          return {"response": bot_reply}
    except Exception:
      pass

  # 2. Intelligent, non-technical business language rule matching fallback
  lower_query = user_text.lower()
  matched_reply = None

  if "ai" in lower_query or "agent" in lower_query or "automate" in lower_query or "llm" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["ai"]
  elif "marketing" in lower_query or "lead" in lower_query or "ad" in lower_query or "growth" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["marketing"]
  elif "product" in lower_query or "build" in lower_query or "web" in lower_query or "app" in lower_query or "prototype" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["product"]
  elif "erp" in lower_query or "inventory" in lower_query or "supply" in lower_query or "warehouse" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["erp"]
  elif "crm" in lower_query or "sales" in lower_query or "pipeline" in lower_query or "customer" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["crm"]
  elif "consult" in lower_query or "strategy" in lower_query or "audit" in lower_query or "advisor" in lower_query:
    matched_reply = FALLBACK_KNOWLEDGE["consulting"]
  elif "call" in lower_query or "book" in lower_query or "contact" in lower_query or "meet" in lower_query:
    matched_reply = "We would love to connect. You can click [ BOOK A CALL ] directly on this site or let us know a convenient time, and one of our partners will get in touch."
  else:
    matched_reply = (
      "At BrandPulse, we build products, brands, and systems that turn business visions into sustainable profit. "
      "We specialize in AI Solutions, Digital Marketing, Product Building, ERP, CRM, and Strategic Consulting. "
      "Would you like to book a call with our partners to explore how we can support your growth?"
    )

  return {"response": matched_reply}

