import { books, borrowRecords } from "../data/library.js";

export const getBooks = (req, res) => {
  return res.json(books);
};

export const getFines = (req, res) => {
  const perDayFine = Number(process.env.FINE_PER_DAY) || 5;
  const now = new Date();
  const filterStudent = req.query.studentId ? Number(req.query.studentId) : null;

  const finesByStudent = {};

  borrowRecords.forEach((rec) => {
    if (filterStudent && rec.studentId !== filterStudent) return;

    const due = new Date(rec.dueDate + "T00:00:00");
    const returned = rec.returnDate ? new Date(rec.returnDate + "T00:00:00") : null;
    const compareDate = returned || now;
    const msPerDay = 1000 * 60 * 60 * 24;
    const overdueDays = Math.max(0, Math.floor((compareDate - due) / msPerDay));
    const fine = overdueDays * perDayFine;

    if (fine <= 0) return;

    if (!finesByStudent[rec.studentId]) {
      finesByStudent[rec.studentId] = {
        studentId: rec.studentId,
        studentName: rec.studentName,
        items: [],
        totalFine: 0,
      };
    }

    finesByStudent[rec.studentId].items.push({
      recordId: rec.id,
      bookId: rec.bookId,
      bookTitle: rec.bookTitle,
      dueDate: rec.dueDate,
      returnDate: rec.returnDate,
      overdueDays,
      fine,
    });

    finesByStudent[rec.studentId].totalFine += fine;
  });

  const fines = Object.values(finesByStudent);
  const totalFineAllStudents = fines.reduce((s, st) => s + (st.totalFine || 0), 0);

  return res.json({ perDayFine, fines, totalFineAllStudents });
};
