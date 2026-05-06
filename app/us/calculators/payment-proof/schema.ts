export interface PaymentProofRule {
  acceptedProof: string[];
  rejectedProof: string[];
  digitalProofAllowed: boolean;
  landlordMustAcknowledge: boolean;
  acknowledgementTimeframe: string;
  burdenOfProofRule: string;
  statutes: string[];
  notes: string[];
}

export interface PaymentProofResult {
  acceptedProof: string[];
  rejectedProof: string[];
  digitalProofAllowed: boolean;
  landlordMustAcknowledge: boolean;
  acknowledgementTimeframe: string;
  burdenOfProofRule: string;
  statutes: string[];
  notes: string[];
  missingRequiredProof: string[];
}

export type PaymentProofDataset = Record<string, PaymentProofRule>;
