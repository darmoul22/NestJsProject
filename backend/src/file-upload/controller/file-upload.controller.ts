import {BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FirebaseUpload} from "../services/firebase-upload.service";
import {FileInterceptor} from "@nestjs/platform-express";
import * as multer from 'multer';
import * as path from "path";
import type { File } from 'src/file-upload/types';
import { Express } from 'express';

@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FirebaseUpload ) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multer.memoryStorage(),
        }),
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('path') filePath: string,
        ){

        if (!file){
            throw new BadRequestException('no file to upload')
        }

        // TODO: use interceptor instead
        // TODO: hide the logic inside a serivce file
        const transformedFile: File = {
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            extension: path.extname(file.originalname),
            content: file.buffer, // use file.buffer for Blob | Uint8Array | ArrayBuffer
        };
        return await this.fileUploadService.upload(transformedFile,filePath)

    }
}