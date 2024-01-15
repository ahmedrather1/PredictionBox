import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('serve-demo-data')
export class DemoDataController {
  @Get(':filename')
  async getDemoData(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = path.join(process.cwd(), 'demoData', `${filename}.csv`);
      console.log(filePath);

      if (fs.existsSync(filePath)) {
        res.status(HttpStatus.OK).sendFile(filePath);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error retrieving file' });
    }
  }
}
