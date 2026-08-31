"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/app/kontakt/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Nach erfolgreichem Versand die (uncontrolled) Felder leeren.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="Ihr Name"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            E-Mail-Adresse
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="ihre@email.de"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Betreff <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={200}
          placeholder="Worum geht es?"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Ihre Nachricht an uns …"
          className={`${inputClass} resize-y`}
        />
      </div>

      <label className="flex items-start space-x-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span>
          Ich habe die{" "}
          <Link
            href="/datenschutz"
            className="font-semibold text-blue-600 hover:underline"
          >
            Datenschutzerklärung
          </Link>{" "}
          zur Kenntnis genommen und bin mit der Verarbeitung meiner Daten zur
          Bearbeitung meiner Anfrage einverstanden.
        </span>
      </label>

      {state.message && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            state.status === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {pending ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}
