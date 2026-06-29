# Cite — Evidence Court

**Live:** https://cite-umber.vercel.app  
**Contract:** `0x05890f71B471598f63Dd66641aA90Ea688bd2cEa` on GenLayer StudioNet  
**Explorer:** https://explorer-studio.genlayer.com

> A link is not proof until the claim and the source have been judged together.

---

## What is Cite?

Cite is an on-chain evidence court powered by [GenLayer](https://genlayer.com) Intelligent Contracts.

Anyone can state a falsifiable claim. Anyone can submit public sources as evidence — supporting or contradicting it. GenLayer's validator network independently inspects each source and reaches consensus on whether the evidence actually proves the claim. The verdict is stored on-chain permanently.

---

## How it works

| Step | Action |
|------|--------|
| 1 | **State the claim** — precise statement, evidence standard, deadline |
| 2 | **Submit evidence** — public URL with support direction and explanation |
| 3 | **Request review** — triggers GenLayer validators to reach consensus |
| 4 | **Verdict on-chain** — confidence, strongest/weakest evidence, reasoning |

---

## Why GenLayer

A normal smart contract can verify that someone uploaded a URL. It cannot judge whether that URL proves a natural-language claim. GenLayer's Intelligent Contracts run nondeterministic consensus — multiple independent validators inspect each source and agree on a verdict before it is stored on-chain.

---

## Stack

- **Smart contract** — GenLayer Intelligent Contract (Python), deployed on StudioNet
- **Frontend** — Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Chain integration** — genlayer-js v1.1.8
- **Wallet** — MetaMask (StudioNet, chain ID 61999)

---

## Contract methods

| Method | Type | Description |
|--------|------|-------------|
| `create_claim` | write | Create a new claim room |
| `submit_evidence` | write | Submit a public source as evidence |
| `request_review` | write | Trigger GenLayer AI consensus review |
| `challenge_evidence` | write | Challenge a piece of evidence |
| `close_claim` | write | Close a claim room |
| `get_claim` | view | Fetch claim data by ID (`CLM-N`) |
| `get_evidence` | view | Fetch evidence by ID (`EVI-N`) |
| `get_review` | view | Fetch review by ID (`REV-N`) |
| `get_latest_review` | view | Get the latest review for a claim |
| `get_contract_summary` | view | Total counts for claims, evidence, reviews |

---

## Frontend routes

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, how-it-works, example claim rooms |
| `/claims` | Claim index with status filters |
| `/claims/new` | Multi-step claim creation form with sharpness meter |
| `/claims/[id]` | Claim room — evidence stack + consensus panel |
| `/claims/[id]/evidence/new` | Evidence submission form |
| `/claims/[id]/review/[reviewId]` | Verdict detail — canonical JSON, confidence ring |
| `/sources` | Source library |

---

## Project structure

```
contracts/
  CiteEvidenceCourt.py          GenLayer Intelligent Contract

app/
  page.tsx                      Landing page
  claims/
    page.tsx                    Browse all claims
    new/page.tsx                Create a claim
    [id]/page.tsx               Claim detail + evidence
    [id]/evidence/new/          Submit evidence
    [id]/review/[reviewId]/     Review detail

src/
  lib/
    genlayer/cite.ts            Contract SDK (reads + writes)
    genlayer/client.ts          Wallet + network helpers
    types/cite.ts               TypeScript interfaces
    validation/                 Zod schemas
  components/
    cite/                       Domain components
    layout/                     Shell + nav
```

---

## Local setup

```bash
git clone https://github.com/Ifem1/Cite.git
cd Cite
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_GENLAYER_CHAIN_ID=61999
NEXT_PUBLIC_GENLAYER_RPC_URL=https://studio.genlayer.com/api
NEXT_PUBLIC_GENLAYER_EXPLORER_URL=https://explorer-studio.genlayer.com
NEXT_PUBLIC_CITE_CONTRACT_ADDRESS=0x05890f71B471598f63Dd66641aA90Ea688bd2cEa
```

```bash
npm run dev
# Open http://localhost:3000
```

---

## Wallet setup

1. Install [MetaMask](https://metamask.io)
2. Add GenLayer StudioNet — the app prompts you automatically on first write
3. Get testnet tokens from the faucet inside [GenLayer Studio](https://studio.genlayer.com)

---

## Known limitations

- GenLayer consensus on StudioNet takes 1–5 minutes per transaction
- The Sources page uses demo fixtures in this MVP
- No pagination on `/claims` — scans up to the current claim counter sequentially
- Claim Sharpness Meter is frontend-only heuristics, not GenLayer consensus

---

## License

MIT
