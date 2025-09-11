import { Expose, Type } from 'class-transformer';

class CandidateResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  avatarUrl: string;
}

class CompanyResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  avatarUrl: string;
}

class UserResponse {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  active: boolean;

  @Expose()
  verified: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CompanyResponse)
  company: CompanyResponse | null;

  @Expose()
  @Type(() => CandidateResponse)
  candidate: CandidateResponse | null;
}

export class LoginResponse {
  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;

  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;
}
