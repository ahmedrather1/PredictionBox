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

@Controller('ridge-gateway')
export class RidgeGatewayController {
  constructor(private ApiGatewayService: ApiGatewayService) {}

  @Post('call-ridge-coefficient-analysis')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgeCoefAnalysis(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-ridge-coefficient-analysis/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-ridge-partial-regressions')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgePartialRegressions(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-ridge-partial-regressions/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-ridge-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgeIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-ridge-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-ridge-custom-coefficient-analysis')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgeCustomCoefficientAnalysis(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-ridge-custom-coefficient-analysis/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-ridge-custom-partial-regressions')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgeCustomPartialRegressions(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-ridge-custom-partial-regressions/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-ridge-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallRidgeCustomIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-custom-ridge-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }
}
