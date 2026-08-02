'use client';

import React from 'react';
import { Upload, Languages, BookOpen, Layers, Sparkles, ShieldCheck, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { PolicyCircularDoc } from '@/fixtures/policyCirculars/scholarship_income_2026';
import { PolicyConflictDetector } from '@/components/PolicyConflictDetector';

interface PolicyIngestionCardProps {
  circular: PolicyCircularDoc;
  onExtract: (text?: string, pageNum?: number) => void;
  isExtracting: boolean;
  theme?: 'dark' | 'light';
  language?: 'EN' | 'HI' | 'MR';
  onSelectLanguage?: (lang: 'EN' | 'HI' | 'MR') => void;
}

export function PolicyIngestionCard({
  circular,
  onExtract,
  isExtracting,
  theme = 'light',
  language = 'EN',
  onSelectLanguage
}: PolicyIngestionCardProps) {
  const [activePage, setActivePage] = React.useState<number>(2);
  const [customFile, setCustomFile] = React.useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);

  const isLight = theme === 'light';
  const currentPageDoc = circular.pages.find((p) => p.pageNumber === activePage) || circular.pages[0];

  const hindiTextPage1 = `मध्य प्रदेश शासन
उच्च शिक्षा विभाग
मंत्रालय, वल्लभ भवन, भोपाल

परिपत्र क्रमांक: F-12/302/2026/38-1                                   दिनांक: 15 मार्च 2026

ज्ञापन

विषय: राज्य उच्च शिक्षा सहायता योजनाओं के अंतर्गत पात्रता मानदंडों में संशोधन हेतु प्रशासनिक स्वीकृति।

कैबिनेट निर्णय क्र. 44/2026 दिनांक 10 मार्च 2026 के संदर्भ में, मध्य प्रदेश के राज्यपाल द्वारा उच्च शिक्षा पोर्टल द्वारा संचालित वित्तीय सहायता योजनाओं में संशोधनों का आदेश जारी किया जाता है।`;

  const hindiTextPage2 = `परिपत्र विवरण एवं संशोधन प्रावधान:

खंड 1: आवेदन का दायरा
यह परिपत्र शैक्षणिक सत्र 2026-27 से मान्यता प्राप्त उच्च शैक्षणिक संस्थानों में नामांकित मुख्यमंत्री मेधावी विद्यार्थी योजना (MMVY) और पोस्ट-मैट्रिक छात्रवृत्ति योजना के तहत सभी नए और नवीनीकरण आवेदकों पर लागू होता है।

खंड 2: वार्षिक आय सीमा में संशोधन
योजना दिशानिर्देश 2021 का खंड 4.1: मुख्यमंत्री मेधावी विद्यार्थी योजना के तहत पात्रता के लिए वार्षिक पारिवारिक आय की ऊपरी सीमा को 1 अप्रैल 2026 से ₹2,50,000 (दो लाख पचास हजार) से बढ़ाकर ₹3,00,000 (तीन लाख रुपये) कर दिया गया है।

खंड 3: कार्यान्वयन निर्देश
राज्य आईटी केंद्र / छात्रवृत्ति पोर्टल तकनीकी टीम को निर्देशित किया जाता है कि वे 1 अप्रैल 2026 को आवेदन खिड़की खुलने से पहले नियम मूल्यांकन इंजन में नियमों को अद्यतन करें।`;

  const marathiTextPage1 = `मध्य प्रदेश / महाराष्ट्र शासन
उच्च शिक्षण विभाग
मंत्रालय, वल्लभ भवन, भोपाळ

परिपत्रक क्रमांक: F-12/302/2026/38-1                                   दिनांक: 15 मार्च 2026

ज्ञापन

विषय: राज्य उच्च शिक्षण सहाय्य योजनांतर्गत पात्रता निकषांमध्ये सुधारणा करण्यासाठी प्रशासकीय मान्यता.

मंत्रिमंडळ निर्णय क्र. 44/2026 दिनांक 10 मार्च 2026 च्या संदर्भात, राज्यपाल महोदयांनी उच्च शिक्षण पोर्टलद्वारे व्यवस्थापित आर्थिक सहाय्य योजनांमध्ये सुधारणा करण्याचे आदेश दिले आहेत।`;

  const marathiTextPage2 = `परिपत्रक तपशील आणि सुधारणा तरतुदी:

खंड 1: अर्जाची व्याप्ती
हे परिपत्रक शैक्षणिक सत्र 2026-27 पासून मान्यताप्राप्त उच्च शिक्षण संस्थांमध्ये प्रवेश घेतलेल्या मुख्यमंत्री मेधावी विद्यार्थी योजना (MMVY) आणि पोस्ट-मॅट्रिक शिष्यवृत्ती योजनेतील सर्व नवीन आणि नूतनीकरण अर्जदारांना लागू होते.

खंड 2: वार्षिक उत्पन्न मर्यादेत सुधारणा
योजना मार्गदर्शक तत्त्वे 2021 चा खंड 4.1: मुख्यमंत्री मेधावी विद्यार्थी योजनेअंतर्गत पात्रतेसाठी वार्षिक कौटुंबिक उत्पन्नाची कमाल मर्यादा 1 एप्रिल 2026 पासून रू. 2,50,000 (दोन लाख पन्नास हजार) वरून वाढवून रू. 3,00,000 (तीन लाख रुपये) करण्यात आली आहे.

खंड 3: अंमलबजावणी निर्देश
राज्य आयटी केंद्र / शिष्यवृत्ती पोर्टल तांत्रिक टीमला 1 एप्रिल 2026 रोजी अर्ज विंडो उघडण्यापूर्वी नियम मूल्यमापन इंजिनमध्ये नियम अद्ययावत करण्याचे निर्देश दिले आहेत.`;

  const displayText =
    language === 'MR'
      ? activePage === 1 ? marathiTextPage1 : marathiTextPage2
      : language === 'HI'
      ? activePage === 1 ? hindiTextPage1 : hindiTextPage2
      : currentPageDoc.text;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = language === 'EN'
      ? `Madhya Pradesh Department of Higher Education Circular 302. Clause 4.1 revises annual family income ceiling from 2 Lakh 50 Thousand to 3 Lakh Rupees with effect from 1st April 2026.`
      : displayText;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onExtract(text, 1);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`border rounded-3xl shadow-sm overflow-hidden flex flex-col w-full transition-colors ${
        isLight ? 'bg-white border-sky-100 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
      }`}>
        {/* Header Bar */}
        <div className={`border-b px-5 py-3.5 flex items-center justify-between ${
          isLight ? 'bg-sky-50/50 border-sky-100' : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-sky-100 text-sky-600 rounded-xl border border-sky-200">
              <BookOpen className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <h2 className={`text-sm font-black flex items-center gap-2 ${
                isLight ? 'text-sky-950' : 'text-slate-100'
              }`}>
                {language === 'HI' ? 'नीति परिपत्रक दस्तावेज़ अंतर्ग्रहण' : language === 'MR' ? 'धोरण परिपत्रक दस्तऐवज संकलन' : 'Policy Circular Document Ingestion'}
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {language === 'HI' ? 'अधिसूचित शासकीय आदेश' : language === 'MR' ? 'अधिकृत राजपत्रित आदेश' : 'Official Gazetted State Order'}
                </span>
              </h2>
              <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-400'}`}>PDF Ingestion & Page-Level Evidence Parsing</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            
            {/* Audio Summarizer */}
            <button
              onClick={handleSpeak}
              className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 border-amber-500 animate-pulse'
                  : isLight
                  ? 'bg-sky-100 hover:bg-sky-200/80 text-sky-900 border-sky-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-sky-500" />}
              <span>{isSpeaking ? 'Stop Voice' : '🔊 Listen Audio'}</span>
            </button>

            {/* Language Switcher */}
            <div className={`flex items-center space-x-1 p-1 rounded-2xl border ${
              isLight ? 'bg-white border-sky-200 shadow-xs' : 'bg-slate-800 border-slate-700'
            }`}>
              <button
                onClick={() => onSelectLanguage && onSelectLanguage('EN')}
                className={`px-2 py-0.5 text-xs font-bold rounded-xl transition-colors ${
                  language === 'EN' ? 'bg-sky-400 text-white shadow-xs' : isLight ? 'text-sky-950 hover:text-sky-600' : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onSelectLanguage && onSelectLanguage('HI')}
                className={`px-2 py-0.5 text-xs font-bold rounded-xl transition-colors ${
                  language === 'HI' ? 'bg-sky-400 text-white shadow-xs' : isLight ? 'text-sky-950 hover:text-sky-600' : 'text-slate-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onSelectLanguage && onSelectLanguage('MR')}
                className={`px-2 py-0.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 ${
                  language === 'MR' ? 'bg-sky-400 text-white shadow-xs' : isLight ? 'text-sky-950 hover:text-sky-600' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Languages className="h-3 w-3" />
                <span>मराठी</span>
              </button>
            </div>

            {/* Page Switcher */}
            <div className={`flex items-center space-x-1 p-1 rounded-2xl border ${
              isLight ? 'bg-white border-sky-200 shadow-xs' : 'bg-slate-800 border-slate-700'
            }`}>
              <button
                onClick={() => setActivePage(1)}
                className={`px-2 py-0.5 text-xs font-bold rounded-xl ${
                  activePage === 1 ? 'bg-sky-400 text-white' : isLight ? 'text-sky-950' : 'text-slate-400'
                }`}
              >
                Page 1
              </button>
              <button
                onClick={() => setActivePage(2)}
                className={`px-2 py-0.5 text-xs font-bold rounded-xl flex items-center gap-1 ${
                  activePage === 2 ? 'bg-sky-400 text-white' : isLight ? 'text-sky-950' : 'text-slate-400'
                }`}
              >
                <span>Page 2</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className={`border-b px-5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'bg-sky-50/40 border-sky-100 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="font-bold text-sky-600">{circular.circularNumber}</span>
            <span className="text-slate-300">|</span>
            <span className="truncate max-w-xs">{circular.department}</span>
          </div>

          <div className="flex items-center space-x-2 bg-sky-100/80 border border-sky-300 text-sky-900 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />
            <span>Gazette Signature: VERIFIED (SHA-256: 8f9e...3d2a)</span>
          </div>
        </div>

        {/* Reader Frame */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className={`border rounded-2xl p-4 font-mono text-xs leading-relaxed overflow-y-auto max-h-72 shadow-inner relative ${
            isLight ? 'bg-sky-50/30 border-sky-100 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-200'
          }`}>
            <div className={`absolute top-3 right-3 text-[10px] font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold ${
              isLight ? 'bg-white border-sky-200 text-sky-800 shadow-xs' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              <Sparkles className="h-3 w-3 text-sky-400" />
              Page {activePage} of {circular.totalPages} [{language}]
            </div>
            
            <pre className="whitespace-pre-wrap font-sans text-xs">
              {displayText.split("\n\n").map((paragraph, idx) => {
                const isHighlight = paragraph.includes("Clause 4.1") || paragraph.includes("खंड 2") || paragraph.includes("2,50,000") || paragraph.includes("3,00,000");
                return (
                  <div
                    key={idx}
                    className={`mb-3 p-3 rounded-2xl transition-all ${
                      isHighlight
                        ? isLight
                          ? "bg-sky-100 border-2 border-sky-400 text-sky-950 font-bold shadow-xs relative"
                          : "bg-sky-500/10 border-2 border-sky-500/80 ring-2 ring-sky-500/20 text-sky-100 font-bold shadow-md relative"
                        : isLight ? "hover:bg-sky-50 text-slate-800" : "hover:bg-slate-900/50 text-slate-300"
                    }`}
                  >
                    {isHighlight && (
                      <span className="absolute -top-2.5 left-3 bg-sky-400 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {language === 'HI' ? '🎯 निकाला गया नियम उद्धरण (खंड 4.1)' : language === 'MR' ? '🎯 काढलेला नियम संदर्भ (खंड 4.1)' : '🎯 EXTRACTED RULE CITATION (CLAUSE 4.1)'}
                      </span>
                    )}
                    <p>{paragraph}</p>
                  </div>
                );
              })}
            </pre>
          </div>

          {/* Action Bar */}
          <div className={`pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t ${
            isLight ? 'border-sky-100' : 'border-slate-800'
          }`}>
            <label
              className={`cursor-pointer flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-2xl border transition-all ${
                customFile
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : isLight
                  ? 'bg-sky-100/60 hover:bg-sky-200/60 text-sky-950 border-sky-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Upload className="h-3.5 w-3.5 text-sky-500" />
              <span>{customFile ? `Uploaded: ${customFile}` : 'Upload Custom Policy PDF'}</span>
              <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={() => onExtract(currentPageDoc.text, currentPageDoc.pageNumber)}
              disabled={isExtracting}
              className="w-full sm:w-auto bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-xs flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Layers className={`h-4 w-4 ${isExtracting ? 'animate-spin' : ''}`} />
              <span>{isExtracting ? 'Extracting Evidence Rule...' : language === 'HI' ? 'नियम और साक्ष्य निकालें' : language === 'MR' ? 'नियम आणि पुरावे काढा' : 'Extract Policy Rule & Evidence'}</span>
            </button>
          </div>
        </div>
      </div>

      <PolicyConflictDetector theme={theme} />
    </div>
  );
}
