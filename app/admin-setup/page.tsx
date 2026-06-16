'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Copy } from 'lucide-react';

export default function AdminSetupPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'running' | 'success' | 'error' | 'fallback'>('idle');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const SQL_COMMAND = 'ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;';

  async function checkStatus() {
    setIsLoading(true);
    setStatus('checking');

    try {
      const res = await fetch(`/api/setup/migrate-zakaziq-id?password=${encodeURIComponent(password)}`);
      const data = await res.json();

      if (data.status === 'completed') {
        setStatus('success');
        setMessage('✅ Sloupec zakaziq_id již existuje!');
      } else {
        setStatus('idle');
        setMessage('ℹ️ Sloupec neexistuje, můžeš jej přidat');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Chyba: ${error instanceof Error ? error.message : 'Unknown'}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function runMigration() {
    setIsLoading(true);
    setStatus('running');

    try {
      const res = await fetch('/api/setup/migrate-zakaziq-id', {
        method: 'POST',
        headers: {
          'x-admin-password': password,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage('✅ Sloupec zakaziq_id byl úspěšně přidán!');
      } else if (res.status === 503) {
        // Fallback - API není dostupné
        setStatus('fallback');
        setMessage('API není dostupné, musíš to udělat ručně (viz níže) →');
      } else {
        setStatus('error');
        setMessage(data.message || 'Migration selhala');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Chyba: ${error instanceof Error ? error.message : 'Unknown'}`);
    } finally {
      setIsLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(SQL_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">⚙️ Booking Setup</h1>
          <p className="text-slate-400">Migrace: Přidání zakaziq_id sloupce</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 mb-6">
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Admin Heslo
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadej ADMIN_PASSWORD"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={checkStatus}
                disabled={!password || isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50 flex items-center gap-2 transition"
              >
                {isLoading && status === 'checking' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  '🔍'
                )}
                Ověřit
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-300 font-medium">{message}</p>
                <p className="text-green-200/70 text-sm mt-1">
                  Můžeš pokračovat na testování booking workflow.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-medium">{message}</p>
                <p className="text-red-200/70 text-sm mt-1">
                  Zkontroluj heslo a zkus znovu.
                </p>
              </div>
            </div>
          )}

          {status === 'fallback' && (
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-medium">{message}</p>
                <p className="text-yellow-200/70 text-sm mt-1">
                  Můžeš to udělat ručně v Supabase SQL editoru.
                </p>
              </div>
            </div>
          )}

          {/* Run Migration Button */}
          {status !== 'success' && (
            <div className="flex gap-2">
              <button
                onClick={runMigration}
                disabled={!password || isLoading}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-bold disabled:opacity-50 flex items-center justify-center gap-2 transition"
              >
                {isLoading && status === 'running' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Spouštím SQL...
                  </>
                ) : (
                  '🚀 Spustit Migraci'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Manual SQL Card */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <h2 className="text-xl font-bold text-white mb-4">📋 Ruční Spuštění SQL</h2>
          <p className="text-slate-400 mb-4">
            Pokud výše nefunguje, můžeš to udělat ručně v Supabase:
          </p>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">1</div>
              <p className="text-slate-300">Jdi na <a href="https://supabase.co" target="_blank" rel="noopener" className="text-blue-400 hover:underline">supabase.co</a></p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">2</div>
              <p className="text-slate-300">SQL Editor → New Query</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">3</div>
              <p className="text-slate-300">Zkopíruj a spusť SQL níže</p>
            </div>
          </div>

          {/* SQL Command */}
          <div className="bg-slate-900 rounded border border-slate-600 p-4 mb-4 font-mono text-sm">
            <p className="text-slate-300">{SQL_COMMAND}</p>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium flex items-center justify-center gap-2 transition"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Zkopírováno! ✓' : 'Kopírovat SQL'}
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Další kroky</h3>
          <ol className="space-y-2 text-slate-400 text-sm">
            <li>✅ Spustit migraci (výše)</li>
            <li>📧 Testovat booking workflow</li>
            <li>🚀 Deploy: git push origin main</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
