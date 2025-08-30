// Re-export all database functions from modular files
export * from './colleges'
export * from './reviews'

// Keep the original database.ts file for backward compatibility
// but gradually migrate to this modular structure
