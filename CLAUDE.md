# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a protocol library for host-enclave communication in TEE (Trusted Execution Environment) systems. It provides identical message type definitions in both Rust (for enclaves) and TypeScript (for hosts), ensuring type-safe communication across the trust boundary.

## Architecture

The repository maintains **dual implementations** of the same protocol types:

- **Rust implementation** (`rust/`): For use inside secure enclaves. Located at `rust/src/lib.rs`
- **TypeScript implementation** (`typescript/`): For use in host applications. Located at `typescript/src/types.ts`

### Core Protocol Types

Both implementations define:
- `TeeRequest`: Messages sent from host to enclave
  - `id`: Unique identifier for request/response matching
  - `method`: Operation to perform
  - `params`: Operation parameters (JSON value)
  - `timestamp`: Request timestamp

- `TeeResponse`: Messages returned from enclave to host
  - `id`: Matches the request ID
  - `success`: Whether operation succeeded
  - `data`: Response payload (optional)
  - `signature`: Cryptographic signature from enclave (optional)
  - `error`: Error message if operation failed (optional)

The Rust implementation includes helper methods `TeeResponse::success()` and `TeeResponse::error()` for constructing responses.

## Development Commands

### TypeScript
```bash
cd typescript
npm install       # Install dependencies
npm run build     # Compile TypeScript to dist/
```

### Rust
```bash
cd rust
cargo build       # Build the library
cargo test        # Run tests (when added)
cargo check       # Quick validation without full build
```

## Important Constraints

**Type Parity**: When modifying protocol types, you MUST update both implementations identically. The Rust and TypeScript definitions must remain in sync to ensure correct serialization/deserialization across the host-enclave boundary.

**Serialization Format**: Both implementations use JSON for serialization (serde_json for Rust, native JSON for TypeScript). Changes to field names or types will break compatibility.
