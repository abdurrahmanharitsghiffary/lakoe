export type WithdrawalStatus =
  | "PENDING"
  | "ON_PROCESS"
  | "SUCCESS"
  | "REJECTED";

// - Bereskan seluruh slicing admin
// -- desain mirip seperti halaman order seller, tp hanya untuk withdrawal saja, statusnya :
// --- menunggu => seller sudah melakukan permohonan withdraw ke admin
// --- dalam proses => admin mengonfirmasi (klik button) permohonan withdraw seller, dan siap transfer
// --- selesai => admin sudah melakukan transfer
// --- dibatalkan => permohonan tidak di acc (admin menyertakan catatan alasan ditolak)
