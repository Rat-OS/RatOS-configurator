import { getBoards } from '@/server/routers/mcu';
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import path from 'path';
import { readFile, writeFile } from 'fs/promises';

export const pullImagesFromDiagrams = async () => {
	const parsedBoards = await getBoards();

	await Promise.all(
		parsedBoards.map(async (board) => {
			const diagramPath = path.join(board.path, 'wiring.drawio.svg');
			const maybeOldImgPng = path.join(board.path, 'board.png');
			const maybeOldImgWebp = path.join(board.path, 'board.png');
			if (!existsSync(diagramPath)) {
				return;
			}
			const f = await readFile(diagramPath);
			const diagram = f
				.toString()
				.match(
					/https:\/\/os\.ratrig\.com\/img\/diagram\/(?!psu|bltouch|adxl345|blower|heater|nema|pi4|ssr|axial|endstop|bed|inductive)[^";]*/m,
				);
			if (diagram?.[0]) {
				const res = await fetch(diagram[0]);
				if (res.ok && res.body) {
					if (existsSync(maybeOldImgPng)) {
						unlinkSync(maybeOldImgPng);
					}
					if (existsSync(maybeOldImgWebp)) {
						unlinkSync(maybeOldImgWebp);
					}
					const imgName = 'board.' + diagram[0].split('.').pop()?.replace(/\?.*/, '');
					let writer = createWriteStream(path.join(board.path, imgName));
					Readable.fromWeb(res.body as any).pipe(writer);
					await new Promise((resolve) => {
						writer.on('finish', resolve);
					});
					let boardDef = (await readFile(path.join(board.path, 'board-definition.json'))).toString();
					boardDef = boardDef.replace('"boardImageFileName": "board.png"', `"boardImageFileName": "${imgName}"`);
					await writeFile(path.join(board.path, 'board-definition.json'), boardDef);
				}
			}
		}),
	);
};
