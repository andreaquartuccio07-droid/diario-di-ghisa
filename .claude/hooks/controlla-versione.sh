#!/usr/bin/env bash
# Hook Stop: se i file dell'app sono cambiati rispetto all'ultimo commit ma VERSIONE in sw.js no,
# ferma la chiusura del turno e lo dice a Claude. Senza quel bump i telefoni restano sulla copia in cache.

input=$(cat)
# Seconda passata dopo un blocco: lascia chiudere, altrimenti va in loop.
case "$input" in
  *'"stop_hook_active":true'*|*'"stop_hook_active": true'*) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

[ -z "$(git status --porcelain -- index.html manifest.webmanifest icons fonts 2>/dev/null)" ] && exit 0
git diff HEAD -- sw.js 2>/dev/null | grep -q '^+const VERSIONE' && exit 0

printf '%s\n' '{"decision":"block","reason":"I file dell app sono cambiati ma VERSIONE in sw.js e ancora quella dell ultimo commit: alzala di uno (ghisa-vN -> ghisa-vN+1) e, se hai aggiunto file da usare offline, mettili in GUSCIO."}'
