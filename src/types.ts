/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  images: string[];
  breed: string;
  age: string;
  gender: '男生' | '女生';
  personality: string[];
  healthStatus: string;
  description: string;
  vaccinated: boolean;
  spayed: boolean;
  postedDate: string;
  location: string;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  petImage: string;
  applicantName: string;
  phone: string;
  email: string;
  experience: string;
  environment: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
