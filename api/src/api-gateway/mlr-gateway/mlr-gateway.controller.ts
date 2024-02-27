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

@Controller('mlr-gateway')
export class MlrGatewayController {
  constructor(private ApiGatewayService: ApiGatewayService) {}

  @Post('call-mlr-coefficient-analysis')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallMlrCoefAnalysis(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-mlr-coefficient-analysis/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-mlr-partial-regressions')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallMlrPartialRegressions(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-mlr-partial-regressions/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }

  @Post('call-mlr-individual')
  @UseInterceptors(FileInterceptor('csv-file'))
  async forwardToCallMlrIndividual(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ApiGatewayService.forwardRequest(
        file,
        body,
        'call-mlr-individual/',
      );
      res.send(data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || error);
    }
  }
}
