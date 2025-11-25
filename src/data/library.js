export const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", availableCopies: 3 },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson", availableCopies: 5 },
];

// Mock borrow records for fines calculation
export const borrowRecords = [
  {
    id: "br-001",
    studentId: 1,
    studentName: "Alice Johnson",
    bookId: 1,
    bookTitle: "Clean Code",
    borrowedDate: "2025-10-20",
    dueDate: "2025-11-03",
    returnDate: null
  },
  {
    id: "br-002",
    studentId: 2,
    studentName: "Bob Smith",
    bookId: 2,
    bookTitle: "You Don't Know JS",
    borrowedDate: "2025-10-01",
    dueDate: "2025-10-15",
    returnDate: "2025-10-20"
  }
];
