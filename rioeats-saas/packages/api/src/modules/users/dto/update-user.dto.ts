import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '(11) 99999-9999',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}