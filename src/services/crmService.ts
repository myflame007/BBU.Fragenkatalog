import { calculateAge, isMinor as isMinorCheck } from '../utils/dateUtils';
import mockCrmData from '../data/mockCrmData.json';

export interface FamilyMember {
  ifaNumber: string;
  name: string;
  sex?: string;
  birthDate?: string;
  isMinor?: boolean;
}

export interface UserData {
  id: string;
  fullName: string;
  email?: string;
}

export interface ClientData {
  id: string; // Internal ID
  ifaNumber: string; // ava_ifanumbertext
  firstName: string; // firstname
  lastName: string; // lastname
  sex: string; // gendercode
  birthDate: string; // ava_birthdate
  age: number; // ava_age
  nationality: string; // ava_nationalitystateid
  familyStatus: string; // familystatuscode
  motherTongue: string; // ava_mothertongue
  groupId: string; // ava_clientgroup (Betreuungskategorie)
  language: string; // UI Language
  familyId?: string; // _ava_familyid_value
  familyMembers?: FamilyMember[];
  numFamilyMembers?: number;
}

/**
 * Dynamics CRM API Service
 * Uses browser-level authentication (cookies/session) access.
 */
class CrmService {
  private baseUrl = import.meta.env.VITE_CRM_URL || "https://test-555.free.beeceptor.com/api/dummy-data";

  private getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Prefer': 'odata.include-annotations="*"'
    };
  }

  async getCurrentUser(): Promise<UserData | null> {
    try {
      const response = await fetch(`${this.baseUrl}WhoAmI`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      if (!response.ok) return null;
      const data = await response.json();

      // Usually WhoAmI returns UserId, then we fetch details
      const userId = data.UserId;
      const userResponse = await fetch(`${this.baseUrl}systemusers(${userId})?$select=fullname,internalemailaddress`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      if (!userResponse.ok) return null;
      const user = await userResponse.json();
      return {
        id: userId,
        fullName: user.fullname,
        email: user.internalemailaddress
      };
    } catch (e) {
      console.error("Error fetching current user:", e);
      return null;
    }
  }

  async fetchClientByIfa(ifaNumber: string): Promise<ClientData> {
    /**
    // Real CRM API Fetching (Disabled for testing)
    const filter = `?$filter=ava_ifanumbertext eq '${ifaNumber}'`;
    const headers = this.getHeaders();

    const response = await fetch(`${this.baseUrl}contacts${filter}`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`CRM API error: ${response.statusText}`);
    }

    const data = await response.json();
    **/

    // Local Test Data Fetching
    const data = mockCrmData;

    if (!data.value || data.value.length === 0) {
      throw new Error(`Kein Klient mit IFA-Nummer ${ifaNumber} gefunden.`);
    }

    // Find client in mock data by IFA (Note: handle string vs number)
    const contact = data.value.find(c => String(c.ava_ifanumbertext) === String(ifaNumber));

    if (!contact) {
      throw new Error(`Kein Klient mit IFA-Nummer ${ifaNumber} in Testdaten gefunden.`);
    }

    let clientData: ClientData = {
      id: contact.contactid || `manual_${contact.ava_ifanumbertext}`,
      ifaNumber: String(contact.ava_ifanumbertext),
      firstName: contact.firstname || '',
      lastName: contact.lastname || '',
      sex: this.mapSex(contact.gendercode),
      birthDate: this.formatDateForInput(contact.ava_birthdate || ''),
      age: contact.ava_age || 0,
      nationality: contact.ava_nationalitystateid || '',
      familyStatus: contact.familystatuscode || '',
      motherTongue: contact.ava_mothertongue || '',
      groupId: contact.ava_clientgroup || '',
      language: 'en',
      familyId: contact._ava_familyid_value
    };

    // Handle Family Data (In mock data, it is directly in the contact object for simplicity)
    const membersString = (contact as any).ava_familienmitglieder || "";
    const count = (contact as any).ava_anzahlfamilienmitglieder || 0;

    clientData.familyMembers = this.parseFamilyMembers(membersString);
    clientData.numFamilyMembers = count;

    return clientData;
  }

  private async fetchFamilyData(familyId: string): Promise<{ members: FamilyMember[], count: number }> {
    /**
    // Real CRM API Fetching (Disabled for testing)
    const filter = `?$filter=ava_familyid eq ${familyId}`;
    const select = `&$select=ava_familienmitglieder,ava_anzahlfamilienmitglieder`;
    const headers = this.getHeaders();

    const response = await fetch(`${this.baseUrl}ava_families${filter}${select}`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });

    if (!response.ok) return { members: [], count: 0 };

    const data = await response.json();
    if (!data.value || data.value.length === 0) return { members: [], count: 0 };

    const family = data.value[0];
    const membersString = family.ava_familienmitglieder || "";
    const count = family.ava_anzahlfamilienmitglieder || 0;

    return {
      members: this.parseFamilyMembers(membersString),
      count: count
    };
    **/
    return { members: [], count: 0 };
  }

  private parseFamilyMembers(str: string): FamilyMember[] {
    if (!str) return [];

    // Example: "Ben KABEL (123456999, Maennlich, 04.12.2024), Ahmad MUSTAFA (8111, Maennlich, 03.03.1978)"
    // Use regex that splits by comma ONLY if not inside parentheses
    const parts = str.split(/,(?![^(]*\))/);

    return parts.map(rawPart => {
      const part = rawPart.trim();
      if (!part) return null;
      return this.parseSingleMember(part);
    }).filter((m): m is FamilyMember => m !== null);
  }

  /**
   * Helper to parse a single member string and return a FamilyMember object
   */
  public parseSingleMember(part: string): FamilyMember {
    const match = part.match(/^(.*?)\s*\((.*?)\)$/);
    if (!match) return { name: part.trim(), ifaNumber: '' };

    const name = match[1].trim();
    const details = match[2].split(',').map(s => s.trim());

    let ifaNumber = '';
    let sex = '';
    let birthDate = '';
    let isMinor = false;

    if (details.length === 2) {
      // (IFA, Date)
      ifaNumber = details[0];
      birthDate = details[1];
    } else if (details.length === 3) {
      // (IFA, Sex, Date)
      ifaNumber = details[0];
      sex = details[1];
      birthDate = details[2];
    } else if (details.length === 1) {
      ifaNumber = details[0];
    }

    if (birthDate) {
      isMinor = isMinorCheck(birthDate);
    }

    return { name, ifaNumber, sex, birthDate, isMinor };
  }

  private formatDateForInput(dateStr: string): string {
    if (!dateStr) return '';
    // If it's DD.MM.YYYY, convert to YYYY-MM-DD for HTML5 date input
    if (dateStr.includes('.')) {
      const parts = dateStr.split('.');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
    }
    return dateStr;
  }

  private mapSex(crmSex: any): string {
    if (typeof crmSex === 'string') {
      const s = crmSex.toLowerCase();
      if (s.startsWith('m')) return 'm';
      if (s.startsWith('w') || s.startsWith('f')) return 'w';
    }
    // Dynamics usually 1=M, 2=F
    if (crmSex === 1) return 'm';
    if (crmSex === 2) return 'w';
    return 'd';
  }

  async fetchClientData(contactId: string): Promise<ClientData> {
    // Fallback for existing calls
    return this.fetchClientByIfa("1468");
  }

  async submitAssessment(assessmentData: any): Promise<{ success: boolean; id?: string }> {
    return { success: true, id: "MOCK_" + Date.now() };
  }
}

export const crmService = new CrmService();
export const fetchClientData = (id: string) => crmService.fetchClientData(id);
export const fetchClientByIfa = (ifa: string) => crmService.fetchClientByIfa(ifa);
export const getCurrentUser = () => crmService.getCurrentUser();
export const submitAssessment = (data: any) => crmService.submitAssessment(data);
