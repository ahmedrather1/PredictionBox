import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { Response } from 'express';
import * as FormData from 'form-data';
import { Readable } from 'stream';

@Controller('knn-gateway')
export class KnnGatewayController {
  constructor(private httpService: HttpService) {}

  @Post('call-sample-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallSampleKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();

    form.append('csv-file', file.buffer, file.originalname);
    form.append('predictor', body.predictor);
    form.append('response', body.response);
    console.log(form);

    try {
      const response = await lastValueFrom(
        this.httpService.post('http://127.0.0.1:8000/call-sample-knn/', form, {
          headers: form.getHeaders(),
        }),
      );
      res.send(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error.message);
    }
  }
}
