export interface Property {
    id: string;
    owner: string;
    renter: string | null;
    paymentResponsible: 'owner' | 'renter';
    location: string;
    blockNumber: string;
    status: string;
    cluster: string;
    company: string;
    group: string;
  }