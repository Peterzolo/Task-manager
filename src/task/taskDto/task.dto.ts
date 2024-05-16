import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
}
