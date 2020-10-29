import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { PermissionModule } from './permission/permission.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [AuthModule, UploadModule, PermissionModule, BookModule]
})
export class ModulesModule {}
