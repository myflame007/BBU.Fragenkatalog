import React, { useState } from 'react';
import config from '../data/config.json';
import { ClientData, fetchClientByIfa, FamilyMember } from '../services/crmService';
import { Search, Loader2, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateAge } from '../utils/dateUtils';

interface Props {
  onStart: (data: ClientData) => void;
}

export const ManualStartForm: React.FC<Props> = ({ onStart }) => {
  const [loading, setLoading] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLanguageManuallySelected, setIsLanguageManuallySelected] = useState(false);
  const [formData, setFormData] = useState<ClientData>(() => ({
    id: 'MANUAL_' + Date.now(),
    ifaNumber: '',
    firstName: '',
    lastName: '',
    sex: 'm',
    birthDate: '',
    age: 0,
    nationality: '',
    familyStatus: '',
    motherTongue: '',
    groupId: config.groups[0].id,
    language: 'de'
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'language') {
      setIsLanguageManuallySelected(true);
    }

    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: name === 'age' ? parseInt(value) || 0 : value
      };

      // Auto-sync UI language with mother tongue when changed manually
      if (name === 'motherTongue' && !isLanguageManuallySelected) {
        newData.language = value;
      }

      return newData;
    });
  };

  const [showAgeModal, setShowAgeModal] = useState<{ show: boolean, member: ClientData | null }>({ show: false, member: null });

  const mapClientGroup = (avaClientGroup: string, age: number): string => {
    const isAdult = age >= 18;

    // If it's already a valid internal group ID, return it
    if (config.groups.some(g => g.id === avaClientGroup)) {
      return avaClientGroup;
    }

    // Mapping rules based on user input (ava_clientgroup)
    if (avaClientGroup === 'ARF' || avaClientGroup === 'ARM') {
      return isAdult ? 'ARF_ARM' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    }

    if (avaClientGroup === 'ARF (Kind)' || avaClientGroup === 'ARM (Kind)') {
      return isAdult ? 'ARF_K_ARM_K_Erwachsene' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    }

    if (avaClientGroup === 'Familie') {
      return isAdult ? 'ARF_K_ARM_K_Erwachsene' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
    }

    if (avaClientGroup === 'UMF' || avaClientGroup === 'UMF (Kind)' || avaClientGroup === 'uUMF') {
      return 'uUMF_Kind';
    }

    // Default if no specific match
    return isAdult ? 'ARF_ARM' : 'Kind_FAM_ARM_K_ARF_K_UMF_K';
  };

  const applyCrmData = (data: ClientData) => {
    const age = data.age || calculateAge(data.birthDate);
    const groupId = mapClientGroup(data.groupId, age);

    const finalData: ClientData = {
      ...formData,
      ...data,
      age,
      groupId,
      ifaNumber: data.ifaNumber || formData.ifaNumber,
      language: isLanguageManuallySelected ? formData.language : (data.language || formData.language)
    };

    // Trigger pulse animation
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1000);

    // Special handling for 14-18 age group
    if (age >= 14 && age < 18) {
      setShowAgeModal({ show: true, member: finalData });
    } else {
      setFormData(finalData);
    }
  };

  const handleCrmFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClientByIfa(formData.ifaNumber || '1468');
      applyCrmData(data);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der CSM-Daten");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFamilyMember = async (member: FamilyMember) => {
    // Set IFA first to show it in search box
    setFormData(prev => ({ ...prev, ifaNumber: member.ifaNumber }));

    // Automatically trigger CRM fetch
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
                      setFormData({ ...showAgeModal.member, groupId: 'Kind_14plus' });
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
                      setFormData(showAgeModal.member);
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

      {/* Linke Seite: Formular */}
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
          Klientendaten erfassen
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {/* CRM Fetch & IFA Nummer */}
        <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-xl border border-blue-100 dark:border-slate-600 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">IFA-Nummer (CRM Suche)</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="ifaNumber"
                  value={formData.ifaNumber}
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
              disabled={loading || !formData.ifaNumber}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-2 rounded-lg shadow transition-all flex items-center gap-2 whitespace-nowrap h-[42px]"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
              Daten aus CSM laden
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vorname */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Vorname (firstname)</label>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. Max"
            />
          </div>
          {/* Nachname */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Nachname (lastname)</label>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. Mustermann"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Geschlecht */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Geschlecht (gendercode)</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="m">Männlich</option>
              <option value="w">Weiblich</option>
              <option value="d">Divers</option>
            </select>
          </div>
          {/* Geburtstag */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Geburtstag (ava_birthdate)</label>
            <input
              required
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alter */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Alter (ava_age)</label>
            <input
              required
              type="number"
              step="any"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              min="0"
              max="120"
            />
          </div>
          {/* Nationalität */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Nationalität (ava_nationalitystateid)</label>
            <input
              required
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="z.B. Österreich"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Familienstand */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Familienstand (familystatuscode)</label>
            <select
              name="familyStatus"
              value={formData.familyStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="ledig">Ledig</option>
              <option value="verheiratet">Verheiratet</option>
              <option value="geschieden">Geschieden</option>
              <option value="verwitwet">Verwitwet</option>
            </select>
          </div>
          {/* Muttersprache */}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Muttersprache (ava_mothertongue)</label>
            <select
              name="motherTongue"
              value={formData.motherTongue}
              onChange={handleChange}
              className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {config.languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Betreuungskategorie */}
        <div>
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Betreuungskategorie (ava_clientgroup)</label>
          <select
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            className="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {config.groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assistent Sprache */}
        <div>
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mb-1">Sprache des Assistenten (UI)</label>
          <select
            name="language"
            value={formData.language}
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

      {/* Familien-Bucket */}
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
          {formData.numFamilyMembers !== undefined && (
            <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
              {formData.numFamilyMembers} Mitglieder
            </span>
          )}
        </div>

        {!formData.familyMembers || formData.familyMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-slate-500 text-center">
            <Users className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm">Keine Familienmitglieder geladen.</p>
            <p className="text-xs mt-1">Suchen Sie nach einer IFA-Nummer im CRM.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.familyMembers.map((member, idx) => (
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
