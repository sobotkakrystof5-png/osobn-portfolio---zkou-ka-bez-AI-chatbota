#!/bin/bash
# Skript pro přidání zakaziq_id sloupce do Supabase

set -e

# Načti env vars
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d= -f2)
SUPABASE_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d= -f2)

echo ""
echo "🔧 Přidávání zakaziq_id sloupce..."
echo ""

# Zkusit spustit SQL přes Supabase REST API
echo "1️⃣  Pokus o spuštění SQL přes Supabase REST API..."

RESPONSE=$(curl -X POST \
  "${SUPABASE_URL}/rest/v1/rpc/query" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "sql": "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;"
  }' 2>/dev/null || echo "")

if [ -z "$RESPONSE" ]; then
  echo "   ❌ REST API není dostupné\n"
else
  echo "   Response: $RESPONSE"
fi

echo ""
echo "2️⃣  Můžeš také spustit SQL ručně:\n"
echo "   Jdi na: $SUPABASE_URL"
echo "   → SQL Editor → New Query"
echo "   → Spusť: ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;\n"

echo "ℹ️  Viz MIGRATE_ZAKAZIQ_ID.md pro detaily\n"
