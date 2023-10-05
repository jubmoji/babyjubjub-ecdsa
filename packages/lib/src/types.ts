// @ts-ignore
import { ZqField } from "ffjavascript";

export type BabyJubJub = {
  ec: any;
  Fb: ZqField;
  Fs: ZqField;
  cofactor: number;
};

export type Signature = {
  r: bigint;
  s: bigint;
};

export type MembershipProofInputs = {
  s: bigint;
  root: bigint;
  Tx: bigint;
  Ty: bigint;
  Ux: bigint;
  Uy: bigint;
  pathIndices: number[];
  siblings: bigint[];
};

export interface MerkleProof {
  root: bigint;
  pathIndices: number[];
  siblings: bigint[];
}

export type ZKP = { proof: string; publicSignals: string };
