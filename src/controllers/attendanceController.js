import { attendanceRecords } from "../data/attendance.js";

export const getAttendance = (req, res) => {
  res.json(attendanceRecords);
};

export const markAttendance = (req, res) => {
  const { studentId, date, status } = req.body;
  const newRecord = {
    id: attendanceRecords.length + 1,
    studentId,
    date,
    status,
  };
  attendanceRecords.push(newRecord);
  res.status(201).json(newRecord);
};

export const editAttendance = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id parameter" });
  }

  const recordIndex = attendanceRecords.findIndex((r) => r.id === id);
  if (recordIndex === -1) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  const { studentId, date, status } = req.body;
  // Basic validation: at least one field must be provided
  if (studentId === undefined && date === undefined && status === undefined) {
    return res.status(400).json({ message: "At least one field (studentId, date, status) must be provided to update" });
  }

  const existing = attendanceRecords[recordIndex];
  const updated = {
    ...existing,
    ...(studentId !== undefined ? { studentId } : {}),
    ...(date !== undefined ? { date } : {}),
    ...(status !== undefined ? { status } : {}),
  };

  attendanceRecords[recordIndex] = updated;
  return res.json(updated);
};
