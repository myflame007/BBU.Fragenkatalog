/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity ava_bbu_Bedurfniskategorie
export const ava_bbu_bedurfniskategorieMetadata = {
  typeName: "mscrm.ava_bbu_bedurfniskategorie",
  logicalName: "ava_bbu_bedurfniskategorie",
  collectionName: "ava_bbu_bedurfniskategories",
  primaryIdAttribute: "ava_bbu_bedurfniskategorieid",
  attributeTypes: {
    // Numeric Types
    importsequencenumber: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    ava_bbu_entsprechendebestatigungliegtvor: "Optionset",
    ava_bbu_kategorie: "Optionset",
    ava_bbu_typ: "Optionset",
    ava_qualitatcode: "MultiSelect",
    ava_sonstigebesonderebedurfnisse: "MultiSelect",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
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
    ava_bbu_Klient: ["mscrm.contact"],
    ava_BeurteilungbesondererBedurfnisseId: ["mscrm.ava_bbu_beurteilungbesondererbedurfnisse"],
  },
};

// Attribute constants
export const enum ava_bbu_BedurfniskategorieAttributes {
  ava_bbu_AngabeVerwandteBezugspersoneninOste = "ava_bbu_angabeverwandtebezugspersoneninoste",
  ava_bbu_AngabeVerwandteBezugspersoninEU = "ava_bbu_angabeverwandtebezugspersonineu",
  ava_bbu_ArtderBelastung = "ava_bbu_artderbelastung",
  ava_bbu_ArtderErkrankung = "ava_bbu_artdererkrankung",
  ava_bbu_BedurfniskategorieId = "ava_bbu_bedurfniskategorieid",
  ava_bbu_BegleitetvonvolljahrigerPerson = "ava_bbu_begleitetvonvolljahrigerperson",
  ava_bbu_EntsprechendeBestatigungliegtvor = "ava_bbu_entsprechendebestatigungliegtvor",
  ava_bbu_HinweisvonDritten = "ava_bbu_hinweisvondritten",
  ava_bbu_InfozuVerwandtenBezugspersonen = "ava_bbu_infozuverwandtenbezugspersonen",
  ava_bbu_Kategorie = "ava_bbu_kategorie",
  ava_bbu_Klient = "ava_bbu_klient",
  ava_bbu_KlientName = "ava_bbu_klientname",
  ava_bbu_KlientYomiName = "ava_bbu_klientyominame",
  ava_bbu_MedizinischeHinweiseliegenvor = "ava_bbu_medizinischehinweiseliegenvor",
  ava_bbu_PsychologischeHinweiseliegenvor = "ava_bbu_psychologischehinweiseliegenvor",
  ava_bbu_Risikofaktorenliegenvor = "ava_bbu_risikofaktorenliegenvor",
  ava_bbu_SorgeuberdasKinddurchSchuleDritte = "ava_bbu_sorgeuberdaskinddurchschuledritte",
  ava_bbu_SSW = "ava_bbu_ssw",
  ava_bbu_Typ = "ava_bbu_typ",
  ava_bbu_Unterstutzungnotwendig = "ava_bbu_unterstutzungnotwendig",
  ava_bbu_VerdachtaufKindeswohlgefahrdung = "ava_bbu_verdachtaufkindeswohlgefahrdung",
  ava_bbu_VerdachtaufKindeswohlgefahrdungdurch = "ava_bbu_verdachtaufkindeswohlgefahrdungdurch",
  ava_BeurteilungbesondererBedurfnisseId = "ava_beurteilungbesondererbedurfnisseid",
  ava_BeurteilungbesondererBedurfnisseIdName = "ava_beurteilungbesondererbedurfnisseidname",
  ava_Name = "ava_name",
  ava_QualitatCode = "ava_qualitatcode",
  ava_SonstigeBesondereBedurfnisse = "ava_sonstigebesonderebedurfnisse",
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
export interface ava_bbu_Bedurfniskategorie extends IEntity {
  // Angabe Verwandte/Bezugspersonen in Österreich BooleanType
  ava_bbu_angabeverwandtebezugspersoneninoste?: boolean | null;
  // Angabe Verwandte/Bezugsperson in EU BooleanType
  ava_bbu_angabeverwandtebezugspersonineu?: boolean | null;
  // Art der Belastung MemoType
  ava_bbu_artderbelastung?: string | null;
  // Art der Erkrankung MemoType
  ava_bbu_artdererkrankung?: string | null;
  // Bedürfniskategorie UniqueidentifierType Eindeutiger Bezeichner der Entitätsinstanzen
  ava_bbu_bedurfniskategorieid?: import("dataverse-ify").Guid | null;
  // Begleitet von volljähriger Person BooleanType
  ava_bbu_begleitetvonvolljahrigerperson?: boolean | null;
  // Entsprechende Bestätigung liegt vor ava_bbu_entsprechendebestatigungliegtvor
  ava_bbu_entsprechendebestatigungliegtvor?: import("../enums/ava_bbu_entsprechendebestatigungliegtvor").ava_bbu_entsprechendebestatigungliegtvor | null;
  // Hinweis von Dritten BooleanType
  ava_bbu_hinweisvondritten?: boolean | null;
  // Info zu Verwandten/Bezugspersonen MemoType
  ava_bbu_infozuverwandtenbezugspersonen?: string | null;
  // Kategorie ava_bbu_kategoriebedurfniskategorie
  ava_bbu_kategorie?: import("../enums/ava_bbu_kategoriebedurfniskategorie").ava_bbu_kategoriebedurfniskategorie | null;
  // Klient LookupType
  ava_bbu_klient?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_klientname?: string | null;
  //  StringType
  ava_bbu_klientyominame?: string | null;
  // Medizinische Hinweise liegen vor BooleanType
  ava_bbu_medizinischehinweiseliegenvor?: boolean | null;
  // Psychologische Hinweise liegen vor BooleanType
  ava_bbu_psychologischehinweiseliegenvor?: boolean | null;
  // Risikofaktoren liegen vor BooleanType
  ava_bbu_risikofaktorenliegenvor?: boolean | null;
  // Sorge über das Kind durch Schule/Dritte BooleanType
  ava_bbu_sorgeuberdaskinddurchschuledritte?: boolean | null;
  // SSW MemoType
  ava_bbu_ssw?: string | null;
  // Typ [Required] ava_bbu_typbedurfniskategorie
  ava_bbu_typ?: import("../enums/ava_bbu_typbedurfniskategorie").ava_bbu_typbedurfniskategorie;
  // Unterstützung notwendig BooleanType
  ava_bbu_unterstutzungnotwendig?: boolean | null;
  // Verdacht auf Kindeswohlgefährdung BooleanType
  ava_bbu_verdachtaufkindeswohlgefahrdung?: boolean | null;
  // Verdacht auf Kindeswohlgefährdung durch KJH BooleanType
  ava_bbu_verdachtaufkindeswohlgefahrdungdurch?: boolean | null;
  // Beurteilung besonderer Bedürfnisse LookupType
  ava_beurteilungbesondererbedurfnisseid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_beurteilungbesondererbedurfnisseidname?: string | null;
  // Name StringType
  ava_name?: string | null;
  // Qualität  ava_bbu_qualitat
  ava_qualitatcode?: import("../enums/ava_bbu_qualitat").ava_bbu_qualitat[] | null;
  // Sonstige Besondere Bedürfnisse
  ava_sonstigebesonderebedurfnisse?: import("../enums/ava_sonstigebesonderebedurfnisse").ava_sonstigebesonderebedurfnisse[] | null;
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
  // Status ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statecode Status von Bedürfniskategorie
  statecode?: import("../enums/ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statecode").ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statecode | null;
  // Statusgrund ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statuscode Grund für den Status von Bedürfniskategorie
  statuscode?: import("../enums/ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statuscode").ava_bbu_bedurfniskategorie_ava_bbu_bedurfniskategorie_statuscode | null;
  // Versionsnummer der Zeitzonenregel IntegerType Nur zur internen Verwendung.
  timezoneruleversionnumber?: number | null;
  // Zeitzonencode für UTC-Konvertierung IntegerType Zeitzonencode, der bei der Datensatzerstellung verwendet wurde.
  utcconversiontimezonecode?: number | null;
  // Versionsnummer BigIntType Versionsnummer
  versionnumber?: number | null;
}
