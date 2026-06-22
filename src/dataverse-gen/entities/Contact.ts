/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity Contact
export const contactMetadata = {
  typeName: "mscrm.contact",
  logicalName: "contact",
  collectionName: "contacts",
  primaryIdAttribute: "contactid",
  attributeTypes: {
    // Numeric Types
    address1_latitude: "Double",
    address1_longitude: "Double",
    address1_utcoffset: "Integer",
    address2_latitude: "Double",
    address2_longitude: "Double",
    address2_utcoffset: "Integer",
    address3_latitude: "Double",
    address3_longitude: "Double",
    address3_utcoffset: "Integer",
    adx_identity_accessfailedcount: "Integer",
    adx_preferredlcid: "Integer",
    adx_timezone: "Integer",
    aging30: "Money",
    aging30_base: "Money",
    aging60: "Money",
    aging60_base: "Money",
    aging90: "Money",
    aging90_base: "Money",
    annualincome: "Money",
    annualincome_base: "Money",
    ava_actualage: "Decimal",
    ava_age: "Decimal",
    ava_agedifference: "Decimal",
    ava_aktiveanbietungen: "Integer",
    ava_aktiveanbietungen_state: "Integer",
    ava_alleremuleistungen: "Money",
    ava_alleremuleistungen_base: "Money",
    ava_alleremuleistungen_state: "Integer",
    ava_bbu_numberpersonsinfamiliy: "Integer",
    ava_bbu_remaininghours: "Decimal",
    ava_bbu_sumschoolissue: "Money",
    ava_bbu_sumschoolissue_base: "Money",
    ava_bbu_sumschoolissue_state: "Integer",
    ava_bekleidungshilfelgvs: "Money",
    ava_bekleidungshilfelgvs_base: "Money",
    ava_costperclientcurrentmonth: "Money",
    ava_costperclientcurrentmonth_base: "Money",
    ava_costperclientcurrentmonth_state: "Integer",
    ava_image_timestamp: "BigInt",
    ava_output_sum_clothin: "Money",
    ava_output_sum_clothin_base: "Money",
    ava_output_sum_clothin_state: "Integer",
    ava_remubudgetpermonth: "Money",
    ava_remubudgetpermonth_base: "Money",
    ava_remurestbudget: "Money",
    ava_remurestbudget_base: "Money",
    ava_restbudgetbekleidungsausgaben: "Decimal",
    ava_roundedage: "Decimal",
    ava_socialsecuritynumber: "Integer",
    ava_summebekleidungsausgabegesamt: "Decimal",
    ava_summebekleidungsausgabenaktuellejahr: "Money",
    ava_summebekleidungsausgabenaktuellejahr_base: "Money",
    ava_summebekleidungsausgabenaktuellejahr_state: "Integer",
    creditlimit: "Money",
    creditlimit_base: "Money",
    entityimage_timestamp: "BigInt",
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    msdyn_primarytimezone: "Integer",
    numberofchildren: "Integer",
    onholdtime: "Integer",
    teamsfollowed: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    accountrolecode: "Optionset",
    address1_addresstypecode: "Optionset",
    address1_freighttermscode: "Optionset",
    address1_shippingmethodcode: "Optionset",
    address2_addresstypecode: "Optionset",
    address2_freighttermscode: "Optionset",
    address2_shippingmethodcode: "Optionset",
    address3_addresstypecode: "Optionset",
    address3_freighttermscode: "Optionset",
    address3_shippingmethodcode: "Optionset",
    ava_aktuelleraufenthaltsstatus: "Optionset",
    ava_assessmentpsychologicalwellbeing: "Optionset",
    ava_bbu_aktuellesgvsquartier: "Optionset",
    ava_bbu_anonymgemeldet: "Optionset",
    ava_bbu_begrundung: "Optionset",
    ava_bbu_familyrole: "Optionset",
    ava_bbu_frkantragunterschrieben: "Optionset",
    ava_bbu_gefahrenanalyse: "Optionset",
    ava_bbu_literacy: "Optionset",
    ava_bbu_pregnancymonth: "Optionset",
    ava_bbu_statusofproceeding: "Optionset",
    ava_bbu_typdervulnerabilitat: "Optionset",
    ava_bundeslandletzteanbietung: "Optionset",
    ava_changingreasonbirthdate: "Optionset",
    ava_citizenship: "Optionset",
    ava_clientgroup: "Optionset",
    ava_communicationlanguage: "MultiSelect",
    ava_currentaddresstype: "Optionset",
    ava_ethnicgroup: "Optionset",
    ava_familytravelinformation: "Optionset",
    ava_foodpreferences: "MultiSelect",
    ava_legalrepresentationstatus: "Optionset",
    ava_levelofcare: "Optionset",
    ava_mothertongue: "Optionset",
    ava_nationality: "Optionset",
    ava_nationalitystatetype: "Optionset",
    ava_pflegeeinschatzung: "Optionset",
    ava_religion: "Optionset",
    ava_underageinformation: "Optionset",
    customersizecode: "Optionset",
    customertypecode: "Optionset",
    educationcode: "Optionset",
    familystatuscode: "Optionset",
    gendercode: "Optionset",
    haschildrencode: "Optionset",
    leadsourcecode: "Optionset",
    msdyn_decisioninfluencetag: "Optionset",
    msdyn_language: "Optionset",
    msdyn_orgchangestatus: "Optionset",
    msft_datastate: "Optionset",
    mspp_userpreferredlcid: "Optionset",
    paymenttermscode: "Optionset",
    preferredappointmentdaycode: "Optionset",
    preferredappointmenttimecode: "Optionset",
    preferredcontactmethodcode: "Optionset",
    shippingmethodcode: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    territorycode: "Optionset",
    // Date Formats
    adx_identity_lastsuccessfullogin: "DateAndTime:UserLocal",
    adx_identity_lockoutenddate: "DateAndTime:UserLocal",
    adx_profilealertdate: "DateAndTime:UserLocal",
    adx_profilelastactivity: "DateAndTime:UserLocal",
    adx_profilemodifiedon: "DateAndTime:UserLocal",
    anniversary: "DateOnly:DateOnly",
    ava_aktiveanbietungen_date: "DateAndTime:UserLocal",
    ava_alleremuleistungen_date: "DateAndTime:UserLocal",
    ava_bbu_ablehnungremuangebotper: "DateOnly:DateOnly",
    ava_bbu_beginn: "DateOnly:DateOnly",
    ava_bbu_bescheiddatum: "DateOnly:TimeZoneIndependent",
    ava_bbu_bescheiddatume: "DateOnly:TimeZoneIndependent",
    ava_bbu_dateofhwr: "DateOnly:UserLocal",
    ava_bbu_dateofrevocation: "DateOnly:UserLocal",
    ava_bbu_datethirdvaccinationreceived: "DateOnly:UserLocal",
    ava_bbu_datumabkarteerhalten: "DateOnly:TimeZoneIndependent",
    ava_bbu_datumderasylantragstellung: "DateOnly:DateOnly",
    ava_bbu_datumpflegebescheid: "DateOnly:DateOnly",
    ava_bbu_datumpflegeeinschatzung: "DateOnly:TimeZoneIndependent",
    ava_bbu_ende: "DateOnly:DateOnly",
    ava_bbu_geplanterentbindungstermin: "DateOnly:DateOnly",
    ava_bbu_posteingang: "DateOnly:TimeZoneIndependent",
    ava_bbu_remufahigkeitsprufungam: "DateOnly:DateOnly",
    ava_bbu_schulbesuchab: "DateOnly:DateOnly",
    ava_bbu_sumschoolissue_date: "DateAndTime:UserLocal",
    ava_birthdate: "DateOnly:UserLocal",
    ava_costperclientcurrentmonth_date: "DateAndTime:UserLocal",
    ava_culturepass: "DateOnly:DateOnly",
    ava_currentaccessdate: "DateOnly:DateOnly",
    ava_currentaddressmodifiedon: "DateAndTime:UserLocal",
    ava_currentbirthdatemodifiedon: "DateOnly:UserLocal",
    ava_datefirstvaccinationreceived: "DateOnly:UserLocal",
    ava_dateinitialmedicalcare: "DateOnly:DateOnly",
    ava_datelastcheck: "DateOnly:DateOnly",
    ava_datenextappointment: "DateOnly:UserLocal",
    ava_datesecondappointment: "DateOnly:UserLocal",
    ava_datesecondvaccinationreceived: "DateOnly:UserLocal",
    ava_datetbccheckconduct: "DateOnly:DateOnly",
    ava_datetbccheckreport: "DateOnly:DateOnly",
    ava_datumabkartegedruckt: "DateOnly:TimeZoneIndependent",
    ava_datumletzteanbietung: "DateOnly:UserLocal",
    ava_datumletzteinteraktion: "DateAndTime:UserLocal",
    ava_datumpsychologischeserstgesprach: "DateAndTime:TimeZoneIndependent",
    ava_firstmoveindate: "DateOnly:DateOnly",
    ava_informationvaccination: "DateOnly:UserLocal",
    ava_letztetndemrefr: "DateOnly:DateOnly",
    ava_letztetngleichberechtigung: "DateOnly:DateOnly",
    ava_letztetngrundregelkurs: "DateOnly:DateOnly",
    ava_letztetnrechteundpflichten: "DateOnly:DateOnly",
    ava_letztetnsensantis: "DateOnly:DateOnly",
    ava_obsorgeabgelehntam: "DateOnly:UserLocal",
    ava_obsorgebeantragtam: "DateOnly:UserLocal",
    ava_obsorgebeschlussam: "DateOnly:UserLocal",
    ava_output_sum_clothin_date: "DateAndTime:UserLocal",
    ava_returncounselling: "DateOnly:DateOnly",
    ava_sharepointfoldercreationtrigger: "DateAndTime:TimeZoneIndependent",
    ava_startberechnungszeitraum: "DateOnly:UserLocal",
    ava_startnaechsterberechnungszeitraum: "DateOnly:UserLocal",
    ava_summebekleidungsausgabenaktuellejahr_date: "DateAndTime:UserLocal",
    ava_umffrage2datum: "DateOnly:TimeZoneIndependent",
    ava_umffrage3datum: "DateOnly:TimeZoneIndependent",
    ava_umffrage4datum: "DateOnly:TimeZoneIndependent",
    ava_verdachtaufmenschenhandel: "DateOnly:DateOnly",
    ava_verfahrenskarteerhalten: "DateOnly:DateOnly",
    ava_verfahrenskartegedruckt: "DateOnly:DateOnly",
    birthdate: "DateOnly:DateOnly",
    createdon: "DateAndTime:UserLocal",
    lastonholdtime: "DateAndTime:UserLocal",
    lastusedincampaign: "DateOnly:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    msdyn_portaltermsagreementdate: "DateAndTime:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    transactioncurrencyid: ["mscrm.transactioncurrency"],
    stageid_processstage: ["mscrm.processstage"],
    sla_contact_sla: ["mscrm.sla"],
    preferredsystemuserid: ["mscrm.systemuser"],
    preferredserviceid: ["mscrm.service"],
    preferredequipmentid: ["mscrm.equipment"],
    parent_contactid: ["mscrm.contact"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    originatingleadid: ["mscrm.lead"],
    msdyn_vendorpaymentmethod: ["mscrm.msdyn_vendorpaymentmethod"],
    msdyn_vendorgroup: ["mscrm.msdyn_vendorgroup"],
    msdyn_vendorcontactid: ["mscrm.msdyn_vendor"],
    msdyn_segmentid: ["mscrm.msdyn_segment"],
    msdyn_salestaxgroup: ["mscrm.msdyn_taxgroup"],
    msdyn_paymentterms: ["mscrm.msdyn_paymentterm"],
    msdyn_paymentschedule: ["mscrm.msdyn_paymentschedule"],
    msdyn_paymentday: ["mscrm.msdyn_paymentday"],
    msdyn_linkedvendoraccount: ["mscrm.msdyn_vendor"],
    msdyn_customerpaymentmethod: ["mscrm.msdyn_customerpaymentmethod"],
    msdyn_customergroupid: ["mscrm.msdyn_customergroup"],
    msdyn_contactkpiid: ["mscrm.msdyn_contactkpiitem"],
    msdyn_company: ["mscrm.cdm_company"],
    msdyn_accountnumber: ["mscrm.account"],
    msa_managingpartnerid: ["mscrm.account"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    masterid: ["mscrm.contact"],
    defaultpricelevelid: ["mscrm.pricelevel"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
    ava_lastOffering: ["mscrm.ava_offerings"],
    ava_lastAccess: ["mscrm.ava_scanmotion"],
    ava_firstAppointment: ["mscrm.appointment"],
    ava_currentfloor: ["mscrm.ava_floorlevel"],
    ava_currentbuilding: ["mscrm.ava_building"],
    ava_bbu_togetherness: ["mscrm.ava_zusammengehoerigkeit"],
    ava_bbu_remutask: ["mscrm.ava_remuneranttaetigkeit"],
    ava_bbu_currentremunerant: ["mscrm.ava_remuneranteinsatz"],
    ava_bbu_currentpandemicinfectionid: ["mscrm.ava_pandemicinfection"],
    ava_bbu_currenthospitalabsenceid: ["mscrm.ava_absence"],
    ava_bbu_chaperon: ["mscrm.contact"],
    ava_bbu_Schuleinrichtung: ["mscrm.account"],
    ava_bbu_ScanMotionLastScanId: ["mscrm.ava_scanmotion"],
    ava_bbu_Remufahigkeitsprufungdurch: ["mscrm.systemuser"],
    ava_bbu_PandemicSecLastTestId: ["mscrm.ava_pandemictest"],
    ava_bbu_PandemicLastTestId: ["mscrm.ava_pandemictest"],
    ava_bbu_CurrentQuarantineId: ["mscrm.ava_quarantine"],
    ava_bbu_BezugsberechtigtePerson: ["mscrm.contact"],
    ava_StatusRechtsauskunftID: ["mscrm.ava_bbu_statusrechtsauskunft"],
    ava_SecondAppointment: ["mscrm.appointment"],
    ava_RemufahigkeitId: ["mscrm.ava_remufahigkeit"],
    ava_ReferencePersonSystemUserId: ["mscrm.systemuser"],
    ava_RKSFamilienberatungId: ["mscrm.ava_rksberatungumffamilien"],
    ava_NationalityStateId: ["mscrm.ava_country"],
    ava_LetztesWillkommensgesprach: ["mscrm.ava_conversationrecord"],
    ava_LetztesOrientierungsgesprachId: ["mscrm.ava_conversationrecord"],
    ava_LetztesInfogesprach: ["mscrm.ava_conversationrecord"],
    ava_LetztesBelehrungsgesprach: ["mscrm.ava_conversationrecord"],
    ava_LetzteErstaufnahme: ["mscrm.ava_conversationrecord"],
    ava_LetzteBezugsbetreuung: ["mscrm.ava_conversationrecord"],
    ava_LetzteAufnahme: ["mscrm.ava_conversationrecord"],
    ava_HygienePackageId: ["mscrm.product"],
    ava_FirstAccessStayId: ["mscrm.ava_stay"],
    ava_FamilyId: ["mscrm.ava_family"],
    ava_CurrentStayId: ["mscrm.ava_stay"],
    ava_CurrentSiteId: ["mscrm.msdyn_operationalsite"],
    ava_CurrentRoomId: ["mscrm.ava_room"],
    ava_CurrentRoomBookingId: ["mscrm.ava_roombooking"],
    ava_CurrentAddressModifiedBy: ["mscrm.systemuser"],
    ava_AktuelleRBInvolvierung: ["mscrm.ava_legalcounsellinginvolvment"],
    ava_AktuelleBeurteilungBesondererBedurfnisseI: ["mscrm.ava_bbu_beurteilungbesondererbedurfnisse"],
    ava_AktiveSachleistungskarte: ["mscrm.ava_sachleistungskarte"],
    parentcustomerid: ["account","contact"],
    slainvokedid: ["sla"],
  },
};

// Attribute constants
export const enum ContactAttributes {
  AccountId = "accountid",
  AccountIdName = "accountidname",
  AccountIdYomiName = "accountidyominame",
  AccountRoleCode = "accountrolecode",
  Address1_AddressId = "address1_addressid",
  Address1_AddressTypeCode = "address1_addresstypecode",
  Address1_City = "address1_city",
  Address1_Composite = "address1_composite",
  Address1_Country = "address1_country",
  Address1_County = "address1_county",
  Address1_Fax = "address1_fax",
  Address1_FreightTermsCode = "address1_freighttermscode",
  Address1_Latitude = "address1_latitude",
  Address1_Line1 = "address1_line1",
  Address1_Line2 = "address1_line2",
  Address1_Line3 = "address1_line3",
  Address1_Longitude = "address1_longitude",
  Address1_Name = "address1_name",
  Address1_PostalCode = "address1_postalcode",
  Address1_PostOfficeBox = "address1_postofficebox",
  Address1_PrimaryContactName = "address1_primarycontactname",
  Address1_ShippingMethodCode = "address1_shippingmethodcode",
  Address1_StateOrProvince = "address1_stateorprovince",
  Address1_Telephone1 = "address1_telephone1",
  Address1_Telephone2 = "address1_telephone2",
  Address1_Telephone3 = "address1_telephone3",
  Address1_UPSZone = "address1_upszone",
  Address1_UTCOffset = "address1_utcoffset",
  Address2_AddressId = "address2_addressid",
  Address2_AddressTypeCode = "address2_addresstypecode",
  Address2_City = "address2_city",
  Address2_Composite = "address2_composite",
  Address2_Country = "address2_country",
  Address2_County = "address2_county",
  Address2_Fax = "address2_fax",
  Address2_FreightTermsCode = "address2_freighttermscode",
  Address2_Latitude = "address2_latitude",
  Address2_Line1 = "address2_line1",
  Address2_Line2 = "address2_line2",
  Address2_Line3 = "address2_line3",
  Address2_Longitude = "address2_longitude",
  Address2_Name = "address2_name",
  Address2_PostalCode = "address2_postalcode",
  Address2_PostOfficeBox = "address2_postofficebox",
  Address2_PrimaryContactName = "address2_primarycontactname",
  Address2_ShippingMethodCode = "address2_shippingmethodcode",
  Address2_StateOrProvince = "address2_stateorprovince",
  Address2_Telephone1 = "address2_telephone1",
  Address2_Telephone2 = "address2_telephone2",
  Address2_Telephone3 = "address2_telephone3",
  Address2_UPSZone = "address2_upszone",
  Address2_UTCOffset = "address2_utcoffset",
  Address3_AddressId = "address3_addressid",
  Address3_AddressTypeCode = "address3_addresstypecode",
  Address3_City = "address3_city",
  Address3_Composite = "address3_composite",
  Address3_Country = "address3_country",
  Address3_County = "address3_county",
  Address3_Fax = "address3_fax",
  Address3_FreightTermsCode = "address3_freighttermscode",
  Address3_Latitude = "address3_latitude",
  Address3_Line1 = "address3_line1",
  Address3_Line2 = "address3_line2",
  Address3_Line3 = "address3_line3",
  Address3_Longitude = "address3_longitude",
  Address3_Name = "address3_name",
  Address3_PostalCode = "address3_postalcode",
  Address3_PostOfficeBox = "address3_postofficebox",
  Address3_PrimaryContactName = "address3_primarycontactname",
  Address3_ShippingMethodCode = "address3_shippingmethodcode",
  Address3_StateOrProvince = "address3_stateorprovince",
  Address3_Telephone1 = "address3_telephone1",
  Address3_Telephone2 = "address3_telephone2",
  Address3_Telephone3 = "address3_telephone3",
  Address3_UPSZone = "address3_upszone",
  Address3_UTCOffset = "address3_utcoffset",
  adx_ConfirmRemovePassword = "adx_confirmremovepassword",
  Adx_CreatedByIPAddress = "adx_createdbyipaddress",
  Adx_CreatedByUsername = "adx_createdbyusername",
  adx_identity_accessfailedcount = "adx_identity_accessfailedcount",
  adx_identity_emailaddress1confirmed = "adx_identity_emailaddress1confirmed",
  adx_identity_lastsuccessfullogin = "adx_identity_lastsuccessfullogin",
  adx_identity_locallogindisabled = "adx_identity_locallogindisabled",
  adx_identity_lockoutenabled = "adx_identity_lockoutenabled",
  adx_identity_lockoutenddate = "adx_identity_lockoutenddate",
  adx_identity_logonenabled = "adx_identity_logonenabled",
  adx_identity_mobilephoneconfirmed = "adx_identity_mobilephoneconfirmed",
  adx_identity_newpassword = "adx_identity_newpassword",
  adx_identity_passwordhash = "adx_identity_passwordhash",
  adx_identity_securitystamp = "adx_identity_securitystamp",
  adx_identity_twofactorenabled = "adx_identity_twofactorenabled",
  adx_identity_username = "adx_identity_username",
  Adx_ModifiedByIPAddress = "adx_modifiedbyipaddress",
  Adx_ModifiedByUsername = "adx_modifiedbyusername",
  Adx_OrganizationName = "adx_organizationname",
  adx_preferredlcid = "adx_preferredlcid",
  adx_profilealert = "adx_profilealert",
  adx_profilealertdate = "adx_profilealertdate",
  adx_profilealertinstructions = "adx_profilealertinstructions",
  Adx_ProfileIsAnonymous = "adx_profileisanonymous",
  Adx_ProfileLastActivity = "adx_profilelastactivity",
  adx_profilemodifiedon = "adx_profilemodifiedon",
  adx_PublicProfileCopy = "adx_publicprofilecopy",
  Adx_TimeZone = "adx_timezone",
  Aging30 = "aging30",
  Aging30_Base = "aging30_base",
  Aging60 = "aging60",
  Aging60_Base = "aging60_base",
  Aging90 = "aging90",
  Aging90_Base = "aging90_base",
  Anniversary = "anniversary",
  AnnualIncome = "annualincome",
  AnnualIncome_Base = "annualincome_base",
  AssistantName = "assistantname",
  AssistantPhone = "assistantphone",
  ava_ActualAge = "ava_actualage",
  ava_AdditionalInformationRKS = "ava_additionalinformationrks",
  ava_adultRepresentation = "ava_adultrepresentation",
  ava_adultRepresentative = "ava_adultrepresentative",
  ava_Age = "ava_age",
  ava_AgeDifference = "ava_agedifference",
  ava_AIBE = "ava_aibe",
  ava_AktiveAnbietungen = "ava_aktiveanbietungen",
  ava_AktiveAnbietungen_Date = "ava_aktiveanbietungen_date",
  ava_AktiveAnbietungen_State = "ava_aktiveanbietungen_state",
  ava_AktiveSachleistungskarte = "ava_aktivesachleistungskarte",
  ava_AktiveSachleistungskarteName = "ava_aktivesachleistungskartename",
  ava_AktuelleBeurteilungBesondererBedurfnisseI = "ava_aktuellebeurteilungbesondererbedurfnissei",
  ava_AktuelleBeurteilungBesondererBedurfnisseIName = "ava_aktuellebeurteilungbesondererbedurfnisseiname",
  ava_AktuellerAufenthaltsstatus = "ava_aktuelleraufenthaltsstatus",
  ava_AktuelleRBInvolvierung = "ava_aktuellerbinvolvierung",
  ava_AktuelleRBInvolvierungName = "ava_aktuellerbinvolvierungname",
  ava_aliasConcatenated = "ava_aliasconcatenated",
  ava_AlleRemuLeistungen = "ava_alleremuleistungen",
  ava_alleremuleistungen_Base = "ava_alleremuleistungen_base",
  ava_AlleRemuLeistungen_Date = "ava_alleremuleistungen_date",
  ava_AlleRemuLeistungen_State = "ava_alleremuleistungen_state",
  ava_AssessmentPsychologicalWellBeing = "ava_assessmentpsychologicalwellbeing",
  ava_AssignedRoom = "ava_assignedroom",
  ava_AufnahmeFrage1 = "ava_aufnahmefrage1",
  ava_AufnahmeFrage2 = "ava_aufnahmefrage2",
  ava_AufnahmeFrage3 = "ava_aufnahmefrage3",
  ava_AufnahmeFrage4 = "ava_aufnahmefrage4",
  ava_AufnahmeFrage5 = "ava_aufnahmefrage5",
  ava_AufnahmeFrage6 = "ava_aufnahmefrage6",
  ava_AufnahmeTest = "ava_aufnahmetest",
  ava_BBEPresence = "ava_bbepresence",
  ava_bbu_ABKarteerhalten = "ava_bbu_abkarteerhalten",
  ava_bbu_ABKartegedruckt = "ava_bbu_abkartegedruckt",
  ava_bbu_AblehnungRemuAngebotper = "ava_bbu_ablehnungremuangebotper",
  ava_bbu_agesid = "ava_bbu_agesid",
  ava_bbu_AktuellesGVSQuartier = "ava_bbu_aktuellesgvsquartier",
  ava_bbu_akutegeschlechtsspezifischeBedarf = "ava_bbu_akutegeschlechtsspezifischebedarf",
  ava_bbu_akutegesundheitlicheProbleme = "ava_bbu_akutegesundheitlicheprobleme",
  ava_bbu_akutepsychologischeUnterstutzung = "ava_bbu_akutepsychologischeunterstutzung",
  ava_bbu_AnmerkungenRemufahigkeit = "ava_bbu_anmerkungenremufahigkeit",
  ava_bbu_AnmerkungenSchulbesuch = "ava_bbu_anmerkungenschulbesuch",
  ava_bbu_AnmerkungEV = "ava_bbu_anmerkungev",
  ava_bbu_AnmerkungPflegestufe = "ava_bbu_anmerkungpflegestufe",
  ava_bbu_AnmerkungRemu = "ava_bbu_anmerkungremu",
  ava_bbu_AnmerkungSLK = "ava_bbu_anmerkungslk",
  ava_bbu_Anonymgemeldet = "ava_bbu_anonymgemeldet",
  ava_bbu_AusreiserelevanteVulnerabilitat = "ava_bbu_ausreiserelevantevulnerabilitat",
  ava_bbu_babysubstitutefood = "ava_bbu_babysubstitutefood",
  ava_bbu_Beginn = "ava_bbu_beginn",
  ava_bbu_Begrundung = "ava_bbu_begrundung",
  ava_bbu_Bescheiddatum = "ava_bbu_bescheiddatum",
  ava_bbu_BescheidDatume = "ava_bbu_bescheiddatume",
  ava_bbu_BezugsberechtigtePerson = "ava_bbu_bezugsberechtigteperson",
  ava_bbu_BezugsberechtigtePersonName = "ava_bbu_bezugsberechtigtepersonname",
  ava_bbu_BezugsberechtigtePersonYomiName = "ava_bbu_bezugsberechtigtepersonyominame",
  ava_bbu_breastfeeding = "ava_bbu_breastfeeding",
  ava_bbu_chaperon = "ava_bbu_chaperon",
  ava_bbu_chaperonName = "ava_bbu_chaperonname",
  ava_bbu_chaperonYomiName = "ava_bbu_chaperonyominame",
  ava_bbu_commentchaperon = "ava_bbu_commentchaperon",
  ava_bbu_currenthospitalabsenceid = "ava_bbu_currenthospitalabsenceid",
  ava_bbu_currenthospitalabsenceidName = "ava_bbu_currenthospitalabsenceidname",
  ava_bbu_currentpandemicinfectionid = "ava_bbu_currentpandemicinfectionid",
  ava_bbu_currentpandemicinfectionidName = "ava_bbu_currentpandemicinfectionidname",
  ava_bbu_CurrentQuarantineId = "ava_bbu_currentquarantineid",
  ava_bbu_CurrentQuarantineIdName = "ava_bbu_currentquarantineidname",
  ava_bbu_currentremunerant = "ava_bbu_currentremunerant",
  ava_bbu_currentremunerantName = "ava_bbu_currentremunerantname",
  ava_bbu_dateofhwr = "ava_bbu_dateofhwr",
  ava_bbu_dateofrevocation = "ava_bbu_dateofrevocation",
  ava_bbu_dateThirdVaccinationReceived = "ava_bbu_datethirdvaccinationreceived",
  ava_bbu_DatumABKarteerhalten = "ava_bbu_datumabkarteerhalten",
  ava_bbu_DatumderAsylantragstellung = "ava_bbu_datumderasylantragstellung",
  ava_bbu_DatumPflegebescheid = "ava_bbu_datumpflegebescheid",
  ava_bbu_DatumPflegeeinschatzung = "ava_bbu_datumpflegeeinschatzung",
  ava_bbu_disclaimerremuneration = "ava_bbu_disclaimerremuneration",
  ava_bbu_Ende = "ava_bbu_ende",
  ava_bbu_Familienzusammenfuhrung = "ava_bbu_familienzusammenfuhrung",
  ava_bbu_familyinaustria = "ava_bbu_familyinaustria",
  ava_bbu_familyrole = "ava_bbu_familyrole",
  ava_bbu_firstinformationsigned = "ava_bbu_firstinformationsigned",
  ava_bbu_firstinformationtransfer = "ava_bbu_firstinformationtransfer",
  ava_bbu_FRKAntragunterschrieben = "ava_bbu_frkantragunterschrieben",
  ava_bbu_Gefahrenanalyse = "ava_bbu_gefahrenanalyse",
  ava_bbu_geplanterEntbindungstermin = "ava_bbu_geplanterentbindungstermin",
  ava_bbu_GesonderterUnterstutzungsbedarf = "ava_bbu_gesonderterunterstutzungsbedarf",
  ava_bbu_IBAN = "ava_bbu_iban",
  ava_bbu_InBBEblockierteBetten = "ava_bbu_inbbeblockiertebetten",
  ava_bbu_Kartenberechtigung = "ava_bbu_kartenberechtigung",
  ava_bbu_Kontaktdaten = "ava_bbu_kontaktdaten",
  ava_bbu_literacy = "ava_bbu_literacy",
  ava_bbu_NameundKontaktdatenEV = "ava_bbu_nameundkontaktdatenev",
  ava_bbu_noteThirdVaccinationReceived = "ava_bbu_notethirdvaccinationreceived",
  ava_bbu_numberpersonsinfamiliy = "ava_bbu_numberpersonsinfamiliy",
  ava_bbu_PandemicLastTestId = "ava_bbu_pandemiclasttestid",
  ava_bbu_PandemicLastTestIdName = "ava_bbu_pandemiclasttestidname",
  ava_bbu_PandemicSecLastTestId = "ava_bbu_pandemicseclasttestid",
  ava_bbu_PandemicSecLastTestIdName = "ava_bbu_pandemicseclasttestidname",
  ava_bbu_Post = "ava_bbu_post",
  ava_bbu_Posteingang = "ava_bbu_posteingang",
  ava_bbu_pregnancymonth = "ava_bbu_pregnancymonth",
  ava_bbu_privategone = "ava_bbu_privategone",
  ava_bbu_psychologisttalk = "ava_bbu_psychologisttalk",
  ava_bbu_radiationdose = "ava_bbu_radiationdose",
  ava_bbu_radiationdosehwr = "ava_bbu_radiationdosehwr",
  ava_bbu_reasonforexceeding = "ava_bbu_reasonforexceeding",
  ava_bbu_remaininghours = "ava_bbu_remaininghours",
  ava_bbu_RemuBuddy = "ava_bbu_remubuddy",
  ava_bbu_RemuEltern = "ava_bbu_remueltern",
  ava_bbu_Remufahig = "ava_bbu_remufahig",
  ava_bbu_Remufahigkeitsprufungam = "ava_bbu_remufahigkeitsprufungam",
  ava_bbu_Remufahigkeitsprufungdurch = "ava_bbu_remufahigkeitsprufungdurch",
  ava_bbu_RemufahigkeitsprufungdurchName = "ava_bbu_remufahigkeitsprufungdurchname",
  ava_bbu_RemufahigkeitsprufungdurchYomiName = "ava_bbu_remufahigkeitsprufungdurchyominame",
  ava_bbu_remutask = "ava_bbu_remutask",
  ava_bbu_remutaskName = "ava_bbu_remutaskname",
  ava_bbu_ScanMotionLastScanId = "ava_bbu_scanmotionlastscanid",
  ava_bbu_ScanMotionLastScanIdName = "ava_bbu_scanmotionlastscanidname",
  ava_bbu_Schulbesuchab = "ava_bbu_schulbesuchab",
  ava_bbu_Schuleinrichtung = "ava_bbu_schuleinrichtung",
  ava_bbu_SchuleinrichtungName = "ava_bbu_schuleinrichtungname",
  ava_bbu_SchuleinrichtungYomiName = "ava_bbu_schuleinrichtungyominame",
  ava_bbu_separateaccommodation = "ava_bbu_separateaccommodation",
  ava_bbu_skills = "ava_bbu_skills",
  ava_bbu_statusofproceeding = "ava_bbu_statusofproceeding",
  ava_bbu_statusofproceedingothers = "ava_bbu_statusofproceedingothers",
  ava_bbu_SumSchoolIssue = "ava_bbu_sumschoolissue",
  ava_bbu_sumschoolissue_Base = "ava_bbu_sumschoolissue_base",
  ava_bbu_SumSchoolIssue_Date = "ava_bbu_sumschoolissue_date",
  ava_bbu_SumSchoolIssue_State = "ava_bbu_sumschoolissue_state",
  ava_bbu_TGAnspruchlaufenderMonat = "ava_bbu_tganspruchlaufendermonat",
  ava_bbu_togetherness = "ava_bbu_togetherness",
  ava_bbu_togethernessName = "ava_bbu_togethernessname",
  ava_bbu_togethernessrole = "ava_bbu_togethernessrole",
  ava_bbu_TypderVulnerabilitat = "ava_bbu_typdervulnerabilitat",
  ava_bbu_ukrainecrises = "ava_bbu_ukrainecrises",
  ava_bbu_VerdachtaufMenschenhandel = "ava_bbu_verdachtaufmenschenhandel",
  ava_bbu_Verfahrenszahl = "ava_bbu_verfahrenszahl",
  ava_bbu_xraydoctor = "ava_bbu_xraydoctor",
  ava_bbu_xraydoctorhwr = "ava_bbu_xraydoctorhwr",
  ava_bbu_Zweck = "ava_bbu_zweck",
  ava_BBUId = "ava_bbuid",
  ava_BeiErziehungsberechtigtenFrage1 = "ava_beierziehungsberechtigtenfrage1",
  ava_BeiErziehungsberechtigtenFrage2 = "ava_beierziehungsberechtigtenfrage2",
  ava_BekleidungshilfeLGVS = "ava_bekleidungshilfelgvs",
  ava_bekleidungshilfelgvs_Base = "ava_bekleidungshilfelgvs_base",
  ava_Birthdate = "ava_birthdate",
  ava_Birthplace = "ava_birthplace",
  ava_BundeslandletzteAnbietung = "ava_bundeslandletzteanbietung",
  ava_BVa = "ava_bva",
  ava_CanBeOffered = "ava_canbeoffered",
  ava_CanBeTransferred = "ava_canbetransferred",
  ava_ChangingReasonBirthdate = "ava_changingreasonbirthdate",
  ava_ChargingSpecialCare = "ava_chargingspecialcare",
  ava_Citizenship = "ava_citizenship",
  ava_ClientGroup = "ava_clientgroup",
  ava_CommentEthnicGroup = "ava_commentethnicgroup",
  ava_CommentMotherTongue = "ava_commentmothertongue",
  ava_CommentNationality = "ava_commentnationality",
  ava_CommunicationLanguage = "ava_communicationlanguage",
  ava_complaint = "ava_complaint",
  ava_CostPerClientCurrentMonth = "ava_costperclientcurrentmonth",
  ava_costperclientcurrentmonth_Base = "ava_costperclientcurrentmonth_base",
  ava_CostPerClientCurrentMonth_Date = "ava_costperclientcurrentmonth_date",
  ava_CostPerClientCurrentMonth_State = "ava_costperclientcurrentmonth_state",
  ava_culturePass = "ava_culturepass",
  ava_currentaccessdate = "ava_currentaccessdate",
  ava_CurrentAddressModifiedBy = "ava_currentaddressmodifiedby",
  ava_CurrentAddressModifiedByName = "ava_currentaddressmodifiedbyname",
  ava_CurrentAddressModifiedByYomiName = "ava_currentaddressmodifiedbyyominame",
  ava_CurrentAddressModifiedOn = "ava_currentaddressmodifiedon",
  ava_CurrentAddressType = "ava_currentaddresstype",
  ava_CurrentBirthdateModifiedOn = "ava_currentbirthdatemodifiedon",
  ava_currentbuilding = "ava_currentbuilding",
  ava_currentbuildingName = "ava_currentbuildingname",
  ava_currentfloor = "ava_currentfloor",
  ava_currentfloorName = "ava_currentfloorname",
  ava_CurrentRoomBookingId = "ava_currentroombookingid",
  ava_CurrentRoomBookingIdName = "ava_currentroombookingidname",
  ava_CurrentRoomId = "ava_currentroomid",
  ava_CurrentRoomIdName = "ava_currentroomidname",
  ava_CurrentSiteId = "ava_currentsiteid",
  ava_CurrentSiteIdName = "ava_currentsiteidname",
  ava_CurrentStayId = "ava_currentstayid",
  ava_CurrentStayIdName = "ava_currentstayidname",
  ava_dateFirstVaccinationReceived = "ava_datefirstvaccinationreceived",
  ava_DateInitialMedicalCare = "ava_dateinitialmedicalcare",
  ava_DateLastCheck = "ava_datelastcheck",
  ava_dateNextAppointment = "ava_datenextappointment",
  ava_dateSecondAppointment = "ava_datesecondappointment",
  ava_dateSecondVaccinationReceived = "ava_datesecondvaccinationreceived",
  ava_DateTBCCheckConduct = "ava_datetbccheckconduct",
  ava_DateTBCCheckReport = "ava_datetbccheckreport",
  ava_DatumABKartegedruckt = "ava_datumabkartegedruckt",
  ava_DatumletzteAnbietung = "ava_datumletzteanbietung",
  ava_DatumletzteInteraktion = "ava_datumletzteinteraktion",
  ava_DatumPsychologischesErstgesprach = "ava_datumpsychologischeserstgesprach",
  ava_Denomination = "ava_denomination",
  ava_DescriptionCanbetransferred = "ava_descriptioncanbetransferred",
  ava_DescriptionInternalTransfer = "ava_descriptioninternaltransfer",
  ava_DocumentAvailable = "ava_documentavailable",
  ava_emailaddress2note = "ava_emailaddress2note",
  ava_emailaddress3note = "ava_emailaddress3note",
  ava_EthnicGroup = "ava_ethnicgroup",
  ava_FamilyAdditionalInformation = "ava_familyadditionalinformation",
  ava_FamilyId = "ava_familyid",
  ava_FamilyIdName = "ava_familyidname",
  ava_familystatuscodeother = "ava_familystatuscodeother",
  ava_FamilyTravelInformation = "ava_familytravelinformation",
  ava_FilledOutAnamnesisSheet = "ava_filledoutanamnesissheet",
  ava_FirstAccessStayId = "ava_firstaccessstayid",
  ava_FirstAccessStayIdName = "ava_firstaccessstayidname",
  ava_firstAppointment = "ava_firstappointment",
  ava_firstAppointmentName = "ava_firstappointmentname",
  ava_firstinformationnote = "ava_firstinformationnote",
  ava_firstmoveindate = "ava_firstmoveindate",
  ava_FoodPreferences = "ava_foodpreferences",
  ava_GVSNumber = "ava_gvsnumber",
  ava_HelpNeededWhere = "ava_helpneededwhere",
  ava_HinweisePostversand = "ava_hinweisepostversand",
  ava_HygienePackageId = "ava_hygienepackageid",
  ava_HygienePackageIdName = "ava_hygienepackageidname",
  ava_HygienePackageIssued = "ava_hygienepackageissued",
  ava_identifiedAge = "ava_identifiedage",
  ava_ifamasterdatalink = "ava_ifamasterdatalink",
  ava_IFANumberText = "ava_ifanumbertext",
  ava_Image = "ava_image",
  ava_Image_Timestamp = "ava_image_timestamp",
  ava_Image_URL = "ava_image_url",
  ava_ImageId = "ava_imageid",
  ava_informationVaccination = "ava_informationvaccination",
  ava_InitalMedicalCare = "ava_initalmedicalcare",
  ava_intendedForVaccination = "ava_intendedforvaccination",
  ava_InternalTransfer = "ava_internaltransfer",
  ava_lastAccess = "ava_lastaccess",
  ava_lastAccessName = "ava_lastaccessname",
  ava_lastOffering = "ava_lastoffering",
  ava_lastOfferingName = "ava_lastofferingname",
  ava_LegalRepresentationStatus = "ava_legalrepresentationstatus",
  ava_LetzteAufnahme = "ava_letzteaufnahme",
  ava_LetzteAufnahmeName = "ava_letzteaufnahmename",
  ava_LetzteBezugsbetreuung = "ava_letztebezugsbetreuung",
  ava_LetzteBezugsbetreuungName = "ava_letztebezugsbetreuungname",
  ava_LetzteErstaufnahme = "ava_letzteerstaufnahme",
  ava_LetzteErstaufnahmeName = "ava_letzteerstaufnahmename",
  ava_LetztesBelehrungsgesprach = "ava_letztesbelehrungsgesprach",
  ava_LetztesBelehrungsgesprachName = "ava_letztesbelehrungsgesprachname",
  ava_LetztesInfogesprach = "ava_letztesinfogesprach",
  ava_LetztesInfogesprachName = "ava_letztesinfogesprachname",
  ava_LetztesOrientierungsgesprachId = "ava_letztesorientierungsgesprachid",
  ava_LetztesOrientierungsgesprachIdName = "ava_letztesorientierungsgesprachidname",
  ava_LetztesWillkommensgesprach = "ava_letzteswillkommensgesprach",
  ava_LetztesWillkommensgesprachName = "ava_letzteswillkommensgesprachname",
  ava_LetzteTNDemReFr = "ava_letztetndemrefr",
  ava_LetzteTNGleichberechtigung = "ava_letztetngleichberechtigung",
  ava_LetzteTNGrundregelkurs = "ava_letztetngrundregelkurs",
  ava_LetzteTNRechteundPflichten = "ava_letztetnrechteundpflichten",
  ava_LetzteTNSensAntis = "ava_letztetnsensantis",
  ava_LevelOfCare = "ava_levelofcare",
  ava_LGBTIQ = "ava_lgbtiq",
  ava_manualgeneratesharepointfolder = "ava_manualgeneratesharepointfolder",
  ava_MigIdIRMA = "ava_migidirma",
  ava_MigIdRKSFilemaker = "ava_migidrksfilemaker",
  ava_mobilephone2 = "ava_mobilephone2",
  ava_mobilephone2note = "ava_mobilephone2note",
  ava_mobilephone3 = "ava_mobilephone3",
  ava_mobilephone3note = "ava_mobilephone3note",
  ava_MotherTongue = "ava_mothertongue",
  ava_nationality = "ava_nationality",
  ava_NationalityStateId = "ava_nationalitystateid",
  ava_NationalityStateIdName = "ava_nationalitystateidname",
  ava_NationalityStateType = "ava_nationalitystatetype",
  ava_NeedHelpInEverydayLife = "ava_needhelpineverydaylife",
  ava_Note = "ava_note",
  ava_noteFirstVaccinationReceived = "ava_notefirstvaccinationreceived",
  ava_noteInformationVaccination = "ava_noteinformationvaccination",
  ava_noteIntendedForVaccination = "ava_noteintendedforvaccination",
  ava_NoteRegularMedicationIntake = "ava_noteregularmedicationintake",
  ava_notes = "ava_notes",
  ava_noteSecondVaccinationReceived = "ava_notesecondvaccinationreceived",
  ava_NotesVulnerability = "ava_notesvulnerability",
  ava_noteWillingnessToVaccinate = "ava_notewillingnesstovaccinate",
  ava_NotRegisteredByAuthorities = "ava_notregisteredbyauthorities",
  ava_Obsorgeabgelehntam = "ava_obsorgeabgelehntam",
  ava_Obsorgebeantragtam = "ava_obsorgebeantragtam",
  ava_Obsorgebeschlussam = "ava_obsorgebeschlussam",
  ava_Obsorgemoglichkeit = "ava_obsorgemoglichkeit",
  ava_ObsorgemoglichkeitAnmerkung = "ava_obsorgemoglichkeitanmerkung",
  ava_ONZL = "ava_onzl",
  ava_Output_Sum_Clothin = "ava_output_sum_clothin",
  ava_output_sum_clothin_Base = "ava_output_sum_clothin_base",
  ava_Output_Sum_Clothin_Date = "ava_output_sum_clothin_date",
  ava_Output_Sum_Clothin_State = "ava_output_sum_clothin_state",
  ava_PermissionToShareMedicalData = "ava_permissiontosharemedicaldata",
  ava_Pflegeeinschatzung = "ava_pflegeeinschatzung",
  ava_possibilitytotalktodoctorpromptly = "ava_possibilitytotalktodoctorpromptly",
  ava_QRCodeId = "ava_qrcodeid",
  ava_QRCodeImageBase64 = "ava_qrcodeimagebase64",
  ava_Ramadan = "ava_ramadan",
  ava_ReasonNotOffered = "ava_reasonnotoffered",
  ava_ReceivedXRayCard = "ava_receivedxraycard",
  ava_ReferencePersonSystemUserId = "ava_referencepersonsystemuserid",
  ava_ReferencePersonSystemUserIdName = "ava_referencepersonsystemuseridname",
  ava_ReferencePersonSystemUserIdYomiName = "ava_referencepersonsystemuseridyominame",
  ava_RegularMedicationIntake = "ava_regularmedicationintake",
  ava_Religion = "ava_religion",
  ava_RelocationMeditativelyPossible = "ava_relocationmeditativelypossible",
  ava_relocationmeditativelyrestricted = "ava_relocationmeditativelyrestricted",
  ava_RemuBudgetPerMonth = "ava_remubudgetpermonth",
  ava_remubudgetpermonth_Base = "ava_remubudgetpermonth_base",
  ava_RemufahigkeitId = "ava_remufahigkeitid",
  ava_RemufahigkeitIdName = "ava_remufahigkeitidname",
  ava_RemuRestBudget = "ava_remurestbudget",
  ava_remurestbudget_Base = "ava_remurestbudget_base",
  ava_RestbudgetBekleidungsausgaben = "ava_restbudgetbekleidungsausgaben",
  ava_returnCounselling = "ava_returncounselling",
  ava_RKSFamilienberatungId = "ava_rksfamilienberatungid",
  ava_RKSFamilienberatungIdName = "ava_rksfamilienberatungidname",
  ava_RoundedAge = "ava_roundedage",
  ava_RuBe = "ava_rube",
  ava_School = "ava_school",
  ava_SecondAppointment = "ava_secondappointment",
  ava_SecondAppointmentName = "ava_secondappointmentname",
  ava_SharePointFolderCreationTrigger = "ava_sharepointfoldercreationtrigger",
  ava_SocialSecurityNumber = "ava_socialsecuritynumber",
  ava_StartBerechnungszeitraum = "ava_startberechnungszeitraum",
  ava_StartNaechsterBerechnungszeitraum = "ava_startnaechsterberechnungszeitraum",
  ava_StatusRechtsauskunftID = "ava_statusrechtsauskunftid",
  ava_StatusRechtsauskunftIDName = "ava_statusrechtsauskunftidname",
  ava_sufficientMedicationavailable = "ava_sufficientmedicationavailable",
  ava_SummeBekleidungsausgabegesamt = "ava_summebekleidungsausgabegesamt",
  ava_SummeBekleidungsausgabenAktuelleJahr = "ava_summebekleidungsausgabenaktuellejahr",
  ava_summebekleidungsausgabenaktuellejahr_Base = "ava_summebekleidungsausgabenaktuellejahr_base",
  ava_SummeBekleidungsausgabenAktuelleJahr_Date = "ava_summebekleidungsausgabenaktuellejahr_date",
  ava_SummeBekleidungsausgabenAktuelleJahr_State = "ava_summebekleidungsausgabenaktuellejahr_state",
  ava_svnr = "ava_svnr",
  ava_TBCCheckReport = "ava_tbccheckreport",
  ava_TerritorialRestriction = "ava_territorialrestriction",
  ava_Titel = "ava_titel",
  ava_TransferRecommendation = "ava_transferrecommendation",
  ava_UMFFrage1 = "ava_umffrage1",
  ava_UMFFrage1Textfeld = "ava_umffrage1textfeld",
  ava_UMFFrage2 = "ava_umffrage2",
  ava_UMFFrage2Datum = "ava_umffrage2datum",
  ava_UMFFrage3 = "ava_umffrage3",
  ava_UMFFrage3Datum = "ava_umffrage3datum",
  ava_UMFFrage4 = "ava_umffrage4",
  ava_UMFFrage4Datum = "ava_umffrage4datum",
  ava_UMFURB = "ava_umfurb",
  ava_Underage = "ava_underage",
  ava_UnderageInformation = "ava_underageinformation",
  ava_URBDocumentLocationCreation = "ava_urbdocumentlocationcreation",
  ava_VerdachtaufMenschenhandel = "ava_verdachtaufmenschenhandel",
  ava_Verfahrenskarteerhalten = "ava_verfahrenskarteerhalten",
  ava_Verfahrenskartegedruckt = "ava_verfahrenskartegedruckt",
  ava_VQ = "ava_vq",
  ava_whoHelps = "ava_whohelps",
  ava_willingnessToVaccinate = "ava_willingnesstovaccinate",
  BirthDate = "birthdate",
  Business2 = "business2",
  BusinessCard = "businesscard",
  BusinessCardAttributes = "businesscardattributes",
  Callback = "callback",
  ChildrensNames = "childrensnames",
  Company = "company",
  ContactId = "contactid",
  CreatedBy = "createdby",
  CreatedByExternalParty = "createdbyexternalparty",
  CreatedByExternalPartyName = "createdbyexternalpartyname",
  CreatedByExternalPartyYomiName = "createdbyexternalpartyyominame",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  CreditLimit = "creditlimit",
  CreditLimit_Base = "creditlimit_base",
  CreditOnHold = "creditonhold",
  CustomerSizeCode = "customersizecode",
  CustomerTypeCode = "customertypecode",
  DefaultPriceLevelId = "defaultpricelevelid",
  DefaultPriceLevelIdName = "defaultpricelevelidname",
  Department = "department",
  Description = "description",
  DoNotBulkEMail = "donotbulkemail",
  DoNotBulkPostalMail = "donotbulkpostalmail",
  DoNotEMail = "donotemail",
  DoNotFax = "donotfax",
  DoNotPhone = "donotphone",
  DoNotPostalMail = "donotpostalmail",
  DoNotSendMM = "donotsendmm",
  EducationCode = "educationcode",
  EMailAddress1 = "emailaddress1",
  EMailAddress2 = "emailaddress2",
  EMailAddress3 = "emailaddress3",
  EmployeeId = "employeeid",
  EntityImage = "entityimage",
  EntityImage_Timestamp = "entityimage_timestamp",
  EntityImage_URL = "entityimage_url",
  EntityImageId = "entityimageid",
  ExchangeRate = "exchangerate",
  ExternalUserIdentifier = "externaluseridentifier",
  FamilyStatusCode = "familystatuscode",
  Fax = "fax",
  FirstName = "firstname",
  FollowEmail = "followemail",
  FtpSiteUrl = "ftpsiteurl",
  FullName = "fullname",
  GenderCode = "gendercode",
  GovernmentId = "governmentid",
  HasChildrenCode = "haschildrencode",
  Home2 = "home2",
  ImportSequenceNumber = "importsequencenumber",
  IsAutoCreate = "isautocreate",
  IsBackofficeCustomer = "isbackofficecustomer",
  IsPrivate = "isprivate",
  JobTitle = "jobtitle",
  LastName = "lastname",
  LastOnHoldTime = "lastonholdtime",
  LastUsedInCampaign = "lastusedincampaign",
  LeadSourceCode = "leadsourcecode",
  ManagerName = "managername",
  ManagerPhone = "managerphone",
  MarketingOnly = "marketingonly",
  MasterContactIdName = "mastercontactidname",
  MasterContactIdYomiName = "mastercontactidyominame",
  MasterId = "masterid",
  Merged = "merged",
  MiddleName = "middlename",
  MobilePhone = "mobilephone",
  ModifiedBy = "modifiedby",
  ModifiedByExternalParty = "modifiedbyexternalparty",
  ModifiedByExternalPartyName = "modifiedbyexternalpartyname",
  ModifiedByExternalPartyYomiName = "modifiedbyexternalpartyyominame",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  msa_managingpartnerid = "msa_managingpartnerid",
  msa_managingpartneridName = "msa_managingpartneridname",
  msa_managingpartneridYomiName = "msa_managingpartneridyominame",
  msdyn_accountnumber = "msdyn_accountnumber",
  msdyn_accountnumberName = "msdyn_accountnumbername",
  msdyn_accountnumberYomiName = "msdyn_accountnumberyominame",
  msdyn_company = "msdyn_company",
  msdyn_companyName = "msdyn_companyname",
  msdyn_contactfor = "msdyn_contactfor",
  msdyn_contactforvendor = "msdyn_contactforvendor",
  msdyn_contactkpiid = "msdyn_contactkpiid",
  msdyn_contactkpiidName = "msdyn_contactkpiidname",
  msdyn_contactnumber = "msdyn_contactnumber",
  msdyn_contactpersonid = "msdyn_contactpersonid",
  msdyn_customergroupid = "msdyn_customergroupid",
  msdyn_customergroupidName = "msdyn_customergroupidname",
  msdyn_customerpaymentmethod = "msdyn_customerpaymentmethod",
  msdyn_customerpaymentmethodName = "msdyn_customerpaymentmethodname",
  msdyn_decisioninfluencetag = "msdyn_decisioninfluencetag",
  msdyn_disablewebtracking = "msdyn_disablewebtracking",
  msdyn_emailaddress1description = "msdyn_emailaddress1description",
  msdyn_faxdescription = "msdyn_faxdescription",
  msdyn_faxextension = "msdyn_faxextension",
  msdyn_gdproptout = "msdyn_gdproptout",
  msdyn_identificationnumber = "msdyn_identificationnumber",
  msdyn_isassistantinorgchart = "msdyn_isassistantinorgchart",
  msdyn_isminor = "msdyn_isminor",
  msdyn_isminorwithparentalconsent = "msdyn_isminorwithparentalconsent",
  msdyn_isvendor = "msdyn_isvendor",
  msdyn_language = "msdyn_language",
  msdyn_linkedvendoraccount = "msdyn_linkedvendoraccount",
  msdyn_linkedvendoraccountName = "msdyn_linkedvendoraccountname",
  msdyn_orgchangestatus = "msdyn_orgchangestatus",
  msdyn_partycountry = "msdyn_partycountry",
  msdyn_partynumber = "msdyn_partynumber",
  msdyn_partystateprovince = "msdyn_partystateprovince",
  msdyn_paymentday = "msdyn_paymentday",
  msdyn_paymentdayName = "msdyn_paymentdayname",
  msdyn_paymentschedule = "msdyn_paymentschedule",
  msdyn_paymentscheduleName = "msdyn_paymentschedulename",
  msdyn_paymentterms = "msdyn_paymentterms",
  msdyn_paymenttermsName = "msdyn_paymenttermsname",
  msdyn_portaltermsagreementdate = "msdyn_portaltermsagreementdate",
  msdyn_primaryfacebookdescription = "msdyn_primaryfacebookdescription",
  msdyn_primaryfacebookID = "msdyn_primaryfacebookid",
  msdyn_primaryinkedInid = "msdyn_primaryinkedinid",
  msdyn_primarylinkedIndescrption = "msdyn_primarylinkedindescrption",
  msdyn_PrimaryTimeZone = "msdyn_primarytimezone",
  msdyn_primarytwitterid = "msdyn_primarytwitterid",
  msdyn_primarytwitteriddescription = "msdyn_primarytwitteriddescription",
  msdyn_salestaxgroup = "msdyn_salestaxgroup",
  msdyn_salestaxgroupName = "msdyn_salestaxgroupname",
  msdyn_segmentid = "msdyn_segmentid",
  msdyn_segmentidName = "msdyn_segmentidname",
  msdyn_sellable = "msdyn_sellable",
  msdyn_telephone1description = "msdyn_telephone1description",
  msdyn_telephone1extension = "msdyn_telephone1extension",
  msdyn_vendorcontactid = "msdyn_vendorcontactid",
  msdyn_vendorcontactidName = "msdyn_vendorcontactidname",
  msdyn_vendorcreatedbyworkflow = "msdyn_vendorcreatedbyworkflow",
  msdyn_vendorgroup = "msdyn_vendorgroup",
  msdyn_vendorgroupName = "msdyn_vendorgroupname",
  msdyn_vendorpaymentmethod = "msdyn_vendorpaymentmethod",
  msdyn_vendorpaymentmethodName = "msdyn_vendorpaymentmethodname",
  msdyn_websiteurldescription = "msdyn_websiteurldescription",
  msft_DataState = "msft_datastate",
  mspp_userpreferredlcid = "mspp_userpreferredlcid",
  NickName = "nickname",
  NumberOfChildren = "numberofchildren",
  OnHoldTime = "onholdtime",
  OriginatingLeadId = "originatingleadid",
  OriginatingLeadIdName = "originatingleadidname",
  OriginatingLeadIdYomiName = "originatingleadidyominame",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  Pager = "pager",
  parent_contactid = "parent_contactid",
  parent_contactidName = "parent_contactidname",
  parent_contactidYomiName = "parent_contactidyominame",
  ParentContactId = "parentcontactid",
  ParentContactIdName = "parentcontactidname",
  ParentContactIdYomiName = "parentcontactidyominame",
  ParentCustomerId = "parentcustomerid",
  ParentCustomerIdName = "parentcustomeridname",
  ParentCustomerIdType = "parentcustomeridtype",
  ParentCustomerIdYomiName = "parentcustomeridyominame",
  ParticipatesInWorkflow = "participatesinworkflow",
  PaymentTermsCode = "paymenttermscode",
  PreferredAppointmentDayCode = "preferredappointmentdaycode",
  PreferredAppointmentTimeCode = "preferredappointmenttimecode",
  PreferredContactMethodCode = "preferredcontactmethodcode",
  PreferredEquipmentId = "preferredequipmentid",
  PreferredEquipmentIdName = "preferredequipmentidname",
  PreferredServiceId = "preferredserviceid",
  PreferredServiceIdName = "preferredserviceidname",
  PreferredSystemUserId = "preferredsystemuserid",
  PreferredSystemUserIdName = "preferredsystemuseridname",
  PreferredSystemUserIdYomiName = "preferredsystemuseridyominame",
  ProcessId = "processid",
  Salutation = "salutation",
  ShippingMethodCode = "shippingmethodcode",
  SLAId = "slaid",
  SLAInvokedId = "slainvokedid",
  SLAInvokedIdName = "slainvokedidname",
  SLAName = "slaname",
  SpousesName = "spousesname",
  StageId = "stageid",
  StateCode = "statecode",
  StatusCode = "statuscode",
  SubscriptionId = "subscriptionid",
  Suffix = "suffix",
  TeamsFollowed = "teamsfollowed",
  Telephone1 = "telephone1",
  Telephone2 = "telephone2",
  Telephone3 = "telephone3",
  TerritoryCode = "territorycode",
  TimeSpentByMeOnEmailAndMeetings = "timespentbymeonemailandmeetings",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  TransactionCurrencyId = "transactioncurrencyid",
  TransactionCurrencyIdName = "transactioncurrencyidname",
  TraversedPath = "traversedpath",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
  WebSiteUrl = "websiteurl",
  YomiFirstName = "yomifirstname",
  YomiFullName = "yomifullname",
  YomiLastName = "yomilastname",
  YomiMiddleName = "yomimiddlename",
}

// Early Bound Interface
export interface Contact extends IEntity {
  // Firma LookupType Eindeutiger Bezeichner der Firma, der der Kontakt zugeordnet ist.
  accountid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  accountidname?: string | null;
  //  StringType
  accountidyominame?: string | null;
  // Rolle contact_contact_accountrolecode Wählen Sie die Rolle des Kontakts innerhalb des Unternehmens oder Vertriebsprozesses aus (beispielsweise Entscheidungsträger, Mitarbeiter oder Schlüsselperson).
  accountrolecode?: import("../enums/contact_contact_accountrolecode").contact_contact_accountrolecode | null;
  // Adresse 1: ID UniqueidentifierType Eindeutiger Bezeichner für 'Adresse 1'.
  address1_addressid?: import("dataverse-ify").Guid | null;
  // Adresse 1: Adresstyp contact_contact_address1_addresstypecode Wählen Sie die Art der primären Adresse aus.
  address1_addresstypecode?: import("../enums/contact_contact_address1_addresstypecode").contact_contact_address1_addresstypecode | null;
  // Adresse: Ort StringType Geben Sie den Ort für die primäre Adresse ein.
  address1_city?: string | null;
  // Adresse 1 MemoType Zeigt die vollständige primäre Adresse.
  address1_composite?: string | null;
  // Adresse: Land/Region StringType Geben Sie das Land oder die Region für die primäre Adresse ein.
  address1_country?: string | null;
  // Adresse 1: Verwaltungsbezirk StringType Geben Sie den Verwaltungsbezirk für die primäre Adresse ein.
  address1_county?: string | null;
  // Adresse 1: Fax StringType Geben Sie die Faxnummer für die primäre Adresse ein.
  address1_fax?: string | null;
  // Adresse 1: Lieferbedingungen contact_contact_address1_freighttermscode Wählen Sie die Lieferbedingungen für die primäre Adresse aus, um die ordnungsgemäße Verarbeitung von Versandaufträgen sicherzustellen.
  address1_freighttermscode?: import("../enums/contact_contact_address1_freighttermscode").contact_contact_address1_freighttermscode | null;
  // Adresse 1: Breite DoubleType Geben Sie den Breitengrad der primären Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address1_latitude?: number | null;
  // Adresse: Straße StringType Geben Sie die erste Zeile der primären Adresse ein.
  address1_line1?: string | null;
  // Adresse 1: Straße 2 StringType Geben Sie die zweite Zeile der primären Adresse ein.
  address1_line2?: string | null;
  // Adresse 1: Straße 3 StringType Geben Sie die dritte Zeile der primären Adresse ein.
  address1_line3?: string | null;
  // Adresse 1: Länge DoubleType Geben Sie den Längengrad der primären Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address1_longitude?: number | null;
  // Adresse: Bezeichnung StringType Geben Sie einen aussagekräftigen Namen für die primäre Adresse ein (beispielsweise 'Firmensitz').
  address1_name?: string | null;
  // Adresse: Postleitzahl StringType Geben Sie die Postleitzahl (PLZ) für die primäre Adresse ein.
  address1_postalcode?: string | null;
  // Adresse 1: Postfach StringType Geben Sie die Postfachnummer der primären Adresse ein.
  address1_postofficebox?: string | null;
  // Adresse 1: Name des primären Kontakts StringType Geben Sie den Namen des Hauptkontakts für die primäre Adresse der Firma ein.
  address1_primarycontactname?: string | null;
  // Adresse 1: Versandmethode contact_contact_address1_shippingmethodcode Wählen Sie eine Versandmethode für Lieferungen an diese Adresse aus.
  address1_shippingmethodcode?: import("../enums/contact_contact_address1_shippingmethodcode").contact_contact_address1_shippingmethodcode | null;
  // Adresse 1: Bundesland/Kanton StringType Geben Sie das Bundesland/den Kanton für die primäre Adresse ein.
  address1_stateorprovince?: string | null;
  // Adresse 1: Telefon StringType Geben Sie die Haupttelefonnummer für die primäre Adresse ein.
  address1_telephone1?: string | null;
  // Adresse 1: Telefon 2 StringType Geben Sie eine zweite Telefonnummer für die primäre Adresse ein.
  address1_telephone2?: string | null;
  // Adresse 1: Telefon 3 StringType Geben Sie eine dritte Telefonnummer für die primäre Adresse ein.
  address1_telephone3?: string | null;
  // Adresse 1: UPS-Zone StringType Geben Sie die UPS-Zone der primären Adresse ein, um bei UPS-Versand eine korrekte Berechnung der Versandkosten sowie eine zeitnahe Abwicklung der Lieferungen sicherzustellen.
  address1_upszone?: string | null;
  // Adresse 1: UTC-Offset IntegerType Wählen Sie die Zeitzone (oder den UTC-Offset) für diese Adresse aus, damit sie bei der Kontaktaufnahme mit einer Person unter dieser Adresse zur Verfügung steht.
  address1_utcoffset?: number | null;
  // Adresse 2: ID UniqueidentifierType Eindeutiger Bezeichner für 'Adresse 2'.
  address2_addressid?: import("dataverse-ify").Guid | null;
  // Adresse 2: Adresstyp contact_contact_address2_addresstypecode Wählen Sie die Art der sekundären Adresse aus.
  address2_addresstypecode?: import("../enums/contact_contact_address2_addresstypecode").contact_contact_address2_addresstypecode | null;
  // Priv. Adresse: Ort StringType Geben Sie den Ort für die sekundäre Adresse ein.
  address2_city?: string | null;
  // Adresse 2 MemoType Zeigt die vollständige sekundäre Adresse.
  address2_composite?: string | null;
  // Priv. Adresse: Land/Region StringType Geben Sie das Land oder die Region für die sekundäre Adresse ein.
  address2_country?: string | null;
  // Adresse 2: Verwaltungsbezirk StringType Geben Sie den Verwaltungsbezirk für die sekundäre Adresse ein.
  address2_county?: string | null;
  // Adresse 2: Fax StringType Geben Sie die Faxnummer für die sekundäre Adresse ein.
  address2_fax?: string | null;
  // Adresse 2: Lieferbedingungen contact_contact_address2_freighttermscode Wählen Sie die Lieferbedingungen für die sekundäre Adresse aus, um die ordnungsgemäße Verarbeitung von Versandaufträgen sicherzustellen.
  address2_freighttermscode?: import("../enums/contact_contact_address2_freighttermscode").contact_contact_address2_freighttermscode | null;
  // Adresse 2: Breite DoubleType Geben Sie den Breitengrad der sekundären Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address2_latitude?: number | null;
  // Priv. Adresse: Straße StringType Geben Sie die erste Zeile der sekundären Adresse ein.
  address2_line1?: string | null;
  // Adresse 2: Straße 2 StringType Geben Sie die zweite Zeile der sekundären Adresse ein.
  address2_line2?: string | null;
  // Adresse 2: Straße 3 StringType Geben Sie die dritte Zeile der sekundären Adresse ein.
  address2_line3?: string | null;
  // Adresse 2: Länge DoubleType Geben Sie den Längengrad der sekundären Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address2_longitude?: number | null;
  // Priv. Adresse: Bezeichnung StringType Geben Sie einen aussagekräftigen Namen für die sekundäre Adresse ein (beispielsweise 'Firmensitz').
  address2_name?: string | null;
  // Priv. Adresse: Postleitzahl StringType Geben Sie die Postleitzahl (PLZ) für die sekundäre Adresse ein.
  address2_postalcode?: string | null;
  // Adresse 2: Postfach StringType Geben Sie die Postfachnummer der sekundären Adresse ein.
  address2_postofficebox?: string | null;
  // Adresse 2: Name des primären Kontakts StringType Geben Sie den Namen des Hauptkontakts für die sekundäre Adresse der Firma ein.
  address2_primarycontactname?: string | null;
  // Adresse 2: Versandmethode contact_contact_address2_shippingmethodcode Wählen Sie eine Versandmethode für Lieferungen an diese Adresse aus.
  address2_shippingmethodcode?: import("../enums/contact_contact_address2_shippingmethodcode").contact_contact_address2_shippingmethodcode | null;
  // Adresse 2: Bundesland/Kanton StringType Geben Sie das Bundesland/den Kanton für die sekundäre Adresse ein.
  address2_stateorprovince?: string | null;
  // Adresse 2: Telefon 1 StringType Geben Sie die Haupttelefonnummer für die sekundäre Adresse ein.
  address2_telephone1?: string | null;
  // Adresse 2: Telefon 2 StringType Geben Sie eine zweite Telefonnummer für die sekundäre Adresse ein.
  address2_telephone2?: string | null;
  // Adresse 2: Telefon 3 StringType Geben Sie eine dritte Telefonnummer für die sekundäre Adresse ein.
  address2_telephone3?: string | null;
  // Adresse 2: UPS-Zone StringType Geben Sie die UPS-Zone der sekundären Adresse ein, um bei UPS-Versand eine korrekte Berechnung der Versandkosten sowie eine zeitnahe Abwicklung der Lieferungen sicherzustellen.
  address2_upszone?: string | null;
  // Adresse 2: UTC-Offset IntegerType Wählen Sie die Zeitzone (oder den UTC-Offset) für diese Adresse aus, damit sie bei der Kontaktaufnahme mit einer Person unter dieser Adresse zur Verfügung steht.
  address2_utcoffset?: number | null;
  // Adresse 3: ID UniqueidentifierType Eindeutiger Bezeichner für 'Adresse 3'.
  address3_addressid?: import("dataverse-ify").Guid | null;
  // Adresse 3: Adresstyp contact_contact_address3_addresstypecode Wählen Sie die Art der dritten Adresse aus.
  address3_addresstypecode?: import("../enums/contact_contact_address3_addresstypecode").contact_contact_address3_addresstypecode | null;
  // Priv. Adresse 2: Ort StringType Geben Sie den Ort für die dritte Adresse ein.
  address3_city?: string | null;
  // Adresse 3 MemoType Zeigt die vollständige dritte Adresse.
  address3_composite?: string | null;
  // Priv. Adresse 2: Land/Region StringType das Land oder die Region für die dritte Adresse.
  address3_country?: string | null;
  // Adresse 3: Verwaltungsbezirk StringType Geben Sie den Verwaltungsbezirk für die dritte Adresse ein.
  address3_county?: string | null;
  // Adresse 3: Fax StringType Geben Sie die Faxnummer für die dritte Adresse ein.
  address3_fax?: string | null;
  // Adresse 3: Lieferbedingungen contact_contact_address3_freighttermscode Wählen Sie die Lieferbedingungen für die dritte Adresse aus, um die ordnungsgemäße Verarbeitung von Versandaufträgen sicherzustellen.
  address3_freighttermscode?: import("../enums/contact_contact_address3_freighttermscode").contact_contact_address3_freighttermscode | null;
  // Adresse 3: Breite DoubleType Geben Sie den Breitengrad der dritten Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address3_latitude?: number | null;
  // Priv. Adresse 2: Straße StringType die erste Zeile der dritten Adresse.
  address3_line1?: string | null;
  // Address3: Straße 2 StringType die zweite Zeile der dritten Adresse.
  address3_line2?: string | null;
  // Address3: Straße 3 StringType die dritte Zeile der dritten Adresse.
  address3_line3?: string | null;
  // Adresse 3: Länge DoubleType Geben Sie den Längengrad der dritten Adresse ein. (Wird unter anderem in Kartografieanwendungen verwendet.)
  address3_longitude?: number | null;
  // Priv. Adresse 2: Bezeichnung StringType Geben Sie einen aussagekräftigen Namen für die dritte Adresse ein (beispielsweise Firmensitz).
  address3_name?: string | null;
  // Priv. Adresse 2: Postleitzahl StringType die Postleitzahl der dritten Adresse.
  address3_postalcode?: string | null;
  // Adresse 3: Postfach StringType die Postfachnummer der dritten Adresse.
  address3_postofficebox?: string | null;
  // Adresse 3: Name des primären Kontakts StringType Geben Sie den Namen des Hauptkontakts für die dritte Adresse der Firma ein.
  address3_primarycontactname?: string | null;
  // Adresse 3: Versandmethode contact_contact_address3_shippingmethodcode Wählen Sie eine Versandmethode für Lieferungen an diese Adresse aus.
  address3_shippingmethodcode?: import("../enums/contact_contact_address3_shippingmethodcode").contact_contact_address3_shippingmethodcode | null;
  // Address3: Bundesland/Kanton StringType Bundesland/Kanton der dritten Adresse.
  address3_stateorprovince?: string | null;
  // Adresse 3: Telephone1 StringType Geben Sie die Haupttelefonnummer für die dritte Adresse ein.
  address3_telephone1?: string | null;
  // Adresse 3: Telephone2 StringType Geben Sie eine zweite Telefonnummer für die dritte Adresse ein.
  address3_telephone2?: string | null;
  // Adresse 3: Telephone3 StringType Geben Sie eine dritte Telefonnummer für die primäre Adresse ein.
  address3_telephone3?: string | null;
  // Adresse 3: UPS-Zone StringType Geben Sie die UPS-Zone der dritten Adresse ein, um bei UPS-Versand eine korrekte Berechnung der Versandkosten sowie eine zeitnahe Abwicklung der Lieferungen sicherzustellen.
  address3_upszone?: string | null;
  // Adresse 3: UTC-Offset IntegerType Wählen Sie die Zeitzone (oder den UTC-Offset) für diese Adresse aus, damit sie bei der Kontaktaufnahme mit einer Person unter dieser Adresse zur Verfügung steht.
  address3_utcoffset?: number | null;
  // Entfernen des Kennworts bestätigen BooleanType
  adx_confirmremovepassword?: boolean | null;
  // Erstellt von (IP-Adresse) StringType
  adx_createdbyipaddress?: string | null;
  // Erstellt von (Benutzername) StringType
  adx_createdbyusername?: string | null;
  // Anzahl fehlerhafte Zugriffsversuche IntegerType Zeigt die aktuelle Zahl der fehlerhaften Anmeldeversuche für den Kontakt an.
  adx_identity_accessfailedcount?: number | null;
  // E-Mail bestätigt BooleanType Legt fest, ob die E-Mail vom Kontakt bestätigt wird.
  adx_identity_emailaddress1confirmed?: boolean | null;
  // Letzte erfolgreiche Anmeldung DateTimeType Gibt Datum und Uhrzeit der letzten erfolgreichen Anmeldung im Portal durch den Benutzer an. DateAndTime:UserLocal
  adx_identity_lastsuccessfullogin?: Date | null;
  // Lokale Anmeldung deaktiviert BooleanType Gibt an, dass sich der Kontakt nicht mehr mit dem lokalen Konto im Portal anmelden kann.
  adx_identity_locallogindisabled?: boolean | null;
  // Sperrung aktiviert BooleanType Legt fest, ob dieser Kontakt die fehlerhaften Zugriffsversuche nachverfolgen kann und nach zu vielen Fehlversuchen gesperrt wird. Sie können diese Einstellung deaktivieren, wenn Sie verhindern möchten, dass der Kontakt gesperrt wird.
  adx_identity_lockoutenabled?: boolean | null;
  // Enddatum Sperrung DateTimeType Zeigt den Zeitpunkt für die Aufhebung der Sperrung des Kontakts an. DateAndTime:UserLocal
  adx_identity_lockoutenddate?: Date | null;
  // Anmeldung aktiviert BooleanType Legt fest, ob die Web-Authentifizierung für den Kontakt aktiviert ist.
  adx_identity_logonenabled?: boolean | null;
  // Mobiltelefon bestätigt BooleanType Legt fest, ob die Telefonnummer vom Kontakt bestätigt wird.
  adx_identity_mobilephoneconfirmed?: boolean | null;
  // Neue Kennworteingabe StringType
  adx_identity_newpassword?: string | null;
  // Kennwort-Hash StringType
  adx_identity_passwordhash?: string | null;
  // Sicherheitsstempel StringType Ein Token zur Verwaltung der Webauthentifizierungssitzung
  adx_identity_securitystamp?: string | null;
  // Zweistufige Authentifizierung aktiviert BooleanType Legt fest, ob die zweistufige Authentifizierung für den Kontakt aktiviert ist.
  adx_identity_twofactorenabled?: boolean | null;
  // Benutzername StringType Zeigt die Benutzeridentität für die lokale Webauthentifizierung an
  adx_identity_username?: string | null;
  // Geändert von (IP-Adresse) StringType
  adx_modifiedbyipaddress?: string | null;
  // Geändert von (Benutzername) StringType
  adx_modifiedbyusername?: string | null;
  // Organization Name StringType
  adx_organizationname?: string | null;
  // Bevorzugte LCID (veraltet) IntegerType Das bevorzugte LCID-Portal des Benutzers
  adx_preferredlcid?: number | null;
  // Profilbenachrichtigung BooleanType
  adx_profilealert?: boolean | null;
  // Datum der Profilbenachrichtigung DateTimeType DateAndTime:UserLocal
  adx_profilealertdate?: Date | null;
  // Anweisungen für Profilbenachrichtigung MemoType
  adx_profilealertinstructions?: string | null;
  // Das Profil ist anonym. BooleanType
  adx_profileisanonymous?: boolean | null;
  // Letzte Aktivität des Profils DateTimeType DateAndTime:UserLocal
  adx_profilelastactivity?: Date | null;
  // Profil Änderungszeitpunkt DateTimeType DateAndTime:UserLocal
  adx_profilemodifiedon?: Date | null;
  // Kopie öffentliches Profil MemoType
  adx_publicprofilecopy?: string | null;
  // Time Zone IntegerType
  adx_timezone?: number | null;
  // Fälligkeit: 30 MoneyType Systeminterne Angabe.
  aging30?: number | null;
  // Fälligkeit: 30 (Basis) MoneyType Zeigt das in die standardmäßige Basiswährung des Systems konvertierte Feld 'Fälligkeit: 30'. Zur Berechnung wird der Wechselkurs aus dem Bereich 'Währungen' herangezogen.
  aging30_base?: number | null;
  // Fälligkeit: 60 MoneyType Systeminterne Angabe.
  aging60?: number | null;
  // Fälligkeit: 60 (Basis) MoneyType Zeigt das in die standardmäßige Basiswährung des Systems konvertierte Feld 'Fälligkeit: 60'. Zur Berechnung wird der Wechselkurs aus dem Bereich 'Währungen' herangezogen.
  aging60_base?: number | null;
  // Fälligkeit: 90 MoneyType Systeminterne Angabe.
  aging90?: number | null;
  // Fälligkeit: 90 (Basis) MoneyType Zeigt das in die standardmäßige Basiswährung des Systems konvertierte Feld 'Fälligkeit: 90'. Zur Berechnung wird der Wechselkurs aus dem Bereich 'Währungen' herangezogen.
  aging90_base?: number | null;
  // Jahrestag DateTimeType Geben Sie das Datum des Hochzeitstags oder Dienstjubiläums des Kontakts ein, um es in Kundengeschenkprogrammen oder anderer Kommunikation verwenden zu können. DateOnly:DateOnly
  anniversary?: Date | null;
  // Jahreseinkommen MoneyType Geben Sie das Jahreseinkommen des Kontakts ein. Diese Angabe wird bei der Profilerstellung und Finanzanalyse herangezogen.
  annualincome?: number | null;
  // Jahreseinkommen (Basis) MoneyType Zeigt das in die standardmäßige Basiswährung des Systems konvertierte Feld 'Jahreseinkommen'. Zur Berechnung wird der Wechselkurs aus dem Bereich 'Währungen' herangezogen.
  annualincome_base?: number | null;
  // Sekretariat StringType Geben Sie den Namen des Assistenten des Kontakts ein.
  assistantname?: string | null;
  // Telefon (Sekretariat) StringType Geben Sie die Telefonnummer des Assistenten des Kontakts ein.
  assistantphone?: string | null;
  // genaues Alter DecimalType
  ava_actualage?: number | null;
  // Zusätzliche Informationen (RKS) MemoType
  ava_additionalinformationrks?: string | null;
  // Erwachsenenvertretung BooleanType
  ava_adultrepresentation?: boolean | null;
  // Erwachsenenvertreter*innen StringType
  ava_adultrepresentative?: string | null;
  // Alter DecimalType
  ava_age?: number | null;
  // Unterschied Alter DecimalType
  ava_agedifference?: number | null;
  // AIBE BooleanType
  ava_aibe?: boolean | null;
  // Aktive Anbietungen IntegerType
  ava_aktiveanbietungen?: number | null;
  // Aktive Anbietungen (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Aktive Anbietungen". DateAndTime:UserLocal
  ava_aktiveanbietungen_date?: Date | null;
  // Aktive Anbietungen (Status) IntegerType Status des Rollupfelds "Aktive Anbietungen".
  ava_aktiveanbietungen_state?: number | null;
  // Aktive Sachleistungskarte LookupType
  ava_aktivesachleistungskarte?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_aktivesachleistungskartename?: string | null;
  // Aktuelle Beurteilung Besonderer Bedürfnisse LookupType
  ava_aktuellebeurteilungbesondererbedurfnissei?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_aktuellebeurteilungbesondererbedurfnisseiname?: string | null;
  // Aktueller Aufenthaltsstatus ava_bbu_aktuelleraufenthaltsstatus
  ava_aktuelleraufenthaltsstatus?: import("../enums/ava_bbu_aktuelleraufenthaltsstatus").ava_bbu_aktuelleraufenthaltsstatus | null;
  // Aktuelle RB-Involvierung LookupType
  ava_aktuellerbinvolvierung?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_aktuellerbinvolvierungname?: string | null;
  // Alias concatenated StringType technical field; contains all alias names of the client separated by a semicolon
  ava_aliasconcatenated?: string | null;
  // Alle Remu Leistungen MoneyType
  ava_alleremuleistungen?: number | null;
  // 'Alle Remu Leistungen' (Basis) MoneyType Wert von 'Alle Remu Leistungen' in der Basiswährung.
  ava_alleremuleistungen_base?: number | null;
  // Alle Remu Leistungen (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Alle Remu Leistungen". DateAndTime:UserLocal
  ava_alleremuleistungen_date?: Date | null;
  // Alle Remu Leistungen (Status) IntegerType Status des Rollupfelds "Alle Remu Leistungen".
  ava_alleremuleistungen_state?: number | null;
  // Einschätzung psychologisches Befinden ava_assessmentpsychologicalwellbeing
  ava_assessmentpsychologicalwellbeing?: import("../enums/ava_assessmentpsychologicalwellbeing").ava_assessmentpsychologicalwellbeing | null;
  // Zimmer zugewiesen BooleanType
  ava_assignedroom?: boolean | null;
  // Aufnahme - Frage 1 BooleanType
  ava_aufnahmefrage1?: boolean | null;
  // (ALT) Aufnahme - Frage 2 BooleanType
  ava_aufnahmefrage2?: boolean | null;
  // (ALT) Aufnahme - Frage 3 BooleanType
  ava_aufnahmefrage3?: boolean | null;
  // (ALT) Aufnahme - Frage 4 BooleanType
  ava_aufnahmefrage4?: boolean | null;
  // (ALT) Aufnahme - Frage 5 BooleanType
  ava_aufnahmefrage5?: boolean | null;
  // (ALT) Aufnahme - Frage 6 BooleanType
  ava_aufnahmefrage6?: boolean | null;
  // Aufnahme-Test BooleanType
  ava_aufnahmetest?: boolean | null;
  // In BBE anwesend? BooleanType
  ava_bbepresence?: boolean | null;
  // AB-Karte erhalten BooleanType
  ava_bbu_abkarteerhalten?: boolean | null;
  // AB-Karte gedruckt BooleanType
  ava_bbu_abkartegedruckt?: boolean | null;
  // Ablehnung Remu-Angebot per (ALT) DateTimeType DateOnly:DateOnly
  ava_bbu_ablehnungremuangebotper?: Date | null;
  // AGES ID StringType
  ava_bbu_agesid?: string | null;
  // Aktuelles GVS-Quartier ava_bbu_aktuellesgvsquartier
  ava_bbu_aktuellesgvsquartier?: import("../enums/ava_bbu_aktuellesgvsquartier").ava_bbu_aktuellesgvsquartier | null;
  // akute geschlechtsspezifische Bedarf BooleanType
  ava_bbu_akutegeschlechtsspezifischebedarf?: boolean | null;
  // akute gesundheitliche Probleme BooleanType
  ava_bbu_akutegesundheitlicheprobleme?: boolean | null;
  // akute psychologische Unterstützung BooleanType
  ava_bbu_akutepsychologischeunterstutzung?: boolean | null;
  // Anmerkungen Remufähigkeit (ALT) MemoType
  ava_bbu_anmerkungenremufahigkeit?: string | null;
  // Anmerkungen Schulbesuch MemoType
  ava_bbu_anmerkungenschulbesuch?: string | null;
  // Anmerkung EV MemoType
  ava_bbu_anmerkungev?: string | null;
  // Anmerkung Pflegestufe MemoType
  ava_bbu_anmerkungpflegestufe?: string | null;
  // Anmerkung Remu MemoType
  ava_bbu_anmerkungremu?: string | null;
  // Anmerkung SLK MemoType
  ava_bbu_anmerkungslk?: string | null;
  // Anonym gemeldet ava_bbu_anonymgemeldet
  ava_bbu_anonymgemeldet?: import("../enums/ava_bbu_anonymgemeldet").ava_bbu_anonymgemeldet | null;
  // Ausreiserelevante Vulnerabilität BooleanType
  ava_bbu_ausreiserelevantevulnerabilitat?: boolean | null;
  // Ersatznahrung für Baby benötigt BooleanType
  ava_bbu_babysubstitutefood?: boolean | null;
  // Beginn DateTimeType DateOnly:DateOnly
  ava_bbu_beginn?: Date | null;
  // Begründung (ALT) ava_bbu_begrundungremufahig
  ava_bbu_begrundung?: import("../enums/ava_bbu_begrundungremufahig").ava_bbu_begrundungremufahig | null;
  // Bescheiddatum DateTimeType DateOnly:TimeZoneIndependent
  ava_bbu_bescheiddatum?: Date | null;
  // Bescheid Datum DateTimeType DateOnly:TimeZoneIndependent
  ava_bbu_bescheiddatume?: Date | null;
  // Bezugsberechtigte Person LookupType
  ava_bbu_bezugsberechtigteperson?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_bezugsberechtigtepersonname?: string | null;
  //  StringType
  ava_bbu_bezugsberechtigtepersonyominame?: string | null;
  // Stillend BooleanType
  ava_bbu_breastfeeding?: boolean | null;
  // Begleitperson LookupType
  ava_bbu_chaperon?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_chaperonname?: string | null;
  //  StringType
  ava_bbu_chaperonyominame?: string | null;
  // Anmerkung Begleitperson StringType
  ava_bbu_commentchaperon?: string | null;
  // Aktueller KH-Aufenthalt LookupType
  ava_bbu_currenthospitalabsenceid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_currenthospitalabsenceidname?: string | null;
  // Aktuelle Infizierung LookupType
  ava_bbu_currentpandemicinfectionid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_currentpandemicinfectionidname?: string | null;
  // Aktuelle Quarantäne LookupType
  ava_bbu_currentquarantineid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_currentquarantineidname?: string | null;
  // Aktuell Remunerant LookupType Zeigt an, ob Klient aktuell als Remunerant geplant ist
  ava_bbu_currentremunerant?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_currentremunerantname?: string | null;
  // Datum des HWR DateTimeType DateOnly:UserLocal
  ava_bbu_dateofhwr?: Date | null;
  // Datum von Widerruf DateTimeType DateOnly:UserLocal
  ava_bbu_dateofrevocation?: Date | null;
  // Erhalt dritte Impfung DateTimeType DateOnly:UserLocal
  ava_bbu_datethirdvaccinationreceived?: Date | null;
  // Datum AB-Karte erhalten DateTimeType DateOnly:TimeZoneIndependent
  ava_bbu_datumabkarteerhalten?: Date | null;
  // Datum der Asylantragstellung DateTimeType DateOnly:DateOnly
  ava_bbu_datumderasylantragstellung?: Date | null;
  // Datum Pflegebescheid DateTimeType DateOnly:DateOnly
  ava_bbu_datumpflegebescheid?: Date | null;
  // Datum Pflegeeinschätzung DateTimeType DateOnly:TimeZoneIndependent
  ava_bbu_datumpflegeeinschatzung?: Date | null;
  // Remuverzicht BooleanType Klient*in verzichtet auf Remunerantentätigkeit
  ava_bbu_disclaimerremuneration?: boolean | null;
  // Ende DateTimeType DateOnly:DateOnly
  ava_bbu_ende?: Date | null;
  // Familienzusammenführung BooleanType
  ava_bbu_familienzusammenfuhrung?: boolean | null;
  // Verwandtschaft in Österreich BooleanType Haben Sie Familie in Österreich?
  ava_bbu_familyinaustria?: boolean | null;
  // Familienrolle ava_bbu_familyrole
  ava_bbu_familyrole?: import("../enums/ava_bbu_familyrole").ava_bbu_familyrole | null;
  // (ALT) Erstinformationen unterzeichnet BooleanType Hausordnung und Sicherheitsinformationen unterzeichnet 
  ava_bbu_firstinformationsigned?: boolean | null;
  // (ALT) Erstinformationen übergeben BooleanType Information zur Kleiderversorgung, Essensausgabe und Infopoint mitgeteilt
  ava_bbu_firstinformationtransfer?: boolean | null;
  // FRK-Antrag unterschrieben ava_bbu_frkantragunterschrieben
  ava_bbu_frkantragunterschrieben?: import("../enums/ava_bbu_frkantragunterschrieben").ava_bbu_frkantragunterschrieben | null;
  // Gefahrenanalyse ava_bbu_gefahrenanalyse
  ava_bbu_gefahrenanalyse?: import("../enums/ava_bbu_gefahrenanalyse").ava_bbu_gefahrenanalyse | null;
  // geplanter Entbindungstermin DateTimeType DateOnly:DateOnly
  ava_bbu_geplanterentbindungstermin?: Date | null;
  // Gesonderter Unterstützungsbedarf BooleanType
  ava_bbu_gesonderterunterstutzungsbedarf?: boolean | null;
  // IBAN StringType
  ava_bbu_iban?: string | null;
  // In BBE blockierte Betten StringType
  ava_bbu_inbbeblockiertebetten?: string | null;
  // Kartenberechtigung BooleanType
  ava_bbu_kartenberechtigung?: boolean | null;
  // Kontaktdaten StringType
  ava_bbu_kontaktdaten?: string | null;
  // Alphabetisierung ava_bbu_literacy Können Sie Lesen oder Schreiben?
  ava_bbu_literacy?: import("../enums/ava_bbu_literacy").ava_bbu_literacy | null;
  // Name und Kontaktdaten EV MemoType
  ava_bbu_nameundkontaktdatenev?: string | null;
  // Anmerkung Erhalt dritte Impfung MemoType
  ava_bbu_notethirdvaccinationreceived?: string | null;
  // Anzahl Personen im Familienverband IntegerType inklusive Kinder unter 14 Jahre
  ava_bbu_numberpersonsinfamiliy?: number | null;
  // Letzter Test LookupType
  ava_bbu_pandemiclasttestid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_pandemiclasttestidname?: string | null;
  // Vorletzter Test LookupType
  ava_bbu_pandemicseclasttestid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_pandemicseclasttestidname?: string | null;
  // Post BooleanType
  ava_bbu_post?: boolean | null;
  // Posteingang DateTimeType DateOnly:TimeZoneIndependent
  ava_bbu_posteingang?: Date | null;
  // Schwangerschaftswoche ava_bbu_pregnancymonth
  ava_bbu_pregnancymonth?: import("../enums/ava_bbu_pregnancymonth").ava_bbu_pregnancymonth | null;
  // Privatverzug BooleanType
  ava_bbu_privategone?: boolean | null;
  // Psychologengespräch gewünscht BooleanType
  ava_bbu_psychologisttalk?: boolean | null;
  // Strahlendosis in mGy³cm² StringType
  ava_bbu_radiationdose?: string | null;
  // Strahlendosis HWR StringType
  ava_bbu_radiationdosehwr?: string | null;
  // Begründung Überschreitung MemoType
  ava_bbu_reasonforexceeding?: string | null;
  // Reststunden DecimalType
  ava_bbu_remaininghours?: number | null;
  // Remu-Buddy MemoType
  ava_bbu_remubuddy?: string | null;
  // Remu-Eltern MemoType
  ava_bbu_remueltern?: string | null;
  // Remufähig (ALT) BooleanType
  ava_bbu_remufahig?: boolean | null;
  // Remufähigkeitsprüfung am (ALT) DateTimeType DateOnly:DateOnly
  ava_bbu_remufahigkeitsprufungam?: Date | null;
  // Remufähigkeitsprüfung durch (ALT) LookupType
  ava_bbu_remufahigkeitsprufungdurch?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_remufahigkeitsprufungdurchname?: string | null;
  //  StringType
  ava_bbu_remufahigkeitsprufungdurchyominame?: string | null;
  // Remu Tätigkeit LookupType
  ava_bbu_remutask?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_remutaskname?: string | null;
  // Letzte Interaktion LookupType
  ava_bbu_scanmotionlastscanid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_scanmotionlastscanidname?: string | null;
  // Schulbesuch ab DateTimeType DateOnly:DateOnly
  ava_bbu_schulbesuchab?: Date | null;
  // Schuleinrichtung LookupType
  ava_bbu_schuleinrichtung?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_schuleinrichtungname?: string | null;
  //  StringType
  ava_bbu_schuleinrichtungyominame?: string | null;
  // Separate Unterbringung BooleanType Wollen Sie in einem Bereich untergebracht werden, in dem nur Frauen und Kinder wohnen dürfen?
  ava_bbu_separateaccommodation?: boolean | null;
  // Besondere Fähigkeiten StringType Gibt es besondere Fähigkeiten (Kompetenzen) die Sie uns mitteilen wollen? Z. B. Maler, Koch etc.
  ava_bbu_skills?: string | null;
  // Verfahrensstand ava_bbu_statusofproceeding
  ava_bbu_statusofproceeding?: import("../enums/ava_bbu_statusofproceeding").ava_bbu_statusofproceeding | null;
  // Sonstiger Verfahrensstand StringType
  ava_bbu_statusofproceedingothers?: string | null;
  // Summe Schulausgaben (aktuelles Jahr) MoneyType
  ava_bbu_sumschoolissue?: number | null;
  // 'Summe Schulausgaben (aktuelles Jahr)' (Basis) MoneyType Wert von 'Summe Schulausgaben (aktuelles Jahr)' in der Basiswährung.
  ava_bbu_sumschoolissue_base?: number | null;
  // Summe Schulausgaben (aktuelles Jahr) (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Summe Schulausgaben (aktuelles Jahr)". DateAndTime:UserLocal
  ava_bbu_sumschoolissue_date?: Date | null;
  // Summe Schulausgaben (aktuelles Jahr) (Status) IntegerType Status des Rollupfelds "Summe Schulausgaben (aktuelles Jahr)".
  ava_bbu_sumschoolissue_state?: number | null;
  // TG-Anspruch laufender Monat StringType
  ava_bbu_tganspruchlaufendermonat?: string | null;
  // Zusammengehörigkeit LookupType
  ava_bbu_togetherness?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_bbu_togethernessname?: string | null;
  // Zusammengehörigkeitsrolle StringType
  ava_bbu_togethernessrole?: string | null;
  // Typ der Vulnerabilität ava_bbu_typdervulnerabilitat
  ava_bbu_typdervulnerabilitat?: import("../enums/ava_bbu_typdervulnerabilitat").ava_bbu_typdervulnerabilitat | null;
  // Ukraine-Krise BooleanType
  ava_bbu_ukrainecrises?: boolean | null;
  // Verdacht auf Menschenhandel BooleanType
  ava_bbu_verdachtaufmenschenhandel?: boolean | null;
  // Verfahrenszahl StringType
  ava_bbu_verfahrenszahl?: string | null;
  // Röntgenarzt StringType
  ava_bbu_xraydoctor?: string | null;
  // Röntgenarzt HWR StringType
  ava_bbu_xraydoctorhwr?: string | null;
  // Zweck MemoType
  ava_bbu_zweck?: string | null;
  // BBU ID StringType
  ava_bbuid?: string | null;
  // (ALT) Bei Erziehungsberechtigten - Frage 1 BooleanType
  ava_beierziehungsberechtigtenfrage1?: boolean | null;
  // (ALT) Bei Erziehungsberechtigten - Frage 2 BooleanType
  ava_beierziehungsberechtigtenfrage2?: boolean | null;
  // Bekleidungshilfe LGVS MoneyType
  ava_bekleidungshilfelgvs?: number | null;
  // 'Bekleidungshilfe LGVS' (Basis) MoneyType Wert von 'Bekleidungshilfe LGVS' in der Basiswährung.
  ava_bekleidungshilfelgvs_base?: number | null;
  // Geburtstag DateTimeType DateOnly:UserLocal
  ava_birthdate?: Date | null;
  // Geburtsort StringType Geburtsort
  ava_birthplace?: string | null;
  // Bundesland letzte Anbietung ava_state
  ava_bundeslandletzteanbietung?: import("../enums/ava_state").ava_state | null;
  // BVa BooleanType
  ava_bva?: boolean | null;
  // Anbietbar L-GVS BooleanType
  ava_canbeoffered?: boolean | null;
  // Transferierbar BooleanType
  ava_canbetransferred?: boolean | null;
  // Grund der Änderung ava_changingreasonbirthdate
  ava_changingreasonbirthdate?: import("../enums/ava_changingreasonbirthdate").ava_changingreasonbirthdate | null;
  // Verrechnung als SB (Sonderbetreuung) BooleanType
  ava_chargingspecialcare?: boolean | null;
  // Staatsbürgerschaft ava_citizenshipexisting
  ava_citizenship?: import("../enums/ava_citizenshipexisting").ava_citizenshipexisting | null;
  // Betreuungskategorie ava_clientgroup
  ava_clientgroup?: import("../enums/ava_clientgroup").ava_clientgroup | null;
  // Kommentar Ethnie MemoType
  ava_commentethnicgroup?: string | null;
  // Kommentar Muttersprache MemoType
  ava_commentmothertongue?: string | null;
  // Kommentar Nationalität MemoType
  ava_commentnationality?: string | null;
  // Verständigungssprachen ava_languagespoken
  ava_communicationlanguage?: import("../enums/ava_languagespoken").ava_languagespoken[] | null;
  // Beschwerdenummer MemoType
  ava_complaint?: string | null;
  // Freizeitgeld lfd. Monat MoneyType
  ava_costperclientcurrentmonth?: number | null;
  // 'Freizeitgeld lfd. Monat' (Basis) MoneyType Wert von 'Freizeitgeld lfd. Monat' in der Basiswährung.
  ava_costperclientcurrentmonth_base?: number | null;
  // Freizeitgeld lfd. Monat (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Freizeitgeld lfd. Monat". DateAndTime:UserLocal
  ava_costperclientcurrentmonth_date?: Date | null;
  // Freizeitgeld lfd. Monat (Status) IntegerType Status des Rollupfelds "Freizeitgeld lfd. Monat".
  ava_costperclientcurrentmonth_state?: number | null;
  // Kulturpass DateTimeType DateOnly:DateOnly
  ava_culturepass?: Date | null;
  // Aktuellles Zugangsdatum DateTimeType DateOnly:DateOnly
  ava_currentaccessdate?: Date | null;
  // Aktuelle Adresse geändert von LookupType
  ava_currentaddressmodifiedby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentaddressmodifiedbyname?: string | null;
  //  StringType
  ava_currentaddressmodifiedbyyominame?: string | null;
  // Aktuelle Adresse geändert am DateTimeType DateAndTime:UserLocal
  ava_currentaddressmodifiedon?: Date | null;
  // Typ des Aufenthaltsort ava_currentaddresstypeos
  ava_currentaddresstype?: import("../enums/ava_currentaddresstypeos").ava_currentaddresstypeos | null;
  // Aktuelles Geburtsdatum geändert am DateTimeType DateOnly:UserLocal
  ava_currentbirthdatemodifiedon?: Date | null;
  // Aktuelles Gebäude LookupType
  ava_currentbuilding?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentbuildingname?: string | null;
  // Aktuelles Stockwerk LookupType
  ava_currentfloor?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentfloorname?: string | null;
  // Aktuelle Zimmerbelegung LookupType
  ava_currentroombookingid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentroombookingidname?: string | null;
  // Aktuelles Zimmer LookupType
  ava_currentroomid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentroomidname?: string | null;
  // Aktueller Standort LookupType
  ava_currentsiteid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentsiteidname?: string | null;
  // Aktueller Aufenthalt LookupType
  ava_currentstayid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_currentstayidname?: string | null;
  // Erhalt erste Impfung DateTimeType DateOnly:UserLocal
  ava_datefirstvaccinationreceived?: Date | null;
  // Erstuntersuchung DateTimeType DateOnly:DateOnly
  ava_dateinitialmedicalcare?: Date | null;
  // Zulassungsdatum DateTimeType DateOnly:DateOnly
  ava_datelastcheck?: Date | null;
  // Datum nächster Termin DateTimeType DateOnly:UserLocal
  ava_datenextappointment?: Date | null;
  // Datum übernächster Termin DateTimeType DateOnly:UserLocal
  ava_datesecondappointment?: Date | null;
  // Erhalt zweite Impfung DateTimeType DateOnly:UserLocal
  ava_datesecondvaccinationreceived?: Date | null;
  // TBC-Check Durchführung DateTimeType DateOnly:DateOnly
  ava_datetbccheckconduct?: Date | null;
  // TBC-Check Befunddatum DateTimeType DateOnly:DateOnly
  ava_datetbccheckreport?: Date | null;
  // Datum AB-Karte gedruckt DateTimeType DateOnly:TimeZoneIndependent
  ava_datumabkartegedruckt?: Date | null;
  // Datum letzte Anbietung DateTimeType DateOnly:UserLocal
  ava_datumletzteanbietung?: Date | null;
  // Datum letzte Interaktion DateTimeType DateAndTime:UserLocal
  ava_datumletzteinteraktion?: Date | null;
  // Datum Psychologisches Erstgespräch DateTimeType DateAndTime:TimeZoneIndependent
  ava_datumpsychologischeserstgesprach?: Date | null;
  // Anmerkung Bekenntnis MemoType
  ava_denomination?: string | null;
  // Anmerkung transferierbar MemoType
  ava_descriptioncanbetransferred?: string | null;
  // Anmerkung Intern Verlegbar MemoType
  ava_descriptioninternaltransfer?: string | null;
  // Dokument vorhanden BooleanType
  ava_documentavailable?: boolean | null;
  // E-Mail-Adresse 2 Beschreibung StringType
  ava_emailaddress2note?: string | null;
  // E-Mail-Adresse 3 Beschreibung StringType
  ava_emailaddress3note?: string | null;
  // Ethnie ava_ethnicgroup
  ava_ethnicgroup?: import("../enums/ava_ethnicgroup").ava_ethnicgroup | null;
  // Kontakte: Freunde, Familie MemoType
  ava_familyadditionalinformation?: string | null;
  // Familienverbund LookupType
  ava_familyid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_familyidname?: string | null;
  // Zivilstand (anderer) [DEPRECATED] StringType
  ava_familystatuscodeother?: string | null;
  // Familieninformation ava_familytravelinformation
  ava_familytravelinformation?: import("../enums/ava_familytravelinformation").ava_familytravelinformation | null;
  // Anamneseblatt ausgefüllt BooleanType
  ava_filledoutanamnesissheet?: boolean | null;
  // Erstzugang (Aufenthalt) LookupType
  ava_firstaccessstayid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_firstaccessstayidname?: string | null;
  // Nächster Termin LookupType
  ava_firstappointment?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_firstappointmentname?: string | null;
  // Anmerkungen MemoType
  ava_firstinformationnote?: string | null;
  // Erstzugangsdatum DateTimeType DateOnly:DateOnly
  ava_firstmoveindate?: Date | null;
  // Ernährungspräferenzen ava_foodpreferences
  ava_foodpreferences?: import("../enums/ava_foodpreferences").ava_foodpreferences[] | null;
  // GVS-Zahl StringType
  ava_gvsnumber?: string | null;
  // Wobei wird Hilfe benötigt? StringType
  ava_helpneededwhere?: string | null;
  // Hinweise Postversand MemoType
  ava_hinweisepostversand?: string | null;
  // Hygienepaket LookupType
  ava_hygienepackageid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_hygienepackageidname?: string | null;
  // Hygienepaket ausgegeben? BooleanType
  ava_hygienepackageissued?: boolean | null;
  // Festgestelltes Alter BooleanType
  ava_identifiedage?: boolean | null;
  // IFA Stammdaten Link StringType
  ava_ifamasterdatalink?: string | null;
  // IFA Nummer StringType
  ava_ifanumbertext?: string | null;
  // Foto ImageType
  ava_image?: string | null;
  //  BigIntType
  ava_image_timestamp?: number | null;
  //  StringType
  ava_image_url?: string | null;
  //  UniqueidentifierType
  ava_imageid?: import("dataverse-ify").Guid | null;
  // Information über Impfung DateTimeType DateOnly:UserLocal
  ava_informationvaccination?: Date | null;
  // Erste Medizinische Untersuchung BooleanType
  ava_initalmedicalcare?: boolean | null;
  // Für Impfung vorgesehen BooleanType
  ava_intendedforvaccination?: boolean | null;
  // Intern Verlegbar BooleanType
  ava_internaltransfer?: boolean | null;
  // Letzte Zugangskontrolle LookupType
  ava_lastaccess?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_lastaccessname?: string | null;
  // Letzte Anbietung LookupType
  ava_lastoffering?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_lastofferingname?: string | null;
  // Rechtsvertretung ava_legalrepresentationstatusos
  ava_legalrepresentationstatus?: import("../enums/ava_legalrepresentationstatusos").ava_legalrepresentationstatusos | null;
  // Letzte Aufnahme LookupType
  ava_letzteaufnahme?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letzteaufnahmename?: string | null;
  // Letzte Bezugsbetreuung LookupType
  ava_letztebezugsbetreuung?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letztebezugsbetreuungname?: string | null;
  // Letzte Erstaufnahme LookupType Letzte Gesprächsdoku, Typ Erstaufnahme
  ava_letzteerstaufnahme?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letzteerstaufnahmename?: string | null;
  // Letztes Belehrungsgespräch LookupType
  ava_letztesbelehrungsgesprach?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letztesbelehrungsgesprachname?: string | null;
  // Letztes Infogespräch LookupType
  ava_letztesinfogesprach?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letztesinfogesprachname?: string | null;
  // Letztes Orientierungsgespräch LookupType
  ava_letztesorientierungsgesprachid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letztesorientierungsgesprachidname?: string | null;
  // Letztes Willkommensgespräch LookupType
  ava_letzteswillkommensgesprach?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_letzteswillkommensgesprachname?: string | null;
  // Letzte TN DemReFr DateTimeType DateOnly:DateOnly
  ava_letztetndemrefr?: Date | null;
  // Letzte TN Gleichberechtigung DateTimeType DateOnly:DateOnly
  ava_letztetngleichberechtigung?: Date | null;
  // Letzte TN Umgebungsformen DateTimeType DateOnly:DateOnly
  ava_letztetngrundregelkurs?: Date | null;
  // Letzte TN Rechte und Pflichten DateTimeType DateOnly:DateOnly
  ava_letztetnrechteundpflichten?: Date | null;
  // Letzte TN SensAntis DateTimeType DateOnly:DateOnly
  ava_letztetnsensantis?: Date | null;
  // Pflegestufe ava_levelofcare
  ava_levelofcare?: import("../enums/ava_levelofcare").ava_levelofcare | null;
  // LGBTIQ BooleanType
  ava_lgbtiq?: boolean | null;
  // Manuelle Generierung SharePoint Ordner? BooleanType
  ava_manualgeneratesharepointfolder?: boolean | null;
  // Migration ID (IRMA) StringType
  ava_migidirma?: string | null;
  // Migration ID (RKS Filemaker) StringType
  ava_migidrksfilemaker?: string | null;
  // Mobiltelefon 2 StringType
  ava_mobilephone2?: string | null;
  // Mobiltelefon 2 Beschreibung StringType
  ava_mobilephone2note?: string | null;
  // Mobiltelefon 3 StringType
  ava_mobilephone3?: string | null;
  // Mobiltelefon 3 Beschreibung StringType
  ava_mobilephone3note?: string | null;
  // Muttersprache ava_languagespoken
  ava_mothertongue?: import("../enums/ava_languagespoken").ava_languagespoken | null;
  // Nationalität (Option Set) ava_country
  ava_nationality?: import("../enums/ava_country").ava_country | null;
  // Nationalität LookupType
  ava_nationalitystateid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_nationalitystateidname?: string | null;
  // Typ der Nationalität ava_typecountry
  ava_nationalitystatetype?: import("../enums/ava_typecountry").ava_typecountry | null;
  // Im Alltag auf Hilfe angewiesen? BooleanType
  ava_needhelpineverydaylife?: boolean | null;
  // Anmerkung MemoType
  ava_note?: string | null;
  // Anmerkung Erhalt erste Impfung MemoType
  ava_notefirstvaccinationreceived?: string | null;
  // Anmerkung Information über Impfung MemoType
  ava_noteinformationvaccination?: string | null;
  // Anmerkung für Impfung vorgesehen MemoType
  ava_noteintendedforvaccination?: string | null;
  // Anmerkung Regelmäßige Medikamenteneinnahme StringType
  ava_noteregularmedicationintake?: string | null;
  // Notizen StringType Selbst- oder Fremdgefährdung; Bitte GB/Ort, Datum, Mitarbeiter*in eintragen
  ava_notes?: string | null;
  // Anmerkung Erhalt zweite Impfung MemoType
  ava_notesecondvaccinationreceived?: string | null;
  // Anmerkungen MemoType
  ava_notesvulnerability?: string | null;
  // Anmerkung Impfwilligkeit gegeben MemoType
  ava_notewillingnesstovaccinate?: string | null;
  // Behördlich nicht erfasst BooleanType
  ava_notregisteredbyauthorities?: boolean | null;
  // Obsorge abgelehnt am DateTimeType DateOnly:UserLocal
  ava_obsorgeabgelehntam?: Date | null;
  // Obsorge beantragt am DateTimeType DateOnly:UserLocal
  ava_obsorgebeantragtam?: Date | null;
  // Obsorgebeschluss am DateTimeType DateOnly:UserLocal
  ava_obsorgebeschlussam?: Date | null;
  // Obsorgemöglichkeit BooleanType
  ava_obsorgemoglichkeit?: boolean | null;
  // Obsorgemöglichkeit Anmerkung StringType
  ava_obsorgemoglichkeitanmerkung?: string | null;
  // ONZL BooleanType
  ava_onzl?: boolean | null;
  // Summe Bekleidungsausgaben MoneyType
  ava_output_sum_clothin?: number | null;
  // 'Summe Bekleidungsausgaben' (Basis) MoneyType Wert von 'Summe Bekleidungsausgaben' in der Basiswährung.
  ava_output_sum_clothin_base?: number | null;
  // Summe Bekleidungsausgaben (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Summe Bekleidungsausgaben". DateAndTime:UserLocal
  ava_output_sum_clothin_date?: Date | null;
  // Summe Bekleidungsausgaben (Status) IntegerType Status des Rollupfelds "Summe Bekleidungsausgaben".
  ava_output_sum_clothin_state?: number | null;
  // Genehmigung Weitergabe medizinischer Daten BooleanType
  ava_permissiontosharemedicaldata?: boolean | null;
  // Pflegeeinschätzung ava_levelofcare
  ava_pflegeeinschatzung?: import("../enums/ava_levelofcare").ava_levelofcare | null;
  // (ALT) Möglichkeit zeitnahe mit Arzt zu sprechen? BooleanType Sie  haben  die  Möglichkeit  in  den nächsten Stunden/Tagen mit einem/einer Arzt/Ärztin zu sprechen. Haben Sie Anzeichen einer Krankheit einer Krankheit beobachtet, die SOFORT einer Behandlung bedürfen? 
  ava_possibilitytotalktodoctorpromptly?: boolean | null;
  // QR Code ID StringType
  ava_qrcodeid?: string | null;
  // QR Code Image MemoType
  ava_qrcodeimagebase64?: string | null;
  // Ramadan BooleanType
  ava_ramadan?: boolean | null;
  // Anmerkung Anbietbar MemoType
  ava_reasonnotoffered?: string | null;
  // Röntgenkarte erhalten BooleanType
  ava_receivedxraycard?: boolean | null;
  // Bezugsperson LookupType
  ava_referencepersonsystemuserid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_referencepersonsystemuseridname?: string | null;
  //  StringType
  ava_referencepersonsystemuseridyominame?: string | null;
  // Regelmäßige Medikamenteneinnahme? BooleanType
  ava_regularmedicationintake?: boolean | null;
  // Religion ava_religion
  ava_religion?: import("../enums/ava_religion").ava_religion | null;
  // Verlegung medizinisch NICHT möglich BooleanType
  ava_relocationmeditativelypossible?: boolean | null;
  // Verlegung medizinisch eingeschränkt BooleanType
  ava_relocationmeditativelyrestricted?: boolean | null;
  // Remubudget/Monat MoneyType Max. Betrag der pro Monat verdient werden darf. Für den Durchrechnungszeitraum wird er mit 3 multipliziert. 
  ava_remubudgetpermonth?: number | null;
  // 'Remubudget/Monat' (Basis) MoneyType Wert von 'Remubudget/Monat' in der Basiswährung.
  ava_remubudgetpermonth_base?: number | null;
  // Remufähigkeit Id LookupType
  ava_remufahigkeitid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_remufahigkeitidname?: string | null;
  // Remu Restbudget MoneyType
  ava_remurestbudget?: number | null;
  // 'Remu Restbudget' (Basis) MoneyType Wert von 'Remu Restbudget' in der Basiswährung.
  ava_remurestbudget_base?: number | null;
  // Restbudget Bekleidungsausgaben DecimalType Das Feld berechnet das Restbudget für die Bekleidungshilfe. Formel = 150 - Summe Bekleidungsausgaben
  ava_restbudgetbekleidungsausgaben?: number | null;
  // Rückkehrberatung DateTimeType DateOnly:DateOnly
  ava_returncounselling?: Date | null;
  // RKS-Beratung UMF/Familie LookupType
  ava_rksfamilienberatungid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_rksfamilienberatungidname?: string | null;
  // Gerundetes Alter DecimalType
  ava_roundedage?: number | null;
  // RüBe BooleanType
  ava_rube?: boolean | null;
  // Schule BooleanType
  ava_school?: boolean | null;
  // Übernächster Termin LookupType
  ava_secondappointment?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_secondappointmentname?: string | null;
  // SharePoint Ordner Erstellung DateTimeType DateAndTime:TimeZoneIndependent
  ava_sharepointfoldercreationtrigger?: Date | null;
  // Sozialversicherungsnummer [DEPRECATED] IntegerType
  ava_socialsecuritynumber?: number | null;
  // Start Berechnungszeitraum DateTimeType DateOnly:UserLocal
  ava_startberechnungszeitraum?: Date | null;
  // Start nächster Berechnungszeitraum DateTimeType DateOnly:UserLocal
  ava_startnaechsterberechnungszeitraum?: Date | null;
  // Status Rechtsauskunft LookupType
  ava_statusrechtsauskunftid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  ava_statusrechtsauskunftidname?: string | null;
  // Ausreichend Medikamente mitgeführt? BooleanType
  ava_sufficientmedicationavailable?: boolean | null;
  // Summe Bekleidungsausgabe DecimalType
  ava_summebekleidungsausgabegesamt?: number | null;
  // Summe BBU Bekleidungsausgaben MoneyType
  ava_summebekleidungsausgabenaktuellejahr?: number | null;
  // 'Summe Bekleidungsausgaben (Jahr)' (Basis) MoneyType Wert von 'Summe Bekleidungsausgaben' in der Basiswährung.
  ava_summebekleidungsausgabenaktuellejahr_base?: number | null;
  // Summe Bekleidungsausgaben (letzte Aktualisierung am) DateTimeType Zeit der letzten Aktualisierung des Rollupfelds "Summe Bekleidungsausgaben". DateAndTime:UserLocal
  ava_summebekleidungsausgabenaktuellejahr_date?: Date | null;
  // Summe Bekleidungsausgaben (Status) IntegerType Status des Rollupfelds "Summe Bekleidungsausgaben".
  ava_summebekleidungsausgabenaktuellejahr_state?: number | null;
  // Sozialversicherungsnummer StringType
  ava_svnr?: string | null;
  // TBC-Check Befund MemoType
  ava_tbccheckreport?: string | null;
  // Gebietsbeschränkung BooleanType
  ava_territorialrestriction?: boolean | null;
  // Titel StringType
  ava_titel?: string | null;
  // Transferempfehlung StringType
  ava_transferrecommendation?: string | null;
  // Obsorgemöglichkeit BooleanType
  ava_umffrage1?: boolean | null;
  // Obsorgemöglichkeit (Textfeld) MemoType
  ava_umffrage1textfeld?: string | null;
  // Obsorge beantragt BooleanType
  ava_umffrage2?: boolean | null;
  // Obsorge beantragt (Datum) DateTimeType DateOnly:TimeZoneIndependent
  ava_umffrage2datum?: Date | null;
  // Obsorgebeschluss BooleanType
  ava_umffrage3?: boolean | null;
  // Obsorgebeschluss (Datum) DateTimeType DateOnly:TimeZoneIndependent
  ava_umffrage3datum?: Date | null;
  // Obsorge abgelehnt BooleanType
  ava_umffrage4?: boolean | null;
  // Obsorge abgelehnt (Datum) DateTimeType DateOnly:TimeZoneIndependent
  ava_umffrage4datum?: Date | null;
  // UMF BooleanType
  ava_umfurb?: boolean | null;
  // Minderjährig BooleanType
  ava_underage?: boolean | null;
  // Hinweis Minderjähriger ava_underageinformation
  ava_underageinformation?: import("../enums/ava_underageinformation").ava_underageinformation | null;
  // URB Dokumentenort erstellen? BooleanType Wollen Sie für diesen Klient einen Ordner unter den URB Dokumenten erstellen?
  ava_urbdocumentlocationcreation?: boolean | null;
  // Verdacht auf Menschenhandel DateTimeType DateOnly:DateOnly
  ava_verdachtaufmenschenhandel?: Date | null;
  // Verfahrenskarte erhalten DateTimeType DateOnly:DateOnly
  ava_verfahrenskarteerhalten?: Date | null;
  // Verfahrenskarte gedruckt DateTimeType DateOnly:DateOnly
  ava_verfahrenskartegedruckt?: Date | null;
  // VQ BooleanType
  ava_vq?: boolean | null;
  // Wer hilft? StringType
  ava_whohelps?: string | null;
  // Impfwilligkeit gegeben BooleanType
  ava_willingnesstovaccinate?: boolean | null;
  // Geburtstag (Standard) DateTimeType Geben Sie das Geburtsdatum des Kontakts ein, um es in Kundengeschenkprogrammen oder anderer Kommunikation verwenden zu können. DateOnly:DateOnly
  birthdate?: Date | null;
  // Telefon (geschäftlich) 2 StringType Geben Sie eine zweite geschäftliche Telefonnummer für diesen Kontakt ein.
  business2?: string | null;
  // Visitenkarte MemoType Speichert Bild der Visitenkarte
  businesscard?: string | null;
  // BusinessCardAttributes StringType Speichert Geschäftskarten-Steuerungseigenschaften.
  businesscardattributes?: string | null;
  // Rückrufnummer StringType Geben Sie eine Rückruf-Telefonnummer für diesen Kontakt ein.
  callback?: string | null;
  // Namen der Kinder StringType Geben Sie die Namen der Kinder des Kontakts ein, damit diese bei der Kommunikation und im Rahmen von Kundenprogrammen zur Verfügung stehen.
  childrensnames?: string | null;
  // Telefonnummer des Unternehmens StringType Geben Sie die Telefonnummer des Unternehmens des Kontakts an.
  company?: string | null;
  // Kontakt UniqueidentifierType Eindeutiger Bezeichner des Kontakts.
  contactid?: import("dataverse-ify").Guid | null;
  // Erstellt von LookupType Zeigt, wer den Datensatz erstellt hat.
  createdby?: import("dataverse-ify").EntityReference | null;
  // Erstellt von (externe Partei) LookupType Zeigt die externe Partei, die den Datensatz erstellt hat.
  createdbyexternalparty?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdbyexternalpartyname?: string | null;
  //  StringType
  createdbyexternalpartyyominame?: string | null;
  //  StringType
  createdbyname?: string | null;
  //  StringType
  createdbyyominame?: string | null;
  // Erstellt am DateTimeType Zeigt Datum und Uhrzeit der Datensatzerstellung gemäß der Zeitzone, die in den Optionen von Microsoft Dynamics 365 ausgewählt wurde. DateAndTime:UserLocal
  createdon?: Date | null;
  // Erstellt von (Stellvertreter) LookupType Zeigt, wer den Datensatz im Auftrag eines anderen Benutzers erstellt hat.
  createdonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Kreditlimit MoneyType Geben Sie das Kreditlimit des Kontakts ein. Dies ist hilfreich bei der Bearbeitung von Rechnungs- und Buchungsproblemen mit dem Kunden.
  creditlimit?: number | null;
  // Kreditlimit (Basis) MoneyType Zeigt das Feld 'Kreditlimit', das für die Berichterstellung in die standardmäßige Basiswährung des Systems konvertiert wurde. Zur Berechnung wird der Wechselkurs aus dem Bereich 'Währungen' herangezogen.
  creditlimit_base?: number | null;
  // Kreditsperre BooleanType Wählen Sie aus, ob für den Kontakt eine Kreditsperre besteht. Dies ist hilfreich bei der Bearbeitung von Rechnungs- und Buchungsproblemen.
  creditonhold?: boolean | null;
  // Kundengröße contact_contact_customersizecode Wählen Sie die Größe des Unternehmens des Kontakts aus. Diese Angabe wird für die Segmentierung und bei der Berichterstellung verwendet.
  customersizecode?: import("../enums/contact_contact_customersizecode").contact_contact_customersizecode | null;
  // Geschäftsbeziehungstyp contact_contact_customertypecode Wählen Sie die Kategorie aus, die die Beziehung zwischen dem Kontakt und Ihrer Organisation am besten beschreibt.
  customertypecode?: import("../enums/contact_contact_customertypecode").contact_contact_customertypecode | null;
  // Preisliste LookupType Wählen Sie die standardmäßige Preisliste aus, die diesem Kontakt zugeordnet ist, um sicherzustellen, dass Verkaufschancen, Angebote und Aufträge die korrekten Produktpreise für diesen Kunden enthalten.
  defaultpricelevelid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  defaultpricelevelidname?: string | null;
  // Abteilung StringType Geben Sie die Abteilung oder Geschäftseinheit ein, in der der Kontakt innerhalb der übergeordneten Firma oder des übergeordneten Unternehmens tätig ist.
  department?: string | null;
  // Beschreibung MemoType Geben Sie zusätzliche beschreibende Informationen für den Kontakt ein (beispielsweise einen Auszug von der Website des Unternehmens).
  description?: string | null;
  // Massen-E-Mails nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt Massen-E-Mails im Rahmen von Marketing- oder Schnellkampagnen akzeptiert. Bei 'Nicht zulassen' kann der Kontakt zwar Marketinglisten hinzugefügt werden, ist aber vom E-Mail-Versand ausgenommen.
  donotbulkemail?: boolean | null;
  // Massensendungen nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt Massensendungen im Rahmen von Marketing- oder Schnellkampagnen akzeptiert. Bei 'Nicht zulassen' kann der Kontakt zwar Marketinglisten hinzugefügt werden, ist aber vom Postversand ausgenommen.
  donotbulkpostalmail?: boolean | null;
  // E-Mails nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt Direktmailing von Microsoft Dynamics 365 zulässt. Bei "Nicht zulassen" sendet Microsoft Dynamics 365 keine E-Mail.
  donotemail?: boolean | null;
  // Faxe nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt den Versand von Faxnachrichten zulässt. Bei 'Nicht zulassen' kann der Kontakt zwar Marketinglisten hinzugefügt werden, ist aber von Faxaktivitäten im Rahmen von Marketingkampagnen ausgenommen.
  donotfax?: boolean | null;
  // Telefonanrufe nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt Telefonanrufe zulässt. Bei 'Nicht zulassen' kann der Kontakt zwar Marketinglisten hinzugefügt werden, ist aber von Telefonanrufen im Rahmen von Marketingkampagnen ausgenommen.
  donotphone?: boolean | null;
  // Post nicht zulassen BooleanType Wählen Sie aus, ob der Kontakt adressierte Werbesendungen zulässt. Bei 'Nicht zulassen' kann der Kontakt zwar Marketinglisten hinzugefügt werden, ist aber von Briefaktivitäten im Rahmen von Marketingkampagnen ausgenommen.
  donotpostalmail?: boolean | null;
  // Marketingmaterial senden BooleanType Wählen Sie aus, ob der Kontakt Marketingmaterial wie Broschüren oder Kataloge akzeptiert. Kontakte, die sich dagegen entscheiden, können von Marketinginitiativen ausgeschlossen werden.
  donotsendmm?: boolean | null;
  // Bildung contact_contact_educationcode Wählen Sie den höchsten Bildungsgrad des Kontakts aus. Diese Angabe wird für die Segmentierung und Analyse verwendet.
  educationcode?: import("../enums/contact_contact_educationcode").contact_contact_educationcode | null;
  // E-Mail StringType Geben Sie die primäre E-Mail-Adresse für den Kontakt ein.
  emailaddress1?: string | null;
  // E-Mail-Adresse 2 StringType Geben Sie die sekundäre E-Mail-Adresse für den Kontakt ein.
  emailaddress2?: string | null;
  // E-Mail-Adresse 3 StringType Geben Sie eine alternative E-Mail-Adresse für den Kontakt ein.
  emailaddress3?: string | null;
  // Mitarbeiter StringType Geben Sie die Mitarbeiter-ID oder -nummer für den Kontakt zur Bezugnahme in Aufträgen, Serviceanfragen oder anderer Kommunikation mit der Organisation des Kontakts ein.
  employeeid?: string | null;
  // Bild der Entität ImageType Zeigt das Standardbild für den Datensatz.
  entityimage?: string | null;
  //  BigIntType
  entityimage_timestamp?: number | null;
  //  StringType
  entityimage_url?: string | null;
  // Bild-ID der Entität UniqueidentifierType Nur zur internen Verwendung.
  entityimageid?: import("dataverse-ify").Guid | null;
  // Wechselkurs DecimalType Zeigt den Wechselkurs der Währung des Datensatzes. Mithilfe des Wechselkurses werden alle Betragsfelder des Datensatzes aus der lokalen Währung in die Standardwährung des Systems konvertiert.
  exchangerate?: number | null;
  // Bezeichner für externen Benutzer StringType Bezeichner für einen externen Benutzer.
  externaluseridentifier?: string | null;
  // Zivilstand contact_contact_familystatuscode Wählen Sie den Familienstand des Kontakts aus, damit dieser bei nachbereitenden Telefonanrufen oder anderer Kommunikation zur Verfügung steht.
  familystatuscode?: import("../enums/contact_contact_familystatuscode").contact_contact_familystatuscode | null;
  // Fax StringType Geben Sie die Faxnummer für den Kontakt ein.
  fax?: string | null;
  // Vorname StringType Geben Sie den Vornamen des Kontakts ein, um sicherzustellen, dass in Verkaufsanrufen, E-Mails und Marketingkampagnen die korrekte Anrede verwendet wird.
  firstname?: string | null;
  // E-Mail-Aktivität folgen BooleanType Informationen darüber, ob das Verfolgen der E-Mail-Aktivität wie öffnen, Anhänge anzeigen und auf Links für E-Mails, die an den Kontakt gesendet wurden, klicken erlaubt ist.
  followemail?: boolean | null;
  // FTP-Site StringType Geben Sie die URL für die FTP-Site des Kontakts ein, damit Benutzer auf Daten zugreifen und Dokumente teilen können.
  ftpsiteurl?: string | null;
  // Vollständiger Name StringType Kombiniert und zeigt den Vor- und Nachnamen des Kontakts, sodass in Ansichten und Berichten der vollständige Name angezeigt werden kann.
  fullname?: string | null;
  // Geschlecht contact_contact_gendercode Wählen Sie das Geschlecht
  gendercode?: import("../enums/contact_contact_gendercode").contact_contact_gendercode | null;
  // Behörden und Ämter StringType Geben Sie die Ausweisnummer oder eine andere Behörden-ID für den Kontakt ein. Diese Angabe wird in Dokumenten oder Berichten verwendet.
  governmentid?: string | null;
  // Hat Kinder contact_contact_haschildrencode Wählen Sie aus, ob der Kontakt Kinder hat, damit diese Information bei nachbereitenden Telefonanrufen oder anderer Kommunikation zur Verfügung steht.
  haschildrencode?: import("../enums/contact_contact_haschildrencode").contact_contact_haschildrencode | null;
  // Telefon (privat) 2 StringType Geben Sie eine zweite private Telefonnummer für diesen Kontakt ein.
  home2?: string | null;
  // Importsequenznummer IntegerType Eindeutiger Bezeichner des Datenimports oder der Datenmigration, von dem/der dieser Datensatz erstellt wurde.
  importsequencenumber?: number | null;
  // Automatisch erstellt BooleanType Informationen dazu, ob der Kontakt automatisch beim Höherstufen einer E-Mail oder eines Termins erstellt wurde.
  isautocreate?: boolean | null;
  // Backofficekunde BooleanType Wählen Sie aus, ob der Kontakt in einem separaten Buchungssystem oder einem anderen System vorhanden ist (beispielsweise in Microsoft Dynamics GP oder einer anderen ERP-Datenbank). Diese Angabe wird in Integrationsprozessen verwendet.
  isbackofficecustomer?: boolean | null;
  //  BooleanType
  isprivate?: boolean | null;
  // Position StringType Geben Sie die Position des Kontakts ein, um sicherzustellen, dass in Verkaufsanrufen, E-Mails und Marketingkampagnen die korrekte Anrede verwendet wird.
  jobtitle?: string | null;
  // Nachname [Required] StringType Geben Sie den Nachnamen des Kontakts ein, um sicherzustellen, dass in Verkaufsanrufen, E-Mails und Marketingkampagnen die korrekte Anrede verwendet wird.
  lastname?: string;
  // Letzte Zeit der Zurückstellung DateTimeType Enthält den Datums- und Zeitstempel der letzten Zurückstellungszeit. DateAndTime:UserLocal
  lastonholdtime?: Date | null;
  // Letztes Datum in Kampagne DateTimeType Zeigt das Datum, an dem der Kontakt zuletzt Teil einer Marketing- oder Schnellkampagne war. DateOnly:UserLocal
  lastusedincampaign?: Date | null;
  // Leadursprung contact_contact_leadsourcecode Wählen Sie die primäre Marketingquelle aus, über die der Kontakt zu Ihrer Organisation gelangt ist.
  leadsourcecode?: import("../enums/contact_contact_leadsourcecode").contact_contact_leadsourcecode | null;
  // Manager StringType Geben Sie den Namen des Vorgesetzten des Kontakts ein. Dieser wird bei der Eskalierung von Problemen oder bei der nachbereitenden Kommunikation mit dem Kontakt verwendet.
  managername?: string | null;
  // Telefon (Manager) StringType Geben Sie die Telefonnummer des Vorgesetzten des Kontakts ein.
  managerphone?: string | null;
  // Nur Marketing BooleanType Gibt an, ob es nur zum Marketing dient.
  marketingonly?: boolean | null;
  //  StringType
  mastercontactidname?: string | null;
  //  StringType
  mastercontactidyominame?: string | null;
  // Master-ID LookupType Eindeutiger Bezeichner des Hauptkontakts zum Zusammenführen.
  masterid?: import("dataverse-ify").EntityReference | null;
  // Zusammengeführt BooleanType Zeigt, ob die Firma mit einem Hauptkontakt zusammengeführt wurde.
  merged?: boolean | null;
  // Zweiter Vorname StringType Geben Sie den zweiten Vornamen oder das Initial des Kontakts ein, um sicherzustellen, dass die korrekte Anrede verwendet wird.
  middlename?: string | null;
  // Mobiltelefon StringType Geben Sie die Mobiltelefonnummer für den Kontakt ein.
  mobilephone?: string | null;
  // Geändert von LookupType Zeigt, wer den Datensatz zuletzt aktualisiert hat.
  modifiedby?: import("dataverse-ify").EntityReference | null;
  // Geändert von (externe Partei) LookupType Zeigt die externe Partei, die den Datensatz geändert hat.
  modifiedbyexternalparty?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedbyexternalpartyname?: string | null;
  //  StringType
  modifiedbyexternalpartyyominame?: string | null;
  //  StringType
  modifiedbyname?: string | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // Geändert am DateTimeType Datum und Uhrzeit der letzten Datensatzaktualisierung gemäß der Zeitzone, die in den Optionen von Microsoft Dynamics 365 ausgewählt wurde. DateAndTime:UserLocal
  modifiedon?: Date | null;
  // Geändert von (Stellvertreter) LookupType Zeigt, wer den Datensatz im Auftrag eines anderen Benutzers zuletzt aktualisiert hat.
  modifiedonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // Verwaltung Partner LookupType Eindeutiger Bezeichner für das Konto, das dem Kontakt zugeordnet ist.
  msa_managingpartnerid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msa_managingpartneridname?: string | null;
  //  StringType
  msa_managingpartneridyominame?: string | null;
  // Institution LookupType Zugeordnete Firmennummer des Kontakts
  msdyn_accountnumber?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_accountnumbername?: string | null;
  //  StringType
  msdyn_accountnumberyominame?: string | null;
  // Unternehmen LookupType Unternehmen
  msdyn_company?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_companyname?: string | null;
  // Kontakt für StringType Gibt an, ob der Kontakt für den Kunden erstellt wird
  msdyn_contactfor?: string | null;
  // Kontakt für Lieferant BooleanType Angeben, ob der Kontakt für den Lieferanten erstellt wird
  msdyn_contactforvendor?: boolean | null;
  // KPI LookupType Zugeordnet zu den Kontakt-KPI-Datensätzen
  msdyn_contactkpiid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_contactkpiidname?: string | null;
  // Kontaktnummer StringType Kontaktnummer eingeben
  msdyn_contactnumber?: string | null;
  // Firmennummer/Kennung der Kontaktperson StringType Dies ist ein automatisch generierter Wert, mit dem CDS und F&O synchronisiert werden. Er ordnet die Spalte „CustomerAccount “ aus der Tabelle „CustCustomersV3“ in F&O zu. Er wird auch der Kennung der Kontaktperson in smmContactPersonCDSV2Entity zugeordnet.
  msdyn_contactpersonid?: string | null;
  // Debitorengruppen-ID LookupType ID-Wert der Kundengruppe nur für verkäufliche Kontakte.
  msdyn_customergroupid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_customergroupidname?: string | null;
  // Zahlungsmethode für Debitoren LookupType Die Zahlungsmethode für Kunden, die dem Kontakt zugeordnet ist. Diese Spalte verweist auf die PaymentMethod-Spalte in CustomerV3ContactEntity in F&O.
  msdyn_customerpaymentmethod?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_customerpaymentmethodname?: string | null;
  // Beschriftungen von Entscheidungsbeeinflussung contact_contact_msdyn_decisioninfluencetag Kaufeinfluss mithilfe von Beschriftungen angeben
  msdyn_decisioninfluencetag?: import("../enums/contact_contact_msdyn_decisioninfluencetag").contact_contact_msdyn_decisioninfluencetag | null;
  // Web-Überwachung deaktivieren BooleanType Gibt an, dass der Kontakt sich für Webnachverfolgung entschieden hat.
  msdyn_disablewebtracking?: boolean | null;
  // E-Mail-Beschreibung StringType Die Beschreibung des Werts für E-Mail-Adresse 1 für den Kontakt. Diese Spalte verweist auf PrimaryContactEmailDescription in CustCustomerV3Entity in F&O.
  msdyn_emailaddress1description?: string | null;
  // Faxbeschreibung StringType Die Beschreibung der Faxnummer für den Kontakt. Diese Spalte verweist auf PrimaryContactFaxDescription in CustCustomerV3Entity in F&O.
  msdyn_faxdescription?: string | null;
  // Faxdurchwahl StringType Die der Faxnummer zugewiesene Faxdurchwahl in der Kontakttabelle. Diese Spalte verweist auf die PrimaryContactFaxExtensions-Spalte in CustCustomerV3Entity in F&O.
  msdyn_faxextension?: string | null;
  // DSGVO-Optout BooleanType Beschreibt, ob Kontakt ausgeschlossen ist oder nicht
  msdyn_gdproptout?: boolean | null;
  // Ausweisnummer StringType Die Kennnummer zur staatlichen Erkennung für den Kontakt. Diese Spalte verweist auf die IdentificationNumber-Spalte in CustCustomerv3Entity in F&O.
  msdyn_identificationnumber?: string | null;
  // Ist Assistent BooleanType Beschreibt, ob der Kontakt ein Assistent im Organigramm ist
  msdyn_isassistantinorgchart?: boolean | null;
  // Ist minderjährig BooleanType Gibt an, dass der Kontakt in der entsprechenden Rechtsprechung als minderjährig gilt.
  msdyn_isminor?: boolean | null;
  // Ist minderjährig, mit Zustimmung der Eltern BooleanType Gibt an, dass der Kontakt in der entsprechenden Rechtsprechung als minderjährig gilt und die Zustimmung der Eltern vorliegt.
  msdyn_isminorwithparentalconsent?: boolean | null;
  // Ist Kreditor BooleanType Gibt an, ob der Kontakt ein Kreditor vom Typ „Person“ ist
  msdyn_isvendor?: boolean | null;
  // Sprache msdyn_language
  msdyn_language?: import("../enums/msdyn_language").msdyn_language | null;
  // Verknüpftes Lieferantenkonto LookupType Verknüpftes Kreditorenkonto in der Kreditorentabelle
  msdyn_linkedvendoraccount?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_linkedvendoraccountname?: string | null;
  // Kennzeichen für „Nicht bei Unternehmen“ contact_contact_msdyn_orgchangestatus Ob der Kontakt zur zugeordneten Firma gehört oder nicht
  msdyn_orgchangestatus?: import("../enums/contact_contact_msdyn_orgchangestatus").contact_contact_msdyn_orgchangestatus | null;
  // Land der Partei StringType Der Wert für das Land der Partei, der in der Kontakttabelle zur staatlichen Erkennung dient. Diese Spalte verweist auf die PartyCountry-Spalte in CustCustomerv3Entity in F&O.
  msdyn_partycountry?: string | null;
  // Parteinummer [Required] StringType Parteinummer des Kontakts
  msdyn_partynumber?: string;
  // Bundesland/Kanton der Partei StringType Bundesland/Kanton der Partei zur staatlichen Erkennung im Kontakt. Diese Spalte verweist auf die PartyState-Spalte in CustCustomerv3Entity in F&O.
  msdyn_partystateprovince?: string | null;
  // Zahlungstag LookupType Die Tabelle des Zahlungstags, die dem Kontakt zugeordnet ist. Diese Spalte verweist auf die PaymentDay-Spalte in CustomerV3ContactEntity in F&O.
  msdyn_paymentday?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_paymentdayname?: string | null;
  // Zahlungsplan LookupType Der Zahlungsplan, der dem Kontakt zugeordnet ist. Diese Spalte verweist auf die PaymentSchedule-Spalte in CustomerV3ContactEntity in F&O.
  msdyn_paymentschedule?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_paymentschedulename?: string | null;
  // Zahlungsbedingungen LookupType Standardmäßige Zahlungsbedingungen des Kreditors
  msdyn_paymentterms?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_paymenttermsname?: string | null;
  // Vereinbarungsdatum zu Portalnutzungsbedingungen DateTimeType Gibt Datum und Uhrzeit an, zu der die Person den Portal-Bestimmungen zugestimmt hat. DateAndTime:UserLocal
  msdyn_portaltermsagreementdate?: Date | null;
  // Beschreibung des primären Facebook StringType Die Beschreibung der primären Facebook-ID für den Kontakt. Diese Spalte verweist auf PrimaryContactFacebookDescription in CustCustomerV3Entity in F&O.
  msdyn_primaryfacebookdescription?: string | null;
  // Primäre Facebook-ID StringType Die primäre Facebook-ID für den Kontakt. Diese Spalte verweist auf die PrimaryContactFacebook-Spalte in CustCustomerV3Entity in F&O.
  msdyn_primaryfacebookid?: string | null;
  // Primäre LinkedIn-ID StringType Die primäre LinkedIn-ID für das Konto. Diese Spalte verweist auf die PrimaryContactLinkedIn-Spalte in CustCustomerV3Entity in F&O.
  msdyn_primaryinkedinid?: string | null;
  // Beschreibung des primären LinkedIn StringType Die Beschreibung des primären LinkedIn-Werts für den Kontakt. Diese Spalte verweist auf PrimaryContactLinkedInDescription in CustCustomerV3Entity in F&O.
  msdyn_primarylinkedindescrption?: string | null;
  // Primäre Zeitzone IntegerType Gibt die primäre Zeitzone an, in der der Kontakt arbeitet.
  msdyn_primarytimezone?: number | null;
  // Primäre Twitter-ID StringType Die primäre Twitter-ID für den Kontakt. Diese Spalte verweist auf die PrimaryContactTwitter-Spalte in der CustCustomerV3entity in F&O.
  msdyn_primarytwitterid?: string | null;
  // Beschreibung der primären Twitter-ID StringType Die Beschreibung der primären Twitter-ID für den Kontakt. Diese Spalte verweist auf PrimaryContactTwitterDescription in CustCustomerV3Entity in F&O.
  msdyn_primarytwitteriddescription?: string | null;
  // Mehrwertsteuergruppe LookupType Eindeutiger Bezeichner für die Steuergruppe, die dem Kontakt zugeordnet ist.
  msdyn_salestaxgroup?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_salestaxgroupname?: string | null;
  // Segment-ID LookupType Eindeutiger Bezeichner für das Segment, das contact zugeordnet ist.
  msdyn_segmentid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_segmentidname?: string | null;
  // Ist Kunde BooleanType Gibt an, ob der Kontakt verkäuflich oder ein Kunde vom Typ „Person“ ist
  msdyn_sellable?: boolean | null;
  // Beschreibung des Telefons StringType Die Beschreibung des Werts für Telefon 1 für den Kontakt. Diese Spalte verweist auf PrimaryContactPhoneDescription in CustCustomerV3Entity in F&O.
  msdyn_telephone1description?: string | null;
  // Telefondurchwahl StringType Die Durchwahl für Telefon 1 für den Kontakt. Diese Spalte verweist auf PrimaryContactPhoneExtension in CustCustomerV3Entity in F&O.
  msdyn_telephone1extension?: string | null;
  // Kreditorenkonto LookupType Eindeutiger Bezeichner für den Kreditor, der dem Kontakt zugeordnet ist.
  msdyn_vendorcontactid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_vendorcontactidname?: string | null;
  // Von Workflow erstellter Lieferant BooleanType Gibt an, ob der Kreditor vom Typ „Person“ durch einen Workflow erstellt wird
  msdyn_vendorcreatedbyworkflow?: boolean | null;
  // Kreditorengruppe LookupType Kreditorengruppe, die dem Kreditor zugeordnet ist
  msdyn_vendorgroup?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_vendorgroupname?: string | null;
  // Zahlungsmethode LookupType Zahlungsmethode für den Kreditor
  msdyn_vendorpaymentmethod?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msdyn_vendorpaymentmethodname?: string | null;
  // Beschreibung der Website StringType Die Beschreibung der Website-URL für den Kontakt. Diese Spalte verweist auf PrimaryContactURLDescription in CustCustomerV3Entity in F&O.
  msdyn_websiteurldescription?: string | null;
  // msft_DataState msft_datastate
  msft_datastate?: import("../enums/msft_datastate").msft_datastate | null;
  // Bevorzugte Sprache powerpagelanguages Die bevorzugte Portalsprache des Benutzers
  mspp_userpreferredlcid?: import("../enums/powerpagelanguages").powerpagelanguages | null;
  // Spitzname StringType Geben Sie den Spitznamen des Kontakts ein.
  nickname?: string | null;
  // Anzahl der Kinder IntegerType Geben Sie die Anzahl der Kinder des Kontakts ein, damit diese bei nachbereitenden Telefonanrufen oder anderer Kommunikation zur Verfügung steht.
  numberofchildren?: number | null;
  // Zeit der Zurückstellung (Minuten) IntegerType Die Dauer der Zurückstellung des Datensatzes in Minuten.
  onholdtime?: number | null;
  // Ursprungslead LookupType Zeigt den Lead an, auf dessen Grundlage der Kontakt erstellt wurde (sofern der Kontakt durch die Konvertierung eines Leads in Microsoft Dynamics 365 erstellt wurde). Wird verwendet, um den Kontakt für die Berichterstellung und Analyse mit Daten des ursprünglichen Leads zu verknüpfen.
  originatingleadid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  originatingleadidname?: string | null;
  //  StringType
  originatingleadidyominame?: string | null;
  // Datensatz erstellt am DateTimeType Datum und Uhrzeit der Migration des Datensatzes. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Besitzer OwnerType Geben Sie den Benutzer oder das Team ein, der bzw. das mit der Verwaltung des Datensatzes betraut ist. Dieses Feld wird aktualisiert, wenn der Datensatz einem anderen Benutzer zugewiesen wird.
  ownerid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  owneridname?: string | null;
  //  EntityNameType
  owneridtype?: string | null;
  //  StringType
  owneridyominame?: string | null;
  // Besitzer (Unternehmenseinheit) LookupType Eindeutiger Bezeichner der Unternehmenseinheit, die im Besitz des Kontakts ist.
  owningbusinessunit?: import("dataverse-ify").EntityReference | null;
  //  StringType
  owningbusinessunitname?: string | null;
  // Besitzer (Team) LookupType Eindeutiger Bezeichner des Teams, das im Besitz des Kontakts ist.
  owningteam?: import("dataverse-ify").EntityReference | null;
  // Besitzer (Benutzer) LookupType Eindeutiger Bezeichner des Benutzers, der im Besitz des Kontakts ist.
  owninguser?: import("dataverse-ify").EntityReference | null;
  // Pager StringType Geben Sie die Pagernummer für den Kontakt ein.
  pager?: string | null;
  // parent_contactid LookupType For internal use only
  parent_contactid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  parent_contactidname?: string | null;
  //  StringType
  parent_contactidyominame?: string | null;
  // Übergeordneter Kontakt LookupType Eindeutiger Bezeichner des übergeordneten Kontakts.
  parentcontactid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  parentcontactidname?: string | null;
  //  StringType
  parentcontactidyominame?: string | null;
  // Customer CustomerType Wählen Sie die übergeordnete Firma oder den übergeordneten Kontakt für den Kontakt aus, um eine direkte Verknüpfung mit zusätzlichen Details wie Finanzinformationen, Aktivitäten und Verkaufschancen bereitzustellen.
  parentcustomerid?: import("dataverse-ify").EntityReference | null;
  //  [Required] StringType
  parentcustomeridname?: string;
  // Übergeordneter Kundentyp EntityNameType
  parentcustomeridtype?: string | null;
  //  [Required] StringType
  parentcustomeridyominame?: string;
  // Nimmt an Workflow teil BooleanType Zeigt, ob der Kontakt an Workflowregeln beteiligt ist.
  participatesinworkflow?: boolean | null;
  // Zahlungsbedingungen contact_contact_paymenttermscode Wählen Sie die Zahlungsbedingungen aus, um anzugeben, wann der Kunde den Gesamtbetrag bezahlen muss.
  paymenttermscode?: import("../enums/contact_contact_paymenttermscode").contact_contact_paymenttermscode | null;
  // Bevorzugter Tag contact_contact_preferredappointmentdaycode Wählen Sie den bevorzugten Wochentag für Servicetermine aus.
  preferredappointmentdaycode?: import("../enums/contact_contact_preferredappointmentdaycode").contact_contact_preferredappointmentdaycode | null;
  // Bevorzugte Zeit contact_contact_preferredappointmenttimecode Wählen Sie die bevorzugte Tageszeit für Servicetermine aus.
  preferredappointmenttimecode?: import("../enums/contact_contact_preferredappointmenttimecode").contact_contact_preferredappointmenttimecode | null;
  // Bevorzugte Kontaktmethode contact_contact_preferredcontactmethodcode Wählen Sie die bevorzugte Kontaktmethode aus.
  preferredcontactmethodcode?: import("../enums/contact_contact_preferredcontactmethodcode").contact_contact_preferredcontactmethodcode | null;
  // Bevorzugter Raum/Bevorzugtes Arbeitsgerät LookupType Wählen Sie die bevorzugte Serviceeinrichtung oder das bevorzugte Arbeitsgerät des Kontakts aus, um eine korrekte Serviceplanung für den Kunden sicherzustellen.
  preferredequipmentid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  preferredequipmentidname?: string | null;
  // Bevorzugter Service LookupType Wählen Sie den bevorzugten Service des Kontakts aus, um eine korrekte Serviceplanung für den Kunden sicherzustellen.
  preferredserviceid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  preferredserviceidname?: string | null;
  // Bevorzugter Benutzer LookupType Wählen Sie den regulären oder bevorzugten Kundenservicemitarbeiter zur Bezugnahme bei der Planung von Serviceaktivitäten für den Kontakt aus.
  preferredsystemuserid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  preferredsystemuseridname?: string | null;
  //  StringType
  preferredsystemuseridyominame?: string | null;
  // Prozess UniqueidentifierType Zeigt die ID des Prozesses.
  processid?: import("dataverse-ify").Guid | null;
  // Anrede StringType Geben Sie die Anrede für den Kontakt ein, um sicherzustellen, dass in Verkaufsanrufen, E-Mails und Marketingkampagnen die korrekte Anrede verwendet wird.
  salutation?: string | null;
  // Versandmethode contact_contact_shippingmethodcode Wählen Sie eine Versandmethode für Lieferungen an diese Adresse aus.
  shippingmethodcode?: import("../enums/contact_contact_shippingmethodcode").contact_contact_shippingmethodcode | null;
  // SLA LookupType Wählen Sie die Vereinbarung zum Servicelevel (Service Level Agreement, SLA) aus, die Sie auf den Kontaktdatensatz anwenden möchten.
  slaid?: import("dataverse-ify").EntityReference | null;
  // Letzte angewendete SLA LookupType Die letzte auf diese Anfrage angewendete SLA. Dieses Feld dient nur zur internen Verwendung.
  slainvokedid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  slainvokedidname?: string | null;
  //  StringType
  slaname?: string | null;
  // Name des Ehepartners/der Ehepartnerin StringType Geben Sie den Namen des (Ehe-)Partners des Kontakts ein, damit dieser bei Telefonanrufen, Veranstaltungen oder bei anderer Kommunikation mit dem Kontakt zur Verfügung steht.
  spousesname?: string | null;
  // (Veraltet) Prozessphase UniqueidentifierType Zeigt die ID der Phase.
  stageid?: import("dataverse-ify").Guid | null;
  // Status contact_contact_statecode Zeigt, ob der Kontakt aktiv oder inaktiv ist. Inaktive Kontakte sind schreibgeschützt und können erst nach ihrer Reaktivierung bearbeitet werden.
  statecode?: import("../enums/contact_contact_statecode").contact_contact_statecode | null;
  // Statusgrund contact_contact_statuscode Wählen Sie den Status des Kontakts aus.
  statuscode?: import("../enums/contact_contact_statuscode").contact_contact_statuscode | null;
  // Abonnement UniqueidentifierType Nur zur internen Verwendung.
  subscriptionid?: import("dataverse-ify").Guid | null;
  // Suffix StringType Geben Sie das Suffix für den Namen des Kontakts (beispielsweise 'Jr.' oder 'Sr.') ein, um sicherzustellen, dass in Verkaufsanrufen, E-Mails und Marketingkampagnen die korrekte Anrede verwendet wird.
  suffix?: string | null;
  // TeamsFollowed IntegerType Die Anzahl der Benutzer oder Unterhaltungen, die dem Datensatz folgen
  teamsfollowed?: number | null;
  // Telefon (geschäftlich) StringType Geben Sie die Haupttelefonnummer für diesen Kontakt ein.
  telephone1?: string | null;
  // Telefon (privat) StringType Geben Sie eine zweite Telefonnummer für diesen Kontakt ein.
  telephone2?: string | null;
  // Telefon 3 StringType Geben Sie eine dritte Telefonnummer für diesen Kontakt ein.
  telephone3?: string | null;
  // Gebiet contact_contact_territorycode Wählen Sie zu Segmentierungs- und Analysezwecken eine Region oder ein Gebiet für den Kontakt aus.
  territorycode?: import("../enums/contact_contact_territorycode").contact_contact_territorycode | null;
  // Von mir aufgewendete Zeit StringType Von mir aufgewendete Gesamtzeit für E-Mails (lesen und schreiben) und Meetings in Bezug auf den Kontaktdatensatz
  timespentbymeonemailandmeetings?: string | null;
  // Versionsnummer der Zeitzonenregel IntegerType Nur zur internen Verwendung.
  timezoneruleversionnumber?: number | null;
  // Währung LookupType Wählen Sie die lokale Währung für den Datensatz aus, um sicherzustellen, dass Budgets in der korrekten Währung ausgewiesen werden.
  transactioncurrencyid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  transactioncurrencyidname?: string | null;
  // (Veraltet) Durchlaufener Pfad StringType Nur zur internen Verwendung.
  traversedpath?: string | null;
  // Zeitzonencode für die UTC-Konvertierung IntegerType Zeitzonencode, der bei Erstellung des Datensatzes verwendet wurde.
  utcconversiontimezonecode?: number | null;
  // Versionsnummer BigIntType Versionsnummer des Kontakts.
  versionnumber?: number | null;
  // Website StringType Geben Sie die URL für die berufliche oder private Website oder den Blog des Kontakts ein.
  websiteurl?: string | null;
  // Yomi - Vorname StringType Geben Sie bei Angabe in japanischer Sprache die phonetische Schreibweise des Vornamens des Kontakts ein, um sicherzustellen, dass der Name bei Telefongesprächen mit dem Kontakt korrekt ausgesprochen wird.
  yomifirstname?: string | null;
  // Yomi - Vollständiger Name StringType Zeigt den kombinierten Vor- und Nachnamen (Yomi) des Kontakts, sodass in Ansichten und Berichten der volle phonetische Name angezeigt werden kann.
  yomifullname?: string | null;
  // Yomi-Nachname StringType Geben Sie bei Angabe in japanischer Sprache die phonetische Schreibweise des Nachnamens des Kontakts ein, um sicherzustellen, dass der Name bei Telefongesprächen mit dem Kontakt korrekt ausgesprochen wird.
  yomilastname?: string | null;
  // Yomi - Weitere Vornamen StringType Geben Sie bei Angabe in japanischer Sprache die phonetische Schreibweise des zweiten Vornamens des Kontakts ein, um sicherzustellen, dass der Name bei Telefongesprächen mit dem Kontakt korrekt ausgesprochen wird.
  yomimiddlename?: string | null;
}
