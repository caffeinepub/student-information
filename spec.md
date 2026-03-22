# Student Information

## Current State
Form collects: roll number, college name, course details, address, phone number.
Backend stores StudentRecord with these 5 fields + timestamp.
No student email field exists yet.

## Requested Changes (Diff)

### Add
- studentEmail field to StudentRecord type in backend
- studentEmail parameter to submitRecord backend function
- Student Email input field in the frontend form
- studentEmail wired through useSubmitRecord hook

### Modify
- Backend submitRecord to accept and store studentEmail
- useQueries.ts mutationFn to pass studentEmail
- App.tsx form to include student email field with validation

### Remove
- Nothing

## Implementation Plan
1. Update Motoko backend to add studentEmail to record and submitRecord
2. Update useQueries.ts to include studentEmail in mutation
3. Update App.tsx to add student email input field and state
