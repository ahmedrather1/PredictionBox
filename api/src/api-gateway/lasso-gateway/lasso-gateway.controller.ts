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

@Controller('lasso-gateway')
export class LassoGatewayController {
  constructor(private ApiGatewayService: ApiGatewayService) {}

  @Post('call-lasso-coefficient-analysis')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoCoefAnalysis(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-lasso-coefficient-analysis/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-lasso-partial-regressions')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoPartialRegressions(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-lasso-partial-regressions/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-lasso-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-lasso-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-lasso-custom-coefficient-analysis')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoCustomCoefficientAnalysis(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-lasso-custom-coefficient-analysis/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-lasso-custom-partial-regressions')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoCustomPartialRegressions(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-lasso-custom-partial-regressions/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-custom-lasso-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallLassoCustomIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-custom-lasso-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }
}
