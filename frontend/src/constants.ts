export const ORDER_STATUS_LABEL = {
  CANCELLED: "Dibatalkan",
  READY_TO_DELIVER: "Siap Dikirim",
  NOT_PAID: "Belum Dibayar",
  ON_DELIVERY: "Dalam Pengiriman",
  SUCCESS: "Pesanan Selesai",
  NEW_ORDER: "Pesanan Baru",
} as const;

export const ORDER_STATUS_DESCRIPTION = {
  CANCELLED:
    "Pesanan dibatalkan karena pembeli tidak melakukan pembayaran tepat waktu.",
  NEW_ORDER:
    "Segera proses pesanan yang telah masuk. Jangan membuat pembeli menunggu terlalu lama.",
  NOT_PAID: (endDate: Date) =>
    `Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai ${new Date(
      endDate
    )?.toLocaleDateString()}. Silakan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan barang.`,
  SUCCESS: "Produk telah diterima oleh pembeli dan pesanan ini diselesaikan.",
  ON_DELIVERY:
    "Pesanan sudah dalam proses pengiriman. Silakan tunggu penerimaan barang oleh pembeli.",
  READY_TO_DELIVER:
    "Pesanan telah di-pickup oleh Kurir dan siap untuk dikirim.",
} as const;
