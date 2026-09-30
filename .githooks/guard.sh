#!/bin/sh
# Gemeinsamer Secret-/Env-Guard für pre-commit und pre-push.
#
# WICHTIG: Hier stehen nur GENERISCHE Muster — keine echten Secret-Werte.
# Die echten Werte liegen ausschließlich in .env.local (git-ignoriert).
#
# Blockiert:
#   1. .env-Dateien als Dateiname (auch bei `git add -f`)
#   2. Secret-Muster im Inhalt (API-Keys, SMTP-Passwort-Zuweisungen,
#      private Keys, AWS Access Keys)

# '=' wird aus einem Baustein zusammengesetzt, damit die Muster nicht auf
# ihre eigene Definition matchen (Selbst-Treffer im Diff vermeiden).
EQ='='

PATTERN_ENV='(^|/)\.env($|\.)'
PATTERN_SECRET="sk-[a-zA-Z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|AKIA[0-9A-Z]{16}|SMTP_PASS${EQ}[^[:space:]]+|DEEPSEEK_API_KEY${EQ}sk-"

# block_env_files <namen> — return 1, falls eine .env-Datei enthalten ist
block_env_files() {
  hits=$(printf '%s\n' "$1" | grep -E "$PATTERN_ENV")
  if [ -n "$hits" ]; then
    echo ""
    echo "⛔ BLOCKIERT: .env-Dateien duerfen nicht committet/gepusht werden."
    echo "   Betroffen:"
    printf '%s\n' "$hits" | sed 's/^/     - /'
    echo "   → Die Datei mit 'git rm --cached <datei>' bzw. 'git reset <datei>' entfernen."
    return 1
  fi
  return 0
}

# block_secrets <diff-text> — return 1, falls ein Secret-Muster gefunden wurde
block_secrets() {
  hits=$(printf '%s\n' "$1" | grep -nE "$PATTERN_SECRET")
  if [ -n "$hits" ]; then
    echo ""
    echo "⛔ BLOCKIERT: Verdaechtige Secret-Werte gefunden."
    echo "   Treffer (Zeile im Diff):"
    printf '%s\n' "$hits" | sed 's/^/     /'
    echo "   → Secret entfernen, statt auf .env.local/Vercel-Env-Settings verweisen,"
    echo "     und den Wert ggf. rotieren (er ist als kompromittiert zu betrachten)."
    return 1
  fi
  return 0
}
