export interface Resident {
    id: string;
    name: string;
    type: 'owner' | 'renter';
    propertyId: string;
    status: string;
    dob: string;
    contactNumber: string;
    email: string;
  }
  
  export interface Administrator {
    id: string;
    name: string;
    role: 'Estate Manager' | 'Company Director' | 'Group Director' | 'Administrator';
    company: string;
    group: string;
    email: string;
    contactNumber: string;
  }