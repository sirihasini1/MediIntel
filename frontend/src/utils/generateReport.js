import jsPDF from "jspdf";

const generateReport = (ocrData) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("MediIntel AI - Healthcare Analysis Report", 10, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(
    `Diagnosis: ${
      ocrData.ai_summary?.diagnosis || "Not detected"
    }`,
    10,
    y
  );

  y += 15;

  doc.text("Medicines:", 10, y);

  y += 10;

  if (ocrData.ai_summary?.medicines?.length > 0) {
    ocrData.ai_summary.medicines.forEach((med) => {
      doc.text(
        `${med.name} | ${med.dosage} | ${med.instructions}`,
        10,
        y
      );

      y += 10;
    });
  } else {
    doc.text("No medicines detected", 10, y);
    y += 10;
  }

  y += 10;

  doc.text("Tests:", 10, y);

  y += 10;

  if (ocrData.ai_summary?.tests?.length > 0) {
    ocrData.ai_summary.tests.forEach((test) => {
      doc.text(`• ${test}`, 10, y);
      y += 10;
    });
  } else {
    doc.text("No tests detected", 10, y);
  }

  doc.save("MediIntel_Report.pdf");
};

export default generateReport;