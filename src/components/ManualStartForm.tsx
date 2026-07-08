import React, { useState } from 'react';
import config from '../data/config.json';
import {
  ClientData,
  fetchClientByIfa,
  FamilyMember,
  normalizeContactToClientData,
  getOptionSetLabel
} from '../services/crmService';
import { Search, Loader2, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateAge } from '../utils/dateUtils';
import {
  Contactsgendercode,
  Contactsfamilystatuscode,
  Contactsava_mothertongue,
  Contactsava_clientgroup,
  type Contacts
} from '../generated/models/ContactsModel';

interface Props {
  onStart: (data: ClientData) => void;
}

// Internal form state using CRM field names
interface RawFormData extends Partial<Contacts> {
  ui_language: string;
  familyMembers?: FamilyMember[];
}

export const ManualStartForm: React.FC<Props> = ({ onStart }) => {
  const [loading, setLoading] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLanguageManuallySelected, setIsLanguageManuallySelected] = useState(false);

  const [formData, setFormData] = useState<RawFormData>(() => ({
    contactid: 'MANUAL_' + Date.now(),
    ava_ifanumbertext: '',
    firstname: '',
    lastname: '',
    gendercode: 1, // Männlich
    ava_birthdate: '',
    ava_age: '0',
    ava_nationalitystateid: undefined,
    familystatuscode: 1, // Ledig
    ava_mothertongue: 100000138, // Deutsch
    ava_clientgroup: 100000005, // Familie
    ui_language: 'de',
    familyMembers: []
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeContactToClientData(formData as Contacts);
    // Override UI language if manually selected or default
    normalized.language = formData.ui_language || normalized.language;
    // Keep family members from state
    normalized.familyMembers = formData.familyMembers;
    onStart(normalized);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: ['gendercode', 'familystatuscode', 'ava_mothertongue', 'ava_clientgroup'].includes(name)
          ? parseInt(value)
          : value
      };

      if (name === 'ui_language') {
        setIsLanguageManuallySelected(true);
      }

      // Auto-sync UI language with mother tongue when changed and not manually overridden
      if (name === 'ava_mothertongue' && !isLanguageManuallySelected) {
        const langLabel = getOptionSetLabel(Contactsava_mothertongue, parseInt(value));
        const langConfig = config.languages.find(l => l.label === langLabel || l.id === langLabel.toLowerCase());
        if (langConfig) {
          newData.ui_language = langConfig.id;
        }
      }

      // Auto-calculate age if birthdate changes
      if (name === 'ava_birthdate') {
        const age = calculateAge(value);
        newData.ava_age = String(age);
      }

      return newData;
    });
  };

  const [showAgeModal, setShowAgeModal] = useState<{ show: boolean, member: ClientData | null }>({ show: false, member: null });

  const applyCrmData = (data: ClientData) => {
    // Helper to find the key for a given label in an OptionSet
    const findOptionKey = (options: Record<number, string>, label: string): number | undefined => {
       const entry = Object.entries(options).find(([_, v]) => v.toLowerCase() === label.toLowerCase());
       return entry ? parseInt(entry[0]) : undefined;
    };

    // Convert ClientData back to RawFormData for the form fields
    const rawData: RawFormData = {
      contactid: data.id,
      ava_ifanumbertext: data.ifaNumber,
      firstname: data.firstName,
      lastname: data.lastName,
      ava_birthdate: data.birthDate,
      ava_age: String(data.age),
      ava_nationalitystateid: data.nationality as any,
      ui_language: isLanguageManuallySelected ? formData.ui_language : data.language,
      familyMembers: data.familyMembers
    };

    // Mapping back values
    rawData.gendercode = (data.sex === 'm' ? 1 : (data.sex === 'w' ? 2 : 192350000)) as Contactsgendercode;

    const statusKey = findOptionKey(Contactsfamilystatuscode, data.familyStatus);
    if (statusKey) rawData.familystatuscode = statusKey as Contactsfamilystatuscode;

    const tongueKey = findOptionKey(Contactsava_mothertongue, data.motherTongue);
    if (tongueKey) rawData.ava_mothertongue = tongueKey as Contactsava_mothertongue;

    const groupKey = findOptionKey(Contactsava_clientgroup, data.groupId);
    if (groupKey) rawData.ava_clientgroup = groupKey as Contactsava_clientgroup;

    // Trigger pulse animation
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1000);

    // Special handling for 14-18 age group
    if (data.age >= 14 && data.age < 18) {
      setShowAgeModal({ show: true, member: data });
    } else {
      setFormData(prev => ({ ...prev, ...rawData }));
    }
  };

  const handleCrmFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClientByIfa(String(formData.ava_ifanumbertext || '1468'));
      applyCrmData(data);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der CSM-Daten");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFamilyMember = async (member: FamilyMember) => {
    setFormData(prev => ({ ...prev, ava_ifanumbertext: member.ifaNumber }));

    setLoading(true);
    setError(null);
    try {
      const data = await fetchClientByIfa(member.ifaNumber);
      applyCrmData(data);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der CSM-Daten");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full max-h-[90vh] transition-colors relative">
      <AnimatePresence>
        {showAgeModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Jugendliche*r (14-18J)</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Bitte wählen Sie den passenden Fragenkatalog.</p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    if (showAgeModal.member) {
                      const raw = {
                        ...formData,
                        ava_age: String(showAgeModal.member.age),
                        ui_language: showAgeModal.member.language,
                        familyMembers: showAgeModal.member.familyMembers
                      };
                      setFormData(raw);
                      // Custom start with specific group
                      onStart({ ...showAgeModal.member, groupId: 'Kind_14plus' });
                    }
                    setShowAgeModal({ show: false, member: null });
                  }}
                  className="w-full p-6 text-left rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <div className="font-black text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">Direktbefragung (14+)</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fragen werden direkt an die/den Jugendliche*n gestellt.</p>
                </button>

                <button
                  onClick={() => {
                    if (showAgeModal.member) {
                      onStart(showAgeModal.member);
                    }
                    setShowAgeModal({ show: false, member: null });
                  }}
                  className="w-full p-6 text-left rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <div className="font-black text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">Befragung über Eltern</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fragen werden im Beisein der Eltern/Bezugspersonen geklärt.</p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: isPulsing ? [1, 1.02, 1] : 1,
          transition: { duration: 0.3 }
        }}
        className={`lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl overflow-y-auto transition-colors duration-300 ${isPulsing ? 'ring-4 ring-blue-500/40' : ''}`}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 border-b dark:border-slate-700 pb-4">
          Klientendaten erfassen (CRM Simulation)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-xl border border-blue-100 dark:border-slate-600 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">IFA-Nummer (ava_ifanumbertext)</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="ava_ifanumbertext"
                  value={formData.ava_ifanumbertext || ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="z.B. 1468"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleCrmFetch}
              disabled={loading || !formData.ava_ifanumbertext}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-2 rounded-lg shadow transition-all flex items-center gap-2 whitespace-nowrap h-[42px]"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
              CRM Fetch simulieren
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Vorname (firstname)</label>
            <input
              required
              type="text"
              name="firstname"
              value={formData.firstname || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. Max"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Nachname (lastname)</label>
            <input
              required
              type="text"
              name="lastname"
              value={formData.lastname || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. Mustermann"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Geschlecht (gendercode)</label>
            <select
              name="gendercode"
              value={formData.gendercode || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {Object.entries(Contactsgendercode).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Geburtstag (ava_birthdate)</label>
            <input
              required
              type="date"
              name="ava_birthdate"
              value={formData.ava_birthdate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Alter (ava_age)</label>
            <input
              required
              type="number"
              name="ava_age"
              value={formData.ava_age || '0'}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              min="0"
              max="120"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Nationalität (ava_nationalitystateid)</label>
            <input
              type="text"
              name="ava_nationalitystateid"
              value={(formData.ava_nationalitystateid as unknown as string) || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. ITAKA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Familienstand (familystatuscode)</label>
            <select
              name="familystatuscode"
              value={formData.familystatuscode || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {Object.entries(Contactsfamilystatuscode).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Muttersprache (ava_mothertongue)</label>
            <select
              name="ava_mothertongue"
              value={formData.ava_mothertongue || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {Object.entries(Contactsava_mothertongue).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Betreuungskategorie (ava_clientgroup)</label>
          <select
            name="ava_clientgroup"
            value={formData.ava_clientgroup || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {Object.entries(Contactsava_clientgroup).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Sprache des Assistenten (UI)</label>
          <select
            name="ui_language"
            value={formData.ui_language || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {config.languages.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.label} {lang.id === 'de' ? '(Standard)' : ''}
              </option>
            ))}
          </select>
        </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              Assistenten starten
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl overflow-y-auto h-fit lg:max-h-full"
      >
        <div className="flex items-center gap-2 mb-6 border-b dark:border-slate-700 pb-4">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
            KERNFAMILIE
          </h3>
        </div>

        {!formData.familyMembers || formData.familyMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-slate-500 text-center">
            <Users className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm">Keine Familienmitglieder geladen.</p>
            <p className="text-xs mt-1">Suchen Sie nach einer IFA-Nummer im CRM.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.familyMembers.map((member: FamilyMember, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSelectFamilyMember(member)}
                type="button"
                className={`w-full text-left p-4 rounded-xl border transition-all transform hover:scale-[1.02] active:scale-[0.98] group flex flex-col gap-1 ${
                  member.isMinor
                    ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-400 dark:bg-yellow-900/10 dark:border-yellow-700/50'
                    : 'bg-gray-50 border-gray-100 hover:border-blue-400 dark:bg-slate-700/50 dark:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-black text-gray-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </span>
                  {member.isMinor && (
                    <span className="bg-yellow-200 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Minderjährig
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="font-bold">IFA:</span> {member.ifaNumber}
                  </span>
                  {member.sex && (
                    <span className="flex items-center gap-1">
                      <span className="font-bold">G:</span> {member.sex}
                    </span>
                  )}
                  {member.birthDate && (
                    <span className="flex items-center gap-1">
                      <span className="font-bold">Geb:</span> {member.birthDate}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
