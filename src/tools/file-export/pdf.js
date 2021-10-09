import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

async function exportToPDF({ domId, filename }) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!domId || !document.getElementById(domId)) {
                return;
            }

            const canvas = await html2canvas(document.getElementById(domId));
            const imgData = canvas.toDataURL('image/png');
            // const pdf = new jsPDF({
            //     orientation: 'landscape',
            // });
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${filename || 'willog-download'}.pdf`);
            resolve(filename);
        } catch (err) {
            reject(err);
        }
    });
}

export { exportToPDF };
