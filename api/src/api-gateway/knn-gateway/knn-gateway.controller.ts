import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiGatewayService } from '../api-gateway.service';
// TODO CREATE A SERVICE FILE FOR THIS CONTROLLER
@Controller('knn-gateway')
export class KnnGatewayController {
  constructor(private ApiGatewayService: ApiGatewayService) {}

  @Post('call-sample-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallSampleKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardKnnRequest(
        file,
        body,
        'call-sample-knn/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-knn')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnn(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardKnnRequest(
        file,
        body,
        'call-custom-knn/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-knn-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallCustomKnnIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardKnnRequest(
        file,
        body,
        'call-custom-knn-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-sample-knn-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallSampleKnnIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardKnnRequest(
        file,
        body,
        'call-sample-knn-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }
}
