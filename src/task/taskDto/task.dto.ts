import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsEmail()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  status: string;

  @IsString()
  priority: string;

  @IsString()
  user: string;
}
