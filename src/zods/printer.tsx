import { z } from 'zod';
import { serverSchema } from '../env/schema.mjs';
import path from 'path';

const environment = serverSchema.parse(process.env);

export const Printer = z
    .object({
        id: z.string(),
        name: z.string().describe("The name of the printer"),
        description: z.string().describe("A description of the printer"),
        manufacturer: z
            .string()
            .describe("The name of the manufacturer of this printer"),
        documentationLink: z
            .string()
            .describe("Link to the RatOS documentation for this printer"),
        image: z.string().describe("Link to an image of the printer"),
        sizes: z
            .array(z.number())
            .describe("Size options for this printer")
            .optional(),
        template: z
            .string()
            .describe("Printer.cfg template for this printer"),
        path: z.string().startsWith(path.join(environment.RATOS_CONFIGURATION_PATH, 'printers')),
        defaults: z
            .object({
                extruder: z
                    .string()
                    .describe(
                        "Default extruder for this printer. Should be the name of the config without the file extension."
                    )
                    .optional(),
                board: z
                    .string()
                    .describe(
                        "Default board for this printer. Should be the name of the board directory."
                    )
                    .optional(),
                hotend: z
                    .string()
                    .describe(
                        "Default hotend for this printer. Should be the name of the config without the file extension."
                    )
                    .optional(),
                probe: z
                    .string()
                    .describe(
                        "Default probe for this printer. Should be the name of the config without the file extension."
                    )
                    .optional(),
                xEndstop: z
                    .enum(["sensorless", "endstop"])
                    .describe("Default x endstop for this printer")
                    .optional(),
                yEndstop: z
                    .enum(["sensorless", "endstop"])
                    .describe("Default y endstop for this printer")
                    .optional(),
            })
            .describe("Default hardware for this printer")
            .optional(),
    })
    .describe("A RatOS supported 3d printer");


export type Printer = z.infer<typeof Printer>;
