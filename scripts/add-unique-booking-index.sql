-- ════════════════════════════════════════════════════════════════════════════
-- Idempotence rezervací — ochrana proti duplicitám na úrovni databáze
-- ════════════════════════════════════════════════════════════════════════════
--
-- Spusť ručně v Supabase: Dashboard → SQL Editor → New Query → Run.
--
-- Partial UNIQUE index zabrání, aby tentýž klient (email) měl dvě AKTIVNÍ
-- rezervace na stejný den a čas. Zrušené (status = 'cancelled') se nepočítají,
-- takže po zrušení lze slot znovu rezervovat — stejná sémantika jako
-- dotaz v app/api/booking/route.ts (.neq('status','cancelled')).
--
-- Pozn.: kapacitu slotu (více různých lidí na jeden čas) NEhlídá tento index —
-- ta se řeší zvlášť přes available_slots.capacity. Tady jde čistě o to,
-- aby jeden člověk nevytvořil tutéž rezervaci dvakrát (race condition / retry).

CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_active_slot
  ON bookings (email, date, time_slot)
  WHERE status <> 'cancelled';

-- Ověření, že index vznikl:
--   SELECT indexname FROM pg_indexes WHERE tablename = 'bookings';
--
-- Pokud při vytváření selže kvůli EXISTUJÍCÍM duplicitám, nejdřív je najdi:
--   SELECT email, date, time_slot, count(*)
--   FROM bookings
--   WHERE status <> 'cancelled'
--   GROUP BY email, date, time_slot
--   HAVING count(*) > 1;
-- ...a duplicitní řádky smaž / zruš (status = 'cancelled'), pak index spusť znovu.
