import XLSX from 'xlsx';
import moment from 'moment';

const DEFAULT_SHEET_TITLE = 'willog-export';

/**
 * export to xlsx
 * data {
 *      header
 *      body
 * }
 * configs {
 *      title
 * }
 */
async function exportToXLSX({ data, configs }) {
    try {
        const timestamp = new moment().format('YYMMDD-HHmmss');
        const table = [data.header, ...data.body];
        const wb = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.aoa_to_sheet(table);
        const title = (configs && configs.title) || DEFAULT_SHEET_TITLE;
        const filename =
            configs && configs.title
                ? `${configs.title}-${timestamp}.xlsx`
                : `${DEFAULT_SHEET_TITLE}-${timestamp}.xlsx`;

        XLSX.utils.book_append_sheet(wb, newWorksheet, title);
        XLSX.writeFile(wb, filename);
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

/**
 * Multi Sheet Export
 * sheets: [{body, header, sheetTitle}]
 */
async function exportToXLSXMultiSheets(sheets, configs) {
    try {
        const timestamp = new moment().format('YYMMDD-HHmmss');
        const wb = XLSX.utils.book_new();

        sheets.forEach(({ body, header, sheetTitle }) => {
            const table = [header, ...body];
            const newWorksheet = XLSX.utils.aoa_to_sheet(table);
            const title = sheetTitle || DEFAULT_SHEET_TITLE;
            XLSX.utils.book_append_sheet(wb, newWorksheet, title);
        });

        const filename =
            configs && configs.title
                ? `${configs.title}-${timestamp}.xlsx`
                : `${DEFAULT_SHEET_TITLE}-${timestamp}.xlsx`;

        XLSX.writeFile(wb, filename);
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

export { exportToXLSX, exportToXLSXMultiSheets };
