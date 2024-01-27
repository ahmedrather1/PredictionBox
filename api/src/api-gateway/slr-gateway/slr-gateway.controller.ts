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

@Controller('slr-gateway')
export class SlrGatewayController {
  constructor(private ApiGatewayService: ApiGatewayService) {}

  @Post('call-sample-slr')
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
        'call-sample-slr/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-slr')
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
        'call-custom-slr/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-slr-individual')
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
        'call-custom-slr-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-sample-slr-individual')
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
        'call-sample-slr-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }
}
