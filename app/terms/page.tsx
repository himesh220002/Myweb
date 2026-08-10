"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-primary/30">
            <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900">Terms of Service</h1>
                    <p className="text-slate-500 font-medium text-lg border-b border-slate-100 pb-8">
                        Last updated: August 10, 2026
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80"
                >
                    <h2>1. Terms</h2>
                    <p>
                        By accessing the website at CypherTech, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>

                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on CypherTech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on CypherTech's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by CypherTech at any time.
                    </p>

                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on CypherTech's website are provided on an 'as is' basis. CypherTech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall CypherTech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CypherTech's website, even if CypherTech or a CypherTech authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>

                    <h2>5. Revisions and Errata</h2>
                    <p>
                        The materials appearing on CypherTech's website could include technical, typographical, or photographic errors. CypherTech does not warrant that any of the materials on its website are accurate, complete or current. CypherTech may make changes to the materials contained on its website at any time without notice.
                    </p>

                    <h2>6. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>

                    <p className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-600 font-medium">
                        If you have any questions about these Terms, please contact us at <a href="mailto:legal@cyphertech.com" className="font-bold">legal@cyphertech.com</a>.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
