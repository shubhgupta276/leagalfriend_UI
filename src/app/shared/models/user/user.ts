export class User {
  FirstName: string;
  LastName: string;
  Organisation: string;
  AddressLine1: string;
  AddressLine2: string;
  PostalCode: number;
  Email: string;
  MobileNumber: string;
  StatusCode: number;
  UserTypeCode: number;
  UserType: string;
  Status: string;
  Password: string;
}

export const Users: User[] = [
  {
    FirstName: 'Puneet',
    LastName: 'Chauhan',
    Organisation: 'GlobalLogic',
    Email: 'Puneet.kumar@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Sector-15,Noida',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    UserTypeCode: 3, UserType: 'Client',
    AddressLine2: '', Password: ''
  },
  {
    FirstName: 'Anup',
    LastName: 'Kumar',
    Organisation: 'GlobalLogic',
    Email: 'Puneet.kumar@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Sector-15,Noida',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    UserTypeCode: 1, UserType: 'manager',
    AddressLine2: '', Password: ''
  },
  {
    StatusCode: 1,
    FirstName: 'Vipin',
    LastName: 'Rawat',
    Organisation: 'GlobalLogic',
    Email: 'Vipin.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Delhi',
    UserTypeCode: 1,
    UserType: 'manager',
    Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3,
    UserType: 'Client',
    FirstName: 'Anjani',
    LastName: 'Rawat',
    Organisation: 'GlobalLogic',
    Email: 'Anjani.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Delhi',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 2,
    UserType: 'Employee',
    FirstName: 'Kamal',
    LastName: 'Kant',
    Organisation: 'GlobalLogic',
    Email: 'Kamal.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Agra',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 1,
    UserType: 'manager',
    FirstName: 'Anjali',
    LastName: 'Kumari',
    Organisation: 'GlobalLogic',
    Email: 'Anjali.singh1@globallogic.com',
    MobileNumber: '8483939202',
    AddressLine1: 'MP',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 2,
    UserType: 'Employee',
    FirstName: 'Rakesh',
    LastName: 'Pandey',
    Organisation: 'GlobalLogic',
    Email: 'Rakesh.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Patna',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 1,
    UserType: 'manager',
    FirstName: 'Vinay',
    LastName: 'Vats',
    Organisation: 'GlobalLogic',
    Email: 'Vinay.singh1@globallogic.com',
    MobileNumber: '7575484733',
    AddressLine1: 'Lucknow',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 1,
    UserType: 'manager',
    FirstName: 'Abi',
    LastName: 'Kumar',
    Organisation: 'GlobalLogic',
    Email: 'Abi.singh1@globallogic.com',
    MobileNumber: '9758460007',
    AddressLine1: 'Moradabad',
    StatusCode: 2, Status: 'Trial',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 1,
    UserType: 'manager',
    FirstName: 'Ashish',
    LastName: 'Bist',
    Organisation: 'GlobalLogic',
    Email: 'Kamal.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Agra',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },

  {
    UserTypeCode: 1, UserType: 'manager',
    FirstName: 'Kamal',
    LastName: 'Mehra',
    Organisation: 'GlobalLogic',
    Email: 'Kamal.singh1@globallogic.com',
    MobileNumber: '9910398806',
    AddressLine1: 'Agra',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3, UserType: 'Client',
    FirstName: 'Ravindra',
    LastName: 'Pratap',
    Organisation: 'GlobalLogic',
    Email: 'Ravi.singh1@globallogic.com',
    MobileNumber: '8474747479',
    AddressLine1: 'Agra',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3, UserType: 'Client',
    FirstName: 'Rohit',
    LastName: 'Sahgal',
    Organisation: 'GlobalLogic',
    Email: 'Rohit.singh1@globallogic.com',
    MobileNumber: '74748389839',
    AddressLine1: 'Dhampur',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Mohit',
    LastName: 'Chauhan',
    Organisation: 'GlobalLogic',
    Email: 'Mohit.singh1@globallogic.com',
    MobileNumber: '7484747474',
    AddressLine1: 'Saharanpur',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Rajat',
    LastName: 'Bhatiya',
    Organisation: 'GlobalLogic',
    Email: 'Rajat.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Jaipur',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Akshay',
    LastName: 'Khanna',
    Organisation: 'GlobalLogic',
    Email: 'Akshay.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Agra',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Monika',
    LastName: 'Dubey',
    Organisation: 'GlobalLogic',
    Email: 'Monika.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Delhi',
    StatusCode: 3, Status: 'Expired',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Sumit',
    LastName: 'Mehra',
    Organisation: 'GlobalLogic',
    Email: 'Sumit.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Delhi',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 2, UserType: 'Employee',
    FirstName: 'Rohan',
    LastName: 'Kumar',
    Organisation: 'GlobalLogic',
    Email: 'Rohan.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Delhi',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3, UserType: 'Client',
    FirstName: 'Monika',
    LastName: 'Pahuja',
    Organisation: 'GlobalLogic',
    Email: 'Monika.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Delhi',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3, UserType: 'Client',
    FirstName: 'Shiva',
    LastName: 'Kumar',
    Organisation: 'GlobalLogic',
    Email: 'Shiva.singh1@globallogic.com',
    MobileNumber: '74874747473',
    AddressLine1: 'Nepal',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  },
  {
    UserTypeCode: 3, UserType: 'Client',
    FirstName: 'Mahesh',
    LastName: 'Giri',
    Organisation: 'GlobalLogic',
    Email: 'Mahesh.singh1@globallogic.com',
    MobileNumber: '87378373798',
    AddressLine1: 'UP',
    StatusCode: 1, Status: 'Active',
    PostalCode: 110000,
    AddressLine2: '', Password: ''
  }
];
