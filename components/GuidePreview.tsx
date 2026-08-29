'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { GUIDE_ARTICLES } from '@/lib/data';

export default function GuidePreview() {
  return (
    <section className="py-20 section-alt border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Ratgeber & Spartipps
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Wissen, das bares Geld spart
            </h2>
          </div>
          <Link href="/ratgeber" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 md:mt-0 link-underline">
            <span>Alle Ratgeber ansehen</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDE_ARTICLES.map((article, idx) => (
            <Link
              key={idx}
              href={article.slug}
              className="premium-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="flex items-center text-slate-400">
                    <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-blue-600">
                <span>Jetzt lesen</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
