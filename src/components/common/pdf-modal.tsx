'use client';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface PDFModalProps extends React.PropsWithChildren {
	className?: string;
	file?: string;
}

export const PDFModal: React.FC<PDFModalProps> = (props) => {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}
	return (
		<Dialog>
			<DialogTrigger>{props.children}</DialogTrigger>
			<DialogContent
				key={`dialog-pdf`}
				fixedCloseButton={true}
				className="h-full max-w-full"
				// onClick={() => setOpen(false)}
			>
				<div className="flex flex-1 flex-col items-center">
					<Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
						<Page pageNumber={pageNumber} width={window.innerHeight * 0.9 * 0.71} />
					</Document>
					<p>
						Page {pageNumber} of {numPages}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};
