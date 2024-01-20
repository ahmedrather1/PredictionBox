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
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

// TODO CREATE A SERVICE FILE FOR THIS CONTROLLER
@Controller('knn-gateway')
export class KnnGatewayController {
  private ENGINE_URL: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.ENGINE_URL = this.configService.get<string>('ENGINE_URL');
  }
  const;
  @Post('call-sample-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallSampleKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    if (file && file.buffer) {
      form.append(
        'csv-file',
        file.buffer,
        file.originalname || 'default-filename.csv',
      );
    }
    if (body?.predictor !== undefined) form.append('predictor', body.predictor);
    if (body?.response !== undefined) form.append('response', body.response);

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          //'http://prediction-box-engine-env.eba-cqvymbxb.us-west-2.elasticbeanstalk.com/call-sample-knn/',
          this.ENGINE_URL + 'call-sample-knn/',
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

  @Post('call-custom-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    if (file && file.buffer) {
      form.append(
        'csv-file',
        file.buffer,
        file.originalname || 'default-filename.csv',
      );
    }
    if (body?.predictor !== undefined) form.append('predictor', body.predictor);
    if (body?.response !== undefined) form.append('response', body.response);
    if (body?.maxK !== undefined) form.append('maxK', body.maxK);
    if (body?.customK !== undefined) form.append('customK', body.customK);
    if (body?.customFolds !== undefined)
      form.append('customFolds', body.customFolds);

    try {
      const response = await lastValueFrom(
        // TODO CHANGE THIS ASAP!!!! SET UP ENVIRONMENT VARS!!!!!
        this.httpService.post(
          //'http://prediction-box-engine-env.eba-cqvymbxb.us-west-2.elasticbeanstalk.com/call-custom-knn/',
          this.ENGINE_URL + 'call-custom-knn/',
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

  @Post('call-custom-knn-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnnIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const form = new FormData();
    // Check if file properties are defined
    if (file && file.buffer && file.originalname) {
      form.append('csv-file', file.buffer, file.originalname);
    }

    // Append body properties only if they are defined
    if (body?.predictor !== undefined) {
      form.append('predictor', body.predictor);
    }
    if (body?.response !== undefined) {
      form.append('response', body.response);
    }
    if (body?.maxK !== undefined) {
      form.append('maxK', body.maxK);
    }
    if (body?.customK !== undefined) {
      form.append('customK', body.customK);
    }
    if (body?.customFolds !== undefined) {
      form.append('customFolds', body.customFolds);
    }
    if (body?.xToPredict !== undefined) {
      form.append('xToPredict', body.xToPredict);
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          // TODO CHANGE THIS ASAP!!!! SET UP ENVIRONMENT VARS!!!!!
          //'http://prediction-box-engine-env.eba-cqvymbxb.us-west-2.elasticbeanstalk.com/call-custom-knn-individual/',
          this.ENGINE_URL + 'call-custom-knn-individual/',

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
    if (file && file.buffer && file.originalname) {
      form.append('csv-file', file.buffer, file.originalname);
    }

    // Append other fields only if they are defined
    if (body?.predictor !== undefined) {
      form.append('predictor', body.predictor);
    }
    if (body?.response !== undefined) {
      form.append('response', body.response);
    }
    if (body?.xToPredict !== undefined) {
      form.append('xToPredict', body.xToPredict);
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          // TODO CHANGE THIS ASAP!!!! SET UP ENVIRONMENT VARS!!!!!

          // 'http://prediction-box-engine-env.eba-cqvymbxb.us-west-2.elasticbeanstalk.com/call-sample-knn-individual/',
          this.ENGINE_URL + 'call-sample-knn-individual/',
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
