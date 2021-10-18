import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

async function exportToPDF({ domId: domArray, filename }) {
    return new Promise(async (resolve, reject) => {
        try {
            const pdf = new jsPDF();
            for (const idx in domArray) {
                const domId = domArray[+idx];
                if (!document.getElementById(domId)) {
                    return;
                }
                const canvas = await html2canvas(document.getElementById(domId), {
                    scrollX: 0,
                    scrollY: 0,
                });
                const imgData = canvas.toDataURL('image/png');
                const imgProps = pdf.getImageProperties(imgData);
                let pdfWidth = pdf.internal.pageSize.getWidth();
                let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                let x = 0;
                if (pdfHeight > pdf.internal.pageSize.getHeight()) {
                    pdfHeight = pdf.internal.pageSize.getHeight();
                    pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
                    x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
                }
                pdf.addImage(imgData, 'PNG', x, 0, pdfWidth, pdfHeight);
                if (domArray[+idx + 1]) {
                    pdf.addPage();
                }
            }
            pdf.save(`${filename || 'willog-download'}.pdf`);
            resolve(filename);
        } catch (err) {
            reject(err);
        }
    });
}

export { exportToPDF };
