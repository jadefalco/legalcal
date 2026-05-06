// Auto-generated from /data/authority/ JSON files
// Do not edit manually. Run: npm run ingest:authority

import type { LegalRuleBlock } from "@/data/authority/schema";

const authorityBundle: Record<string, Record<string, LegalRuleBlock>> = {
  "deposit-return": {
    "ak": {
      "data": {
        "returnDeadline": {
          "standard": 14,
          "special": [
            "30 days if deductions are taken"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover up to 2x the deposit for wrongful withholding"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear",
          "Costs of tenant's failure to comply with lease"
        ]
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.070",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No interest required unless lease specifies."
        ]
      }
    },
    "al": {
      "data": {
        "returnDeadline": 60,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may sue for damages if deposit not returned on time"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond ordinary wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written itemized list of deductions."
        ]
      }
    },
    "ar": {
      "data": {
        "returnDeadline": 60,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-16-305",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written notice of deductions within 60 days."
        ]
      }
    },
    "az": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may sue for amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear",
          "Other expenses from lease violations"
        ]
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1321",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required if any deductions taken."
        ]
      }
    },
    "ca": {
      "data": {
        "returnDeadline": {
          "standard": 21,
          "special": []
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Up to 2x the deposit amount for bad-faith withholding"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond ordinary wear and tear",
          "Cleaning to restore to same level of cleanliness"
        ]
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1950.5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement with receipts.",
          "Local rent control may impose additional rules."
        ]
      }
    },
    "co": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "72 hours for emergency walk-through if agreed"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover up to 3x the deposit plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-103",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written itemized statement within 30 days."
        ]
      }
    },
    "ct": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "15 days for interest-only return if no deductions"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Double damages for improper withholding"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must pay interest on deposits held more than 1 year in some municipalities."
        ]
      }
    },
    "de": {
      "data": {
        "returnDeadline": 20,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld plus costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5514",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "One of the shortest return deadlines in the country."
        ]
      }
    },
    "fl": {
      "data": {
        "returnDeadline": {
          "standard": 15,
          "special": [
            "30 days if landlord intends to impose a claim"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus court costs and attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.49",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If landlord fails to provide notice within 30 days, they forfeit right to claim deductions."
        ]
      }
    },
    "ga": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may sue for amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear",
          "Abandonment damages"
        ]
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-34",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory requirement for itemized statement, but strongly recommended."
        ]
      }
    },
    "hi": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-44",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written notice of deductions within 14 days."
        ]
      }
    },
    "ia": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Written itemized statement required within 30 days."
        ]
      }
    },
    "id": {
      "data": {
        "returnDeadline": 21,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-321",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required if deductions are taken."
        ]
      }
    },
    "il": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "45 days if tenant disputes deductions"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "765 ILCS 710/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Chicago Residential Landlord and Tenant Ordinance provides additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "returnDeadline": 45,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus court costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-3-12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement of deductions."
        ]
      }
    },
    "ks": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover 1.5x the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2550",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written notice of deductions."
        ]
      }
    },
    "ky": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "60 days if tenant disputes deductions"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.580",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory interest requirement."
        ]
      }
    },
    "la": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3251",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required if deductions taken."
        ]
      }
    },
    "ma": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": true,
        "interestRate": 0.05,
        "penalties": [
          "3x damages for wrongful withholding plus attorney fees and costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Interest must be paid annually or at termination, whichever comes first.",
          "Rate is 5% per year or bank savings rate, whichever is lower."
        ]
      }
    },
    "md": {
      "data": {
        "returnDeadline": 45,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover up to 3x the deposit plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-203",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Some counties require interest on deposits."
        ]
      }
    },
    "me": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld plus costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6033",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written itemized statement."
        ]
      }
    },
    "mi": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.609",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "mn": {
      "data": {
        "returnDeadline": 21,
        "interestRequired": true,
        "interestRate": 0.01,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages up to $500"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.178",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Interest required on deposits held more than 1 year at 1% per year."
        ]
      }
    },
    "mo": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "ms": {
      "data": {
        "returnDeadline": 45,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required if deductions taken."
        ]
      }
    },
    "mt": {
      "data": {
        "returnDeadline": 10,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-25-202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "One of the shortest return deadlines in the country at 10 days."
        ]
      }
    },
    "nc": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-52",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 30 days."
        ]
      }
    },
    "nd": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "ne": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1416",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 14 days."
        ]
      }
    },
    "nh": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written itemized statement."
        ]
      }
    },
    "nj": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld plus attorney fees and costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-21.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must deposit funds in an insured bank account and notify tenant of location."
        ]
      }
    },
    "nm": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-18",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 30 days."
        ]
      }
    },
    "nv": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.242",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 30 days."
        ]
      }
    },
    "ny": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "N.Y. Gen. Oblig. Law § 7-108",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "NYC requires deposits to be placed in interest-bearing accounts for buildings with 6+ units."
        ]
      }
    },
    "oh": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.16",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must pay interest on deposits held more than 6 months if 3+ units."
        ]
      }
    },
    "ok": {
      "data": {
        "returnDeadline": 45,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 45 days."
        ]
      }
    },
    "or": {
      "data": {
        "returnDeadline": 31,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 31 days."
        ]
      }
    },
    "pa": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "ri": {
      "data": {
        "returnDeadline": 20,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 20 days."
        ]
      }
    },
    "sc": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-410",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 30 days."
        ]
      }
    },
    "sd": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-24",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 14 days."
        ]
      }
    },
    "tn": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "7 days to inspect and provide notice of damages"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-301",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 30 days and notify tenant of right to inspect."
        ]
      }
    },
    "tx": {
      "data": {
        "returnDeadline": 30,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees and $100"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.103",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord is not required to provide itemized statement unless tenant requests it."
        ]
      }
    },
    "ut": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "15 days if tenant provides forwarding address"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus $100"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Utah Code § 57-17-3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Deposit must be returned within 15 days if tenant provides forwarding address."
        ]
      }
    },
    "va": {
      "data": {
        "returnDeadline": 45,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1226",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 45 days."
        ]
      }
    },
    "vt": {
      "data": {
        "returnDeadline": 14,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus attorney fees"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4461",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 14 days."
        ]
      }
    },
    "wa": {
      "data": {
        "returnDeadline": 21,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus court costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 21 days."
        ]
      }
    },
    "wi": {
      "data": {
        "returnDeadline": 21,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover twice the amount wrongfully withheld plus attorney fees and costs"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.28",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement within 21 days."
        ]
      }
    },
    "wv": {
      "data": {
        "returnDeadline": 60,
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld plus damages"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6A-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Itemized statement required within 60 days."
        ]
      }
    },
    "wy": {
      "data": {
        "returnDeadline": {
          "standard": 30,
          "special": [
            "15 days if no deductions, 60 days if tenant disputes"
          ]
        },
        "interestRequired": false,
        "interestRate": null,
        "penalties": [
          "Tenant may recover amount wrongfully withheld"
        ],
        "allowableDeductions": [
          "Unpaid rent",
          "Damage beyond normal wear and tear"
        ]
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide itemized statement if deductions are taken."
        ]
      }
    }
  },
  "duplicate-receipt": {
    "ak": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "al": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-161",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alabama has no statutory requirement for landlords to provide duplicate receipts."
        ]
      }
    },
    "ar": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-17-701",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "az": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address"
        ]
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts must be provided upon tenant request without fee."
        ]
      }
    },
    "ca": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "payment method",
          "property address"
        ]
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1499",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "California requires landlords to provide duplicate receipts upon request at no charge."
        ]
      }
    },
    "co": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-105",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts must be provided upon tenant request without fee."
        ]
      }
    },
    "ct": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Immediately upon request",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-3a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts promptly upon tenant request."
        ]
      }
    },
    "de": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5107",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts must be provided upon tenant request without fee."
        ]
      }
    },
    "fl": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords should provide duplicate receipts upon tenant request."
        ]
      }
    },
    "ga": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "hi": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Immediately upon request",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts promptly upon tenant request."
        ]
      }
    },
    "ia": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "id": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Idaho Code § 55-307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "il": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "765 ILCS 730/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge.",
          "Chicago has additional local requirements."
        ]
      }
    },
    "in": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "ks": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2570",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "ky": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.190",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "la": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3258",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Louisiana has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "ma": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "md": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request without fee."
        ]
      }
    },
    "me": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address"
        ]
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "mi": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.607",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "mn": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "mo": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "ms": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "mt": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-301",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Montana has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "nc": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "nd": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Dakota has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "ne": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1417",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "nh": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "nj": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-26",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "nm": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "nv": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.230",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "ny": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Immediately upon request",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address",
          "period covered"
        ]
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-e",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts promptly upon tenant request.",
          "NYC has strict enforcement."
        ]
      }
    },
    "oh": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.04",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "ok": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 113",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "or": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.260",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "pa": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "ri": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address"
        ]
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-18",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "sc": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-770",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "sd": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "tn": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "tx": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas has no statutory requirement for landlords to provide duplicate receipts."
        ]
      }
    },
    "ut": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-4",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "va": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "vt": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name",
          "property address"
        ]
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4454",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide duplicate receipts upon tenant request at no charge."
        ]
      }
    },
    "wa": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.140",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "wi": {
      "data": {
        "tenantRightToCopy": true,
        "landlordMustProvide": true,
        "timeframe": "Within a reasonable time",
        "allowedFee": 0,
        "requiredFields": [
          "amount paid",
          "date",
          "tenant name"
        ]
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Duplicate receipts should be provided upon tenant request without fee."
        ]
      }
    },
    "wv": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia has no statutory requirement for duplicate receipts."
        ]
      }
    },
    "wy": {
      "data": {
        "tenantRightToCopy": false,
        "landlordMustProvide": false,
        "timeframe": "Not required",
        "allowedFee": null,
        "requiredFields": []
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1205",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming has no statutory requirement for duplicate receipts."
        ]
      }
    }
  },
  "entry-notice": {
    "ak": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "24-hour notice required even on weekends"
        ]
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.140",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may not unreasonably withhold consent."
        ]
      }
    },
    "al": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "48-hour notice applies every day of the week"
        ]
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide at least 48 hours notice before entry."
        ]
      }
    },
    "ar": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-16-306",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice is required; typically interpreted as 24 hours."
        ]
      }
    },
    "az": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1343",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give 2 days notice except in emergencies."
        ]
      }
    },
    "ca": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "24 hours applies even on weekends and holidays"
        ]
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1954",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may only enter during normal business hours (8am–5pm).",
          "Local rent control may impose additional requirements."
        ]
      }
    },
    "co": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-504",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide reasonable notice; 48 hours is standard."
        ]
      }
    },
    "ct": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-16",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "de": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5509",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give 48 hours notice except in emergencies."
        ]
      }
    },
    "fl": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.53",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may enter for repairs, inspection, or showings with reasonable notice."
        ]
      }
    },
    "ga": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-34",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia does not specify exact notice hours; 24 hours is common practice."
        ]
      }
    },
    "hi": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "48-hour notice applies even on weekends"
        ]
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-53",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide reasonable notice; 48 hours is standard."
        ]
      }
    },
    "ia": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give reasonable notice; 24 hours is standard."
        ]
      }
    },
    "id": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-321",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "il": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "765 ILCS 705/0.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Chicago Residential Landlord and Tenant Ordinance requires 2 days notice for entry."
        ]
      }
    },
    "in": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-5-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "ks": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2557",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "ky": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.615",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give reasonable notice; 24 hours is standard."
        ]
      }
    },
    "la": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3251",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "ma": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "24-hour notice applies even on weekends"
        ]
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may only enter at reasonable times with reasonable notice."
        ]
      }
    },
    "md": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "me": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6025",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "mi": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.613",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "mn": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.211",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "mo": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "ms": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-25",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "mt": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-312",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "nc": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-44",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "nd": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07.3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "ne": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1423",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "nh": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "nj": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-28",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "nm": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-24",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "nv": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.330",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "ny": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": [
          "NYC requires 24 hours regardless of weekend or holiday"
        ]
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "NYC has specific rules requiring notice for most entries.",
          "Local ordinances may impose additional restrictions."
        ]
      }
    },
    "oh": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.04",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "ok": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 128",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "or": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.322",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give 24 hours notice except in emergencies."
        ]
      }
    },
    "pa": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.505",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies.",
          "Philadelphia may have additional local rules."
        ]
      }
    },
    "ri": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-26",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give reasonable notice; 48 hours is standard."
        ]
      }
    },
    "sc": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-530",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "sd": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "tn": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-403",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required; typically 24 hours."
        ]
      }
    },
    "tx": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.0081",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give reasonable notice before entry."
        ]
      }
    },
    "ut": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "va": {
      "data": {
        "noticeHours": 72,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1229",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia requires reasonable notice; typically interpreted as 72 hours."
        ]
      }
    },
    "vt": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4460",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give 48 hours notice except in emergencies."
        ]
      }
    },
    "wa": {
      "data": {
        "noticeHours": 48,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.150",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must give 2 days notice except in emergencies."
        ]
      }
    },
    "wi": {
      "data": {
        "noticeHours": 12,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.05",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wisconsin requires advance notice of at least 12 hours before entry."
        ]
      }
    },
    "wv": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    },
    "wy": {
      "data": {
        "noticeHours": 24,
        "allowedReasons": [
          "Repairs",
          "Inspections",
          "Showings",
          "Emergencies"
        ],
        "emergencyAllowed": true,
        "weekendRules": []
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1205",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Reasonable notice required except in emergencies."
        ]
      }
    }
  },
  "eviction-timeline": {
    "ak": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "10 days for lease violations other than nonpayment"
          ]
        },
        "courtFilingDelay": 2,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 09.45.090",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alaska allows expedited hearings for nonpayment cases."
        ]
      }
    },
    "al": {
      "data": {
        "noticePeriod": 7,
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-421",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "7-day notice for nonpayment of rent.",
          "Courts may be backlogged in some counties."
        ]
      }
    },
    "ar": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "10 days for lease violations",
            "30 days for no-cause termination"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "3-day notice is standard for nonpayment of rent."
        ]
      }
    },
    "az": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "10 days for lease violations",
            "30 days for month-to-month termination"
          ]
        },
        "courtFilingDelay": 2,
        "hearingSchedulingDelay": 7,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1368",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arizona has one of the fastest eviction timelines in the country."
        ]
      }
    },
    "ca": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30/60 day rules for no-fault evictions",
            "Some cities require just cause"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Cal. Civ. Proc. Code § 1161",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Cal. Civ. Code § 1946.2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Local rent control ordinances may extend timelines.",
          "COVID-19 protections may still apply in some jurisdictions."
        ]
      }
    },
    "co": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "10 days for lease violations",
            "21 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 13-40-104",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Colorado requires landlords to provide a demand for compliance or possession."
        ]
      }
    },
    "ct": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "15 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Connecticut requires a summary process action in housing court."
        ]
      }
    },
    "de": {
      "data": {
        "noticePeriod": 5,
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5713",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day notice required for nonpayment of rent."
        ]
      }
    },
    "fl": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "7 days for lease violations",
            "15 days for month-to-month"
          ]
        },
        "courtFilingDelay": 2,
        "hearingSchedulingDelay": 7,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.56",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida allows for very fast evictions; 3-day notice is common for nonpayment."
        ]
      }
    },
    "ga": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "Immediate filing allowed for some lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-50",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia does not require a written notice for nonpayment in most cases."
        ]
      }
    },
    "hi": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "10 days for lease violations",
            "45 days for month-to-month"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-68",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Hawaii requires landlords to provide notice before filing for eviction."
        ]
      }
    },
    "ia": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "10 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.27",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Iowa requires a 3-day notice for nonpayment."
        ]
      }
    },
    "id": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "10 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "3-day notice for nonpayment of rent."
        ]
      }
    },
    "il": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "10 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "735 ILCS 5/9-104",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "765 ILCS 705/0.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Chicago Residential Landlord and Tenant Ordinance provides additional protections.",
          "Cook County has extended notice requirements."
        ]
      }
    },
    "in": {
      "data": {
        "noticePeriod": {
          "standard": 10,
          "special": [
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana requires a 10-day notice to quit for nonpayment."
        ]
      }
    },
    "ks": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "14 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2564",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "ky": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "15 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky requires a 7-day notice for nonpayment."
        ]
      }
    },
    "la": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "10 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "La. Civ. Code art. 2681",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Louisiana requires a 5-day notice to vacate for nonpayment."
        ]
      }
    },
    "ma": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "30 days for month-to-month",
            "7 days for serious lease violations"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 239, § 1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Massachusetts has strong tenant protections; 14-day notice required for nonpayment."
        ]
      }
    },
    "md": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "30 days for month-to-month",
            "Immediate for breach of lease threatening harm"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maryland requires a 14-day notice for nonpayment before filing for eviction."
        ]
      }
    },
    "me": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "30 days for month-to-month",
            "7 days for serious lease violations"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6002",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maine requires a 7-day notice for nonpayment of rent."
        ]
      }
    },
    "mi": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "30 days for month-to-month",
            "24-hour for illegal drug activity"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 600.5714",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Michigan requires a 7-day notice for nonpayment of rent."
        ]
      }
    },
    "mn": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "30 days for month-to-month",
            "Immediate for certain illegal activity"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.285",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Minnesota requires a 14-day notice to quit for nonpayment."
        ]
      }
    },
    "mo": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "10 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 441.030",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Missouri requires a demand for rent before filing; 3-day notice common."
        ]
      }
    },
    "ms": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "14 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-7-27",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi allows a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "mt": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "14 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-422",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Montana requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "nc": {
      "data": {
        "noticePeriod": {
          "standard": 10,
          "special": [
            "2 days for lease violations in some counties",
            "7 days for criminal activity"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina requires a 10-day notice for nonpayment in most cases."
        ]
      }
    },
    "nd": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "10 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-32-01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Dakota requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "ne": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "14 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1431",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska requires a 7-day notice to quit for nonpayment."
        ]
      }
    },
    "nh": {
      "data": {
        "noticePeriod": {
          "standard": 7,
          "special": [
            "30 days for month-to-month",
            "7 days for substantial damage"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Hampshire requires a 7-day notice for nonpayment of rent."
        ]
      }
    },
    "nj": {
      "data": {
        "noticePeriod": {
          "standard": 30,
          "special": [
            "3-day notice for disorderly conduct",
            "Immediate for certain criminal activity"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 21,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 2A:18-61.2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Jersey has strong tenant protections; 30-day notice common for nonpayment.",
          "Anti-Eviction Act applies to most residential tenancies."
        ]
      }
    },
    "nm": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "7 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-33",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Mexico requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "nv": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "5-day notice to perform or quit for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 40.2512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nevada requires a 5-day notice for nonpayment before filing for eviction."
        ]
      }
    },
    "ny": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "10-day notice to cure for lease violations",
            "30/60/90 day notices for no-fault depending on tenancy length"
          ]
        },
        "courtFilingDelay": 7,
        "hearingSchedulingDelay": 21,
        "sheriffLockoutDelay": 14
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Acts § 711",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "N.Y. Real Prop. Law § 226-c",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New York has extensive tenant protections; timelines vary significantly by locality.",
          "NYC Housing Court can be heavily backlogged."
        ]
      }
    },
    "oh": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "3-day notice for lease violations in some cases"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 1923.04",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Ohio requires a 3-day notice to leave the premises for nonpayment."
        ]
      }
    },
    "ok": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "15 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 131",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma requires a 5-day notice for nonpayment of rent."
        ]
      }
    },
    "or": {
      "data": {
        "noticePeriod": {
          "standard": 72,
          "special": [
            "144 hours for week-to-week",
            "30 days for month-to-month no-cause"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.394",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oregon measures notice in hours: 72 hours (3 days) for nonpayment.",
          "Portland has additional tenant protections."
        ]
      }
    },
    "pa": {
      "data": {
        "noticePeriod": {
          "standard": 10,
          "special": [
            "15 days for lease violations",
            "30 days for month-to-month",
            "Philadelphia requires 30 days for nonpayment"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Pennsylvania requires a 10-day notice for nonpayment in most cases.",
          "Philadelphia has additional protections."
        ]
      }
    },
    "ri": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "20 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-35",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Rhode Island requires a 5-day notice for nonpayment of rent."
        ]
      }
    },
    "sc": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "14 days for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-710",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina requires a 5-day notice for nonpayment of rent."
        ]
      }
    },
    "sd": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "10 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 21-16-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "tn": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "30 days for month-to-month",
            "3 days for certain drug-related offenses"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-505",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee requires a 14-day notice for nonpayment of rent."
        ]
      }
    },
    "tx": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "3-day notice to vacate for lease violations",
            "30 days for month-to-month"
          ]
        },
        "courtFilingDelay": 2,
        "hearingSchedulingDelay": 7,
        "sheriffLockoutDelay": 3
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 24.005",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas has one of the fastest eviction timelines in the country.",
          "Justice of the Peace courts handle most evictions."
        ]
      }
    },
    "ut": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "15 days for lease violations",
            "15 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 10,
        "sheriffLockoutDelay": 5
      },
      "citations": [
        {
          "statute": "Utah Code § 78B-6-802",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "va": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "30 days for month-to-month",
            "21 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1245",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia requires a 5-day notice to pay or quit for nonpayment."
        ]
      }
    },
    "vt": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "30 days for month-to-month",
            "Immediate for serious criminal activity"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4467",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Vermont requires a 14-day notice for nonpayment of rent."
        ]
      }
    },
    "wa": {
      "data": {
        "noticePeriod": {
          "standard": 14,
          "special": [
            "10 days for lease violations",
            "20 days for month-to-month no-cause",
            "Seattle has just cause requirements"
          ]
        },
        "courtFilingDelay": 5,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.12.030",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Washington requires a 14-day notice for nonpayment of rent.",
          "Seattle has additional tenant protections."
        ]
      }
    },
    "wi": {
      "data": {
        "noticePeriod": {
          "standard": 5,
          "special": [
            "14 days for lease violations",
            "28 days for month-to-month"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wisconsin requires a 5-day notice to pay or vacate for nonpayment."
        ]
      }
    },
    "wv": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "Immediate for criminal activity"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "W. Va. Code § 55-3A-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia requires a 3-day notice for nonpayment of rent."
        ]
      }
    },
    "wy": {
      "data": {
        "noticePeriod": {
          "standard": 3,
          "special": [
            "30 days for month-to-month",
            "10 days for lease violations"
          ]
        },
        "courtFilingDelay": 3,
        "hearingSchedulingDelay": 14,
        "sheriffLockoutDelay": 7
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1003",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming requires a 3-day notice for nonpayment of rent."
        ]
      }
    }
  },
  "late-fee": {
    "ak": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be reasonable and disclosed in the lease agreement."
        ]
      }
    },
    "al": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-161",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alabama has no statutory late fee limit. Fees must be reasonable and specified in the lease."
        ]
      }
    },
    "ar": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-17-701",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas does not limit late fees, but they must be specified in the lease."
        ]
      }
    },
    "az": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1368",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arizona does not cap late fees, but they must be reasonable and stated in the lease."
        ]
      }
    },
    "ca": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1671",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "California requires late fees to be a reasonable estimate of actual damages.",
          "Many local jurisdictions have additional tenant protections."
        ]
      }
    },
    "co": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 7,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-105",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Colorado requires a 7-day grace period before a landlord can charge a late fee.",
          "Fee must be disclosed in the lease."
        ]
      }
    },
    "ct": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 9,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-15a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Connecticut requires a 9-day grace period before charging a late fee."
        ]
      }
    },
    "de": {
      "data": {
        "maxLateFee": 5,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": 5
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Delaware limits late fees to the greater of $5 or 5% of monthly rent.",
          "A 5-day grace period is required."
        ]
      }
    },
    "fl": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida does not cap late fees, but they must be disclosed in the lease."
        ]
      }
    },
    "ga": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-16",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia does not limit late fees, but they must be reasonable and in the lease."
        ]
      }
    },
    "hi": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 3,
        "percentageCap": 8
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Hawaii allows late fees up to 8% of the amount of rent due."
        ]
      }
    },
    "ia": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Iowa does not limit late fees. They must be reasonable and in the lease."
        ]
      }
    },
    "id": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Idaho Code § 55-307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho does not limit late fees. They must be specified in the lease."
        ]
      }
    },
    "il": {
      "data": {
        "maxLateFee": 20,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "765 ILCS 730/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Illinois limits late fees on month-to-month leases to $20 or 20% of rent, whichever is less.",
          "Chicago has additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "ks": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "ky": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky does not limit late fees. They must be specified in the lease."
        ]
      }
    },
    "la": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3258",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Louisiana does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "ma": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 30,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Massachusetts prohibits late fees until 30 days after the rent is due."
        ]
      }
    },
    "md": {
      "data": {
        "maxLateFee": 5,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maryland limits late fees to 5% of the monthly rent due."
        ]
      }
    },
    "me": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 15,
        "percentageCap": 4
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maine limits late fees to 4% of one month's rent and requires a 15-day grace period."
        ]
      }
    },
    "mi": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.607",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Michigan does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "mn": {
      "data": {
        "maxLateFee": 8,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.177",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Minnesota limits late fees to 8% of the overdue rent payment."
        ]
      }
    },
    "mo": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.060",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Missouri does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "ms": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi does not limit late fees. They must be in the lease."
        ]
      }
    },
    "mt": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-301",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Montana does not limit late fees. They must be reasonable and in the lease."
        ]
      }
    },
    "nc": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": 15,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina limits late fees to $15 or 5% of rent, whichever is greater.",
          "A 5-day grace period is required."
        ]
      }
    },
    "nd": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Dakota does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "ne": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1417",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "nh": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Hampshire requires late fees to be reasonable and disclosed in the lease."
        ]
      }
    },
    "nj": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Jersey does not cap late fees at the state level, but some municipalities do.",
          "A 5-day grace period is common practice."
        ]
      }
    },
    "nm": {
      "data": {
        "maxLateFee": 10,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Mexico limits late fees to 10% of the monthly rent."
        ]
      }
    },
    "nv": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.230",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nevada does not cap late fees. They must be specified in the lease."
        ]
      }
    },
    "ny": {
      "data": {
        "maxLateFee": 50,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": 5
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 238-a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New York limits late fees for certain tenants to $50 or 5% of monthly rent, whichever is less.",
          "A 5-day grace period is required."
        ]
      }
    },
    "oh": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.04",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Ohio does not cap late fees. They must be reasonable and in the lease."
        ]
      }
    },
    "ok": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 113",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "or": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 4,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.260",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oregon requires a 4-day grace period before charging a late fee.",
          "Fee must be disclosed in the lease."
        ]
      }
    },
    "pa": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 10,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.502",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Pennsylvania does not cap late fees, but Philadelphia requires a 10-day grace period."
        ]
      }
    },
    "ri": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-18",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Rhode Island does not cap late fees. They must be reasonable and in the lease."
        ]
      }
    },
    "sc": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": 5
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-410",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina limits late fees to the greater of $5 or 5% of rent.",
          "A 5-day grace period is required."
        ]
      }
    },
    "sd": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "tn": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": 10
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee limits late fees to 10% of past-due rent.",
          "A 5-day grace period is required."
        ]
      }
    },
    "tx": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 2,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas requires late fees to be disclosed in the lease and allows a 2-day grace period.",
          "Fee structure varies by property size."
        ]
      }
    },
    "ut": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-4",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "va": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": 10
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia limits late fees to 10% of the amount of rent due or the remaining balance."
        ]
      }
    },
    "vt": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4454",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Vermont does not cap late fees. They must be reasonable and in the lease."
        ]
      }
    },
    "wa": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.140",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Washington does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "wi": {
      "data": {
        "maxLateFee": 20,
        "dailyLateFee": null,
        "gracePeriodDays": 5,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wisconsin limits late fees to $20 or 20% of rent, whichever is greater.",
          "A 5-day grace period is required."
        ]
      }
    },
    "wv": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia does not cap late fees. They must be disclosed in the lease."
        ]
      }
    },
    "wy": {
      "data": {
        "maxLateFee": null,
        "dailyLateFee": null,
        "gracePeriodDays": 0,
        "percentageCap": null
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1205",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming does not cap late fees. They must be disclosed in the lease."
        ]
      }
    }
  },
  "late-status": {
    "ak": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "al": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Rent is due on the date specified in the lease. No statutory grace period."
        ]
      }
    },
    "ar": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately after due date."
        ]
      }
    },
    "az": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed."
        ]
      }
    },
    "ca": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1947",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies.",
          "Late fees may only be charged after the adjusted due date."
        ]
      }
    },
    "co": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-102",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "ct": {
      "data": {
        "gracePeriodDays": 9,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-15a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "9-day grace period before late fees may be charged.",
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "dc": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3505.31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "de": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "fl": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Rent is due on the lease-specified date."
        ]
      }
    },
    "ga": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "hi": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "ia": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "id": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "il": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 705/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed.",
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "in": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "ks": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "ky": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "la": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "La. Civ. Code Ann. art. 2682",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Rent due on lease-specified date."
        ]
      }
    },
    "ma": {
      "data": {
        "gracePeriodDays": 30,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "30-day grace period for late fees in certain subsidized housing.",
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "md": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "me": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "mi": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.601",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "mn": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "mo": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "ms": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "mt": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-24-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "nc": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed."
        ]
      }
    },
    "nd": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "ne": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1414",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "nh": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "nj": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-29",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-business-day grace period before late fees may be charged.",
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "nm": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "nv": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "ny": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 238-a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be charged.",
          "If due date falls on a weekend or holiday, next business day applies.",
          "Late fees prohibited until after grace period ends."
        ]
      }
    },
    "oh": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "ok": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "or": {
      "data": {
        "gracePeriodDays": 4,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "4-day grace period before late fees may be assessed.",
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "pa": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "ri": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "sc": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-310",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed."
        ]
      }
    },
    "sd": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "tn": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    },
    "tx": {
      "data": {
        "gracePeriodDays": 2,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "2-day grace period applies only to late fees, not to 'late' status.",
          "Rent is considered late immediately after the due date."
        ]
      }
    },
    "ut": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-22-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease terms."
        ]
      }
    },
    "va": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed."
        ]
      }
    },
    "vt": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4453",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "wa": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": true,
        "holidayExtension": true,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "If due date falls on a weekend or holiday, next business day applies."
        ]
      }
    },
    "wi": {
      "data": {
        "gracePeriodDays": 5,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": true
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.09",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "5-day grace period before late fees may be assessed."
        ]
      }
    },
    "wv": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees may begin immediately."
        ]
      }
    },
    "wy": {
      "data": {
        "gracePeriodDays": 0,
        "weekendExtension": false,
        "holidayExtension": false,
        "lateFeeStartAfterGrace": false
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period. Late fees governed by lease agreement."
        ]
      }
    }
  },
  "lease-termination": {
    "ak": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "14 days for week-to-week tenancies"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "landlord failure to maintain habitable premises",
          "domestic violence"
        ],
        "penalties": [
          "Early termination may require payment of remaining rent unless landlord mitigates"
        ]
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.290",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Alaska Stat. § 34.03.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate with 30 days notice and protective order."
        ]
      }
    },
    "al": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "nonpayment",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may be liable for rent until unit is re-rented"
        ]
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-441",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory right to break lease early except under SCRA for military deployment."
        ]
      }
    },
    "ar": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may owe rent for remainder of lease term"
        ]
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-17-704",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory right to early termination for domestic violence."
        ]
      }
    },
    "az": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "landlord failure to maintain premises"
        ],
        "penalties": [
          "Tenant remains liable for rent until landlord mitigates damages"
        ]
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1375",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Ariz. Rev. Stat. § 33-1318",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Notice must be given at least 30 days prior to the periodic rental date."
        ]
      }
    },
    "ca": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "60 days if tenant has occupied for more than 1 year"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "owner move-in",
          "substantial remodel",
          "withdrawal from rental market"
        ],
        "penalties": [
          "Civil penalties for improper notice",
          "Relocation assistance required for no-fault terminations in some cities"
        ]
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1946",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Cal. Civ. Code § 1946.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Local rent control ordinances may override state rules and require just cause.",
          "Relocation assistance payments may be required for no-fault evictions."
        ]
      }
    },
    "co": {
      "data": {
        "noticePeriod": {
          "fixed": 21,
          "special": [
            "91 days for leases longer than 1 year",
            "7 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "substantial violation",
          "end of lease term"
        ],
        "penalties": [
          "Landlord must make reasonable efforts to re-rent the unit"
        ]
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 13-40-107",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Colorado requires landlords to mitigate damages by attempting to re-rent."
        ]
      }
    },
    "ct": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "3 days for nonpayment of rent",
            "15 days for lease violation"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "nonpayment",
          "lease violation",
          "domestic violence"
        ],
        "penalties": [
          "Double damages for improper security deposit withholding"
        ]
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of family violence may terminate early with court documentation."
        ]
      }
    },
    "de": {
      "data": {
        "noticePeriod": 60,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent through end of lease"
        ]
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5106",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory right to early termination for domestic violence."
        ]
      }
    },
    "fl": {
      "data": {
        "noticePeriod": {
          "fixed": 15,
          "special": [
            "30 days if tenant has occupied for more than 1 year",
            "7 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may owe accelerated rent"
        ]
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.57",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida law does not require landlords to mitigate damages."
        ]
      }
    },
    "ga": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant remains liable for all rent due under the lease"
        ]
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord has no duty to mitigate damages in Georgia."
        ]
      }
    },
    "hi": {
      "data": {
        "noticePeriod": {
          "fixed": 28,
          "special": [
            "45 days if tenant has occupied for more than 1 year"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Civil penalties for improper notice"
        ]
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-71",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate early with appropriate documentation."
        ]
      }
    },
    "ia": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.34",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must make reasonable efforts to re-rent the unit."
        ]
      }
    },
    "id": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Idaho Code § 55-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "il": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Landlord must mitigate damages"
        ]
      },
      "citations": [
        {
          "statute": "765 ILCS 705/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Chicago Residential Landlord and Tenant Ordinance provides additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may owe remaining rent"
        ]
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord has duty to mitigate damages."
        ]
      }
    },
    "ks": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may owe rent through end of lease"
        ]
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2570",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "ky": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.695",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky requires landlords to mitigate damages."
        ]
      }
    },
    "la": {
      "data": {
        "noticePeriod": {
          "fixed": 10,
          "special": [
            "5 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may owe rent for remainder of lease"
        ]
      },
      "citations": [
        {
          "statute": "La. Civ. Code art. 2728",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Louisiana has one of the shortest notice periods in the country."
        ]
      }
    },
    "ma": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "14 days for mobile homes",
            "30 days or rental period whichever is longer in Boston"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may recover up to 3 months rent for improper eviction"
        ]
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Boston has additional tenant protections.",
          "No-fault evictions require specific justifications in some cities."
        ]
      }
    },
    "md": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "60 days in Montgomery County for no-fault"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Civil penalties for improper notice"
        ]
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-402",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Some counties have additional notice requirements.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "me": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6002",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate early with appropriate documentation."
        ]
      }
    },
    "mi": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.134",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Detroit has additional tenant protections.",
          "Landlord must mitigate damages."
        ]
      }
    },
    "mn": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "7 days for week-to-week",
            "30 days for month-to-month written notice required"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant may recover up to $500 for improper notice"
        ]
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.135",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate early with order for protection."
        ]
      }
    },
    "mo": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 441.060",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas City and St. Louis have additional local protections."
        ]
      }
    },
    "ms": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "mt": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-441",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must mitigate damages."
        ]
      }
    },
    "nc": {
      "data": {
        "noticePeriod": {
          "fixed": 7,
          "special": [
            "30 days for year-to-year leases",
            "2 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-14",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina has one of the shortest notice periods for month-to-month tenancies."
        ]
      }
    },
    "nd": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must mitigate damages."
        ]
      }
    },
    "ne": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1437",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must make reasonable efforts to re-rent."
        ]
      }
    },
    "nh": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "nj": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "90 days for mobile homes",
            "No notice required if lease has definite end date"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Civil penalties for improper notice",
          "Tenant may recover damages"
        ]
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 2A:18-56",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Anti-Eviction Act provides strong tenant protections.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "nm": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-37",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Albuquerque has additional tenant protections."
        ]
      }
    },
    "nv": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 40.251",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate early with appropriate documentation."
        ]
      }
    },
    "ny": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term",
          "owner occupancy"
        ],
        "penalties": [
          "Civil penalties for improper notice",
          "Attorney fees may be awarded"
        ]
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 232-a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "N.Y. Real Prop. Law § 232-b",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "NYC has extensive rent stabilization and rent control laws.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "oh": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Cleveland and Cincinnati have additional tenant protections."
        ]
      }
    },
    "ok": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 111",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "or": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 91.070",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Portland has additional tenant protections.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "pa": {
      "data": {
        "noticePeriod": {
          "fixed": 15,
          "special": [
            "30 days for leases longer than 1 year"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Philadelphia has additional tenant protections."
        ]
      }
    },
    "ri": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-37",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Victims of domestic violence may terminate early with appropriate documentation."
        ]
      }
    },
    "sc": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-770",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "sd": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "15 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must mitigate damages."
        ]
      }
    },
    "tn": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nashville and Memphis have additional local protections."
        ]
      }
    },
    "tx": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "any reason not prohibited by law",
          "lease violation",
          "end of lease term"
        ],
        "penalties": []
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 91.001",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas law does not require landlords to have a reason to terminate month-to-month leases."
        ]
      }
    },
    "ut": {
      "data": {
        "noticePeriod": 15,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Utah Code § 78B-6-802",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah has one of the shortest notice periods for month-to-month tenancies."
        ]
      }
    },
    "va": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1253",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "vt": {
      "data": {
        "noticePeriod": {
          "fixed": 30,
          "special": [
            "60 days if tenant has occupied for more than 2 years",
            "21 days for week-to-week"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4467",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Vermont has strong tenant protections.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "wa": {
      "data": {
        "noticePeriod": 20,
        "allowedReasons": [
          "no-fault",
          "domestic violence",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Seattle has additional tenant protections.",
          "Victims of domestic violence may terminate early."
        ]
      }
    },
    "wi": {
      "data": {
        "noticePeriod": 28,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Milwaukee has additional tenant protections.",
          "Landlord must mitigate damages."
        ]
      }
    },
    "wv": {
      "data": {
        "noticePeriod": 30,
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory domestic violence early termination provision."
        ]
      }
    },
    "wy": {
      "data": {
        "noticePeriod": {
          "fixed": 7,
          "special": [
            "No notice required if lease has definite end date"
          ]
        },
        "allowedReasons": [
          "no-fault",
          "lease violation",
          "end of lease term"
        ],
        "penalties": [
          "Tenant liable for damages and unpaid rent"
        ]
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming has one of the shortest notice periods in the country."
        ]
      }
    }
  },
  "ledger-validation": {
    "ak": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide written notice of any fees."
        ]
      }
    },
    "al": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees unless unconscionable."
        ]
      }
    },
    "ar": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "az": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed after 5-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the rental agreement."
        ]
      }
    },
    "ca": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees",
          "administrative fees"
        ],
        "lateFeeRules": "Late fees must be reasonable and tied to actual costs",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1671",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Many fees are unlawful unless tied to actual cost.",
          "Liquidated damages clauses must reflect a reasonable estimate of actual damages."
        ]
      }
    },
    "co": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-102",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees unless unconscionable."
        ]
      }
    },
    "ct": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "online payment fees"
        ],
        "lateFeeRules": "Late fees prohibited until after 9-day grace period",
        "partialPaymentRules": "Landlord must accept partial payments in some cases"
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-15a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be reasonable.",
          "Certain fees are prohibited in residential tenancies."
        ]
      }
    },
    "dc": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees",
          "administrative fees",
          "online payment fees"
        ],
        "lateFeeRules": "Late fees must be reasonable and tied to actual costs",
        "partialPaymentRules": "Landlord must accept partial payments in some cases"
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3505.31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Many fees are unlawful unless tied to actual cost.",
          "Strong tenant protections require detailed ledger documentation.",
          "Late fees must reflect actual damages."
        ]
      }
    },
    "de": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "fl": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory grace period for late fees."
        ]
      }
    },
    "ga": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "hi": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Fees must reflect actual costs."
        ]
      }
    },
    "ia": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "id": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "il": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees prohibited until after 5-day grace period",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 705/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be reasonable and specified in the lease.",
          "Some cities have additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ks": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ky": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "la": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "La. Civ. Code Ann. art. 2682",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ma": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees",
          "administrative fees"
        ],
        "lateFeeRules": "Late fees must be reasonable and tied to actual costs",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Many fees are unlawful unless tied to actual cost.",
          "Late fees in subsidized housing may have additional restrictions."
        ]
      }
    },
    "md": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "online payment fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must reflect actual damages.",
          "Some fees are prohibited in residential leases."
        ]
      }
    },
    "me": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request."
        ]
      }
    },
    "mi": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.601",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "mn": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must reflect actual damages.",
          "Landlord must provide receipt for cash payments upon request."
        ]
      }
    },
    "mo": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ms": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "mt": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-24-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "nc": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed after 5-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the rental agreement."
        ]
      }
    },
    "nd": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ne": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1414",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "nh": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "nj": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees",
          "administrative fees"
        ],
        "lateFeeRules": "Late fees prohibited until after 5-business-day grace period",
        "partialPaymentRules": "Landlord must accept partial payments in some cases"
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-29",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be reasonable and specified in the lease.",
          "Anti-eviction protections may limit fee collection."
        ]
      }
    },
    "nm": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "nv": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Late fees must reflect actual damages."
        ]
      }
    },
    "ny": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "online payment fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees prohibited until after 5-day grace period",
        "partialPaymentRules": "Landlord must accept partial payments"
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 238-a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Strict fee prohibitions apply in New York.",
          "Many fees are unlawful in residential tenancies.",
          "Late fees must be reasonable and tied to actual costs."
        ]
      }
    },
    "oh": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ok": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "or": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees prohibited until after 4-day grace period",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be reasonable.",
          "Landlord must provide receipt for cash payments upon request."
        ]
      }
    },
    "pa": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "ri": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must reflect actual damages.",
          "Landlord must provide receipt for cash payments upon request."
        ]
      }
    },
    "sc": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed after 5-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-310",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the rental agreement."
        ]
      }
    },
    "sd": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "tn": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "tx": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "late fees",
          "utilities",
          "other charges"
        ],
        "illegalFees": [],
        "lateFeeRules": "Late fees allowed after 2-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the lease and reasonable.",
          "Texas applies late fees before utilities in payment order."
        ]
      }
    },
    "ut": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-22-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "va": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed after 5-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the rental agreement."
        ]
      }
    },
    "vt": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4453",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must reflect actual damages.",
          "Landlord must provide receipt for all rent payments upon request."
        ]
      }
    },
    "wa": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees",
          "notice posting fees"
        ],
        "lateFeeRules": "Late fees must be reasonable",
        "partialPaymentRules": "Landlord may accept or refuse unless lease states otherwise"
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must reflect actual damages.",
          "Landlord must provide receipt for cash payments upon request."
        ]
      }
    },
    "wi": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed after 5-day grace period",
        "partialPaymentRules": "Landlord may refuse partial payments"
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.09",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Late fees must be specified in the rental agreement."
        ]
      }
    },
    "wv": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    },
    "wy": {
      "data": {
        "paymentApplicationOrder": [
          "rent",
          "utilities",
          "late fees",
          "other charges"
        ],
        "illegalFees": [
          "convenience fees",
          "processing fees"
        ],
        "lateFeeRules": "Late fees allowed if specified in lease",
        "partialPaymentRules": "Landlord may accept or refuse partial payments"
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory limit on late fees."
        ]
      }
    }
  },
  "payment-methods": {
    "ak": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may specify payment method in the lease agreement."
        ]
      }
    },
    "al": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlords to accept specific payment methods."
        ]
      }
    },
    "ar": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory requirements for payment method acceptance."
        ]
      }
    },
    "az": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Lease terms generally govern acceptable payment methods."
        ]
      }
    },
    "ca": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "crypto-only payments",
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1947.3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords may not require electronic-only payments.",
          "Tenants have the right to pay rent by at least one form of payment that is neither electronic nor a fee-based method."
        ]
      }
    },
    "co": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-102",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment methods are typically determined by the lease agreement."
        ]
      }
    },
    "ct": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check"
        ]
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-3a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide at least one non-electronic payment option."
        ]
      }
    },
    "dc": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3505.31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide at least one non-electronic payment option."
        ]
      }
    },
    "de": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute mandates acceptance of specific payment methods."
        ]
      }
    },
    "fl": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords may specify payment method in the rental agreement."
        ]
      }
    },
    "ga": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment terms are governed by the lease contract."
        ]
      }
    },
    "hi": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must offer at least one non-electronic payment method."
        ]
      }
    },
    "ia": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory requirement to accept specific payment methods."
        ]
      }
    },
    "id": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law restricts landlord choice of payment methods."
        ]
      }
    },
    "il": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 705/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept at least one non-electronic form of payment."
        ]
      }
    },
    "in": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment methods are determined by the lease agreement."
        ]
      }
    },
    "ks": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may set payment method terms in the lease."
        ]
      }
    },
    "ky": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates acceptance of specific payment types."
        ]
      }
    },
    "la": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "La. Civ. Code Ann. art. 2682",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment method is governed by the lease agreement."
        ]
      }
    },
    "ma": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements",
          "crypto-only payments"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords may not require electronic-only rent payments.",
          "Tenants have the right to pay using a non-fee method."
        ]
      }
    },
    "md": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept at least one non-electronic form of payment."
        ]
      }
    },
    "me": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide at least one non-electronic payment option."
        ]
      }
    },
    "mi": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.601",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment method terms are set by the lease agreement."
        ]
      }
    },
    "mn": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept at least one non-electronic payment method."
        ]
      }
    },
    "mo": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Lease terms control acceptable payment methods."
        ]
      }
    },
    "ms": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute requires landlords to accept specific payment methods."
        ]
      }
    },
    "mt": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-24-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory restriction on landlord payment method requirements."
        ]
      }
    },
    "nc": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute requires landlords to accept specific payment methods."
        ]
      }
    },
    "nd": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment method terms are set by the lease agreement."
        ]
      }
    },
    "ne": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1414",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment methods are governed by the rental agreement."
        ]
      }
    },
    "nh": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific payment method acceptance."
        ]
      }
    },
    "nj": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements",
          "crypto-only payments"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-29",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords may not require electronic-only rent payments.",
          "Tenants must be offered at least one non-fee payment method."
        ]
      }
    },
    "nm": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Lease terms determine acceptable payment methods."
        ]
      }
    },
    "nv": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must offer at least one non-electronic payment option."
        ]
      }
    },
    "ny": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept rent payment by at least one non-electronic method."
        ]
      }
    },
    "oh": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law restricts landlord choice of payment methods."
        ]
      }
    },
    "ok": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord may specify payment method in the rental agreement."
        ]
      }
    },
    "or": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide at least one non-electronic payment option."
        ]
      }
    },
    "pa": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment methods are governed by the lease agreement."
        ]
      }
    },
    "ri": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept at least one non-electronic form of payment."
        ]
      }
    },
    "sc": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-310",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute requires landlords to accept specific payment types."
        ]
      }
    },
    "sd": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment method is determined by the lease contract."
        ]
      }
    },
    "tn": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates acceptance of specific payment methods."
        ]
      }
    },
    "tx": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.006",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords may specify payment method in the lease agreement."
        ]
      }
    },
    "ut": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-22-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Lease terms control acceptable payment methods."
        ]
      }
    },
    "va": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment methods are governed by the lease agreement."
        ]
      }
    },
    "vt": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4453",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must offer at least one non-electronic payment option."
        ]
      }
    },
    "wa": {
      "data": {
        "mustAcceptCash": true,
        "mustAcceptCheck": true,
        "mustAcceptMoneyOrder": true,
        "canRequireOnlineOnly": false,
        "canChargeProcessingFee": false,
        "prohibitedMethods": [
          "online-only requirements"
        ],
        "requiredAlternatives": [
          "cash",
          "check",
          "money order"
        ]
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must accept at least one non-electronic form of payment."
        ]
      }
    },
    "wi": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.09",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Payment method terms are set by the lease agreement."
        ]
      }
    },
    "wv": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law restricts landlord choice of payment methods."
        ]
      }
    },
    "wy": {
      "data": {
        "mustAcceptCash": false,
        "mustAcceptCheck": false,
        "mustAcceptMoneyOrder": false,
        "canRequireOnlineOnly": true,
        "canChargeProcessingFee": true,
        "prohibitedMethods": [],
        "requiredAlternatives": []
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute requires landlords to accept specific payment methods."
        ]
      }
    }
  },
  "payment-proof": {
    "ak": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof accepted but landlord acknowledgment not required."
        ]
      }
    },
    "al": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlords to acknowledge receipt of payment."
        ]
      }
    },
    "ar": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "az": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "Zelle/Venmo screenshot"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "ca": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order receipt",
          "Zelle/Venmo screenshot",
          "PayPal receipt",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Reasonable time",
        "burdenOfProofRule": "Tenant must show payment; landlord must show nonpayment if disputed"
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1499",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof widely accepted in California courts.",
          "Landlord must provide receipt upon request for cash payments."
        ]
      }
    },
    "co": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-102",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "ct": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-3a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in housing court proceedings."
        ]
      }
    },
    "dc": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order receipt",
          "cash receipt",
          "Zelle/Venmo screenshot",
          "PayPal receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Immediately upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3505.31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof widely accepted in DC housing court.",
          "Landlord must provide receipt for all rent payments.",
          "Strong tenant protections require landlord to prove nonpayment."
        ]
      }
    },
    "de": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "fl": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "ga": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "hi": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "ia": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "id": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "il": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "Zelle/Venmo screenshot"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Tenant must show payment; landlord must show nonpayment if disputed"
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 705/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof widely accepted in Illinois courts."
        ]
      }
    },
    "in": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ks": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ky": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "la": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "La. Civ. Code Ann. art. 2682",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ma": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order receipt",
          "cash receipt",
          "Zelle/Venmo screenshot",
          "PayPal receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Within 30 days of request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof widely accepted in Massachusetts courts.",
          "Landlord must provide receipt for all rent payments."
        ]
      }
    },
    "md": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in housing court proceedings."
        ]
      }
    },
    "me": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "mi": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.601",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "mn": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "mo": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ms": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "mt": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-24-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "nc": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "nd": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ne": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1414",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "nh": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "nj": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order receipt",
          "cash receipt",
          "Zelle/Venmo screenshot",
          "PayPal receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Immediately upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-29",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof widely accepted in New Jersey courts.",
          "Landlord must provide receipt for all rent payments.",
          "Anti-eviction protections require strong proof of nonpayment."
        ]
      }
    },
    "nm": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "nv": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "Zelle/Venmo screenshot"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Tenant must show payment; landlord must show nonpayment if disputed"
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "ny": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "electronic transfer record",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Immediately upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-e",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Strict documentation rules apply in New York housing court.",
          "Landlord must provide receipt for all rent payments.",
          "Digital proof widely accepted with proper documentation."
        ]
      }
    },
    "oh": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "ok": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "or": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "pa": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ri": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "sc": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-310",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "sd": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "tn": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "tx": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "digital screenshots unless lease allows",
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.006",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital proof acceptance depends on lease terms.",
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "ut": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-22-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "va": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law requires landlord acknowledgment of payment receipt."
        ]
      }
    },
    "vt": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4453",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "wa": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt",
          "email confirmation"
        ],
        "rejectedProof": [
          "verbal confirmation only",
          "uncorroborated text message"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": true,
        "acknowledgementTimeframe": "Upon request",
        "burdenOfProofRule": "Landlord must prove nonpayment before eviction"
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for cash payments upon request.",
          "Digital proof accepted in court proceedings."
        ]
      }
    },
    "wi": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": true,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.09",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Electronic transfer records are generally accepted as proof."
        ]
      }
    },
    "wv": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    },
    "wy": {
      "data": {
        "acceptedProof": [
          "bank statement",
          "cancelled check",
          "money order stub",
          "cash receipt"
        ],
        "rejectedProof": [
          "verbal confirmation only"
        ],
        "digitalProofAllowed": false,
        "landlordMustAcknowledge": false,
        "acknowledgementTimeframe": "Not required",
        "burdenOfProofRule": "Tenant must prove payment"
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates landlord acknowledgment of payment receipt."
        ]
      }
    }
  },
  "receipt-validation": {
    "ak": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "al": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "ar": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-101",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "az": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory receipt content requirements."
        ]
      }
    },
    "ca": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period",
          "payment method"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1499",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital receipts allowed if tenant consents.",
          "Landlord must provide a receipt upon request when rent is paid in cash."
        ]
      }
    },
    "co": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-102",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "ct": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-3a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt upon request for cash payments."
        ]
      }
    },
    "dc": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3505.31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital receipts allowed with tenant consent.",
          "Receipt must be provided for all rent payments."
        ]
      }
    },
    "de": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "fl": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "ga": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory receipt content requirements."
        ]
      }
    },
    "hi": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must provide receipt for all rent payments upon request."
        ]
      }
    },
    "ia": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "id": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "il": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 705/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "in": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "ks": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2545",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "ky": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.565",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory receipt content requirements."
        ]
      }
    },
    "la": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "La. Civ. Code Ann. art. 2682",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "ma": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital receipts allowed with tenant consent.",
          "Receipt must be provided for all rent payments."
        ]
      }
    },
    "md": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "me": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided for all rent payments upon request."
        ]
      }
    },
    "mi": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.601",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "mn": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "mo": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "ms": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "mt": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-24-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "nc": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "nd": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "ne": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1414",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "nh": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "nj": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period",
          "landlord name",
          "payment method"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-29",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Digital receipts allowed with tenant consent.",
          "Receipt must be provided for all rent payments."
        ]
      }
    },
    "nm": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "nv": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address",
          "payment period"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided for all rent payments upon request."
        ]
      }
    },
    "ny": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "payment period",
          "landlord name"
        ],
        "digitalAllowed": false,
        "signatureRequired": true,
        "itemizationRequired": true
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-e",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Strict formatting rules apply.",
          "Digital receipts not permitted unless tenant explicitly agrees in writing.",
          "Itemized breakdown of charges required on receipts."
        ]
      }
    },
    "oh": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "ok": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "or": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "pa": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "ri": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "sc": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-310",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "sd": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "tn": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    },
    "tx": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.006",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts not required unless lease specifies."
        ]
      }
    },
    "ut": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-22-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "va": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1200",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law specifies receipt content requirements."
        ]
      }
    },
    "vt": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "tenant name",
          "property address"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4453",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided for all rent payments upon request."
        ]
      }
    },
    "wa": {
      "data": {
        "requiredFields": [
          "amount paid",
          "date of payment",
          "property address",
          "landlord name"
        ],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt must be provided upon request for cash payments."
        ]
      }
    },
    "wi": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.09",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipt content governed by lease agreement."
        ]
      }
    },
    "wv": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state statute specifies receipt content."
        ]
      }
    },
    "wy": {
      "data": {
        "requiredFields": [],
        "digitalAllowed": true,
        "signatureRequired": false,
        "itemizationRequired": false
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1202",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No state law mandates specific receipt fields."
        ]
      }
    }
  },
  "rent-increase": {
    "ak": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.160",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "30-day notice required for month-to-month tenancies."
        ]
      }
    },
    "al": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-161",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alabama has no statutory limit on rent increases for private housing."
        ]
      }
    },
    "ar": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-17-704",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas has no rent control and minimal tenant protections."
        ]
      }
    },
    "az": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arizona prohibits cities from enacting rent control."
        ]
      }
    },
    "ca": {
      "data": {
        "noticeDays": {
          "standard": 30,
          "special": [
            "90 days if increase is greater than 10%"
          ]
        },
        "maxIncreasePercent": 10,
        "rentControl": true,
        "frequencyLimit": "Once every 12 months"
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 827",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "AB 1482 (Tenant Protection Act)",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Statewide rent cap of 5% plus CPI (max 10%) applies to most properties.",
          "Local rent control ordinances may impose stricter limits in some cities."
        ]
      }
    },
    "co": {
      "data": {
        "noticeDays": {
          "standard": 21,
          "special": [
            "30 days for mobile home parks"
          ]
        },
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-701",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Colorado requires 21 days notice for month-to-month tenancies.",
          "Local rent control is prohibited by state law."
        ]
      }
    },
    "ct": {
      "data": {
        "noticeDays": {
          "standard": 30,
          "special": [
            "90 days for elderly or disabled tenants"
          ]
        },
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-15c",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Connecticut does not have statewide rent control, but some municipalities have ordinances."
        ]
      }
    },
    "de": {
      "data": {
        "noticeDays": 60,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5107",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Delaware requires 60 days notice for rent increases on month-to-month leases."
        ]
      }
    },
    "fl": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida prohibits rent control except in housing emergencies."
        ]
      }
    },
    "ga": {
      "data": {
        "noticeDays": 60,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia requires 60 days notice for month-to-month tenancies."
        ]
      }
    },
    "hi": {
      "data": {
        "noticeDays": 45,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Hawaii requires 45 days written notice for rent increases."
        ]
      }
    },
    "ia": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Iowa requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "id": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Idaho Code § 55-307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho has no rent control and no statutory limit on increases."
        ]
      }
    },
    "il": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "765 ILCS 705/0.01",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Cook County has a rent control ordinance for unincorporated areas.",
          "Chicago has additional tenant protections."
        ]
      }
    },
    "in": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana has no rent control at the state level."
        ]
      }
    },
    "ks": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2570",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "ky": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.190",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "la": {
      "data": {
        "noticeDays": 10,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3258",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Louisiana requires 10 days notice for month-to-month tenancies."
        ]
      }
    },
    "ma": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": true,
        "frequencyLimit": "Once every 12 months"
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Massachusetts has a statewide rent control prohibition, but some cities have home-rule petitions.",
          "Mobile home parks have special protections."
        ]
      }
    },
    "md": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Some Maryland counties have local rent stabilization programs."
        ]
      }
    },
    "me": {
      "data": {
        "noticeDays": 45,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6015",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maine requires 45 days written notice for rent increases."
        ]
      }
    },
    "mi": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.134",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Michigan has no rent control at the state level."
        ]
      }
    },
    "mn": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.135",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Minnesota requires 30 days notice for month-to-month tenancies.",
          "Some cities have tenant screening and notice ordinances."
        ]
      }
    },
    "mo": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 441.060",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Missouri requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "ms": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-7-23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi has no rent control and minimal notice requirements."
        ]
      }
    },
    "mt": {
      "data": {
        "noticeDays": 15,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-311",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Montana requires 15 days notice for month-to-month tenancies."
        ]
      }
    },
    "nc": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-14",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina prohibits local rent control ordinances."
        ]
      }
    },
    "nd": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Dakota requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "ne": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1497",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "nh": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Hampshire requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "nj": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-28",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Jersey has local rent control in many municipalities.",
          "The Anti-Eviction Act provides additional protections."
        ]
      }
    },
    "nm": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "New Mexico requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "nv": {
      "data": {
        "noticeDays": {
          "standard": 30,
          "special": [
            "60 days for tenants over 62 or disabled"
          ]
        },
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nevada requires 30 days notice for rent increases.",
          "Las Vegas and Reno do not have rent control."
        ]
      }
    },
    "ny": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": true,
        "frequencyLimit": "Once every 12 months"
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 226-c",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "NYC and several other municipalities have rent stabilization programs.",
          "Good cause eviction laws apply in some areas."
        ]
      }
    },
    "oh": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Ohio requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "ok": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 111",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "or": {
      "data": {
        "noticeDays": {
          "standard": 90,
          "special": [
            "30 days for week-to-week tenancies"
          ]
        },
        "maxIncreasePercent": 10,
        "rentControl": true,
        "frequencyLimit": "Once every 12 months"
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.323",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Or. Rev. Stat. § 90.324",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oregon has statewide rent control limiting increases to 7% plus CPI.",
          "Portland has additional local protections."
        ]
      }
    },
    "pa": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Pennsylvania has no statewide rent control, but Philadelphia has limited protections."
        ]
      }
    },
    "ri": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-16",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Rhode Island requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "sc": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-770",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "sd": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "tn": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "tx": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas prohibits local rent control except in housing emergencies."
        ]
      }
    },
    "ut": {
      "data": {
        "noticeDays": 15,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-4",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah requires 15 days notice for month-to-month tenancies."
        ]
      }
    },
    "va": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "vt": {
      "data": {
        "noticeDays": 60,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4455",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Vermont requires 60 days notice for rent increases.",
          "Burlington has local tenant protections."
        ]
      }
    },
    "wa": {
      "data": {
        "noticeDays": 60,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.140",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Washington requires 60 days notice for rent increases.",
          "Seattle has additional tenant protections."
        ]
      }
    },
    "wi": {
      "data": {
        "noticeDays": 28,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wisconsin requires 28 days notice for month-to-month tenancies."
        ]
      }
    },
    "wv": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia requires 30 days notice for month-to-month tenancies."
        ]
      }
    },
    "wy": {
      "data": {
        "noticeDays": 30,
        "maxIncreasePercent": null,
        "rentControl": false,
        "frequencyLimit": null
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1207",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming requires 30 days notice for month-to-month tenancies."
        ]
      }
    }
  },
  "rent-receipt": {
    "ak": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.020",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are strongly recommended."
        ]
      }
    },
    "al": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-161",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "While not universally required, landlords should provide receipts for cash payments upon tenant request."
        ]
      }
    },
    "ar": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-17-701",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas has no statutory rent receipt requirement."
        ]
      }
    },
    "az": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1314",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for cash payments upon request."
        ]
      }
    },
    "ca": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1499",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts required for cash payments. Landlords must provide receipts upon tenant request."
        ]
      }
    },
    "co": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-105",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are required upon tenant request."
        ]
      }
    },
    "ct": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-3a",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "de": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5107",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are required upon tenant request."
        ]
      }
    },
    "fl": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords should provide receipts for cash payments upon request."
        ]
      }
    },
    "ga": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia has no statutory rent receipt requirement."
        ]
      }
    },
    "hi": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "ia": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments should be provided upon tenant request."
        ]
      }
    },
    "id": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Idaho Code § 55-307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho has no statutory rent receipt requirement."
        ]
      }
    },
    "il": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "765 ILCS 730/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments.",
          "Chicago has additional local requirements."
        ]
      }
    },
    "in": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-1-9",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ks": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2570",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas has no statutory rent receipt requirement."
        ]
      }
    },
    "ky": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.190",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky has no statutory rent receipt requirement."
        ]
      }
    },
    "la": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. § 9:3258",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ma": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "md": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-208",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "me": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6028",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "mi": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.607",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "mn": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.118",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments should be provided upon tenant request."
        ]
      }
    },
    "mo": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ms": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi has no statutory rent receipt requirement."
        ]
      }
    },
    "mt": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-301",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Montana has no statutory rent receipt requirement."
        ]
      }
    },
    "nc": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-46",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina has no statutory rent receipt requirement."
        ]
      }
    },
    "nd": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Dakota has no statutory rent receipt requirement."
        ]
      }
    },
    "ne": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1417",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska has no statutory rent receipt requirement."
        ]
      }
    },
    "nh": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments should be provided upon tenant request."
        ]
      }
    },
    "nj": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 46:8-26",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "nm": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-15",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "nv": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.230",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ny": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-e",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments.",
          "NYC has strict enforcement."
        ]
      }
    },
    "oh": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.04",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ok": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 113",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma has no statutory rent receipt requirement."
        ]
      }
    },
    "or": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.260",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments should be provided upon tenant request."
        ]
      }
    },
    "pa": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.501",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ri": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-18",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "sc": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-770",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina has no statutory rent receipt requirement."
        ]
      }
    },
    "sd": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota has no statutory rent receipt requirement."
        ]
      }
    },
    "tn": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee has no statutory rent receipt requirement."
        ]
      }
    },
    "tx": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.019",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "ut": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-4",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Utah has no statutory rent receipt requirement."
        ]
      }
    },
    "va": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia has no statutory rent receipt requirement."
        ]
      }
    },
    "vt": {
      "data": {
        "required": true,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Immediately upon payment"
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4454",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlords must provide receipts for all rent payments."
        ]
      }
    },
    "wa": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.140",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments should be provided upon tenant request."
        ]
      }
    },
    "wi": {
      "data": {
        "required": false,
        "requiredWhenCash": true,
        "requiredWhenRequested": true,
        "deliveryMethods": [
          "paper",
          "email"
        ],
        "timeframe": "Within a reasonable time"
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Receipts for cash payments are recommended upon tenant request."
        ]
      }
    },
    "wv": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6-7",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia has no statutory rent receipt requirement."
        ]
      }
    },
    "wy": {
      "data": {
        "required": false,
        "requiredWhenCash": false,
        "requiredWhenRequested": false,
        "deliveryMethods": [
          "paper"
        ],
        "timeframe": "Varies by lease"
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1205",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming has no statutory rent receipt requirement."
        ]
      }
    }
  },
  "repair-deduct": {
    "ak": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 10,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.180",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after giving written notice and a reasonable time for the landlord to act."
        ]
      }
    },
    "al": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alabama does not recognize a statutory repair-and-deduct remedy. Tenants should use alternative remedies or consult an attorney."
        ]
      }
    },
    "ar": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-16-110",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas does not have a statutory repair-and-deduct remedy for residential tenants."
        ]
      }
    },
    "az": {
      "data": {
        "allowed": true,
        "maxDeduction": 300,
        "frequencyLimit": "Twice per 12-month period",
        "noticeRequirementDays": 10,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1363",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct up to $300 or half of one month's rent, whichever is greater, but not more than one month's rent."
        ]
      }
    },
    "ca": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": "Twice per 12-month period",
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1942",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Deduction is capped at one month's rent.",
          "Tenant must notify landlord in writing and allow a reasonable time for repair."
        ]
      }
    },
    "co": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-507",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Colorado does not allow repair-and-deduct. Tenants may terminate the lease or seek court remedies."
        ]
      }
    },
    "ct": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 15,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable repair costs after giving notice and allowing time for landlord to remedy."
        ]
      }
    },
    "de": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after 30 days written notice, or sooner in emergencies."
        ]
      }
    },
    "fl": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 7,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida allows repair and deduct with proper notice, but procedure is strictly regulated."
        ]
      }
    },
    "ga": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia does not recognize repair-and-deduct. Tenants may have other remedies available."
        ]
      }
    },
    "hi": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 10,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-64",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and reasonable time for landlord to act."
        ]
      }
    },
    "ia": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 7,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and reasonable time."
        ]
      }
    },
    "id": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-320",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "il": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "765 ILCS 742/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable costs after written notice and 14 days.",
          "Chicago Residential Landlord and Tenant Ordinance provides additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-8-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana does not provide a repair-and-deduct remedy for residential tenants."
        ]
      }
    },
    "ks": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2553",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "ky": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.635",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky does not recognize repair-and-deduct for residential tenants."
        ]
      }
    },
    "la": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "La. Civ. Code art. 2694",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after notice and a reasonable time for landlord to remedy."
        ]
      }
    },
    "ma": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 111, § 127L",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable repair costs after notice and a reasonable time for landlord to act."
        ]
      }
    },
    "md": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-211",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after 30 days notice, or sooner in emergencies."
        ]
      }
    },
    "me": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6026",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable repair costs after written notice and 14 days."
        ]
      }
    },
    "mi": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 125.530",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Repair and deduct is allowed in Michigan with proper notice."
        ]
      }
    },
    "mn": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.425",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 14 days, or sooner in emergencies."
        ]
      }
    },
    "mo": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 441.570",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Missouri does not recognize repair-and-deduct. Tenants may have other remedies."
        ]
      }
    },
    "ms": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "mt": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-303",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable costs after written notice and 14 days."
        ]
      }
    },
    "nc": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-42",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina does not have a statutory repair-and-deduct remedy for residential tenants."
        ]
      }
    },
    "nd": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 30 days, or sooner in emergencies."
        ]
      }
    },
    "ne": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1428",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "nh": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and a reasonable time."
        ]
      }
    },
    "nj": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 2A:42-85",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct reasonable costs after notice and a reasonable time for landlord to remedy."
        ]
      }
    },
    "nm": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 7,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-27",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 7 days."
        ]
      }
    },
    "nv": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.360",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 14 days, or sooner for emergencies."
        ]
      }
    },
    "ny": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-b",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may use repair and deduct under the warranty of habitability.",
          "NYC has additional procedures through HPD."
        ]
      }
    },
    "oh": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deposit rent with the clerk of courts in some cases; repair and deduct is allowed under limited circumstances."
        ]
      }
    },
    "ok": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 121",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "or": {
      "data": {
        "allowed": true,
        "maxDeduction": 300,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.368",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deduct up to $300 from rent for essential repairs after 30 days notice."
        ]
      }
    },
    "pa": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.206",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Pennsylvania does not have a statutory repair-and-deduct remedy, but tenants may have other legal options."
        ]
      }
    },
    "ri": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 20,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 20 days, or sooner in emergencies."
        ]
      }
    },
    "sc": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-440",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "sd": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota does not recognize repair-and-deduct for residential tenants."
        ]
      }
    },
    "tn": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "tx": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 7,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.0561",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must follow specific procedures including notice to landlord and deducting from rent."
        ]
      }
    },
    "ut": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 10,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 10 days, or sooner in emergencies."
        ]
      }
    },
    "va": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1244",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia does not have a statutory repair-and-deduct remedy for residential tenants."
        ]
      }
    },
    "vt": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 30,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4459",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 30 days, or sooner in emergencies."
        ]
      }
    },
    "wa": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 10,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.100",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and 10 days, or sooner in emergencies."
        ]
      }
    },
    "wi": {
      "data": {
        "allowed": true,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 14,
        "emergencyAllowed": true
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may repair and deduct after written notice and a reasonable time for landlord to act."
        ]
      }
    },
    "wv": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6A-2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia does not have a statutory repair-and-deduct remedy."
        ]
      }
    },
    "wy": {
      "data": {
        "allowed": false,
        "maxDeduction": null,
        "frequencyLimit": null,
        "noticeRequirementDays": 0,
        "emergencyAllowed": false
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1203",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming does not have a statutory repair-and-deduct remedy."
        ]
      }
    }
  },
  "security-deposit": {
    "ak": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.070",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Landlord must return deposit within 14 days if no deductions.",
          "Itemized statement required if any deductions taken."
        ]
      }
    },
    "al": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 35,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "ar": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 60,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ark. Code Ann. § 18-16-305",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "az": {
      "data": {
        "maxMonthsRent": 1.5,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1321",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one and one-half month's rent.",
          "Nonrefundable fees must be stated in writing."
        ]
      }
    },
    "ca": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 21,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1950.5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Maximum deposit is 2 months' rent for furnished units, 1 month for unfurnished.",
          "No nonrefundable 'cleaning fees' are permitted.",
          "Landlord must provide itemized statement with receipts."
        ]
      }
    },
    "co": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-103",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "ct": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit, but interest must be paid annually.",
          "Nonrefundable fees must be clearly stated in the lease."
        ]
      }
    },
    "dc": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": false,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "D.C. Code § 42-3502.17",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit strictly capped at one month's rent.",
          "Pet deposits are considered part of the security deposit cap.",
          "Landlord must pay interest on deposits."
        ]
      }
    },
    "de": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 20,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Del. Code Ann. tit. 25, § 5514",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must provide itemized statement within 20 days."
        ]
      }
    },
    "fl": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.49",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount.",
          "Landlord must notify tenant of claim within 30 days."
        ]
      }
    },
    "ga": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ga. Code Ann. § 44-7-34",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "hi": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-44",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 14 days."
        ]
      }
    },
    "ia": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "id": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-321",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "il": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 2
      },
      "citations": [
        {
          "statute": "765 Ill. Comp. Stat. 710/1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Willful failure to return deposit may result in double damages."
        ]
      }
    },
    "in": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-3-12",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "ks": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 1.5
      },
      "citations": [
        {
          "statute": "Kan. Stat. Ann. § 58-2550",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Wrongful withholding may result in damages of 1.5x the deposit."
        ]
      }
    },
    "ky": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. Ann. § 383.580",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "la": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "La. Rev. Stat. Ann. § 9:3251",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "ma": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 3
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 186, § 15B",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount, but interest must be paid annually.",
          "Willful failure to return deposit may result in treble damages."
        ]
      }
    },
    "md": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Md. Code Ann., Real Prop. § 8-203",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must pay interest on deposits over $50."
        ]
      }
    },
    "me": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. Ann. § 6033",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Nonrefundable fees must be stated in writing."
        ]
      }
    },
    "mi": {
      "data": {
        "maxMonthsRent": 1.5,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 2
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 554.602",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one and one-half months' rent.",
          "Wrongful withholding may result in double damages."
        ]
      }
    },
    "mn": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 21,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.178",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 21 days of move-out."
        ]
      }
    },
    "mo": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 2
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 535.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Willful failure to return deposit may result in double damages."
        ]
      }
    },
    "ms": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Miss. Code Ann. § 89-8-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "mt": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Mont. Code Ann. § 70-25-201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "nc": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-52",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must account for deposit within 30 days."
        ]
      }
    },
    "nd": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-07.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 30 days."
        ]
      }
    },
    "ne": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1416",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 14 days."
        ]
      }
    },
    "nh": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. Ann. § 540-A:6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 30 days."
        ]
      }
    },
    "nj": {
      "data": {
        "maxMonthsRent": 1.5,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.J. Stat. Ann. § 46:8-21.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one and one-half months' rent.",
          "Landlord must return deposit within 30 days of move-out.",
          "Interest must be paid annually or credited toward rent."
        ]
      }
    },
    "nm": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.M. Stat. Ann. § 47-8-18",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 30 days."
        ]
      }
    },
    "nv": {
      "data": {
        "maxMonthsRent": 3,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.242",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed three months' rent.",
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "ny": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": false,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "N.Y. Gen. Oblig. Law § 7-108",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit strictly capped at one month's rent.",
          "Landlord must return deposit within 14 days.",
          "Itemized statement required for any deductions."
        ]
      }
    },
    "oh": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code Ann. § 5321.16",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must pay interest on deposits over one year's rent."
        ]
      }
    },
    "ok": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Okla. Stat. Ann. tit. 41, § 115",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No statutory cap on security deposit amount."
        ]
      }
    },
    "or": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 31,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.300",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must account for deposit within 31 days."
        ]
      }
    },
    "pa": {
      "data": {
        "maxMonthsRent": 2,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 2
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. Ann. § 250.512",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed two months' rent for first year, one month for renewals.",
          "Willful failure to return deposit may result in double damages."
        ]
      }
    },
    "ri": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 20,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-19",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 20 days."
        ]
      }
    },
    "sc": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "S.C. Code Ann. § 27-40-410",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 30 days."
        ]
      }
    },
    "sd": {
      "data": {
        "maxMonthsRent": 1,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-6.1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Security deposit cannot exceed one month's rent.",
          "Landlord must return deposit within 14 days."
        ]
      }
    },
    "tn": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Tenn. Code Ann. § 66-28-301",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must provide itemized statement within 30 days."
        ]
      }
    },
    "tx": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 3
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.103",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        },
        {
          "statute": "Tex. Prop. Code § 92.109",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Bad-faith withholding can trigger treble damages plus attorney fees."
        ]
      }
    },
    "ut": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Utah Code Ann. § 57-17-3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must account for deposit within 30 days."
        ]
      }
    },
    "va": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 45,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Va. Code Ann. § 55.1-1226",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must provide itemized statement within 45 days."
        ]
      }
    },
    "vt": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 14,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. Ann. § 4461",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 14 days."
        ]
      }
    },
    "wa": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 21,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.280",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 21 days.",
          "Nonrefundable fees must be stated in writing."
        ]
      }
    },
    "wi": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": false,
        "returnDeadlineDays": 21,
        "itemizedStatementRequired": true,
        "penaltyMultiple": 2
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.28",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Wrongful withholding may result in double damages."
        ]
      }
    },
    "wv": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 60,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6A-1",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 60 days."
        ]
      }
    },
    "wy": {
      "data": {
        "maxMonthsRent": null,
        "separatePetDepositAllowed": true,
        "nonrefundableFeesAllowed": true,
        "returnDeadlineDays": 30,
        "itemizedStatementRequired": true,
        "penaltyMultiple": null
      },
      "citations": [
        {
          "statute": "Wyo. Stat. Ann. § 1-21-1207",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "No cap on security deposit amount.",
          "Landlord must return deposit within 30 days."
        ]
      }
    }
  },
  "withhold-rent": {
    "ak": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 10,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Alaska Stat. § 34.03.190",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must place rent in escrow after giving written notice and a reasonable time for repairs."
        ]
      }
    },
    "al": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Ala. Code § 35-9A-204",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Alabama does not recognize a statutory right to withhold rent. Tenants should use alternative remedies."
        ]
      }
    },
    "ar": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Ark. Code § 18-16-110",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Arkansas does not allow tenants to withhold rent. Use alternative legal remedies."
        ]
      }
    },
    "az": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 10,
        "severityThreshold": "Material breach of habitability",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Ariz. Rev. Stat. § 33-1363",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must deposit rent with a court or government agency, not simply withhold it."
        ]
      }
    },
    "ca": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Cal. Civ. Code § 1942.5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must allow reasonable time for repairs before withholding.",
          "Retaliation by landlord is prohibited."
        ]
      }
    },
    "co": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 7,
        "severityThreshold": "Material noncompliance affecting health or safety",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Colo. Rev. Stat. § 38-12-507",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must deposit rent into an escrow account with the court."
        ]
      }
    },
    "ct": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 15,
        "severityThreshold": "Serious habitability defects",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Conn. Gen. Stat. § 47a-14h",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must file a claim with the court to place rent in escrow."
        ]
      }
    },
    "de": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Del. Code tit. 25, § 5307",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must escrow rent with the court or a designated agency."
        ]
      }
    },
    "fl": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 7,
        "severityThreshold": "Material noncompliance affecting habitability",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Fla. Stat. § 83.201",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Florida allows withholding under specific conditions with proper notice."
        ]
      }
    },
    "ga": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Ga. Code § 44-7-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Georgia does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "hi": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 10,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Haw. Rev. Stat. § 521-64",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent after notice, but escrow is recommended."
        ]
      }
    },
    "ia": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 7,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Iowa Code § 562A.24",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "id": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Idaho Code § 6-320",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Idaho does not allow tenants to withhold rent."
        ]
      }
    },
    "il": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Material noncompliance affecting health or safety",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "765 ILCS 742/5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must deposit rent with the clerk of court in many jurisdictions.",
          "Chicago Residential Landlord and Tenant Ordinance provides additional protections."
        ]
      }
    },
    "in": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Ind. Code § 32-31-8-5",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Indiana does not allow tenants to withhold rent. Use alternative remedies."
        ]
      }
    },
    "ks": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Kan. Stat. § 58-2553",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kansas does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "ky": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Ky. Rev. Stat. § 383.635",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Kentucky does not allow tenants to withhold rent."
        ]
      }
    },
    "la": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability defects",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "La. Civ. Code art. 2694",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent after notice and a reasonable time for landlord to remedy."
        ]
      }
    },
    "ma": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Mass. Gen. Laws ch. 239, § 8A",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent without escrow, but must have valid habitability claims."
        ]
      }
    },
    "md": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Md. Code, Real Prop. § 8-211",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must escrow rent with the court or a designated agency."
        ]
      }
    },
    "me": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "14 Me. Rev. Stat. § 6026",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "mi": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Mich. Comp. Laws § 125.530",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "mn": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Material noncompliance affecting health or safety",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Minn. Stat. § 504B.385",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with a court administrator after proper notice."
        ]
      }
    },
    "mo": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Mo. Rev. Stat. § 441.580",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "ms": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Miss. Code § 89-8-23",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Mississippi does not allow tenants to withhold rent."
        ]
      }
    },
    "mt": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Mont. Code § 70-24-421",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "nc": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "N.C. Gen. Stat. § 42-42",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "North Carolina does not allow tenants to withhold rent. Use alternative remedies."
        ]
      }
    },
    "nd": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "N.D. Cent. Code § 47-16-13",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "ne": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Neb. Rev. Stat. § 76-1428",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Nebraska does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "nh": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "N.H. Rev. Stat. § 540-A:3",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "nj": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability defects",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "N.J. Stat. § 2A:42-85",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant must deposit rent with the court or a designated agency."
        ]
      }
    },
    "nm": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 7,
        "severityThreshold": "Material noncompliance affecting health or safety",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "N.M. Stat. § 47-8-27",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "nv": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Nev. Rev. Stat. § 118A.355",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent after proper notice, but should document all issues."
        ]
      }
    },
    "ny": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "N.Y. Real Prop. Law § 235-b",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent under the warranty of habitability.",
          "NYC has additional procedures through HPD."
        ]
      }
    },
    "oh": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Ohio Rev. Code § 5321.07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may deposit rent with the clerk of courts in some cases."
        ]
      }
    },
    "ok": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Okla. Stat. tit. 41, § 121",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Oklahoma does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "or": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Or. Rev. Stat. § 90.365",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent after proper notice for essential repairs."
        ]
      }
    },
    "pa": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious habitability defects",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "68 Pa. Cons. Stat. § 250.206",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court in certain municipalities."
        ]
      }
    },
    "ri": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 20,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "R.I. Gen. Laws § 34-18-31",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "sc": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "S.C. Code § 27-40-440",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Carolina does not allow tenants to withhold rent."
        ]
      }
    },
    "sd": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "S.D. Codified Laws § 43-32-21",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "South Dakota does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "tn": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Tenn. Code § 66-28-401",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tennessee does not allow tenants to withhold rent."
        ]
      }
    },
    "tx": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Tex. Prop. Code § 92.056",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Texas does not allow rent withholding, but tenants may have other remedies including repair and deduct."
        ]
      }
    },
    "ut": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 10,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Utah Code § 57-22-6",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "va": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Va. Code § 55.1-1244",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Virginia does not allow tenants to withhold rent. Use alternative remedies."
        ]
      }
    },
    "vt": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 30,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "9 Vt. Stat. § 4459",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "wa": {
      "data": {
        "allowed": true,
        "escrowRequired": false,
        "noticeRequirementDays": 10,
        "severityThreshold": "Serious habitability issues",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Wash. Rev. Code § 59.18.110",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may withhold rent after proper notice, but should document all issues carefully."
        ]
      }
    },
    "wi": {
      "data": {
        "allowed": true,
        "escrowRequired": true,
        "noticeRequirementDays": 14,
        "severityThreshold": "Serious health or safety violations",
        "retaliationProtection": true
      },
      "citations": [
        {
          "statute": "Wis. Stat. § 704.07",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Tenant may escrow rent with the court after proper notice."
        ]
      }
    },
    "wv": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "W. Va. Code § 37-6A-2",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "West Virginia does not recognize a statutory right to withhold rent."
        ]
      }
    },
    "wy": {
      "data": {
        "allowed": false,
        "escrowRequired": false,
        "noticeRequirementDays": 0,
        "severityThreshold": "Not permitted",
        "retaliationProtection": false
      },
      "citations": [
        {
          "statute": "Wyo. Stat. § 1-21-1203",
          "url": "",
          "excerpt": "",
          "sourceType": "statute",
          "lastUpdated": "2025-01-01",
          "confidence": 0.8
        }
      ],
      "version": {
        "version": "2025.01",
        "effectiveDate": "2025-01-01",
        "supersedes": null,
        "notes": [
          "Wyoming does not allow tenants to withhold rent."
        ]
      }
    }
  }
};

export function getRuleFromBundle(
  state: string,
  topic: string
): LegalRuleBlock | null {
  const topicData = authorityBundle[topic];
  if (!topicData) return null;
  const rule = topicData[state.toLowerCase()];
  if (!rule) return null;
  return rule;
}
