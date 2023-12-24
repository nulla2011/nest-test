import { Controller, Get, Req, Res, Query, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { extname } from 'path';
import contentTypeList from './utils/contentTypeList';

@Controller('assets')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  async getFromPath(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query() query,
  ) {
    const type = extname(req.path).slice(1);
    if (contentTypeList[type]) {
      res.setHeader('Content-Type', contentTypeList[type]);
    }
    const data = await this.appService.getAsset(req.path.replace('/assets/', ''), query.hash);
    if (typeof data === 'string') {
      return data;
    } else {
      res.setHeader('Accept-Ranges', 'bytes');
      return new StreamableFile(data);
    }
  }
}
