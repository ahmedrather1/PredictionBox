import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiGatewayService {
  private ENGINE_URL: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.ENGINE_URL = this.configService.get<string>('ENGINE_URL');
  }

  async forwardKnnRequest(file: Express.Multer.File, body: any, endpoint) {
    const form = new FormData();
    this.appendFileToForm(form, file);
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) form.append(key, body[key]);
    });

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.ENGINE_URL + endpoint, form, {
          headers: form.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private appendFileToForm(form: FormData, file: Express.Multer.File) {
    if (file && file.buffer) {
      form.append(
        'csv-file',
        file.buffer,
        file.originalname || 'default-filename.csv',
      );
    }
  }
}
