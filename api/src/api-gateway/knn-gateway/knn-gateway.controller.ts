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
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import * as FormData from 'form-data';

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

  @Post('call-custom-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    form.append('csv-file', file.buffer, file.originalname);
    form.append('predictor', body.predictor);
    form.append('response', body.response);
    form.append('maxK', body.maxK);
    form.append('customK', body.customK);
    form.append('customFolds', body.customFolds);

    try {
      const response = await lastValueFrom(
        this.httpService.post('http://127.0.0.1:8000/call-custom-knn/', form, {
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

  @Post('call-custom-knn-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnnIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    form.append('csv-file', file.buffer, file.originalname);
    form.append('predictor', body.predictor);
    form.append('response', body.response);
    form.append('maxK', body.maxK);
    form.append('customK', body.customK);
    form.append('customFolds', body.customFolds);
    form.append('xToPredict', body.xToPredict);

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'http://127.0.0.1:8000/call-custom-knn-individual/',
          form,
          {
            headers: form.getHeaders(),
          },
        ),
      );
      res.send(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error.message);
    }
  }

  @Post('call-sample-knn-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallSampleKnnIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    form.append('csv-file', file.buffer, file.originalname);
    form.append('predictor', body.predictor);
    form.append('response', body.response);
    form.append('xToPredict', body.xToPredict);

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'http://127.0.0.1:8000/call-sample-knn-individual/',
          form,
          {
            headers: form.getHeaders(),
          },
        ),
      );
      res.send(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error.message);
    }
  }
}
