/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity ava_bbu_BeurteilungBesondererBedurfnisse
export const ava_bbu_beurteilungbesondererbedurfnisseMetadata = {
  typeName: "mscrm.ava_bbu_beurteilungbesondererbedurfnisse",
  logicalName: "ava_bbu_beurteilungbesondererbedurfnisse",
  collectionName: "ava_bbu_beurteilungbesondererbedurfnisses",
  primaryIdAttribute: "ava_bbu_beurteilungbesondererbedurfnisseid",
  attributeTypes: {
    // Numeric Types
    importsequencenumber: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    ava_allgemeinemanahmencode: "MultiSelect",
    ava_bbu_status: "Optionset",
    ava_gesprachstyp: "Optionset",
    ava_medizinischemanahmencode: "MultiSelect",
    ava_psychologischemanahmencode: "MultiSelect",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    ava_abgeschlossen_am: "DateOnly:TimeZoneIndependent",
    ava_bbu_allgemeinebeurteilungdurchgefuhrtam: "DateOnly:DateOnly",
    ava_bbu_medbeurteilungdurchgefuhrtam: "DateOnly:DateOnly",
    ava_bbu_medbeurteilungnotwendig: "DateOnly:DateOnly",
    ava_bbu_psycheinschatzungdurchgefuhrt: "DateOnly:DateOnly",
    ava_bbu_psycheinschatzungsbedarffestgestell: "DateOnly:DateOnly",
    ava_bbu_ubermittlunganbfa: "DateOnly:DateOnly",
    ava_bbu_ubermittlunganklientin: "DateOnly:DateOnly",
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
    ava_bbu_Standort: ["mscrm.msdyn_operationalsite"],
    ava_bbu_Klient: ["mscrm.contact"],
    ava_bbu_Gesprachsteilnehmerin: ["mscrm.contact"],
  },
};

// Attribute constants
export const enum ava_bbu_BeurteilungBesondererBedurfnisseAttributes {
  ava_Abgeschlossen_am = "ava_abgeschlossen_am",
  ava_AllgemeineManahmenCode = "ava_allgemeinemanahmencode",
  ava_bbu_AllgemeineBeurteilungdurchgefuhrtam = "ava_bbu_allgemeinebeurteilungdurchgefuhrtam",
  ava_bbu_BeurteilungBesondererBedurfnisseId = "ava_bbu_beurteilungbesondererbedurfnisseid",
  ava_bbu_Gesprachsteilnehmerin = "ava_bbu_gesprachsteilnehmerin",
  ava_bbu_GesprachsteilnehmerinName = "ava_bbu_gesprachsteilnehmerinname",
  ava_bbu_GesprachsteilnehmerinYomiName = "ava_bbu_gesprachsteilnehmerinyominame",
  ava_bbu_Klient = "ava_bbu_klient",
  ava_bbu_KlientName = "ava_bbu_klientname",
  ava_bbu_KlientYomiName = "ava_bbu_klientyominame",
  ava_bbu_MedBeurteilungdurchgefuhrtam = "ava_bbu_medbeurteilungdurchgefuhrtam",
  ava_bbu_MedBeurteilungnotwendig = "ava_bbu_medbeurteilungnotwendig",
  ava_bbu_PsychEinschatzungdurchgefuhrt = "ava_bbu_psycheinschatzungdurchgefuhrt",
  ava_bbu_PsychEinschatzungsbedarffestgestell = "ava_bbu_psycheinschatzungsbedarffestgestell",
  ava_bbu_Standort = "ava_bbu_standort",
  ava_bbu_StandortName = "ava_bbu_standortname",
  ava_bbu_Status = "ava_bbu_status",
  ava_bbu_UbermittlunganBFA = "ava_bbu_ubermittlunganbfa",
  ava_bbu_UbermittlunganKlientin = "ava_bbu_ubermittlunganklientin",
  ava_bbu_Zustimmung = "ava_bbu_zustimmung",
  ava_Gesprachstyp = "ava_gesprachstyp",
  ava_MedizinischeManahmenCode = "ava_medizinischemanahmencode",
  ava_Name = "ava_name",
  ava_PsychologischeManahmenCode = "ava_psychologischemanahmencode",
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  statecode = "statecode",
  statuscode = "statuscode",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
}

// Early Bound Interface
export interface ava_bbu_BeurteilungBesondererBedurfnisse extends IEntity {
  // Abgeschlossen am DateTimeType DateOnly:TimeZoneIndependent
  ava_abgeschlossen_am?: Date | null;
  // Allgemeine Maßnahmen  ava_bbu_manahmen
  ava_allgemeinemanahmencode?: import("../enums/ava_bbu_manahmen").ava_bbu_manahmen[] | null;
  // Allgemeine Beurteilung durchgeführt am DateTimeType DateOnly:DateOnly
  ava_bbu_allgemeinebeurteilungdurchgefuhrtam?: Date | null;
  // Beurteilung Besonderer Bedürfnisse UniqueidentifierType Eindeutiger Bezeichner der Entitätsinstanzen
  ava_bbu_beurteilungbesondererbedurfnisseid?: import("dataverse-ify").Guid | null;
  // Gesprächsteilnehmer*in LookupType
  ava_bbu_gesprachsteilnehmerin?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_gesprachsteilnehmerinname?: string | null;
  //  StringType
  ava_bbu_gesprachsteilnehmerinyominame?: string | null;
  // Klient*in [Required] LookupType
  ava_bbu_klient?: import("dataverse-ify").EntityReference;
  //  StringType
  ava_bbu_klientname?: string | null;
  //  StringType
  ava_bbu_klientyominame?: string | null;
  // Med. Beurteilung durchgeführt am DateTimeType DateOnly:DateOnly
  ava_bbu_medbeurteilungdurchgefuhrtam?: Date | null;
  // Med. Beurteilung notwendig DateTimeType DateOnly:DateOnly
  ava_bbu_medbeurteilungnotwendig?: Date | null;
  // Psych. Einschätzung durchgeführt DateTimeType DateOnly:DateOnly
  ava_bbu_psycheinschatzungdurchgefuhrt?: Date | null;
  // Psych. Einschätzungsbedarf festgestellt am DateTimeType DateOnly:DateOnly
  ava_bbu_psycheinschatzungsbedarffestgestell?: Date | null;
  // Standort [Required] LookupType
  ava_bbu_standort?: import("dataverse-ify").EntityReference;
  //  StringType
  ava_bbu_standortname?: string | null;
  // Beurteilungsstatus  ava_bbu_statusbeurteilungbesondererbedurfniss
  ava_bbu_status?: import("../enums/ava_bbu_statusbeurteilungbesondererbedurfniss").ava_bbu_statusbeurteilungbesondererbedurfniss | null;
  // Übermittlung an BFA DateTimeType DateOnly:DateOnly
  ava_bbu_ubermittlunganbfa?: Date | null;
  // Übermittlung an Klient*in DateTimeType DateOnly:DateOnly
  ava_bbu_ubermittlunganklientin?: Date | null;
  // Zustimmung BooleanType
  ava_bbu_zustimmung?: boolean | null;
  // Gesprächstyp ava_gesprachstypbeurtbesondererbedurfnis
  ava_gesprachstyp?: import("../enums/ava_gesprachstypbeurtbesondererbedurfnis").ava_gesprachstypbeurtbesondererbedurfnis | null;
  // Medizinische Maßnahmen ava_bbu_manahmen
  ava_medizinischemanahmencode?: import("../enums/ava_bbu_manahmen").ava_bbu_manahmen[] | null;
  // Name StringType
  ava_name?: string | null;
  // Psychologische Maßnahmen ava_bbu_manahmen
  ava_psychologischemanahmencode?: import("../enums/ava_bbu_manahmen").ava_bbu_manahmen[] | null;
  // Erstellt von LookupType Eindeutiger Bezeichner des Benutzers, der den Datensatz erstellt hat.
  createdby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdbyname?: string | null;
  //  StringType
  createdbyyominame?: string | null;
  // Erstellt am DateTimeType Datum und Uhrzeit der Datensatzerstellung. DateAndTime:UserLocal
  createdon?: Date | null;
  // Erstellt von (Stellvertreter) LookupType Eindeutiger Bezeichner des stellvertretenden Benutzers, der den Datensatz erstellt hat.
  createdonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Importsequenznummer IntegerType Sequenznummer des Imports, mit dem dieser Datensatz erstellt wurde.
  importsequencenumber?: number | null;
  // Geändert von LookupType Eindeutiger Bezeichner des Benutzers, der den Datensatz geändert hat.
  modifiedby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedbyname?: string | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // Geändert am DateTimeType Datum und Uhrzeit der Datensatzänderung. DateAndTime:UserLocal
  modifiedon?: Date | null;
  // Geändert von (Stellvertreter) LookupType Eindeutiger Bezeichner des stellvertretenden Benutzers, der den Datensatz geändert hat.
  modifiedonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // Datensatz erstellt am DateTimeType Datum und Uhrzeit der Datensatzmigration. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Besitzer OwnerType Besitzer-ID
  ownerid?: import("dataverse-ify").EntityReference | null;
  //  StringType Name des Besitzers.
  owneridname?: string | null;
  //  EntityNameType Besitzer-ID-Typ
  owneridtype?: string | null;
  //  StringType Yomi-Name des Besitzers
  owneridyominame?: string | null;
  // Besitzer (Unternehmenseinheit) LookupType Eindeutiger Bezeichner der für den Datensatz zuständigen Unternehmenseinheit.
  owningbusinessunit?: import("dataverse-ify").EntityReference | null;
  //  StringType
  owningbusinessunitname?: string | null;
  // Besitzer (Team) LookupType Eindeutiger Bezeichner des für den Datensatz zuständigen Teams.
  owningteam?: import("dataverse-ify").EntityReference | null;
  // Besitzer (Benutzer) LookupType Eindeutiger Bezeichner des für den Datensatz zuständigen Benutzers.
  owninguser?: import("dataverse-ify").EntityReference | null;
  // Status ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statecode Status von Beurteilung Besonderer Bedürfnisse
  statecode?: import("../enums/ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statecode").ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statecode | null;
  // Statusgrund ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statuscode Grund für den Status von Beurteilung Besonderer Bedürfnisse
  statuscode?: import("../enums/ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statuscode").ava_bbu_beurteilungbesondererbedurfnisse_ava_bbu_beurteilungbesondererbedurfnisse_statuscode | null;
  // Versionsnummer der Zeitzonenregel IntegerType Nur zur internen Verwendung.
  timezoneruleversionnumber?: number | null;
  // Zeitzonencode für UTC-Konvertierung IntegerType Zeitzonencode, der bei der Datensatzerstellung verwendet wurde.
  utcconversiontimezonecode?: number | null;
  // Versionsnummer BigIntType Versionsnummer
  versionnumber?: number | null;
}
