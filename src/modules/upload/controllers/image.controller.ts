import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from '../utils/image.util';
import { ApiFile } from 'src/modules/upload/decorators/api-file.decorator';
import { ApiMultiFile } from 'src/modules/upload/decorators/api-multi-file.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('upload/image')
@ApiTags('upload/image')
export class ImageController {

  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async upload(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('image_is_required');
    }
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('images')
  @Post('images')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files/image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadMultiple(@UploadedFiles() files) {
    if(!files.length){
      throw new BadRequestException('images_is_required');
    }
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
