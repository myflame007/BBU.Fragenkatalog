import React, { useState } from 'react';
import catalogData from '../data/questionCatalog.json';
import config from '../data/config.json';
import {
  Layout,
  Save,
  Plus,
  Trash2,
  Eye,
  Edit3,
  Download,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Search,
  Globe,
  Languages,
  CheckCircle2,
  GripVertical,
  ArrowRight
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { exportToJson } from '../services/exportService';

const catalog = catalogData as any;

const LanguageSection: React.FC<{ languages: any[], question: any, onUpdate: (text: any) => void }> = ({ languages, question, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
      >
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {isExpanded ? 'Weitere Sprachen ausblenden' : `Weitere ${languages.length} Sprachen anzeigen`}
      </button>

      {isExpanded && (
        <div className="grid gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {languages.map((lang: any) => (
            <div key={lang.id} className="flex gap-4 items-start">
              <div className="w-32 pt-3">
                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{lang.label}</span>
              </div>
              <textarea
                className="flex-1 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                placeholder={`Text in ${lang.label}...`}
                dir={['ar', 'fa', 'fa_af', 'ps', 'ur', 'ku_ckb'].includes(lang.id) ? 'rtl' : 'ltr'}
                value={question.text[lang.id] || ''}
                onChange={(e) => onUpdate({ ...question.text, [lang.id]: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SortableFlowStep: React.FC<{
  step: any;
  index: number;
  questions: any[];
  onUpdate: (updatedStep: any) => void;
  onRemove: () => void;
}> = ({ step, index, questions, onUpdate, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `${index}-${step.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className={`hover:bg-gray-50 transition-colors group ${isDragging ? 'shadow-2xl bg-blue-50' : ''}`}>
      <td className="px-6 py-4 font-mono text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-blue-500 transition-colors">
            <GripVertical size={16} />
          </div>
          {index + 1}
        </div>
      </td>
      <td className="px-6 py-4">
        <select
          className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm"
          value={step.id}
          onChange={(e) => onUpdate({ id: e.target.value })}
        >
          {questions.map(q => (
            <option key={q.id} value={q.id}>
              [{q.id}] {q.text.de?.substring(0, 50)}...
            </option>
          ))}
          <option value="END">ENDE</option>
          <option value="ABBRUCH">ABBRUCH</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <ArrowRight size={14} className="text-green-500" />
          <input
            className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Nächste ID (z.B. 5.1)"
            value={step.ja || ''}
            onChange={(e) => onUpdate({ ja: e.target.value })}
          />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <ArrowRight size={14} className="text-red-500" />
          <input
            className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Nächste ID (z.B. ABBRUCH)"
            value={step.nein || ''}
            onChange={(e) => onUpdate({ nein: e.target.value })}
          />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={onRemove}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export const AdminControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'flows' | 'assessments'>('editor');
  const [questions, setQuestions] = useState<any[]>(Object.values(catalog.questions));
  const [flows, setFlows] = useState<Record<string, any[]>>(catalog.flows);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>(config.groups[0].id);
  const [flowMode, setFlowMode] = useState<'visual' | 'table'>('visual');
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusLanguage, setFocusLanguage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const VisualRule: React.FC<{ rule: any }> = ({ rule }) => {
    if (!rule) return <span className="text-gray-400 italic">Keine Regel definiert</span>;

    const renderRule = (r: any, depth = 0) => {
      switch (r.type) {
        case 'age_min':
          return (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-blue-600 font-bold">Alter ≥ {r.value}</span>
            </div>
          );
        case 'answer':
          return (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-gray-400 font-mono text-[10px]">{r.id}</span>
              <span className="text-gray-700">ist</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">{r.value}</span>
            </div>
          );
        case 'count':
          return (
            <div className="flex flex-col gap-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black">MIN. {r.threshold}x</span>
                <span className="text-gray-600 text-xs font-bold">"{r.answer}"</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {r.ids ? r.ids.map((id: string) => (
                  <span key={id} className="text-[9px] font-mono bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded border border-gray-100">{id}</span>
                )) : r.range ? (
                  <span className="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    Bereich: {r.range.prefix}{r.range.start} bis {r.range.prefix}{r.range.end}
                  </span>
                ) : (
                  <span className="text-[9px] text-red-400">Keine IDs definiert</span>
                )}
              </div>
            </div>
          );
        case 'and':
        case 'or':
          return (
            <div className={`flex flex-col gap-3 p-4 rounded-xl border-2 ${r.type === 'and' ? 'border-blue-50 bg-blue-50/20' : 'border-purple-50 bg-purple-50/20'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-widest ${r.type === 'and' ? 'text-blue-400' : 'text-purple-400'}`}>
                  {r.type === 'and' ? 'Alle müssen erfüllt sein (UND)' : 'Eines muss erfüllt sein (ODER)'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {r.rules.map((subRule: any, i: number) => (
                  <div key={i} className="flex-1 min-w-[200px]">
                    {renderRule(subRule, depth + 1)}
                  </div>
                ))}
              </div>
            </div>
          );
        default:
          return <span className="text-red-400">Unbekannter Typ: {r.type}</span>;
      }
    };

    return <div className="w-full">{renderRule(rule)}</div>;
  };

  const handleUpdateQuestion = (id: string, updatedFields: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const handleUpdateFlowStep = (group: string, index: number, updatedStep: any) => {
    const newGroupFlow = [...flows[group]];
    newGroupFlow[index] = { ...newGroupFlow[index], ...updatedStep };
    setFlows({ ...flows, [group]: newGroupFlow });
  };

  const handleAddFlowStep = (group: string) => {
    const newGroupFlow = [...(flows[group] || []), { id: questions[0].id }];
    setFlows({ ...flows, [group]: newGroupFlow });
  };

  const handleRemoveFlowStep = (group: string, index: number) => {
    const newGroupFlow = flows[group].filter((_, i) => i !== index);
    setFlows({ ...flows, [group]: newGroupFlow });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = parseInt(active.id.toString().split('-')[0]);
      const overIndex = parseInt(over.id.toString().split('-')[0]);

      setFlows(prev => ({
        ...prev,
        [activeGroup]: arrayMove(prev[activeGroup], activeIndex, overIndex)
      }));
    }
  };

  const handleAddQuestion = () => {
    const newId = `Q_${Date.now()}`;
    const newQuestion = {
      id: newId,
      category: config.categories[0].id,
      type: "Direkte Fragen",
      text: config.languages.reduce((acc: any, lang: any) => ({ ...acc, [lang.id]: "" }), {}),
      answerType: "Ja/Nein"
    };
    setQuestions([newQuestion, ...questions]);
    setEditingId(newId);
  };

  const handleRemoveQuestion = (id: string) => {
    if (window.confirm('Möchten Sie diese Frage wirklich löschen?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleExport = () => {
    const questionsObj: Record<string, any> = {};
    questions.forEach(q => {
      questionsObj[q.id] = q;
    });
    const data = { ...catalog, questions: questionsObj, flows };
    exportToJson(data, 'questionCatalog.json');
  };

  const isQuestionVisible = (q: any) =>
    !searchTerm ||
    q?.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q?.text.de || '').toLowerCase().includes(searchTerm.toLowerCase());

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.text.de || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (focusLanguage && q.text[focusLanguage] && q.text[focusLanguage].toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !filterCategory || q.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getLanguageStats = (langId: string) => {
    const total = questions.length;
    const translated = questions.filter(q => q.text[langId] && q.text[langId].trim().length > 0).length;
    const percent = Math.round((translated / total) * 100);
    return { translated, total, percent };
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Control Center</h1>
            <p className="text-gray-500 mt-1">Verwalten Sie Fragenkataloge und Navigations-Flows</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm"
            >
              <Download size={20} />
              Katalog Exportieren
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-gray-200 mb-8 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <Edit3 size={18} />
            Fragen-Editor
          </button>
          <button
            onClick={() => setActiveTab('flows')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'flows' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <Layout size={18} />
            Flow-Editor
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'assessments' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <Eye size={18} />
            Bewertungs-Regeln
          </button>
        </div>

        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-700">{filteredQuestions.length} von {questions.length} Fragen</h2>
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="flex gap-2 flex-1 md:flex-none">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Suchen nach ID oder Text..."
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterCategory || ''}
                    onChange={(e) => setFilterCategory(e.target.value || null)}
                  >
                    <option value="">Alle Kategorien</option>
                    {config.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <button
                  onClick={() => setFocusLanguage(focusLanguage ? null : config.languages[1].id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition ${focusLanguage ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                  <Languages size={18} />
                  {focusLanguage ? 'Fokus-Modus beenden' : 'Sprach-Fokus'}
                </button>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm"
                >
                  <Plus size={20} />
                  Neue Frage
                </button>
              </div>
            </div>

            {focusLanguage && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-wrap items-center gap-6 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-blue-500" />
                  <span className="font-bold text-blue-800">Übersetzungs-Fokus:</span>
                  <select
                    className="bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-sm font-bold text-blue-700 outline-none focus:ring-2 focus:ring-blue-400"
                    value={focusLanguage}
                    onChange={(e) => setFocusLanguage(e.target.value)}
                  >
                    {config.languages.filter(l => l.id !== 'de').map(l => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${getLanguageStats(focusLanguage).percent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-blue-600 whitespace-nowrap">
                    {getLanguageStats(focusLanguage).translated} / {getLanguageStats(focusLanguage).total} übersetzt ({getLanguageStats(focusLanguage).percent}%)
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm(`Möchten Sie alle leeren Übersetzungen für ${config.languages.find(l => l.id === focusLanguage)?.label} mit dem deutschen Text befüllen?`)) {
                      setQuestions(questions.map(q => ({
                        ...q,
                        text: {
                          ...q.text,
                          [focusLanguage]: q.text[focusLanguage] || q.text.de
                        }
                      })));
                    }
                  }}
                  className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200 hover:bg-blue-50 transition shadow-sm"
                >
                  Leere mit Deutsch befüllen
                </button>
              </div>
            )}

            <div className="grid gap-6">
              {focusLanguage ? (
                // Bulk Translation Mode
                <div className="space-y-4">
                  {filteredQuestions.map((q: any) => (
                    <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-blue-300 transition-colors">
                      <div className="flex gap-6">
                        <div className="w-16 shrink-0">
                          <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded block text-center truncate" title={q.id}>
                            {q.id}
                          </span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="text-xs text-gray-400 font-bold uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" /> Deutsch
                          </div>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                            {q.text.de || '---'}
                          </p>
                        </div>
                        <div className="flex-[1.5] space-y-2">
                          <div className="text-xs text-blue-600 font-bold uppercase flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-600" /> {config.languages.find(l => l.id === focusLanguage)?.label}
                            </div>
                            {q.text[focusLanguage] && (
                              <CheckCircle2 size={14} className="text-green-500" />
                            )}
                          </div>
                          <textarea
                            className="w-full border border-blue-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px] shadow-sm"
                            placeholder={`Übersetzung eingeben...`}
                            dir={['ar', 'fa', 'fa_af', 'ps', 'ur', 'ku_ckb'].includes(focusLanguage) ? 'rtl' : 'ltr'}
                            value={q.text[focusLanguage] || ''}
                            onChange={(e) => handleUpdateQuestion(q.id, {
                              text: { ...q.text, [focusLanguage]: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Normal Mode
                filteredQuestions.map((q: any) => (
                <div key={q.id} className={`bg-white rounded-xl shadow-sm border transition-all ${editingId === q.id ? 'border-blue-400 ring-2 ring-blue-50' : 'border-gray-200'}`}>
                  {editingId === q.id ? (
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Fragen ID</label>
                          <input className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 font-mono text-sm" value={q.id} readOnly />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kategorie</label>
                          <select
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={q.category}
                            onChange={(e) => handleUpdateQuestion(q.id, { category: e.target.value })}
                          >
                            {config.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Typ</label>
                          <select
                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={q.type}
                            onChange={(e) => handleUpdateQuestion(q.id, { type: e.target.value })}
                          >
                            <option value="Sprechtext">Sprechtext</option>
                            <option value="Direkte Fragen">Direkte Fragen</option>
                            <option value="Beobachtung">Beobachtung</option>
                            <option value="Bewertung">Bewertung</option>
                            <option value="Info">Info</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div
                          className="flex items-center justify-between cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
                          onClick={() => setEditingId(editingId === q.id ? q.id : q.id)} // Already editing, but we need a toggle for languages specifically?
                        >
                          <label className="block text-xs font-bold text-gray-400 uppercase">Übersetzungen ({config.languages.length})</label>
                        </div>

                        <div className="grid gap-4">
                          {/* Always show German as primary */}
                          {config.languages.filter(l => l.id === 'de').map((lang: any) => (
                            <div key={lang.id} className="flex gap-4 items-start">
                              <div className="w-32 pt-3">
                                <span className="text-xs font-bold bg-blue-100 px-2 py-1 rounded text-blue-700">{lang.label}</span>
                              </div>
                              <textarea
                                className="flex-1 border border-blue-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                                placeholder={`Text in ${lang.label}...`}
                                dir={['ar', 'fa', 'fa_af', 'ps', 'ur', 'ku_ckb'].includes(lang.id) ? 'rtl' : 'ltr'}
                                value={q.text[lang.id] || ''}
                                onChange={(e) => handleUpdateQuestion(q.id, {
                                  text: { ...q.text, [lang.id]: e.target.value }
                                })}
                              />
                            </div>
                          ))}

                          <LanguageSection
                            languages={config.languages.filter(l => l.id !== 'de')}
                            question={q}
                            onUpdate={(updatedText: any) => handleUpdateQuestion(q.id, { text: updatedText })}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-sm px-4 py-2"
                        >
                          <Trash2 size={18} />
                          Frage löschen
                        </button>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
                          >
                            Abbrechen
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                          >
                            <Save size={18} />
                            Speichern
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 flex justify-between items-start group">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">{q.id}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                            q.type === 'Bewertung' ? 'bg-purple-100 text-purple-600' :
                            q.type === 'Beobachtung' ? 'bg-amber-100 text-amber-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {q.type}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {config.categories.find(c => c.id === q.category)?.name || q.category}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">
                          {q.text.de || <span className="text-gray-300 italic">Kein deutscher Text vorhanden</span>}
                        </p>
                        <div className="flex gap-2">
                          {config.languages.filter(l => l.id !== 'de').map(l => (
                            <span key={l.id} title={l.label} className={`w-2 h-2 rounded-full ${q.text[l.id] ? 'bg-green-400' : 'bg-gray-200'}`}></span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingId(q.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-sm"
                      >
                        <Edit3 size={16} />
                        Bearbeiten
                      </button>
                    </div>
                  )}
                </div>
              )))}
            </div>
          </div>
        )}

        {activeTab === 'flows' && (() => {
          const visibleSteps = (flows[activeGroup] || [])
            .map((step: any, index: number) => ({ step, index, q: questions.find(q => q.id === step.id) }))
            .filter(({ q }: any) => isQuestionVisible(q));

          return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase">Gruppe Auswählen</label>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      placeholder="Frage suchen..."
                      className="w-full pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.groups.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setActiveGroup(g.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeGroup === g.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg self-end md:self-auto">
                <button
                  onClick={() => setFlowMode('visual')}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition ${flowMode === 'visual' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Visuelle Ansicht
                </button>
                <button
                  onClick={() => setFlowMode('table')}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition ${flowMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Editor (Tabelle)
                </button>
              </div>
            </div>

            {flowMode === 'visual' ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <div className="flex flex-col gap-6 relative">
                  {visibleSteps.map(({ step, index, q }: any) => {
                    return (
                      <div key={index} className="flex items-start gap-6 group animate-in fade-in slide-in-from-left-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all group-hover:scale-110 ${
                            q?.type === 'Bewertung' ? 'bg-purple-600 text-white' :
                            q?.type === 'Beobachtung' ? 'bg-amber-500 text-white' :
                            'bg-blue-600 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          {index < flows[activeGroup].length - 1 && (
                            <div className="w-0.5 h-full bg-gray-100 my-2 min-h-[40px]"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all hover:shadow-md">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-100">{step.id}</span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                q?.type === 'Bewertung' ? 'bg-purple-100 text-purple-600' :
                                q?.type === 'Beobachtung' ? 'bg-amber-100 text-amber-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {q?.type || 'System'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700 leading-relaxed">
                            {q?.text.de || (step.id === 'END' ? 'Assessment Beendet' : step.id === 'ABBRUCH' ? 'Vorgang Abgebrochen' : 'Unbekannter Schritt')}
                          </p>
                          {(step.ja || step.nein) && (
                            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-4">
                              {step.ja && (
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Wenn JA →</span>
                                  <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold border border-green-100">{step.ja}</span>
                                </div>
                              )}
                              {step.nein && (
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter">Wenn NEIN →</span>
                                  <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-lg font-bold border border-red-100">{step.nein}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setFlowMode('table')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-3 text-blue-600 hover:bg-blue-100 rounded-xl"
                        >
                          <Edit3 size={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Layout size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Flow-Schritte</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{config.groups.find(g => g.id === activeGroup)?.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddFlowStep(activeGroup)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                  >
                    <Plus size={18} />
                    Schritt hinzufügen
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 w-24">#</th>
                          <th className="px-6 py-4">Frage / ID</th>
                          <th className="px-6 py-4 w-56">JA-Zweig</th>
                          <th className="px-6 py-4 w-56">NEIN-Zweig</th>
                          <th className="px-6 py-4 w-20 text-right">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <SortableContext
                          items={flows[activeGroup]?.map((s: any, i: number) => `${i}-${s.id}`) || []}
                          strategy={verticalListSortingStrategy}
                        >
                          {visibleSteps.map(({ step, index }: any) => {
                             return (
                              <SortableFlowStep
                                key={`${index}-${step.id}`}
                                step={step}
                                index={index}
                                questions={questions}
                                onUpdate={(updatedStep) => handleUpdateFlowStep(activeGroup, index, updatedStep)}
                                onRemove={() => handleRemoveFlowStep(activeGroup, index)}
                              />
                             );
                          })}
                        </SortableContext>
                      </tbody>
                    </table>
                  </DndContext>
                </div>
              </div>
            )}
          </div>
          );
        })()}

        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-700">Automatisierte Bewertungen</h2>
              </div>
            </div>

            <div className="grid gap-6">
              {questions.filter(q => q.type === 'Bewertung' && q.rule).map((q: any) => (
                <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded uppercase tracking-wider">Regel-ID: {q.id}</span>
                      <h3 className="text-lg font-bold text-gray-800 mt-2">{q.text.de}</h3>
                    </div>
                    {editingRuleId !== q.id && (
                      <button
                        onClick={() => setEditingRuleId(q.id)}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-sm transition"
                      >
                        <Edit3 size={16} />
                        Logik bearbeiten
                      </button>
                    )}
                  </div>

                  {editingRuleId === q.id ? (
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-blue-100 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-xs font-black text-blue-600 uppercase">Regel Editor (JSON)</label>
                        <button
                          onClick={() => setEditingRuleId(null)}
                          className="text-[10px] font-bold text-gray-400 hover:text-gray-600"
                        >
                          Editor schließen
                        </button>
                      </div>
                      <textarea
                        className="w-full border border-gray-200 rounded-lg p-4 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none min-h-[200px] shadow-inner bg-white"
                        defaultValue={JSON.stringify(q.rule, null, 2)}
                        onBlur={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            handleUpdateQuestion(q.id, { rule: parsed });
                          } catch {
                            alert("Ungültiges JSON-Format. Bitte prüfen Sie Ihre Eingabe.");
                          }
                        }}
                      />
                      <div className="mt-4 grid grid-cols-2 gap-4">
                         <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">Tipp: Alter</span>
                            <code className="text-[10px] text-blue-800">{"{ \"type\": \"age_min\", \"value\": 14 }"}</code>
                         </div>
                         <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">Tipp: Zähler</span>
                            <code className="text-[10px] text-blue-800">{"{ \"type\": \"count\", \"ids\": [...], \"threshold\": 1 }"}</code>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black text-gray-300 uppercase block mb-4 tracking-tighter">Visualisierte Logik</span>
                      <VisualRule rule={q.rule} />
                    </div>
                  )}
                </div>
              ))}

              {questions.filter(q => q.type === 'Bewertung' && q.rule).length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                    <AlertCircle size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-gray-500 font-bold">Keine automatisierten Bewertungen gefunden</h3>
                  <p className="text-gray-400 text-sm mt-1">Fügen Sie im Fragen-Editor Regeln zu Bewertungs-Fragen hinzu.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
