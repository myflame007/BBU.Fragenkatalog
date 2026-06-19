# Fragenkatalog

┌─────────────────────────────────────────┐
│         App.tsx (Root)                   │
│  - State Management (Admin/Started)      │
│  - useWizard Hook                        │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
    ┌───▼────┐   ┌───▼────────┐
    │ Wizard │   │ AdminCenter │
    │ Flow   │   │ (Konfigur.) │
    └────┬───┘   └─────────────┘
         │
    ┌────▼────────────────────┐
    │  Question Renderer      │
    │  - Input Handling       │
    │  - Answer Processing    │
    └────┬────────────────────┘
         │
    ┌────┴─────────────────────────┐
    │   Services (Logik)           │
    │ - flowEngine (Navigation)     │
    │ - assessmentEngine (Regeln)   │
    │ - progressService (Fortschritt)
    │ - crmService (Daten)          │
    └──────────────────────────────┘
