import { IsOptional, IsNumberString } from 'class-validator';

export class FindAllAbilitiesQueryDto {
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  offset?: string;
}
